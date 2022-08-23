import { Subjects, Publisher, OrderCreatedEvent } from '@ticketmenew/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}







