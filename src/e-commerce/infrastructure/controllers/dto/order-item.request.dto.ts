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
    name: 'unitaryPrice',
    required: true,
    example: 'unitaryPrice',
  })
  readonly unitaryPrice: Prisma.Decimal;

  @ApiProperty({
    name: 'subTotal',
    required: true,
    example: 'subTotal',
  })
  subTotal: Prisma.Decimal;
}
