require('dotenv').config()
import {Dialect, Sequelize} from 'sequelize'

const isTest = process.env.NODE_ENV === 'test'

const dbName = isTest ? process.env.DB_DATABASE_TEST as string : process.env.DB_DATABASE as string
const dbPort = Number(process.env.DB_PORT)
const dbUser = process.env.DB_USERNAME as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: dbDriver,
    logging: false,
})

sequelizeConnection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.', dbName);
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });
export default sequelizeConnection
