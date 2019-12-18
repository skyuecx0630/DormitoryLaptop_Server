import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

import { sequelize } from './models';
sequelize.sync();


const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(bodyParser())

app.listen(port, () => {
    console.log(`Dormitory Management Server Started.. with port ${port}`);
});
