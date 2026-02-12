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
app.use(express.urlencoded({ extended: true }));
 
app.use("/api/v1/auth",userRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = typeof err.message === 'object' ? JSON.stringify(err.message) : err.message;

    res.status(statusCode).json({
        success: false,
        message: message || "Internal Server Error",
    });
});
//  app.use(error);
 export default app; 
