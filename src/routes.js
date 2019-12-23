import Router from 'koa-router';
import { Register, Login, ConfirmEmail } from 'controllers/auth';
import { RefreshToken, UserInfo } from 'controllers/user';
import { BorrowLaptop, CancelLaptop, ChangeLaptop, MyLaptop, RoomSeat, RoomList } from 'controllers/laptop';

const auth = new Router;

auth.post('/register/:authority', Register);
auth.post('/login/:authority', Login);
auth.get('/verification', ConfirmEmail);


const user = new Router;

user.get('/refresh', RefreshToken);
user.get('/', UserInfo);


const laptop = new Router;

laptop.post('/', BorrowLaptop);
laptop.put('/', ChangeLaptop);
laptop.delete('/', CancelLaptop);
laptop.get('/', MyLaptop);

laptop.get('/all', RoomList);
laptop.get('/:room', RoomSeat);


const routes = new Router;

routes.use('/auth', auth.routes());
routes.use('/user', user.routes());
routes.use('/laptop', laptop.routes());


export default routes;