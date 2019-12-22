import Router from 'koa-router';
import { Register, Login, ConfirmEmail } from './controllers/auth';
import { RefreshToken, UserInfo } from './controllers/user';

const auth = new Router;

auth.post('/register/:authority', Register);
auth.post('/login/:authority', Login);
auth.get('/verification', ConfirmEmail);

const user = new Router;

user.get('/refresh', RefreshToken);
user.get('/', UserInfo)

const routes = new Router;

routes.use('/auth', auth.routes());
routes.use('/user', user.routes());


export default routes;