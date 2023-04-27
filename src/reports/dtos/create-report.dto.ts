import { IsEmail, IsNumber, IsString, Min, Max, IsLatitude, IsLongitude } from "class-validator";

export class CreateReportDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(130)
    @Max(2050)
    @IsNumber()
    year: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number
}