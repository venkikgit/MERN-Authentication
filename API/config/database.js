import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({path:'./.env'})

const database  = new Sequelize(process.env.DB_name, process.env.DB_username, process.env.DB_password,{
    host:`sql6.freesqldatabase.com`,
    dialect:'mysql',
    port:3306
});

// database.sync();

export default database;