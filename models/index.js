import { Sequelize } from 'sequelize';
import configFile from '../config/config.js';
import User from './user.js';

const env = process.env.NODE_ENV || 'development';
const db = {};
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
