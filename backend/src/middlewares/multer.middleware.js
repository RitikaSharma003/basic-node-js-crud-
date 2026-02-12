import multer from "multer";
import ErrorResponse from "../utils/ErrorResponse.util.js";
const myStorage=multer.memoryStorage();
const myFileFilter=(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/jpg","image/png","image/gif"];
    if(allowedTypes.includes(file.mimetype))
    {
        cb(null,true);

    }
    else{
        cb(
            new ErrorResponse(
                "only image file with extension .jpg,.jpeg.png.,.gif are allowed ",
                400,
            ),false,
        );

    }
};
const upload=multer({
    storage:myStorage,
    fileFilter:myFileFilter,
    limit:{
        fileSize:1*1024*1024,
    }
});

export default upload;
