import {Listener} from '@ticketmenew/common';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from "@ticketmenew/common"
import { Subjects } from '@ticketmenew/common';
export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payments-service";

    onMessage(data: TicketCreatedEvent['data'], msg: Message){
        // we run any logic here, update db, etc
        console.log("Event data: ", data);
        // for now acknowledging the message
        msg.ack();
    }
}

