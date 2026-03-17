import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSql } from "@/lib/db";
import { randomBytes } from "crypto";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;
    const productId = session.metadata?.productId;
    const stripeSessionId = session.id;
    const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : null;

    if (!userId || !productId) {
      console.error("Missing metadata in checkout session:", stripeSessionId);
      return NextResponse.json({ received: true });
    }

    const sql = getSql();

    try {
      // Generate access code
      const accessCode = randomBytes(4).toString("hex").toUpperCase();

      // Update order status
      await sql`
        UPDATE orders
        SET status = 'paid',
            stripe_payment_intent = ${paymentIntent},
            access_code = ${accessCode},
            updated_at = NOW()
        WHERE stripe_session_id = ${stripeSessionId}
      `;

      // Grant training access automatically
      await sql`
        INSERT INTO training_access (user_id, status, granted_scope, source, granted_at, unlock_code, updated_at)
        VALUES (${userId}::uuid, 'granted', 'all', 'stripe_purchase', NOW(), ${accessCode}, NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET status = 'granted',
            granted_scope = 'all',
            source = 'stripe_purchase',
            granted_at = NOW(),
            unlock_code = ${accessCode},
            updated_at = NOW()
      `;

      // Get user info for email
      const userRows = (await sql`
        SELECT email, full_name FROM users WHERE id = ${userId}::uuid LIMIT 1
      `) as { email: string; full_name: string }[];

      // Get product info for email
      const productRows = (await sql`
        SELECT name FROM products WHERE id = ${productId}::uuid LIMIT 1
      `) as { name: string }[];

      if (userRows.length > 0 && productRows.length > 0) {
        const orderRows = (await sql`
          SELECT amount FROM orders WHERE stripe_session_id = ${stripeSessionId} LIMIT 1
        `) as { amount: number }[];

        const amount = orderRows[0]?.amount ?? 0;

        await sendOrderConfirmationEmail(
          userRows[0].email,
          userRows[0].full_name,
          productRows[0].name,
          amount,
          accessCode
        );
      }

      console.log(`✅ Order fulfilled: user=${userId}, product=${productId}, code=${accessCode}`);
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  }

  return NextResponse.json({ received: true });
}
