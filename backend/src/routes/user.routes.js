import {Router} from "express" ;
import { deleteUser, getAllUser, getUser, login, register, updateUser } from "../controllers/user.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { loginUserSchema,registerUserSchema, updatedUserSchema } from "../validators/user.validator.js";
const router=Router();

router.post("/register",validateBody(registerUserSchema),register);
router.post("/login",validateBody(loginUserSchema),login);
router.get("/getuser/:id",authenticate,getUser);
router.delete("/deleteuser/:id",deleteUser);
router.get("/alluser",getAllUser);

router.patch("/updateuser/:id",authenticate,validateBody(updatedUserSchema),updateUser);

export default router;
