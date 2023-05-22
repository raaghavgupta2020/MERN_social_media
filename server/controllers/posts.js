import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();//now we have created a new post and saved in the database

    const post = await Post.find(); //now we have to grab all the posts in the database and return to the frontend 

    res.status(201).json(post);

  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
 


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }); //findOne is jot used here, here we 've to use find 
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; //id of the post
    const { userId } = req.body; //id of the person liking the post 
    const post = await Post.findById(id); //finding the exact post 

    const isLiked = post.likes.get(userId); //getting key of particular userID
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true); //adding this user in the MAP
    }

    const updatedPost = await Post.findByIdAndUpdate( //updating the info of that post 
      id,
      { likes: post.likes },
      { new: true }  //?
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};