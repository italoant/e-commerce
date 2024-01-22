import { Controller, Post, Body, Get, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteProduct } from 'src/e-commerce/cases/Product/deleteProduct/delete-product.case';
import { GetProduct } from 'src/e-commerce/cases/Product/getProduct/get-product.case';
import { ListProduct } from 'src/e-commerce/cases/Product/listProduct/list-product.case';
import { RegisterProduct } from 'src/e-commerce/cases/Product/registerProduct/register-product.case';
import { UpdateProduct } from 'src/e-commerce/cases/Product/updateProduct/update-product.case';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductDto } from '../dto/create-product.request.dto';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private readonly registerProduct: RegisterProduct,
    private readonly getProduct: GetProduct,
    private readonly listProducts: ListProduct,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  @ApiBody({
    type: ProductDto,
    required: true,
  })
  @Post('/register')
  async createuser(@Body() data: ProductDto): Promise<Product> {
    return await this.registerProduct.exec(data);
  }

  @Get('/products')
  async findAll(): Promise<Product[]> {
    return await this.listProducts.exec();
  }

  @ApiBody({
    type: ProductDto,
    required: true,
  })
  @Get('/product')
  async findOne(@Body() data): Promise<Product> {
    return await this.getProduct.exec(data);
  }

  @Patch('/update')
  async update(@Body() data: ProductDto): Promise<Product> {
    return await this.updateProduct.exec(data);
  }

  @Delete('/delete')
  async delete(@Body() data: ProductDto): Promise<void> {
    return await this.deleteProduct.exec(data);
  }
}
