import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {validateRequest} from '@ticketmenew/common';
import {body} from 'express-validator';
import { BadRequestError } from '@ticketmenew/common';
import {User} from '../models/user';
const router = express.Router();

router.post("/api/users/signup", [
  body("email")
    .isEmail()
    .withMessage("Email must be provided"),
  body("password")
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage("Password must be between 4 and 20 Characters")
],
validateRequest, 
async (req: Request, res: Response) => {
    const {email, password} = req.body;
    console.log('csdvsdv')
    const existingUser = await User.findOne({email: email});
    if(existingUser){
      throw new BadRequestError("Email in use");
    }
    const newUser = User.build({email: email, password: password});
    await newUser.save();
    const userJwt = jwt.sign({
      id: newUser.id,
      email: newUser.email
    }, process.env.JWT_KEY!);

    req.session = {
      jwt: userJwt
    };

    res.status(201).send(newUser);
});

export {router as signupRouter};