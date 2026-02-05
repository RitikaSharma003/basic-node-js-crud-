import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new  mongoose.Schema({
    email:{
        type:String ,
        unique:true,
 lowercase:true,
 trim:true,
 required:true,

    },
    password:{
        type:String, 
        requird:true,
trim:true,

    },
    firstName:{
        type:String ,
        trim:true,

    },
    lastName:{
        type:String,
        trim:true,

    },
    profileImage:{
        type:String,
        trim:true,

    },
    color:{
        type:Number,

    },
    profileSetup:{
        type:Boolean,
        default:false,

    }

},{
    timestamps:true
});


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel=mongoose.model("User",userSchema);
export default UserModel;
