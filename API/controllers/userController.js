import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import cron from 'node-cron';
import { Op } from 'sequelize';
dotenv.config({path:'./.env'});

const resetUserFields = async () => {
    try {
      const users = await User.findAll({
        where: { 
          [Op.and]:[ {allowedLogin: 0}, {status: false }],
        },
      });
      const userData = await User.findAll({ where:{ status:true, allowedLogin:{[Op.in]:[1,2,3,4]}}})
      let l1=0;
      for (const user of users) {
        if(user.expiresIn < Date.now()) {
            await User.update(
                { allowedLogin: 5, status: true ,expiresIn: Date.now()},
                { where: { id: user.id } }
              );
              l1++;
              console.log(`Reset allowedLogin ,status and expiresIn fields for ${user.email}`);
        } 
      }
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();
      const currentSeconds = currentDate.getSeconds();
      let l2=0;
      for(const u of userData){
        if(u.expiresIn< Date.now() && currentHours == 0 && currentMinutes == 0 && currentSeconds == 0){
          await User.update(
            { allowedLogin: 5},
            { where: { id: u.id } }
          );
          l2++;
        }
        console.log(`Reset allowedLogin fields for ${l2} users`);
      }
      console.log(`Reset performed for ${l1+l2} users`);
    } catch (err) {
      console.error(`Failed to reset user fields: ${err}`);
    }
  };
cron.schedule("*/1 * * * * *", resetUserFields);


export const register =  async (req,res) =>{
    try{
        // const {name,email,password} = req.body;
        const user = await User.findOne({ where: { email: req.body.email } });
        
        if(!user){
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
		      const hashPassword = await bcrypt.hash(req.body.password, salt);
          const ID=uuidv4();
        const saveData = User.build({id:ID,email:req.body.email,name:req.body.name,password:hashPassword});
        await saveData.save();
        // const data = JSON.stringify(saveData);
        res.status(201).json({
            success:true,
            statusCode:201,
            message:"New User Created successfully",
            email:saveData.email,
        });
        }else{
            res.status(403).json({
                success:false,
                statusCode:403,
                message:"User already exists"
            })
        }
        

    }catch(err){
        res.json({success:false,message:"something went wrong"})
    }
}


  export const signIn = async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        console.log("User does not exist");
        res.status(400).json({ success: false, message: "User doesn't exist",statusCode:400 });
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          console.log("Password is incorrect");
          if (user.allowedLogin > 0 && user.status === true) {
            await User.update(
              { allowedLogin: user.allowedLogin - 1 },
              { where: { email: req.body.email } }
            );
            if (user.allowedLogin - 1 === 0) {
              await User.update(
                { status: false, expiresIn: Date.now() + 24 * 60 * 60 * 1000 },
                { where: { email: req.body.email } }
              );
            }
          }
          res.json({
            success: false,
            message: "Incorrect password",
            allowedLogin: user.allowedLogin-1,
            status: user.status,
          });
        } else if (user.status === true && user.expiresIn < Date.now()) {
          const accessToken = jwt.sign(
            { id: user.id, status: user.status, allowedLogin: user.allowedLogin },
            process.env.JWT_SECRET,{expiresIn:process.env.
            JWT_EXPIRE}
          );
          res.json({ success: true, message: "Successfully logged in", accessToken,email:user.email });
        } else {
          res.json({
            success: false,
            message: "User has been blocked for a day",
            allowedLogin: user.allowedLogin,
            status: user.status,
            expiresIn:user.expiresIn
      })
      }
    }
  }catch(err) {
        res.json({ success: false, message: "Something went wrong", error: err });
      }
  }






