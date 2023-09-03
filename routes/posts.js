import express from 'express';
import { createPost, updatePost, deletePost ,likePost ,getPost, timelinePost} from '../controllers/postControllers.js';

const postsRouter = express.Router()



// Create a post

postsRouter.post("/", createPost)

// update a post

postsRouter.put("/:id", updatePost)

// delete a post

postsRouter.delete("/:id", deletePost)

// like a post

postsRouter.put("/:id/like", likePost)

// get a post

postsRouter.get("/:id", getPost)

// get timeline posts

postsRouter.get("/timeline/all", timelinePost)

export { postsRouter }