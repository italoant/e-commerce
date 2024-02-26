import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderItemRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'external_order_id',
    required: true,
    example: 'external_order_id',
  })
  external_order: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'external_product_id',
    required: true,
    example: 'external_product_id',
  })
  external_product: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'quantity',
    required: true,
    example: 'quantity',
  })
  quantity: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'unitary_price',
    required: true,
    example: 'unitary_price',
  })
  unitary_price: Prisma.Decimal;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'subtotal',
    required: true,
    example: 'subtotal',
  })
  subtotal: Prisma.Decimal;
}
