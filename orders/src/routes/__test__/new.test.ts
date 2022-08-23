import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';
import {Ticket} from '../../models/ticket';
import {Order} from '../../models/order';
import { OrderStatus } from '@ticketmenew/common';

it("returns an error if the ticket does not exist", async () => {
    const ticketId = new mongoose.Types.ObjectId();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({
            ticketId: ticketId
        })
        .expect(404)
});

it("returns an error ticket is already reserved", async () => {
    const ticket = Ticket.build({
        title: 'test',
        price: 10
    });
    await ticket.save();
    const order = Order.build({
        ticket: ticket,
        userId: "qwe3er23",
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({ticketId: ticket.id})
        .expect(400);
});

it("reserves a ticket", async () => {
    const ticket = Ticket.build({
        title: "test",
        price: 10
    });
    await ticket.save();

    await request(app)
        .post("/api/orders")
        .set("Cookie", global.signin())
        .send({
            ticketId: ticket.id
        })
        .expect(201);

});

it.todo("emits an order created event");

















