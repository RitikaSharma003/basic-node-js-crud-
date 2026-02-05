
import app from "./app.js";
import { connectDB } from "./src/config/db.config.js";
import { PORT } from "./src/config/index.js";

connectDB().then(()=>{
app.listen(PORT,(err)=>{
if(err)
  console.log(err);
  console.log("Server started on port",PORT);


})
})
.catch((err)=>{
console.log("error while connecting to database",err);
process.exit(1);


})


