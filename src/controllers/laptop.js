import Joi from 'joi';
import { Sequelize } from 'sequelize';
import { laptop, laptop_block, sequelize } from 'models';
import {
    INVALID_REQUEST_BODY_FORMAT, INVALID_APPLY_TIME, RESERVED_SEAT, RESERVED_USER, INVALID_SEAT, BORROW_BLOCKED, NOT_BROUGHT
} from 'errors/error'

const ROOM_LIST = ["lab1", "lab2", "lab3", "lab4", "self"]

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
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentHour = currentTime.getHours();

    if (currentDay >= 5 || currentDay == 0) {
        throw INVALID_APPLY_TIME;
    }

    if (currentHour < 9 || currentHour >= 21) {
        throw INVALID_APPLY_TIME;
    }

    //노트북 대여 금지된 유저인지 확인
    const isBlocked = await laptop_block.findOne({
        where: {
            user_id : ctx.user.user_id
        }
    });

    const today = new Date().toISOString().slice(0, 10);

    if (isBlocked && (isBlocked.starts_at <= today && isBlocked.ends_at >= today)) {
        throw BORROW_BLOCKED;
    }
    
    //이미 대여한 유저인지 확인
    const mySeat = await laptop.findOne({
        where: {
            user_id : ctx.user.user_id,
            created_at: today
        }
    })
    
    if (mySeat) {
        throw RESERVED_USER;
    }

    //대여된 자리인지 확인
    const seat = await laptop.findOne({
        where: {
            seat: ctx.request.body.seat,
            created_at: today
        }
    })

    if (seat) {
        throw RESERVED_SEAT;
    }

    //대여 가능한 실인지 확인
    if (!ROOM_LIST.includes(ctx.request.body.room)) {
        throw INVALID_SEAT;
    }

    //대여 가능한 자리인지 확인


    //노트북 대여
    await laptop.create({
        "user_id" : ctx.user.user_id,
        "room" : ctx.request.body.room,
        "seat" : ctx.request.body.seat 
    })
    
    ctx.status = 200;
}

