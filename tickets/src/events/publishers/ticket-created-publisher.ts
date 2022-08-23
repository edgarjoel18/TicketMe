import {Publisher, Subjects, TicketCreatedEvent} from "@ticketmenew/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}











