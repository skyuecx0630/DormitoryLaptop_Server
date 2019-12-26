import Joi from 'joi';
import sequelize from 'sequelize';
import { now } from 'utils/timeCalc'
import { laptop_block, user } from 'models';
import {
    INVALID_REQUEST_BODY_FORMAT
} from 'errors/error'
import moment from 'moment-timezone';

const Op = sequelize.Op;

export const BlockLaptop = async (ctx) => {
    //Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        user_id : Joi.array().items(Joi.number().integer().required()).required(),
        duration : Joi.number().integer().required()
    })

    const result = Joi.validate(ctx.request.body, bodyFormat)

    if (result.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    //금지 기간 계산
    const ends_at = now().add(ctx.request.body.duration, 'day').toISOString().slice(0,10);

    //금지 요청
    const users = ctx.request.body.user_id

    for (let i in users) {
        //현재 금지 기록 검색
        const history = await laptop_block.findOne({
            where: {
                user_id : users[i],
                ends_at : {
                    [Op.gte]: Date.parse(now().toISOString().slice(0,10))
                }
            }
        })

        //현재 금지 중이면 연장
        if (history) {
            const extended = now(history.ends_at).add(ctx.request.body.duration + 1, 'day').toISOString().slice(0, 10);
            await history.update({
                ends_at : extended
            })
        }
        else {
            await laptop_block.create({
                user_id : users[i],
                ends_at : ends_at
            })
        }
    }

    ctx.status = 200;
    ctx.body = {
        "ends_at" : ends_at
    }
}