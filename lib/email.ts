import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not configured");
    _resend = new Resend(key);
  }
  return _resend;
}

const FROM_EMAIL = "YLY <noreply@yly.com.pl>";
const SUPPORT_EMAIL = "support@yly.com.pl";

export async function sendWelcomeEmail(to: string, fullName: string) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Witaj w YLY! 🚀",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #080808; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">YLY</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Twoje środowisko rozwoju AI</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: white; margin: 0 0 16px;">Cześć, ${fullName}! 👋</h2>
      <p style="line-height: 1.6; color: #a3a3a3;">Dziękujemy za rejestrację w YLY. Twoje konto zostało pomyślnie utworzone.</p>
      <p style="line-height: 1.6; color: #a3a3a3;">Teraz możesz:</p>
      <ul style="color: #a3a3a3; line-height: 1.8;">
        <li>Przeglądać nasze kursy AI</li>
        <li>Dołączyć do społeczności na Discordzie</li>
        <li>Kupić dostęp do szkolenia</li>
      </ul>
      <a href="https://yly.com.pl/sklep" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">Przeglądaj kursy →</a>
    </div>
    <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">Pytania? Napisz do nas: <a href="mailto:${SUPPORT_EMAIL}" style="color: #3b82f6;">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    return false;
  }
}

export async function sendOrderConfirmationEmail(
  to: string,
  fullName: string,
  productName: string,
  amountPln: number,
  accessCode: string | null
) {
  try {
    const resend = getResend();
    const priceFormatted = (amountPln / 100).toFixed(2).replace(".", ",") + " zł";

    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Potwierdzenie zakupu: ${productName} ✅`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #080808; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Płatność potwierdzona ✅</h1>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: white; margin: 0 0 16px;">Dziękujemy, ${fullName}!</h2>
      <p style="line-height: 1.6; color: #a3a3a3;">Twoja płatność została zrealizowana pomyślnie.</p>
      
      <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666; padding: 4px 0;">Produkt:</td>
            <td style="color: white; text-align: right; padding: 4px 0; font-weight: 600;">${productName}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 4px 0;">Kwota:</td>
            <td style="color: #10b981; text-align: right; padding: 4px 0; font-weight: 600;">${priceFormatted}</td>
          </tr>
        </table>
      </div>

      ${accessCode ? `
      <div style="background: #1e3a5f; border: 1px solid #2563eb; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="color: #93c5fd; margin: 0 0 8px; font-size: 13px;">Twój kod dostępu:</p>
        <p style="color: white; font-size: 24px; font-weight: 800; letter-spacing: 4px; margin: 0; font-family: monospace;">${accessCode}</p>
        <p style="color: #60a5fa; margin: 8px 0 0; font-size: 12px;">Wpisz go w swoim profilu, aby aktywować dostęp</p>
      </div>
      ` : `
      <p style="color: #a3a3a3;">Dostęp do treści został automatycznie aktywowany na Twoim koncie.</p>
      `}

      <a href="https://yly.com.pl/dashboard" style="display: inline-block; background: #2563eb; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">Przejdź do szkolenia →</a>
    </div>
    <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">Pytania? Napisz do nas: <a href="mailto:${SUPPORT_EMAIL}" style="color: #3b82f6;">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send order confirmation email:", err);
    return false;
  }
}
