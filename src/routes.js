import Router from 'koa-router';
import { Register, Login, ConfirmEmail } from './controllers/auth';

const auth = new Router;

auth.post('/register/:authority', Register);
auth.post('/login/:authority', Login);
auth.get('/verification', ConfirmEmail);


const routes = new Router;

routes.use('/auth', auth.routes());

export default routes;