import express from 'express';
import {updateUser, deleteUser, getUser, followUser, unFollowUser} from '../controllers/userControllers.js'


const userRouter = express.Router()


 // update user

userRouter.put("/:id", updateUser)

// delete 

userRouter.delete("/:id", deleteUser)

// get a user

userRouter.get("/:id", getUser)

// follow user

userRouter.put("/:id/follow", followUser)


// unfollow

userRouter.put("/:id/unfollow", unFollowUser)

// get all user

export { userRouter }