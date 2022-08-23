import { Subjects, Publisher, OrderCancelledEvent } from '@ticketmenew/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

















