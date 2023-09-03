import User from '../models/user.js';
import bcryptjs from 'bcryptjs'


//  updateUser


const updateUser = async (req, res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin) {
     
     
        if(req.body.password){


        try {
            const salt = await bcryptjs.genSalt(10)
            req.body.password = await bcryptjs.hash(req.body.password, salt)
        } catch (error) {
            return res.status(500).json(error)
        }
     }



     try{
        const user = await User.findByIdAndUpdate(req.params.id,{$set: req.body,});
        res.status(200).json("account has been updated") 
     }catch{

        return res.status(500).json(error)
     }

    }else{

        return res.status(403).json("you can only update your id")
    }


}



// Delete user


const deleteUser = async (req, res)=>{

    if(req.body.userId === req.params.id || req.body.isAdmin) {
     
     try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("account has been deleted Successfully") 
     }catch{

        return res.status(500).json(error)
     }

    }else{

        return res.status(403).json("you can only delete your account")
    }


}


//   getUser



const getUser = async (req , res) =>{

    try {
        const user = await User.findById(req.params.id)
        const {password,updatedAt, ...other} = user._doc
       res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }
}


//      followUser




const followUser = async (req , res)=>{

    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);

            const currentUser = await User.findById(req.body.userId);
            
            if(!user.followers.includes(req.body.userId)){

            await user.updateOne({ $push: { followers: req.body.userId}});
            await currentUser.updateOne({ $push: { followings: req.params.id}
            })

            res.status(200).json("user has been followed");
            }

            else{
                res.status(403).json("you already follow this user");
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}


// unfollow user


const unFollowUser = async (req , res)=>{

    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);

            const currentUser = await User.findById(req.body.userId);
            
            if(user.followers.includes(req.body.userId)){

            await user.updateOne({ $pull: { followers: req.body.userId}});
            await currentUser.updateOne({ $pull: { followings: req.params.id}
            })

            res.status(200).json("user has been unfollowed");
            }

            else{
                res.status(403).json("you dont follow this user");
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("you cant follow yourself")
    }
}


export { updateUser, deleteUser, getUser,followUser,unFollowUser }