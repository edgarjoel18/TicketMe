import express, {RequestHandler} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ticketmenew/common';
import { chargeRouter } from './routes/new';

const app = express();

app.use(express.json() as RequestHandler);
app.set("trust proxy", true); // telling express to trust coming data from ingress-nginx
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'   
    })
);

app.use(currentUser);
app.use(chargeRouter);
    
app.get("*", async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler);
export {app};