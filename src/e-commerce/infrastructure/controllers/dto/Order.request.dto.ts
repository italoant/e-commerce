import { ApiProperty } from '@nestjs/swagger';

export class OrderRequest {
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  readonly id?: string;

  @ApiProperty({
    name: 'external_client_id',
    required: true,
    example: 'client-id',
  })
  readonly external_client_id: string;

  @ApiProperty({
    name: 'order_status',
    required: true,
    example: 'Despachado',
  })
  readonly order_status: string;

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
  readonly total_order: number;
}
