import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';

it("returns a 404 if the provided id does not exist", async () => {
    // create a mongo id
    const mongoId = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${mongoId}`)
        .set('Cookie', global.signin())
        .send({
            title: "svdsfvs",
            price: 20
        })
        .expect(404);
});

// it("returns a 401 if the user is not authenticated", async () => {
//     const mongoId = new mongoose.Types.ObjectId().toHexString();

//     await request(app)
//         .put(`/api/tickets/${mongoId}`)
//         .send({
//             title: "dsvfsvd",
//             price:20
//         })
// });

it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send({
            title: "adssdff",
            price: 20
        });
    
     await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.signin())
        .send({
            title: "adssdff",
            price: 1000
        })   
        .expect(401);
}); 



















