import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  id: string;

  @ApiProperty({
    name: 'productName',
    required: true,
    example: 'produto',
  })
  productName: string;

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
    name: 'stockQuantity',
    required: true,
    example: 1,
  })
  stockQuantity: number;
}
