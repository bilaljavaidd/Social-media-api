import Post from '../models/post.js';
import User from '../models/user.js';

// import bcryptjs from 'bcryptjs'

// Create Post

const createPost = async (req,res) =>{
    const newPost =  new Post (req.body)

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
}



// Update Post

const updatePost = async (req,res) =>{

    const post = await Post.findByIdAndUpdate(req.params.id)
    try {
        if (req.body.userId === post.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("your post has been updated")
        }
        else {
            res.status(403).json("you can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)

    }
}


// Delete post



const deletePost = async (req,res) =>{

    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("your post has been delete")
        }else{
            res.status(503).json("you can only delete your post")
        }    
    } catch (error) {
        res.status(500).json(error) 
    }
    
}


/// like and dislike post



const likePost = async (req, res)=>{
try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({ $push: {likes: req.body.userId}});
        res.status(200).json("post has been liked")
    }else{
        await post.updateOne({ $pull: {likes: req.body.userId}});
        res.status(200).json("post has been Disliked")
    }
} catch (error) {
    console.log(error) 
}
}

// get a post 

const getPost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error) 
    }

}



// timeline post 

const timelinePost = async (req ,res)=>{
    try {
        const currentUser = await User.findById(req.body.userId);

        const userPosts = await  Post.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(

            currentUser.followings.map((friendId)=>{
                return Post.find({ userId : friendId})
            })
        )
          res.json(userPosts.concat(...friendPosts))

    } catch (error) {
        console.log(error);
    }
}





export {createPost,updatePost,deletePost,likePost ,getPost,timelinePost}