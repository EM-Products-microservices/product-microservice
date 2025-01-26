import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsDate, IsPositive, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    id: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deletedAt?: Date;
}
