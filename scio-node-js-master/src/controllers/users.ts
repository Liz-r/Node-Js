import express, { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from "../config/config";
import User from "../interfaces/users"
import mongoose from "mongoose";
// import { use } from "../routs/users";

//-----------------------login-------------------------------
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: 'Login Failed'
    });
    return;
  }
  // TODO search username by username into db
  const user = await User.findOne({username}).exec();
  if (!user) return res.status(400).json({message: 'Invalid username or password'})

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400).json({
      message: 'Login Failed'
    });
    return;
  }

  const token = jwt.sign({ username }, config.secrets.token);

  return res.status(200).json({
    message: 'Login Success',
    token
  })
}
//-------------------------Register-------------------------
const register = async (req: Request, res: Response) => {

  const { username, password } = req.body;
  if (username === '' || password === '' || !username || !password) {
    res.status(400).json({
      message: 'Username or Password cannot be empty'
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, salt);
  // TODO validate username doesnt exist
  // TODO stre username and password into db

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password: passwordHash
  });
  const result = await user.save();

  return res.status(201).json({
    message: 'Register Sucess',
    data: {
      username,
      id: result.id 
    }
  });

  res.status(200).json({ message: 'Register success' });
};

// //----------------------------getAll--------------------------
// const getAll=(req: Request, res: Response)=>{
//   return res.status(200).json({
//     data:[]
//   });
// }
// //-------------------------------get------------------------
// const get = (req: Request, res: Response)=>{
//   const id= req.params.id;
//   return res.status(200).json({
//     data:{}
//   });
// };

// //------------------------------update-------------------------
// const update = (req: Request, res:Response)=>{
//   const id = req.params.id;
//   const {username, password} = req.body;
//   return res.status(200).json({
//     data: {}
//   });
// };

// //-----------------------------delete---------------------------
// const remove = (req: Request, res: Response)=>{
//   const id = req.params.id;
//   const {username, password} = req.body;
//   return res.status(200).json({
//     data: {}
//   });
//};

export default { login, register };
