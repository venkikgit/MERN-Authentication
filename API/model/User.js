import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
        // autoIncrement:true,
        allowNull:false,
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    status:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
    },
    allowedLogin:{
        type:Sequelize.INTEGER,
        defaultValue:5
    },
    expiresIn:{
        type:Sequelize.DATE,
        defaultValue: new Date()
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{ tableName: "User" })

console.log(User === sequelize.models.User); 
// User.sync();

export default User;