import express, {RequestHandler} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler } from '@ticketmenew/common';
import { NotFoundError } from '@ticketmenew/common';
import { currentUser } from '@ticketmenew/common';
import { indexRouter } from './routes';
import { createRouter } from './routes/new';
import { showRouter } from './routes/show';
import {deleteRouter} from './routes/delete';
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

app.use(indexRouter);
app.use(showRouter);
app.use(createRouter);
app.use(deleteRouter);
app.get("*", async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler);
export {app};