import Joi from 'joi'
import{
    INVALID_REQUEST_BODY_FORMAT, INVALID_URL
} from 'errors/error'
import { morning_song } from 'models';


export const RequestSong = async (ctx) => {
    //Joi 형식 검사
    const bodyFormat = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required()
    })

    const result = Joi.validate(ctx.request.body, bodyFormat);

    if (result.error) {
        throw INVALID_REQUEST_BODY_FORMAT
    }
    
    //url 검사
    const url = ctx.request.body.url;
    let music_url;

    if (url.startsWith('https://www.youtube.com/watch?v='))
        music_url = url.slice(32, 43)
    else if (url.startsWith('https://youtu.be/'))
        music_url = url.slice(17, 29)
    else
        throw INVALID_URL
    
    //노래 신청
    await morning_song.create({
        "title" : ctx.request.body.title,
        "song_url": "https://www.youtube.com/watch?v=" + music_url,
        "author": ctx.user.user_id
    })

    ctx.status = 204;
}