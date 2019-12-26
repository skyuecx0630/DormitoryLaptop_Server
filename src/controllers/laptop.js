import Joi from 'joi';
import sequelize from 'sequelize';
import { now } from 'utils/timeCalc'
import { laptop, laptop_block, user } from 'models';
import {
    INVALID_REQUEST_BODY_FORMAT, INVALID_APPLY_TIME, RESERVED_SEAT, RESERVED_USER, INVALID_SEAT, BORROW_BLOCKED, NOT_BROUGHT, INVALID_REQUEST_DATA
} from 'errors/error'

const Op = sequelize.Op;

const ROOM_LIST = ["lab1", "lab2", "lab3", "lab4", "self"];
const ROOM_NAME = ["Lab 1실", "Lab 2실", "Lab 3실", "Lab 4실", "자기주도학습실"];
const ROOM_SIZE = [24, 24, 24, 24, 36];

const checkApplyTime = () => {
    const currentDay = now().day();
    const currentHour = now().hour();
    if (currentDay >= 5 || currentDay == 0) {
        throw INVALID_APPLY_TIME;
    }
    if (currentHour < 9 || currentHour >= 21) {
        throw INVALID_APPLY_TIME;
    }
}
const checkReserved = async (ctx, today) => {
    const seat = await laptop.findOne({
        where: {
            seat: ctx.request.body.seat,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })
    if (seat) {
        throw RESERVED_SEAT;
    }
}


export const BorrowLaptop = async (ctx) => {
    //Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        room : Joi.string().required(),
        seat : Joi.number().required()
    });

    const result = Joi.validate(ctx.request.body, bodyFormat)

    if (result.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }
    
    //대여 가능한 시간인지 확인
    checkApplyTime();

    //대여된 자리인지 확인
    const today = now().toISOString().slice(0, 10);

    await checkReserved(ctx, today);

    //노트북 대여 금지된 유저인지 확인
    const isBlocked = await laptop_block.findOne({
        where: {
            user_id : ctx.user.user_id
        }
    });


    if (isBlocked && (isBlocked.starts_at <= today && isBlocked.ends_at >= today)) {
        throw BORROW_BLOCKED;
    }

    //이미 대여한 유저인지 확인
    const mySeat = await laptop.findOne({
        where: {
            user_id : ctx.user.user_id,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })
    
    if (mySeat) {
        throw RESERVED_USER;
    }


    //대여 가능한 실인지 확인
    if (!ROOM_LIST.includes(ctx.request.body.room)) {
        throw INVALID_REQUEST_DATA;
    }

    //대여 가능한 자리인지 확인


    //노트북 대여
    await laptop.create({
        "user_id" : ctx.user.user_id,
        "room" : ctx.request.body.room,
        "seat" : ctx.request.body.seat 
    })
    
    ctx.status = 200;
    ctx.body = {
        "title" : "노트북 대여 신청",
        "msg" : "대여 신청에 성공하였습니다!"
    }
}

export const ChangeLaptop = async (ctx) => {
    //Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        room: Joi.string().required(),
        seat: Joi.number().required()
    });

    const result = Joi.validate(ctx.request.body, bodyFormat)

    if (result.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }
    
    //대여한 유저인지 확인
    const today = now().toISOString().slice(0, 10);

    const mySeat = await laptop.findOne({
        where: {
            user_id: ctx.user.user_id,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })

    if (mySeat == null) {
        throw NOT_BROUGHT;
    }

    //대여 가능한 시간인지 확인
    checkApplyTime();

    //대여된 자리인지 확인
    await checkReserved(ctx, today);

    //대여 가능한 실인지 확인
    if (!ROOM_LIST.includes(ctx.request.body.room)) {
        throw INVALID_REQUEST_DATA;
    }

    //대여 가능한 자리인지 확인


    //대여 자리 변경
    await mySeat.update({
        "room" : ctx.request.body.room,
        "seat" : ctx.request.body.seat
    })

    ctx.status = 200;
    ctx.body = {
        "title" : "노트북 대여 변경",
        "msg" : "대여가 변경되었습니다!"
    }
}

