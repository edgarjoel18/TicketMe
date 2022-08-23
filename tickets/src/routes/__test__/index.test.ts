import request from 'supertest';
import {app} from '../../app';

it("can fetch a list of tickets", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "dsdffs",
            price: 10
        }).expect(201);
    
    const allTickets = await request(app).get("/api/tickets").send().expect(200);
    expect(allTickets.body.length).toEqual(1);
})















