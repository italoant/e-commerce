import { ApiProperty } from '@nestjs/swagger';

export class OrderRequestDto {
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'id',
  })
  readonly id?: string;

  @ApiProperty({
    name: 'clientId',
    required: true,
    example: 'client-id',
  })
  readonly external_client_id: string;

  @ApiProperty({
    name: 'purchaseStatus',
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
