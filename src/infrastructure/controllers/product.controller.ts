import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { DeleteProduct } from 'src/use-cases/cases/Product/delete/delete-product.case';
import { GetProduct } from 'src/use-cases/cases/Product/get/get-product.case';
import { ListProduct } from 'src/use-cases/cases/Product/list/list-product.case';
import { RegisterProduct } from 'src/use-cases/cases/Product/register/register-product.case';
import { UpdateProduct } from 'src/use-cases/cases/Product/update/update-product.case';
import { Product } from 'src/domain/entities/product.entity';

import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { ProductRequest } from './dto/create-product.request.dto';
import { User } from '../../domain/entities/user.entity';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly registerProduct: RegisterProduct,
    private readonly getProduct: GetProduct,
    private readonly listProducts: ListProduct,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Post('/')
  async createProduct(
    @CurrentUser() user: User,
    @Body() data: ProductRequest,
  ): Promise<Product> {
    return await this.registerProduct.exec(user, data);
  }

  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Get('')
  async findAll(@Body() data?: ProductRequest): Promise<Product[]> {
    return await this.listProducts.exec(data);
  }

  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Get('/find/')
  async findOne(@Body() data: ProductRequest): Promise<Product> {
    return await this.getProduct.exec(data);
  }

  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Patch('/')
  async update(
    @CurrentUser() user: User,
    @Body() data: ProductRequest,
  ): Promise<Product> {
    return await this.updateProduct.exec(user, data);
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @Delete('/:id')
  async delete(
    @CurrentUser() user: User,
    @Param('id') id: string ,
  ): Promise<void> {
    return await this.deleteProduct.exec(user, id);
  }
}
