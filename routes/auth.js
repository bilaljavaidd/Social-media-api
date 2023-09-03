import express from 'express';

import { registerUser, loginUser } from '../controllers/authcontrollers.js'

const authRouter = express.Router()


//   REGISTER USERS

authRouter.post("/register", registerUser)

//   LOGIN

authRouter.post("/login", loginUser)


export { authRouter }