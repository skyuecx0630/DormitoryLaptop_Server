import Router from 'koa-router';
import { ConfirmBlock } from 'controllers/laptopBlock';

const laptop = new Router;

laptop.put('/block/:user_id', ConfirmBlock)

const teacherRouter = new Router;

teacherRouter.use('/laptop', laptop.routes())


module.exports = teacherRouter;