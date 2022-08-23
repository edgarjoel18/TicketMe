import express, {RequestHandler} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/siginin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from '@ticketmenew/common';
import { NotFoundError } from '@ticketmenew/common';
const app = express();

app.use(express.json() as RequestHandler);
app.set("trust proxy", true); // telling express to trust coming data from ingress-nginx
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'   
    })
);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("*", async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler);
export {app};