import { generateToken } from "utils/token"

export const RefreshToken = async (ctx) => {
    const payload = {
        user_id: ctx.user.user_id
    }

    const token = await generateToken(payload)

    ctx.status = 200;
    
    UserInfo(ctx);
    ctx.body.token = token;
}

export const UserInfo = async (ctx) => {
    ctx.status = 200;

    ctx.body = {
        "name": ctx.user.name,
        "grade": ctx.user.grade,
        "class": ctx.user.class,
        "authority" : ctx.user.authority,
        "point": ctx.user.dormitory_point,
    }
}