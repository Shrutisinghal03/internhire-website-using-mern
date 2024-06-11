import express from 'express';
import {Register,login, logout,getuser} from "../controllers/userregister.js"
import authuser from '../middlewares/auth.js';
const router =express.Router(); 
router.post("/register",Register);
router.post("/login", login); 
router.get("/logout",authuser,logout)
router.get("/getuser",getuser); 
export default router; 