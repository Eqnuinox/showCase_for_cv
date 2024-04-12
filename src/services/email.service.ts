import {EMAIL_CONST} from "../constants";
import {replacePatternWitVariable} from "../helpers/replace.pattern.with.variable";

const nodemailer = require('nodemailer');

class EmailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    public async sendVerificationCode(to: string, code: string) {
        await this.transporter.sendMail({
            from: EMAIL_CONST.sendFrom,
            to: to,
            subject: EMAIL_CONST.sendVerificationCode.subject,
            text: code,
            html: await replacePatternWitVariable('email_templates/verificationCode.html', {code: code})
        });
    }
}

export {EmailService}
