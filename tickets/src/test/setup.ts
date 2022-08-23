import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {app} from '../app';

let mongo: any;
// declare global {
//     namespace NodeJS {
//       interface Global {
//         signin(): Promise<string[]>;
//       }
//     }
//   }
declare global{
    var signin: () => string[];
}
beforeAll(async () => {
    process.env.JWT_KEY = "dsvsf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for(let connection of collections){
        await connection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signin = () => {
    // Build a JWT payload, {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: "test@test.com"
    };
    // create a jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    // Build session object. {jwt: MY_JWT}
    const session = {jwt: token};
    // turn the session into JSON
    const sessionJSON = JSON.stringify(session);
    // take json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString("base64");
    // return a string that is the cookie with the encoded data 
    return [`session=${base64}`];    
};


