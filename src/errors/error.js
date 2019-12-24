module.exports.AUTH_REQUIRED = {
    statusCode: 401,
    code: '로그인 필요',
    message: '기능에 접근하기 위해서는 인증이 필요합니다.'
}

module.exports.NO_PERMISSIONS = {
    statusCode: 403,
    code: '권한 없음',
    message: '기능에 접근하기 위한 권한이 없습니다.'
}

module.exports.INVALID_REQUEST_BODY_FORMAT = {
    statusCode: 422,
    code: '잘못된 요청 데이터 형식',
    message: '요청한 데이터의 형식이 올바르지 않습니다.'
};

module.exports.EXISTING_EMAIL = {
    statusCode: 422,
    code: '존재하는 이메일',
    message: '이미 존재하는 이메일 입니다.'
}

module.exports.INVALID_VERIFICATION_CODE = {
    statusCode: 422,
    code: '잘못된 인증 코드',
    message: '올바르지 않은 인증 코드입니다.'
}

module.exports.INVALID_ACCOUNT = {
    statusCode: 422,
    code: '로그인 실패',
    message: '이메일 혹은 패스워드가 올바르지 않습니다.'
}

module.exports.UNVERIFIED_ACCOUNT = {
    statusCode: 422,
    code: '인증되지 않은 계정',
    message: '이메일 인증을 진행해 주세요.'
}

module.exports.INVALID_REQUEST_DATA = {
    statusCode: 422,
    code: '잘못된 요청 데이터',
    message: '올바르지 않은 데이터 입니다.'
}

module.exports.RESERVED_USER = {
    statusCode: 422,
    code: "노트북 대여 불가",
    message: '이미 노트북을 대여하였습니다.'
}

module.exports.RESERVED_SEAT = {
    statusCode: 422,
    code: '노트북 대여 불가',
    message: '이미 다른 학생이 신청하여 선택이 불가능한 좌석입니다.'
}

module.exports.INVALID_SEAT = {
    statusCode: 422,
    code: '노트북 대여 불가',
    message: '해당 좌석은 현재 선택이 불가능한 좌석입니다.'
}

module.exports.INVALID_APPLY_TIME = {
    statusCode: 422,
    code: '노트북 대여 불가',
    message: '신청 마감 시각(21:00)이 지나 더 이상 신청이 불가능합니다.'
}

module.exports.BORROW_BLOCKED = {
    statusCode: 422,
    code: '노트북 대여 불가',
    message: '해당 학생은 현재 노트북 대여 불가 기간입니다.'
}

module.exports.NOT_BROUGHT = {
    statusCode: 422,
    code: '노트북 대여 불가',
    message: '해당 학생은 노트북을 대여하지 않았습니다.'
}

module.exports.INVALID_URL = {
    statusCode: 422,
    code: '노래 신청 불가',
    message: '해당 링크는 유튜브의 링크가 아닙니다.'
}
