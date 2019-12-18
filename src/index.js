import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import winston from 'winston';
import cors from '@koa/cors';
import routes from './routes'

import { logger } from './logger';
import { sequelize } from './models';
sequelize.sync();


const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(logger(winston))
    .use(bodyParser())
    .use(jwt({ secret: process.env.JWT_KEY }).unless({ path: [/^\/auth/] }))
    .use(routes.routes()).use(routes.allowedMethods())

app.listen(port, () => {
    console.log(`Dormitory Management Server Started.. with port ${port}`);
});
