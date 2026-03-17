import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { getSql } from "@/lib/db";

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  price_pln: number;
  type: string;
  active: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Musisz być zalogowany, aby dokonać zakupu." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const productSlug = typeof body.productSlug === "string" ? body.productSlug : "";

    if (!productSlug) {
      return NextResponse.json({ error: "Brak produktu." }, { status: 400 });
    }

    const sql = getSql();

    const products = (await sql`
      SELECT id::text, slug, name, price_pln, type, active
      FROM products
      WHERE slug = ${productSlug} AND active = true
      LIMIT 1
    `) as ProductRow[];

    if (products.length === 0) {
      return NextResponse.json({ error: "Produkt nie znaleziony." }, { status: 404 });
    }

    const product = products[0];

    // Check if user already has access
    if (user.trainingAccessStatus === "granted" && user.trainingAccessScope === "all") {
      return NextResponse.json(
        { error: "Masz już pełny dostęp do szkolenia." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yly.com.pl";

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "p24"],
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        productId: product.id,
        productSlug: product.slug,
      },
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: product.name,
              description: `Treść cyfrowa — ${product.type === "course" ? "kurs online" : product.type === "bundle" ? "pakiet" : product.type === "ebook" ? "e-book" : "kolekcja promptów"}`,
            },
            unit_amount: product.price_pln,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    // Create order record
    await sql`
      INSERT INTO orders (user_id, product_id, amount, stripe_session_id)
      VALUES (${user.id}::uuid, ${product.id}::uuid, ${product.price_pln}, ${session.id})
    `;

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
