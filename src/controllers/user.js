import { generateToken } from "utils/token"

export const RefreshToken = async (ctx) => {
    const payload = {
        email: ctx.user.email
    }

    const token = await generateToken(payload)

    ctx.status = 200;
    ctx.body = {
        token: token
    }
}