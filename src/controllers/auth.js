import Joi from 'joi';
import crypto from 'crypto';
import { user } from 'models';
import { generateToken, decodeToken } from 'utils/token';


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
        console.log(`Login - Joi 형식 에러`);
        ctx.status = 400;
        ctx.body = {
            "error": "001"
        }
        return;
    }

    //이메일 검사
    const founded = await user.findOne({
        where: {
            email: ctx.request.body.email
        }
    });

    if (founded == null) {
        console.log(`Login - 존재하지 않는 계정입니다. / 입력된 아이디 : ${ctx.request.body.id}`);
        ctx.status = 400;
        ctx.body = {
            "msg": "아이디나 비밀번호를 확인해 주세요."
        }
        return;
    }

    //비밀번호 검사
    const input = crypto.createHmac('sha256', process.env.PASSWORD_KEY).update(ctx.request.body.password).digest('hex');

    if (founded.password != input) {
        console.log(`Login - 비밀번호를 틀렸습니다.`);
        ctx.status = 400;
        ctx.body = {
            "msg": "아이디나 비밀번호를 확인해 주세요."
        }
        return;
    }

    //jwt 발행
    const payload = {
        user_code: founded.user_code
    };

    let token = null;
    token = await generateToken(payload);

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
        console.log("Register - Joi 형식 에러")
        ctx.status = 400;
        ctx.body = {
            "error": "001"
        }
        return;
    }

    //중복 이메일 검사
    const existEmail = await user.findOne({
        where: {
            email: ctx.request.body.email
        }
    });

    if (existEmail != null) {
        console.log(`Register - 이미 존재하는 이메일입니다. / 입력된 이메일 : ${ctx.request.body.email}`);

        ctx.status = 400;
        ctx.body = {
            "msg": "이미 존재하는 이메일입니다."
        }
        return;
    }

    //비밀번호 해쉬 후 계정 생성
    const password = crypto.createHmac('sha256', process.env.Password_KEY).update(ctx.request.body.password).digest('hex');

    await user.create({
        "email": ctx.request.body.email,
        "password": password,
        "name": "tester1",
        "authority": "student",
        "key_for_verify": verifycode
    });

    console.log(`Register - 새로운 회원이 저장되었습니다. / 이메일 : ${ctx.request.body.email}`);

    ctx.status = 200;

}

