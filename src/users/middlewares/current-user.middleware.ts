import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

    constructor(private userService: UsersService) {}

    use(req: Request, res: Response, next: NextFunction): void {
        const { userId } = req.session || {};

        if (userId) {
            const currentUser = this.userService.findOne(userId);
            // @ts-ignore
            req.currentUser = currentUser;
        }

        next();
    }

}