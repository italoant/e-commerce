import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class OrderItemDto {
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  readonly id?: string;

  @ApiProperty({
    name: 'external_order_id',
    required: true,
    example: 'external_order_id',
  })
  readonly external_order: string;

  @ApiProperty({
    name: 'external_product_id',
    required: true,
    example: 'external_product_id',
  })
  readonly external_product: string;

  @ApiProperty({
    name: 'quantity',
    required: true,
    example: 'quantity',
  })
  readonly quantity: number;

  @ApiProperty({
    name: 'unitary_price',
    required: true,
    example: 'unitary_price',
  })
  readonly unitary_price: Prisma.Decimal;

  @ApiProperty({
    name: 'subtotal',
    required: true,
    example: 'subtotal',
  })
  subtotal: Prisma.Decimal;
}
