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
    message: 'The requested data has invalid data'
}
