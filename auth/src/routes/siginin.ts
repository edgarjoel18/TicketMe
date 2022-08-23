import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {validateRequest} from '@ticketmenew/common';
import { BadRequestError } from '@ticketmenew/common';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';
import {Password} from '../services/password';

const router = express.Router();

router.post("/api/users/signin",
[
    body("email")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
], 
validateRequest,
async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const exisitingUser = await User.findOne({email: email});
    if(!exisitingUser){ 
        throw new BadRequestError("Invalid credentials");
    }
    const passwordsMatch = await Password.compare(exisitingUser.password, password);
    if(!passwordsMatch){
        throw new BadRequestError("Invalid credentials");
    }

    const userJWT = jwt.sign({
        id: exisitingUser.id,
        email: exisitingUser.email
    }, process.env.JWT_KEY!);
    req.session = {
        jwt: userJWT
    };
    res.status(201).send(exisitingUser);
});

export {router as signinRouter};