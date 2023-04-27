import { 
    Body, 
    Controller, 
    Post, 
    Get, 
    Param, 
    Query, 
    Delete, 
    Patch, 
    Session,
    UseInterceptors,
    UseGuards
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from './auth.service';
import { Users } from './users.entity';
import { CurrentUser } from '../decorators/current-user.decotators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDTO, @Session() session: any): Promise<Users> {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id;
        return user
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDTO, @Session() session: any): Promise<Users> {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() currentUser: Users): Users {
        return currentUser;
    }

    @Post('/signout')
    signOut(@Session() session: any): void {
        session.userId = null;
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
