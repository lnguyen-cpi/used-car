import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {

        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({id: 1, email, password} as Users)
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile()
    
        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('test password is hashed', async () => {
        const user = await service.signUp('123@gmail.com', "ABC");
        const [salt, hashPassword] = user.password.split('.');

        expect(hashPassword).not.toEqual('ABC');
        expect(salt).toBeDefined;
        expect(hashPassword).toBeDefined;
    });

    it('test signup with in use email throwing exception', async () => {
        
        fakeUserService.find = () => Promise.resolve([{id: 1, email: "abc@gmai.com", password: "ABC"} as Users]);

        await expect(
            service.signUp("abc@gmai.com", "123")
        ).rejects.toThrow(BadRequestException);
    });

    it('test throwing exception when signing in with not found email', async () => {

        await expect(
            service.signIn("abc@gmai.com", "123")
        ).rejects.toThrow(NotFoundException);
    });
})