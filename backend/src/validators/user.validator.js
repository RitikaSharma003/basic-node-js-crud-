import Joi from "joi";
export const registerUserSchema=Joi.object({
    
    email:Joi.string().email().required(),
    password:Joi.string().required().min(4).max(90),
    firstName:Joi.string().min(3).max(50).optional(),
    lastName:Joi.string().min(3).max(50).optional(),
    color:Joi.number().min(1).max(90).optional(),
      profileSetup: Joi.boolean().optional(),
});


export const loginUserSchema=Joi.object({
     email:Joi.string().email().required(),
    password:Joi.string().required().min(4).max(90),
});


export const updatedUserSchema=Joi.object({
     email:Joi.string().email().required(),
    password:Joi.string().required().min(4).max(90),
    firstName:Joi.string().min(3).max(50).optional(),
    lastName:Joi.string().min(3).max(50).optional(),
    color:Joi.number().min(1).max(90).optional(),
      profileSetup: Joi.boolean().optional(),
})