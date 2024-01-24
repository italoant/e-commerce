import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  id: string;

  @ApiProperty({
    name: 'product_name',
    required: true,
    example: 'produto',
  })
  product_name: string;

  @ApiProperty({
    name: 'description',
    required: true,
    example: 'descricao',
  })
  description: string;

  @ApiProperty({
    name: 'price',
    required: true,
    example: 12.1,
  })
  price: number;

  @ApiProperty({
    name: 'stock_quantity',
    required: true,
    example: 1,
  })
  stock_quantity: number;
}
