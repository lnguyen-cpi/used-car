import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { Users } from "./users.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}

    async signUp(email: string, password: string): Promise<Users>  {
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException(`Email ${email} is in use`);
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString('hex');

        return await this.userService.create(email, result);
    }

    async signIn(email: string, password: string): Promise<Users> {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException(`Not Found user with email ${email}`);
        }

        const [salt, storedPasswordHash] = user.password.split('.');
        const inputPasswordHash = (await scrypt(password, salt, 32)) as Buffer;
        if (inputPasswordHash.toString('hex') !== storedPasswordHash) {
            throw new BadRequestException('Wrong password');
        }

        return user
    }
}