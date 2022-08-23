import express, {RequestHandler} from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { errorHandler } from '@ticketmenew/common';
import { NotFoundError } from '@ticketmenew/common';
import { currentUser } from '@ticketmenew/common';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from './routes/update';
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

app.use(indexTicketRouter);
app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);
app.get("*", async (req, res) => {
    throw new NotFoundError()
})
app.use(errorHandler);
export {app};