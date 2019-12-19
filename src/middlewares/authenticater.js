import unless from 'koa-unless';
import { decodeToken } from 'utils/token';
import { user } from 'models'
import { AUTH_REQUIRED } from 'errors/error';

module.exports = () => {
    const middleware = async function authenticater(ctx, next) {

        if (!ctx.header.token) {
            throw AUTH_REQUIRED;
        }

        try{
            const decoded = await decodeToken(ctx.header.token);
    
            const account = await user.findOne({
                where: {
                    email: decoded.email
                }
            })

            ctx.user = account;

        } catch(error) {
            throw AUTH_REQUIRED;
        }

        return next();
    }

    middleware.unless = unless;
    return middleware;
}