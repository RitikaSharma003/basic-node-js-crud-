import  mongoose from "mongoose"; 
import { MONGODB_LOCAL_URL } from "./index.js";
if (!MONGODB_LOCAL_URL) throw new Error("Define MONGODB_LOCAL_URL in .env");
export const connectDB=async()=>{
    let client=await mongoose.connect(MONGODB_LOCAL_URL);
    
    console.log("connected to database ",client.connection.host);

}