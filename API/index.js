import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mysql from 'mysql2';
import Sequelize  from "sequelize";
import * as tedious from 'tedious';
import sequelize from "./config/database.js";
import userRoute from './routes/userRoutes.js';
import User from "./model/User.js";
const app = express();
const PORT = 8000;
// const db = mysql.createConnection({
//     host:'localhost',
//     user: 'root',
//     password:'N081147',
//     database:'test'
// });
// db.connect((err)=>{
//     if(err) throw new Error(err);
//     console.log('databse connection established')
// })

// const sequelize  = new Sequelize('sql6582388','sql6582388','Cra9Jxq9zI',{
//     host:`sql6.freesqldatabase.com`,
//     dialect:'mysql',
//     port:3306
// })
sequelize
    .authenticate()
    .then(()=>{
        console.log('connected to database');
    }).catch((err)=>{ console.log(err)});

sequelize.sync();
app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/users',userRoute);

// app.get('/',(req,res)=>{
//     const sqlInsert = "INSERT INTO `test`.`users` (`Name`, `PhoneNumber`, `EmailAddress`) VALUES ('Venki', '99999999', 'venki@gmail.com');";
//     console.log(sqlInsert);
//     db.query(sqlInsert,(err,newData)=>{
//         if(err){
//             throw new Error(err);
//         }
//         console.log('new user added',newData);
//     })
//     res.send('Hello Express');
// })
app.listen(PORT,(err)=>{
   
    console.log(`Server is running at ${PORT}`);
})