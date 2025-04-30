import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'shared-kit';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(ProductsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const totalProducts = await this.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { deletedAt: null },
      }),
      meta: {
        page: page,
        totalPages,
        totalProducts,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: { id, deletedAt: null },
    });
    if (!product) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Product with ID ${id} not found`
      });
    }
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id, ...productData } = updateProductDto;
    if (id <= 0) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    if (Object.keys(productData).length === 0) {
      throw new BadRequestException('No properties provided for update');
    }

    try {
      return await this.product.update({
        where: { id, deletedAt: null },
        data: productData,
      });
    } catch (error) {
      throw new NotFoundException(`Request failed, product with ID ${id} not found`);
    }
  }

  remove(id: number) {
    return this.update({ id, deletedAt: new Date() });
  }
}
