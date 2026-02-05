import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";
import UserModel from "../models/user.models.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";

if(!JWT_SECRET_KEY) throw new Error("Define JWT_SECRET_KEY in .env");
export const authenticate=asyncHandler(async(req,res,next)=>{
   let token=req?.cookies?.token;
   console.log("token:",token);
if(!token) return next(new ErrorResponse("Please login first",401));
let decoded=jwt.verify(token,JWT_SECRET_KEY);
console.log("decoded",decoded);

if(!decoded) return next (new ErrorResponse("Invalid Session ",401));


let user=await UserModel.findById(decoded.userId);
if(!user)
return next (new ErrorResponse("Invalid session , Please login again",401));
req.user=user;
next();



})