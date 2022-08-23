import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@ticketmenew/common';
import {natsWrapper} from '../nats-wrapper';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import {Order} from '../models/order';
import {Ticket} from '../models/ticket';
import {body} from 'express-validator';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders', requireAuth, [
    body("ticketId")
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("TicketId must be provided")
],
validateRequest,
async (req: Request, res: Response) => {
    const {ticketId} = req.body;
    const ticket = await Ticket.findById(ticketId);
    if(!ticket){
        throw new NotFoundError();
    }

    const isReserved = await ticket.isReversed();
    
    if(isReserved){
        throw new BadRequestError("Ticket is already reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const newOrder = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket
    });
    await newOrder.save();
    // publish event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: newOrder.id,
        version: newOrder.version,
        status: newOrder.status,
        userId: newOrder.userId,
        expiresAt: newOrder.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        },
    });

    res.status(201).send(newOrder);
});

export {router as createRouter};