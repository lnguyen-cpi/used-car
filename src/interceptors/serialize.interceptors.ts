import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToClass } from "class-transformer";

export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {

        return handler.handle().pipe(
            map(data => plainToClass(
                            this.dto, 
                            data, 
                            {excludeExtraneousValues: true}
                        )
                )
        )
    }
}