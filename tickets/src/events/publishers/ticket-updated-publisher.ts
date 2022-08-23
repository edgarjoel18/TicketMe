import {Publisher, Subjects, TicketUpdatedEvent} from "@ticketmenew/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
