import {
    NO_PERMISSIONS
} from 'errors/error'

module.exports = (authority) => {
    const middleware = async function permissionOnly(ctx, next) {
        if (!(authority.includes(ctx.user.authority))){
            throw NO_PERMISSIONS;
        }

        return next();
    }

    return middleware;
}