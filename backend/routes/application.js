import express from 'express';
import { employgetAllapplicant, getuserappliedapplication, jobseekerDeleteApplication, postApplication } from '../controllers/applicant.js';
import authuser from '../middlewares/auth.js';
const router =express.Router(); 
router.post("/postapplication",authuser,postApplication)
router.get("/responeForapplication",authuser,employgetAllapplicant)
router.get("/appliedFor",authuser,getuserappliedapplication); 
router.delete("/delete/:id",authuser,jobseekerDeleteApplication)
export default router; 