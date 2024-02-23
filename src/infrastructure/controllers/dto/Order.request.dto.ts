import { ApiProperty } from '@nestjs/swagger';
import Entity from '../../../common/entity/entity';
import { Prisma } from '@prisma/client';

export class OrderRequest extends Entity {
  @ApiProperty({
    name: 'external_client_id',
    required: true,
    example: 'client-id',
  })
  external_client_id: string;

  @ApiProperty({
    name: 'order_status',
    required: true,
    example: 'Despachado',
  })
  order_status: string;

  @ApiProperty({
    name: 'payment_status',
    required: true,
    example: 'aguardando pagamento',
  })
  payment_status: string;

  @ApiProperty({
    name: 'creation_date',
    required: true,
    example: '12/12',
  })
  creation_date: Date;

  @ApiProperty({
    name: 'purchaseTotal',
    required: true,
    example: 10.1,
  })
  total_order: Prisma.Decimal;
}
