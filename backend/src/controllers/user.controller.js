import asyncHandler from "express-async-handler";
import UserModel from "../models/user.models.js";
import { generateToken } from "../utils/jwt.utils.js";
import ErrorResponse from "../utils/ErrorResponse.util.js";
import { uploadImage } from "../utils/cloudinary.util.js";
import {v2 as cloudinary} from "cloudinary";

const getDataURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  return `data:${mimetype};base64,${b64}`;
};


export const register=asyncHandler(async(req,res,next)=>{
const {email,password,firstName,lastName,color,profileSetup}=req.body;
let imageDetails={url:"",public_id:""};
if(req.file)
{
    const dataURL=getDataURL(req.file.buffer,req.file.mimetype);
    const uploadedImage=await uploadImage(dataURL);


if(uploadedImage)
{
    imageDetails={
url:uploadedImage.secure_url,
public_id:uploadedImage.public_id
    };

}}
const newUser=await UserModel.create({email,password,firstName,lastName,color,profileSetup,profileImage:imageDetails});


res.status(201).json({
    success:true,
    message:"user created successfully",
    payload:newUser
})
});



export const login=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body;
    const user=await UserModel.findOne({email});
if(!user) return next(new ErrorResponse("Invalid Credentials ",404));
let isMatched=await user.comparePassword(password);
if(!isMatched) return next(new ErrorResponse("Invalid Credentials",400));


let token=generateToken(user._id);
console.log("token",token );
res.cookie("token",token,{httpOnly:true,secure:true,
    sameSite:"none",
    path:"/",
    maxAge:24*60*60*1000,

}
    );


    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        payload:user,
        token:token
    })
    
});

export const logut=asyncHandler(async(req,res,next)=>{
res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:none,
    path:"/",
    maxAge:24*60*60*1000,


});
res.status(200).json({
    success:true,
    message:"user logged out successfully",
});

});



export const getUser=asyncHandler(async(req,res,next)=>{
    try{
 let userId=req.params.id;
    let user=await UserModel.findById(userId);

    res.status(200).json({
        message:"USer profile fetched successfully",
        payload:req.user
  
    });
      if(!user) return res.status(404).json({
        message:"user not found"
      });
    
   res.status(200).json({
success:true,
message:"user fetchd successfully",
payload:user,

   })}catch(error)
   {
    next(error);

   }

});



export const getAllUser=asyncHandler(async(req,res,next)=>{
    try {
    
    const users=await UserModel.find();
if (!users || users.length === 0) {
        return next(new ErrorResponse("Database mein koi user nahi mila", 404));
    }
    
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      payload: users,
      count: users.length,
    });

  } catch (error) {
    // Agar koi unexpected error aaye (jaise DB crash), toh ye use handle karega
    next(error); 
  }
});

export const deleteUser=asyncHandler(async(req,res,next)=>{
    const userId=req.params.id;

const user=await UserModel.findByIdAndDelete(userId);
    if(!user)
    {
        return next(new ErrorResponse("user not found ",404));

    }
    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:`user deleted successfully`
    })

});




export const updateUser=asyncHandler(async(req,res,next)=>{
const userId=req.params.id;
let updateData={...req.body};
if(req.file)
{
    const user=await UserModel.findById(userId);
    if(!user)
    {
        return next(new ErrorResponse("No user found",404));

    }

    if(user.profileImage && user.profileImage.public_id)
    {
        await cloudinary.uploader.destroy(user.profileImage.public_id);

    }
    const dataURL=getDataURL(req.file.buffer,req.file.mimetype);
    const uploadedImage=await uploadImage(dataURL);
    if(uploadedImage)
    {
        updateData.profileImage={
            url:uploadedImage.secure_url,
            public_id:uploadedImage.public_id
        }
    }
}

const updatedUser=await UserModel.findByIdAndUpdate(userId, updateData,{
    new:true,runValidators:true
})


if(!updatedUser)
{
    return next(new ErrorResponse("No user found",404));

}
res.status(200).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedUser,
    });
});




// export const  deleteImage=asyncHandler(async(req,res,next)=>{
    
// });


