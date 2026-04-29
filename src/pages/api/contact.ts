import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Update FROM once your domain is verified in Resend dashboard
const FROM = 'One Out Solutions <info@brandoncarrillo.dev>';
const INTERNAL_TO = 'brandoncarrilloalvarez123@gmail.com';

const internalEmail = (
  name: string,
  email: string,
  message: string,
  company?: string,
  projectType?: string,
  investment?: string,
  estimatedTotal?: string,
) => `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(214,235,253,0.19);max-width:600px;">
        <tr>
          <td style="background:#DB6923;padding:4px 32px;">
            <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#000;">ONE OUT SOLUTIONS — NUEVA CONSULTA</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 32px 24px;">
            <h1 style="margin:0 0 8px;font-size:32px;font-weight:700;letter-spacing:-.05em;color:#f5f5f5;">NUEVA ORDEN<br><span style="color:#DB6923;">RECIBIDA.</span></h1>
            <p style="margin:0;color:#888;font-size:14px;">Alguien envió una consulta desde el formulario.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(214,235,253,0.1);">
              <tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">NOMBRE</p>
                <p style="margin:0;font-size:20px;font-weight:700;color:#f5f5f5;">${name}</p>
              </td></tr>
              <tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">CORREO</p>
                <p style="margin:0;font-size:16px;color:#DB6923;">${email}</p>
              </td></tr>
              ${company ? `<tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">EMPRESA</p>
                <p style="margin:0;font-size:16px;color:#f5f5f5;">${company}</p>
              </td></tr>` : ''}
              ${projectType ? `<tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">TIPO DE PROYECTO</p>
                <p style="margin:0;font-size:16px;color:#f5f5f5;">${projectType}</p>
              </td></tr>` : ''}
              ${investment ? `<tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">INVERSIÓN SELECCIONADA</p>
                <p style="margin:0;font-size:16px;color:#f5f5f5;">${investment}</p>
              </td></tr>` : ''}
              ${estimatedTotal ? `<tr><td style="padding:20px 0 0;">
                <p style="margin:0 0 4px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">ESTIMADO TOTAL</p>
                <p style="margin:0;font-size:24px;font-weight:700;color:#DB6923;">₡${estimatedTotal}</p>
              </td></tr>` : ''}
              <tr><td style="padding:24px 0 0;">
                <p style="margin:0 0 8px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#888;">OBJETIVOS ESTRATÉGICOS</p>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#a1a4a5;background:#000;padding:16px;border-left:2px solid #DB6923;">${message.replace(/\n/g, '<br>')}</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;border-top:1px solid rgba(214,235,253,0.1);">
            <p style="margin:0;font-size:11px;color:#555;text-align:center;">One Out Solutions · Costa Rica · oneoutsolutions.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const confirmationEmail = (
  name: string,
  projectType?: string,
  investment?: string,
  estimatedTotal?: string,
) => `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#000;font-family:'Helvetica Neue',Arial,sans-serif;color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border:1px solid rgba(214,235,253,0.19);max-width:600px;">
        <tr>
          <td style="background:#DB6923;padding:4px 32px;">
            <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#000;">ONE OUT SOLUTIONS · CONFIRMACIÓN</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 32px 32px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:#DB6923;">Hola, ${name}</p>
            <h1 style="margin:0 0 24px;font-size:36px;font-weight:700;letter-spacing:-.04em;line-height:1.1;color:#f5f5f5;">Tu consulta llegó<br>en perfecto estado.</h1>
            <p style="margin:0;font-size:16px;line-height:1.7;color:#a1a4a5;">
              Recibimos tu solicitud y ya está en manos de nuestro equipo. Revisaremos cada detalle de tu proyecto y te contactaremos dentro de las próximas <strong style="color:#f5f5f5;">24 horas hábiles</strong> para agendar una sesión estratégica sin costo.
            </p>
          </td>
        </tr>
        ${(projectType || estimatedTotal) ? `
        <tr>
          <td style="padding:0 32px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;border:1px solid rgba(214,235,253,0.1);padding:24px;">
              <tr><td>
                <p style="margin:0 0 16px;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#555;">RESUMEN DE TU SOLICITUD</p>
                ${projectType ? `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                  <tr>
                    <td style="font-size:12px;color:#888;padding-bottom:2px;">Tipo de proyecto</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;font-weight:700;color:#f5f5f5;">${projectType}</td>
                  </tr>
                </table>` : ''}
                ${investment ? `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                  <tr>
                    <td style="font-size:12px;color:#888;padding-bottom:2px;">Alcance seleccionado</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;font-weight:700;color:#f5f5f5;">${investment}</td>
                  </tr>
                </table>` : ''}
                ${estimatedTotal ? `
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;color:#888;padding-bottom:2px;">Inversión estimada</td>
                  </tr>
                  <tr>
                    <td style="font-size:24px;font-weight:700;color:#DB6923;">₡${estimatedTotal}</td>
                  </tr>
                </table>` : ''}
              </td></tr>
            </table>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding:0 32px 40px;">
            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#a1a4a5;">
              Mientras tanto, si tienes alguna pregunta urgente, puedes responder directamente a este correo. Nuestro equipo lo verá.
            </p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#a1a4a5;">
              Gracias por confiar en One Out Solutions. Estamos listos para llevar tu negocio al siguiente nivel.
            </p>
            <p style="margin:24px 0 0;font-size:15px;color:#f5f5f5;font-weight:600;">El equipo de One Out Solutions</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid rgba(214,235,253,0.1);">
            <p style="margin:0;font-size:11px;color:#555;text-align:center;">One Out Solutions · Costa Rica · <a href="https://oneoutsolutions.com" style="color:#555;text-decoration:none;">oneoutsolutions.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 });
  }

  const { name, email, company, message, projectType, investment, estimatedTotal, idempotencyKey } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), { status: 400 });
  }

  const { data, error } = await resend.batch.send(
    [
      {
        from: FROM,
        to: [INTERNAL_TO],
        replyTo: email,
        subject: `Nueva consulta — ${projectType ?? 'General'} | ${name}`,
        html: internalEmail(name, email, message, company, projectType, investment, estimatedTotal),
      },
      {
        from: FROM,
        to: [email],
        replyTo: INTERNAL_TO,
        subject: 'Recibimos tu consulta — One Out Solutions',
        html: confirmationEmail(name, projectType, investment, estimatedTotal),
      },
    ],
    {
      idempotencyKey: `batch-contact-${idempotencyKey ?? `${email}-${Date.now()}`}`,
    }
  );

  if (error) {
    console.error('[contact] Resend error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
