import { Controller, Post, Body, Get, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteProduct } from 'src/e-commerce/cases/Product/deleteProduct/delete-product.case';
import { GetProduct } from 'src/e-commerce/cases/Product/getProduct/get-product.case';
import { ListProduct } from 'src/e-commerce/cases/Product/listProduct/list-product.case';
import { RegisterProduct } from 'src/e-commerce/cases/Product/registerProduct/register-product.case';
import { UpdateProduct } from 'src/e-commerce/cases/Product/updateProduct/update-product.case';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductRequest } from '../dto/create-product.request.dto';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../domain/entities/users/user.entity';

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
    type: ProductRequest,
    required: true,
  })
  @Post('/register')
  async createuser(
    @CurrentUser() user: User,
    @Body() data: ProductRequest,
  ): Promise<Product> {
    return await this.registerProduct.exec(user, data);
  }
  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Get('/products')
  async findAll(@Body() data?: ProductRequest): Promise<Product[]> {
    return await this.listProducts.exec(data);
  }

  @ApiBody({
    type: ProductRequest,
    required: true,
  })
  @Get('/product')
  async findOne(@Body() data: ProductRequest): Promise<Product> {
    return await this.getProduct.exec(data);
  }

  @Patch('/update')
  async update(
    @CurrentUser() user: User,
    @Body() data: ProductRequest,
  ): Promise<Product> {
    return await this.updateProduct.exec(user, data);
  }

  @Delete('/delete')
  async delete(
    @CurrentUser() user: User,
    @Body() data: ProductRequest,
  ): Promise<void> {
    return await this.deleteProduct.exec(user, data);
  }
}
