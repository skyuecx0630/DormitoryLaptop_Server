import Router from 'koa-router';
import { RoomDetail } from 'controllers/laptop';
import { BlockLaptop } from 'controllers/laptopBlock';

const laptop = new Router;

laptop.get('/rooms', RoomDetail);

laptop.post('/block', BlockLaptop);


const managerRouter = new Router;

managerRouter.use('/laptop', laptop.routes());


module.exports = managerRouter;