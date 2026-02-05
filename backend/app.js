import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js"
 import cors from "cors";
 
 const app=express();
 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

 }));
 app.use(cookieParser());
 app.use(express.json());
app.use("/api/v1/auth",userRoutes);
//  app.use(error);
 export default app; 
