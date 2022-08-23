import {Publisher, ExpirationCompleteEvent, Subjects} from '@ticketmenew/common';


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
};   
















