import User from '../models/user.js';
import bcryptjs from 'bcryptjs'


const registerUser = async (req, res) => {
 try {

    // Generating Password

const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(req.body.password,salt)


//  Create new User

    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

// Save User and Response

    const user = await newUser.save();
    res.status(200).json({
        "status": "Registered Successful",
        "user data": user
    })
 } catch (error) {
    res.status(500).json(error)
 }
  
}



// login


const loginUser = async (req, res)=>{
try {
    const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("user not found")

    const validPassword = await bcryptjs.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("Wrong Password")

    res.status(200).json({
        "status": "User Signup Successfully",
        "user": user
    })
    
} catch (error) {
    res.status(500).json(error)
}
}

export { registerUser , loginUser}