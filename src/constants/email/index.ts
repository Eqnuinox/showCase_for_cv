import fs from "fs";

const EMAIL_CONST = {
    sendFrom: 'kirillku141@gmail.com',
    sendVerificationCode: {
        subject: 'Your verification code',
        html: fs.readFileSync('email_templates/verificationCode.html').toString()
    }
}

export {EMAIL_CONST}
