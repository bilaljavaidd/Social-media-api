import express from 'express'
import helmet from 'helmet'
import mongoose from "mongoose"
import morgan from 'morgan'
import dotenv from 'dotenv'

// import routers

import { userRouter } from './routes/users.js'
import { authRouter } from './routes/auth.js'
import { postsRouter } from './routes/posts.js'





const app = express();
const PORT = 8800;
dotenv.config()



mongoose.connect(process.env.MONGO_URL)

    .then(() => {
        console.log('Connected to mongodb');
    })

    .catch((err) => {
        throw err;
    });



//middelware

app.use(express.json())
app.use(helmet())
app.use(morgan('common'));



app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', userRouter)


app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`);

})