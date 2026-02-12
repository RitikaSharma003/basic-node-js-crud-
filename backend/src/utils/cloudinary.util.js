import cloudinary from "../config/cloudinary.config.js";
export const uploadImage=async(dataURL)=>{
    if(!dataURL) return null;
    let result=await cloudinary.uploader.upload(dataURL,{
        folder:"ChatApp",
        resource_type:"image",

    });
    return result;

};

export const deleteImage=async(id)=>
{
    console.log("delete");
    let result=await cloudinary.uploader.destroy(id);
    console.log("result:",result);
    return result;  

}