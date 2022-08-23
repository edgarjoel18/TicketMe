import {Subjects, Publisher, PaymentCreatedEvent} from '@ticketmenew/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
























