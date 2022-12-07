import express  from "express";
import { register, signIn} from "../controllers/userController.js";


const router = express.Router();

router.route('/sign-up').post(register);
router.route('/sign-in').post(signIn);





export default router;