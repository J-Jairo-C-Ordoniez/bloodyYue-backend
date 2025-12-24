import mailTransporter from '../../config/mailTransporter.js';
import { verifyAccountTemplate } from './verify.template.js';

const sendMail = {
    async sendVerification(email, code) {
        const mailOptions = {
            from: `"BloodyYue" <${process.env.MAILUSER}>`,
            to: email,
            subject: 'Verfica tu correo',
            html: verifyAccountTemplate(code),
        };

        await mailTransporter.sendMail(mailOptions);
    }
}

export default sendMail;