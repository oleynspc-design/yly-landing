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

const FROM_EMAIL = "OleyDesign <noreply@yly.com.pl>";
const ADMIN_EMAIL = "postepy@oleydesign.pl";

export async function sendClientCredentialsEmail(
  to: string,
  fullName: string,
  password: string
) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Twoje dane logowania — OleyDesign Panel Klienta",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">OleyDesign</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Panel Klienta</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: white; margin: 0 0 16px;">Witaj, ${fullName}!</h2>
      <p style="line-height: 1.6; color: #a3a3a3;">Zostało utworzone dla Ciebie konto w Panelu Klienta OleyDesign. Tutaj możesz śledzić postępy realizacji Twojego projektu.</p>
      
      <div style="background: #0a0a0a; border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="color: #10b981; font-size: 13px; margin: 0 0 12px; font-weight: 600;">Twoje dane logowania:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666; padding: 6px 0;">Email:</td>
            <td style="color: white; text-align: right; padding: 6px 0; font-weight: 600;">${to}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 6px 0;">Hasło:</td>
            <td style="color: #10b981; text-align: right; padding: 6px 0; font-weight: 700; font-family: monospace; font-size: 16px; letter-spacing: 1px;">${password}</td>
          </tr>
        </table>
      </div>

      <a href="https://yly.com.pl/oley/panel/login" style="display: inline-block; background: #059669; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">Zaloguj się do panelu →</a>
    </div>
    <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">Pytania? Napisz do nas: <a href="mailto:kontakt@oleydesign.pl" style="color: #10b981;">kontakt@oleydesign.pl</a></p>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send credentials email:", err);
    return false;
  }
}

export async function sendProjectUpdateEmail(
  to: string,
  clientName: string,
  projectTitle: string,
  updateTitle: string,
  updateContent: string | null
) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Aktualizacja projektu: ${projectTitle} — ${updateTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #2563eb, #3b82f6); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Nowa aktualizacja projektu</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">${projectTitle}</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: white; margin: 0 0 8px;">${updateTitle}</h2>
      ${updateContent ? `<p style="line-height: 1.6; color: #a3a3a3; white-space: pre-wrap;">${updateContent}</p>` : ""}
      
      <a href="https://yly.com.pl/oley/panel" style="display: inline-block; background: #059669; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px;">Sprawdź postępy →</a>
    </div>
    <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
      <p style="color: #666; font-size: 12px; margin: 0;">OleyDesign — Panel Klienta</p>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send update email:", err);
    return false;
  }
}

export async function sendNewsletterWelcomeEmail(
  to: string,
  fullName: string,
  discountCode: string
) {
  try {
    const resend = getResend();
    const greeting = fullName ? `Cześć, ${fullName}!` : "Cześć!";
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "🎉 Twój kod zniżkowy -15% — OleyDesign Newsletter",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 40px 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 32px;">OleyDesign</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 12px 0 0; font-size: 16px;">Dziękujemy za zapis do newslettera!</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: white; margin: 0 0 16px; font-size: 22px;">${greeting}</h2>
      <p style="line-height: 1.7; color: #a3a3a3; font-size: 15px;">Właśnie dołączyłeś do newslettera OleyDesign. Będziemy informować Cię o nowościach, poradach i ekskluzywnych ofertach.</p>
      
      <div style="background: linear-gradient(135deg, #064e3b, #065f46); border: 2px solid #10b981; border-radius: 16px; padding: 28px; margin: 28px 0; text-align: center;">
        <p style="color: #6ee7b7; font-size: 13px; margin: 0 0 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Twój kod zniżkowy</p>
        <p style="color: white; font-size: 36px; font-weight: 800; letter-spacing: 4px; margin: 0; font-family: monospace;">${discountCode}</p>
        <p style="color: #34d399; margin: 12px 0 0; font-size: 18px; font-weight: 700;">-15% na dowolną usługę</p>
        <p style="color: #6ee7b7; margin: 8px 0 0; font-size: 12px;">Podaj ten kod przy składaniu zamówienia</p>
      </div>

      <p style="line-height: 1.6; color: #a3a3a3; font-size: 14px;">Kod jest jednorazowy i nie łączy się z innymi promocjami. Możesz go użyć przy zamówieniu dowolnej usługi web design, strony internetowej, sklepu lub aplikacji.</p>

      <a href="https://oleydesign.pl" style="display: inline-block; background: #059669; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 20px; font-size: 15px;">Sprawdź naszą ofertę →</a>
    </div>
    <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
      <p style="color: #666; font-size: 11px; margin: 0;">Otrzymujesz tego maila, bo zapisałeś się do newslettera OleyDesign.<br/>
      <a href="mailto:newsletter@oleydesign.pl" style="color: #10b981;">newsletter@oleydesign.pl</a></p>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send newsletter welcome email:", err);
    return false;
  }
}

export async function forwardClientMessageToAdmin(
  clientEmail: string,
  clientName: string,
  projectTitle: string,
  messageContent: string
) {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: clientEmail,
      subject: `Wiadomość od klienta: ${clientName} — ${projectTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #111; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #f59e0b, #eab308); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Nowa wiadomość od klienta</h1>
    </div>
    <div style="padding: 32px;">
      <div style="background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #666; padding: 4px 0;">Klient:</td>
            <td style="color: white; text-align: right; padding: 4px 0; font-weight: 600;">${clientName}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 4px 0;">Email:</td>
            <td style="color: #10b981; text-align: right; padding: 4px 0;">${clientEmail}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 4px 0;">Projekt:</td>
            <td style="color: white; text-align: right; padding: 4px 0;">${projectTitle}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #0a0a0a; border-left: 3px solid #10b981; padding: 16px; border-radius: 0 8px 8px 0;">
        <p style="line-height: 1.6; color: #e5e5e5; margin: 0; white-space: pre-wrap;">${messageContent}</p>
      </div>

      <a href="https://yly.com.pl/oley/admin" style="display: inline-block; background: #059669; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px;">Otwórz panel admina →</a>
    </div>
  </div>
</body>
</html>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to forward client message:", err);
    return false;
  }
}
