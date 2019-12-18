import Sequelize from 'sequelize';
import path from 'path';

import { User } from './User';

const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))['dormitory'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)

const user = User(sequelize, Sequelize);

export { sequelize, Sequelize, user };