export const CancelLaptop = async (ctx) => {
    //대여한 유저인지 확인
    const today = now().toISOString().slice(0, 10);

    const seat = await laptop.findOne({
        where: {
            user_id : ctx.user.user_id,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })

    if (seat == null) {
        throw NOT_BROUGHT;
    }

    //노트북 대여 취소
    await seat.destroy();

    ctx.status = 200;
    ctx.body = {
        "title" : "노트북 대여 취소",
        "msg" : "대여가 취소되었습니다!"
    }
}

export const MyLaptop = async (ctx) => {
    //대여한 유저인지 확인
    const today = now().toISOString().slice(0, 10);

    const mySeat = await laptop.findOne({
        where: {
            user_id: ctx.user.user_id,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })

    //노트북 대여 현황 처리
    var room;
    var seat;

    if (mySeat == null) {
        room = "";
        seat = 0;
    }
    else {
        room = mySeat.room,
        seat = mySeat.seat
    }

    //노트북 대여 현황 반환
    ctx.status = 200;
    ctx.body = {
        "room" : room,
        "seat" : seat
    }
}

export const RoomList = async (ctx) => {
    let roomsArray = [];

    //오늘 각 학습실에서 대여된 자리 받아오기
    const today = now().toISOString().slice(0, 10);

    for (let i in ROOM_LIST) {
        const room = await laptop.findAll({
            where: {
                room: ROOM_LIST[i],
                created_at: {
                    [Op.gte]: Date.parse(today + " 00:00:00"),
                    [Op.lte]: Date.parse(today + " 23:59:59"),
                }
            }
        })

        //현재 학습실의 혼잡도를 계산
        const statusRatio = room.length / ROOM_SIZE[i];
        let type;
        let message;

        if (statusRatio <= 0.5){
            type = "green";
            message = "여유";
        } 
        else if (statusRatio <= 0.75) {
            type = "yellow";
            message = "보통";
        }
        else {
            type = "red";
            message = "혼잡";
        }


        //학습실 정보 저장
        roomsArray.push({
            "name": ROOM_NAME[i],
            "room" : ROOM_LIST[i],
            "size" : ROOM_SIZE[i],
            "seats" : room.length,
            "type" : type,
            "message" : message
        })
    }

    //학습실 목록 반환
    ctx.status = 200;
    ctx.body = {
        "rooms": roomsArray
    };
}

export const RoomSeat = async (ctx) => {
    //올바른 학습실인지 확인
    const room = ctx.params.room;
    
    if (!ROOM_LIST.includes(room)){
        throw INVALID_REQUEST_DATA
    }
    
    //오늘 해당 학습실에서 대여된 자리 조회
    const today = now().toISOString().slice(0, 10);

    const seats = await laptop.findAll({
        where: {
            room: room,
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        },
        order : ["seat"]
    })

    //대여된 자리 배열로 변환
    let reserved = [];
    
    for (let i in seats) {
        reserved.push(seats[i].seat)
    }

    //자리를 대여 불가, 대여 가능, 대여 완료 구분
    let seatsArray = [];
    let seatsLine = [];
    for (let i = 1; i <= ROOM_SIZE[ROOM_LIST.indexOf(room)] + 1; i++){ 
        if (reserved.includes(i)) {
            seatsLine.push({
                "seated" : 2
            })
        }
        else {
            seatsLine.push({
                "seated": 1
            })
        }

        if (seatsLine.length == 6) {
            seatsArray.push(seatsLine);
            seatsLine = [];
        }
    }

    //자리 현황 반환
    ctx.status = 200;
    ctx.body = {
        "seats" : seatsArray
    }
}

export const RoomDetail = async (ctx) => {
    //오늘 학습실에서 대여된 자리 조회
    const today = now().toISOString().slice(0, 10);

    const seats = await laptop.findAll({
        where: {
            created_at: {
                [Op.gte]: Date.parse(today + " 00:00:00"),
                [Op.lte]: Date.parse(today + " 23:59:59"),
            }
        }
    })

    //클라이언트에 전달할 데이터 직렬화
    let seatsArray = [];

    for (let i in seats) {

        //학습실 신청한 학생의 정보 조회
        const student = await user.findOne({
            where: {
                user_id: seats[i].user_id
            }
        })

        const record = {
            "user_id" : student.user_id,
            "name" : student.name,
            "grade" : student.grade,
            "class" : student.class,
            "number" : student.number,
            "room" : ROOM_NAME[ROOM_LIST.indexOf(seats[i].room)],
            "seat" : seats[i].seat,
            "is_blocked" : false,
            "rental_time" : seats[i].created_at.slice(11,16)
        }

        seatsArray.push(record)
    }

    //대여한 학생 목록 반환
    ctx.status = 200;
    ctx.body = {
        "seats" : seatsArray
    }
}
