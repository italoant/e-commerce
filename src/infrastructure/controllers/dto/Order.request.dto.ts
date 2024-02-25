import { ApiProperty } from '@nestjs/swagger';
import Entity from '../../../common/entity/entity';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class OrderRequest extends Entity {
  @IsString()
  @ApiProperty({
    name: 'external_client_id',
    required: true,
    example: 'client-id',
  })
  external_client_id: string;

  @IsString()
  @ApiProperty({
    name: 'order_status',
    required: true,
    example: 'Despachado',
  })
  order_status: string;

  @IsString()
  @ApiProperty({
    name: 'payment_status',
    required: true,
    example: 'aguardando pagamento',
  })
  payment_status: string;

  @IsNumber()
  @ApiProperty({
    name: 'purchaseTotal',
    required: true,
    example: 10.1,
  })
  total_order: Prisma.Decimal;
}
