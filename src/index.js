import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import winston from 'winston';
import cors from '@koa/cors';
import errorHandler from 'middlewares/error-handler';
import authenticater from 'middlewares/authenticater';
import permissionOnly from 'middlewares/permission-only';

import { logger } from 'logger';
import { sequelize } from 'models';
import userRouter from 'router/userRouter';
import managerRouter from 'router/managerRouter';
import teacherRouter from 'router/teacherRouter';
sequelize.sync();


const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(logger(winston))
    .use(errorHandler())
    .use(bodyParser())
    .use(authenticater().unless({ path: [/^\/auth/] }))
    .use(userRouter.routes()).use(userRouter.allowedMethods())
    .use(permissionOnly(["manager", "teacher"]))
    .use(managerRouter.routes()).use(managerRouter.allowedMethods())
    .use(permissionOnly(["teacher"]))
    .use(teacherRouter.routes()).use(teacherRouter.allowedMethods())

app.listen(port, () => {
    console.log(`Dormitory Management Server Started.. with port ${port}`);
});
