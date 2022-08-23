import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util';

// scrypt by default is callback based. Here we use promises
const scryptAsync = promisify(scrypt); 


export class Password {
    static async toHash(password: string){
        const salt = randomBytes(8).toString("hex");
        const buffer = (await scryptAsync(password, salt, 64) as Buffer);
        return `${buffer.toString("hex")}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split(".");
        const buff = (await scryptAsync(suppliedPassword, salt, 64) as Buffer);
        return buff.toString("hex") === hashedPassword;
    }

}









