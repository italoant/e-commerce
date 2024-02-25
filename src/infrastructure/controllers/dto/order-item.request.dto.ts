import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class OrderItemRequest {
  @IsString()
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  id?: string;

  @IsString()
  @ApiProperty({
    name: 'external_order_id',
    required: true,
    example: 'external_order_id',
  })
  external_order: string;

  @IsString()
  @ApiProperty({
    name: 'external_product_id',
    required: true,
    example: 'external_product_id',
  })
  external_product: string;

  @IsNumber()
  @ApiProperty({
    name: 'quantity',
    required: true,
    example: 'quantity',
  })
  quantity: number;

  @IsNumber()
  @ApiProperty({
    name: 'unitary_price',
    required: true,
    example: 'unitary_price',
  })
  unitary_price: Prisma.Decimal;

  @IsNumber()
  @ApiProperty({
    name: 'subtotal',
    required: true,
    example: 'subtotal',
  })
  subtotal: Prisma.Decimal;
}
