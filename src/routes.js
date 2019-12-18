import Router from 'koa-router';
import { Register, Login } from './controllers/auth';

const auth = new Router;

auth.post('/register', Register);
auth.post('/login', Login);


const routes = new Router;

routes.use('/auth', auth.routes());

export default routes;