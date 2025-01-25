import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, MaxLength, MinLength } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(2)
    public name: string;

    @IsNotEmpty()
    @Type(() => Number)
    @Transform(({ value }) => Math.round(value * 10000) / 10000)
    @IsNumber({ maxDecimalPlaces: 4 })
    @Min(0)
 
    public price: Number;
}
