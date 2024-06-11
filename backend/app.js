import express from 'express';
import dotenv from 'dotenv';  
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'; 
import cors from 'cors'; 

import user from "./routes/user.js";
import application from "./routes/application.js"; 
import jobrouter from "./routes/jobrouter.js"; 
import cloudinary from 'cloudinary';
import conn from "./database/conn.js";
import { errorMiddleware } from './middlewares/error.js';

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(
    cors({
        origin: [process.env.FRONTEND_URL], // Ensure this environment variable is set to http://localhost:5173
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);
app.options('*', cors());

app.use("/api/user", user); 
app.use("/api/application", application);
app.use("/api/job", jobrouter);

app.get("/h", (req, res) => {
    console.log("Endpoint /h hit");
    res.send("Response from /h endpoint");
});

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(errorMiddleware);

export default app;
