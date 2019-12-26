import moment from 'moment-timezone';


export const now = (date = undefined) => {
    moment.tz.setDefault('Asia/Seoul');
    return moment(date)
}