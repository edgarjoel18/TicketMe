import mongoose from 'mongoose';
import {app} from './app';
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is not defined");
    }
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined");
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB");
    }catch(err){
        console.log(err);
    }
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};

start();




