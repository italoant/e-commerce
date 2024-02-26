import { ApiProperty } from '@nestjs/swagger';
import Entity from '../../../common/entity/entity';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderRequest extends Entity {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'external_client_id',
    required: true,
    example: 'client-id',
  })
  external_client_id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'order_status',
    required: true,
    example: 'Despachado',
  })
  order_status: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'payment_status',
    required: true,
    example: 'aguardando pagamento',
  })
  payment_status: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'purchaseTotal',
    required: true,
    example: 10.1,
  })
  total_order: Prisma.Decimal;
}
