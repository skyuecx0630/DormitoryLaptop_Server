import Joi from 'joi';
import crypto from 'crypto';
import { user, auth_code } from 'models';
import { generateToken } from 'utils/token';
import { sendRegisterEmail } from 'utils/sendMail';
import {
    INVALID_REQUEST_BODY_FORMAT, EXISTING_EMAIL, INVALID_ACCOUNT, UNVERIFIED_ACCOUNT, INVALID_REQUEST_DATA, INVALID_VERIFICATION_CODE
} from 'errors/error';


import dotenv from 'dotenv';
dotenv.config();

export const Login = async (ctx) => {
    // Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const Result = Joi.validate(ctx.request.body, bodyFormat);

    if (Result.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    //이메일 검사
    const account = await user.findOne({
        where: {
            email: ctx.request.body.email,
            authority: ctx.params.authority
        }
    });

    if (account == null) {
        throw INVALID_ACCOUNT;
    }

    //비밀번호 검사
    const input = crypto.createHmac('sha256', process.env.PASSWORD_KEY).update(ctx.request.body.password).digest('hex');

    if (account.password != input) {
        throw INVALID_ACCOUNT;
    }

    //인증된 계정만 로그인
    if (account.validation == false) {
        throw UNVERIFIED_ACCOUNT;
    }

    //jwt 발행
    const payload = {
        user_id: account.user_id
    };

    let token = null;
    token = await generateToken(payload);

    //토큰 반환
    ctx.status = 200;
    ctx.body = {
        token: token
    };
}

export const Register = async (ctx) => {
    //Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        verification_code: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, bodyFormat)

    if (result.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    //중복 이메일 검사
    const existEmail = await user.findOne({
        where: {
            email: ctx.request.body.email
        }
    });

    if (existEmail != null) {
        throw EXISTING_EMAIL;
    }

    //인증 코드 검사
    const verification = await auth_code.findOne({
        where: {
            auth_code: ctx.request.body.verification_code,
            authority: ctx.params.authority
        }
    })

    if (verification == null) {
        throw INVALID_VERIFICATION_CODE;
    }

    //이메일 인증 키 생성
    let verifycode;
    let key_for_verify;

    do {
        let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
        let key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
        key_for_verify = key_one + key_two;
        verifycode = await user.findAll({
            where: {
                "key_for_verify": key_for_verify
            }
        });
    } while (verifycode.length);

    //인증 이메일 전송
    await sendRegisterEmail(ctx.request.body.email, key_for_verify);

    //비밀번호 해쉬 후 계정 생성
    const password = crypto.createHmac('sha256', process.env.PASSWORD_KEY).update(ctx.request.body.password).digest('hex');
    await user.create({
        "email": ctx.request.body.email,
        "password": password,
        "name": verification.name,
        "grade": verification.grade,
        "class": verification.class,
        "number": verification.number,
        "authority": verification.authority,
        "key_for_verify": key_for_verify
    });

    ctx.status = 204;
}

export const ConfirmEmail = async (ctx) => {
    //인증키 확인
    const key_for_verify = ctx.query.key.replace(' ', '+');
    const account = await user.findOne({
        where: {
            "key_for_verify": key_for_verify
        }
    });

    if(account == null){
        throw INVALID_REQUEST_DATA;
    }

    //인증 완료
    await account.update({
        "validation": true
    });

    ctx.status = 200;
    ctx.body = {
        'title' : '인증 성공',
        "message" : '이제 로그인 하실 수 있습니다!'
    }
}
