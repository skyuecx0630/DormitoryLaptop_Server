import nodemailer from 'nodemailer';
import smtpTransporter from 'nodemailer-smtp-transport';

import dotenv from 'dotenv';
dotenv.config();

// SMTP 메일 설정
const smtpTransport = nodemailer.createTransport(smtpTransporter({
    host: 'smtp.daum.net',
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
}));

// 회원가입 시 이메일 인증을 위한 메일 발송
export const sendRegisterEmail = (email, key_for_verify) => {
    const url = 'http://localhost:4000/auth/verification?key=' + key_for_verify;

    const mailOpt = {
        from: {
            name: '빈실',
            address: process.env.EMAIL_ID
        },
        to: email,
        subject: '이메일 인증을 진행하여주세요',
        html: '<h1>이메일 인증을 위해 URL을 클릭하여주세요.</h1><br>' + url
    };

    smtpTransport.sendMail(mailOpt, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Register - 이메일 전송에 성공하였습니다. 이메일 : ${email}`);
        }
        smtpTransport.close();
    });
}
