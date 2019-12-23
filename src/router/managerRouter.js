import Router from 'koa-router';
import { RoomDetail } from 'controllers/laptop';

const laptop = new Router;

laptop.get('/rooms', RoomDetail);


const managerRouter = new Router;

managerRouter.use('/laptop', laptop.routes());


module.exports = managerRouter;