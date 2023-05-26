import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; 
import { fileURLToPath } from "url";

import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users ,posts } from "./data/index.js";


/* MIDDLEWARE CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //THIS HAS TO BE DONE WHEN WORKING WITH MODULES 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */ //multer documentation
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets"); //the local storage is public/assets
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });


//type 1 routes
/*Routes with files */ 
//here the middleware is uploading a picture to the public/assests folder
//this middleware occurs before the actual logic ,i.e the register function
app.post("/auth/register" , upload.single("picture") , register);
app.post("/posts" , verifyToken, upload.single("picture") , createPost) //only in the register route , verify token is not required , other than that it is required in all the routes

//type 2 routes
/* routes without files */
app.use("/auth" , authRoutes); //all the routes in this file will be seen as      /auth/<route>
app.use("/users" , userRoutes); 
app.use("/posts" , postRoutes); 



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));