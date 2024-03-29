import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  id?: string;

  @IsString()
  @ApiProperty({
    name: 'product_name',
    required: true,
    example: 'produto',
  })
  product_name: string;

  @IsString()
  @ApiProperty({
    name: 'description',
    required: true,
    example: 'descricao',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    name: 'price',
    required: true,
    example: 12.1,
  })
  price: Prisma.Decimal;

  @IsNumber()
  @ApiProperty({
    name: 'stock_quantity',
    required: true,
    example: 1,
  })
  stock_quantity: number;
}
