import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PaymentRequest {
  @IsString()
  @ApiProperty({
    name: 'productName',
    required: true,
    example: 'geladeira',
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    name: 'quantity',
    required: true,
    example: 12,
  })
  quantity: number;

  @IsString()
  @ApiProperty({
    name: 'paymentMethod',
    required: true,
    example: 'card',
  })
  paymentMethod: string;
}
