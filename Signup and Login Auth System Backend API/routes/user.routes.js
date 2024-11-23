import { Router } from "express";

const router = Router();

import { signup, login, verfiyUser } from "../controllers/user.controller.js";

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/verify').get(verfiyUser);

export default router;