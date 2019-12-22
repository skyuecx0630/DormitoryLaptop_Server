import Sequelize from 'sequelize';
import path from 'path';

import { User } from './User';
import { Notice } from './Notice';
import { Laptop } from './Laptop';
import { LaptopBlock } from './LaptopBlock';
import { MorningSong } from './MorningSong';
import { Point } from './Point';

const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))['dormitory'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const user = User(sequelize, Sequelize);
const notice = Notice(sequelize, Sequelize);
const laptop = Laptop(sequelize, Sequelize);
const laptop_block = LaptopBlock(sequelize, Sequelize);
const morning_song = MorningSong(sequelize, Sequelize);
const point = Point(sequelize, Sequelize);

export {
    sequelize, Sequelize, user, notice, laptop, laptop_block, morning_song, point
};
