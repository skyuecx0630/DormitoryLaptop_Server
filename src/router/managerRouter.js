import Router from 'koa-router';
import { RoomDetail } from 'controllers/laptop';
import { BlockLaptop, CancelBlock } from 'controllers/laptopBlock';

const laptop = new Router;

laptop.get('/rooms', RoomDetail);

laptop.post('/block', BlockLaptop);
laptop.delete('/block/:user_id', CancelBlock);


const managerRouter = new Router;

managerRouter.use('/laptop', laptop.routes());


module.exports = managerRouter;