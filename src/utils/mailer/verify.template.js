export function verifyAccountTemplate(code) {
  return `
    <div style="font-family: Arial, sans-serif; color: #e0e0e0; background:#090909; padding: 24px;">
      <h2 style="color:#ff4ecd;">Verificación de correo</h2>

      <p>
        Gracias por registrarte en <strong>BloodyYue</strong>.
        Para completar tu registro, utiliza el siguiente código:
      </p>

      <div style="
        margin: 24px 0;
        padding: 16px;
        background:#1a1a1a;
        text-align:center;
        font-size: 1.5rem;
        letter-spacing: 4px;
        font-weight: bold;
        color:#ffffff;
      ">
        ${code}
      </div>

      <p style="font-size: 0.9rem; color:#b3b3b3;">
        Este código es válido por 1 hora.
        Si no solicitaste este registro, puedes ignorar este mensaje.
      </p>

      <hr style="border:none; border-top:1px solid #333; margin:24px 0;" />

      <p style="font-size: 0.8rem; color:#777;">
        BloodyYue · Arte digital · Comisiones personalizadas
      </p>
    </div>
  `;
}
