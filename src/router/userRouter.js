import Router from 'koa-router';
import { Register, Login, ConfirmEmail } from 'controllers/auth';
import { RefreshToken, UserInfo } from 'controllers/user';
import { BorrowLaptop, CancelLaptop, ChangeLaptop, MyLaptop, RoomSeat, RoomList, RoomDetail } from 'controllers/laptop';
import { RequestSong } from 'controllers/requestSong';

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

laptop.get('/rooms/list', RoomList);
laptop.get('/rooms/:room', RoomSeat);


const song = new Router;

song.post('/', RequestSong);


const userRouter = new Router;

userRouter.use('/auth', auth.routes());
userRouter.use('/user', user.routes());
userRouter.use('/laptop', laptop.routes());
userRouter.use('/song', song.routes());


module.exports = userRouter;