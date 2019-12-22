module.exports.AUTH_REQUIRED = {
    statusCode: 401,
    code: 'AUTH_REQUIRED',
    message: 'Authentication is needed to access the endpoint.'
}

module.exports.INVALID_REQUEST_BODY_FORMAT = {
    statusCode: 422,
    code: 'INVALID_REQUEST_BODY_FORMAT',
    message: 'The request body has invalid format.'
};

module.exports.EXISTING_EMAIL = {
    statusCode: 422,
    code: 'EXISTING_EMAIL',
    message: 'The requested email already exists.'
}

module.exports.INVALID_ACCOUNT = {
    statusCode: 422,
    code: 'INVALID_ACCOUNT',
    message: 'Email or password is invalid.'
}

module.exports.UNVERIFIED_ACCOUNT = {
    statusCode: 422,
    code: 'UNVERIFIED_ACCOUNT',
    message: 'The account is not verified.'
}

module.exports.INVALID_REQUEST_DATA = {
    statusCode: 422,
    code: 'INVALID_REQUEST_DATA',
    message: 'The requested data has invalid data.'
}

module.exports.RESERVED_USER = {
    statusCode: 422,
    code: "RESERVED_USER",
    message: 'The user already reserved seat today.'
}

module.exports.RESERVED_SEAT = {
    statusCode: 422,
    code: 'RESERVED_SEAT',
    message: 'The requested seat is already reserved.'
}

module.exports.INVALID_SEAT = {
    statusCode: 422,
    code: 'INVALID_SEAT',
    message: 'The requested seat cannot be reseved.'
}

module.exports.INVALID_APPLY_TIME = {
    statusCode: 422,
    code: 'INVALID_APPLY_TIME',
    message: 'It\'s not available to reserve now.'
}

module.exports.BORROW_BLOCKED = {
    statusCode: 422,
    code: 'BORROW_BLOCKED',
    message: 'The user is forbidden to borrow laptop now.'
}

module.exports.NOT_BROUGHT = {
    statusCode: 422,
    code: 'NOT_BROUGHT',
    message: 'The user didn\'t borrow laptop today.'
}
