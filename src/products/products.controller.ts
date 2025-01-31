import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'shared-kit';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  @MessagePattern('create-product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({cmd: 'find-all-products'})
  findAll(@Payload() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  // @Get(':id')
  @MessagePattern('find-one-product')
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern('update-product')
  update(@Payload('id') updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern('remove-product')
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
