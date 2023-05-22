import express from "express";

import { getFeedPosts} from "../controllers/posts.js";
import { getUserPosts} from "../controllers/posts.js";
import { likePost } from "../controllers/posts.js";

import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //for getting all the posts in the database
router.get("/:userId/posts", verifyToken, getUserPosts); //getting posts for the particular user

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //liking and unliking //getting liked posts by a user  

export default router;