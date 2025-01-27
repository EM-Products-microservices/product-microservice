import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TESTPaginationDto {

    constructor() {
        this.page = 1;
        this.limit = 10;
    }

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(1)
    page: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(10)
    limit: number;
}