import dotenv from"dotenv";
dotenv.config({quiet:true});

export const PORT=process.env.PORT || 8100;
export const MONGODB_LOCAL_URL =process.env.MONGODB_LOCAL_URL||"mongodb://localhost:27017/CHATAPP"
export const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
