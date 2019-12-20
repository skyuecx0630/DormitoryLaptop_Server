import { generateToken } from "utils/token"

export const RefreshToken = async (ctx) => {
    const payload = {
        user_id: ctx.user.user_id
    }

    const token = await generateToken(payload)

    ctx.status = 200;
    ctx.body = {
        token: token
    }
}