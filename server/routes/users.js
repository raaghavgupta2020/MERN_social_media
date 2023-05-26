// import express from "express"
// import { verifyToken } from "../middleware/auth.js"

// import {getUser} from "../controllers/users.js"
// import {getUserFriends} from "../controllers/users.js"
// import {addRemoveFriend} from "../controllers/users.js"


// const router = express.Router();

// //READ routes (no changes in the database , we're just reading stuff)
// //getUser here is the controller 
// //verifyToken is the middleware we've created 
// router.get("/:id" , verifyToken , getUser) //first route is for getting the user 
// router.get("/:id/friends" , verifyToken , getUserFriends) //similarly,//2nd route is for getting the friends of the user 
// //this one is for the user'sfriend's list 


// //UPDATE route
// router.patch("/:id/:friendID" , verifyToken , addRemoveFriend) //3rd route is for adding or removing the friends of a user

// export default router;

import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;



