import { IsNumber, IsString, Min, Max, IsLatitude, IsLongitude } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateReportDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(130)
    @Max(2050)
    @IsNumber()
    @Transform(
        ({ value }) => parseInt(value)
    )
    year: number;

    @Transform(
        ({ value }) => parseInt(value)
    )
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @Transform(
        ({ value }) => parseInt(value)
    )
    @IsLongitude()
    lng: number;

    @Transform(
        ({ value }) => parseInt(value)
    )
    @IsLatitude()
    lat: number;
}