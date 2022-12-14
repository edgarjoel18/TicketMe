import request from 'supertest';
import {app} from '../../app';

it("fails when a email that does not exist is supplied", async () =>{
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "testMail@test.com",
            password: "testPassword"
        })
        .expect(400);
});

it("fails when an incorrect password is supplied", async () =>{
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testMail@test.com",
            password: "testPassword"
        })
        .expect(201);

    await request(app)
        .post("/api/users/signin")
        .send({
            email: "testMail@test.com",
            password: "te"
        })
        .expect(400);
});

it("responds with a cookie when given valid credentials", async () =>{
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "testMail@test.com",
            password: "testPassword"
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "testMail@test.com",
            password: "testPassword"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});






