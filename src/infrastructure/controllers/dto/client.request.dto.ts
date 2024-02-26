import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ClientRequest {
  @IsString()
  @ApiProperty({
    name: 'id',
    required: false,
    example: 'usuario',
  })
  id?: string;

  @IsString()
  @ApiProperty({
    name: 'full_name',
    required: false,
    example: 'usuario',
  })
  full_name?: string;

  @IsString()
  @ApiProperty({
    name: 'external_user_id',
    required: true,
    example: 'usuario',
  })
  external_user_id: string;

  @IsNumber()
  @ApiProperty({
    name: 'contact',
    required: true,
    example: 88888888,
  })
  contact: number;

  @IsString()
  @ApiProperty({
    name: 'address',
    required: true,
    example: 'address',
  })
  address: string;

  @IsBoolean()
  @ApiProperty({
    name: 'status',
    required: true,
    example: true,
  })
  isActive: boolean;
}
