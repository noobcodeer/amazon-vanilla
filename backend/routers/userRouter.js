import express from 'express';
import User from '../models/userModel';

const userRouter = express.Router();

userRouter.get('/createadmin',async (req,res)=>{
    try{
        const user = new User({
            name:'admin',
            email:'admin@gmail.com',
            password:'123456',
            isAdmin:true,
        });
        const createdUser = await user.save();
        res.send(createdUser);
    }catch(err){
        res.status(500).send({message:err})
    }
})

export default userRouter;