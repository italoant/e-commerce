import { ApiProperty } from '@nestjs/swagger';

export class ClientRequestDto {
  @ApiProperty({
    name: 'nome',
    required: false,
    example: 'usuario',
  })
  id?: string;

  @ApiProperty({
    name: 'userFullName',
    required: false,
    example: 'usuario',
  })
  userFullName?: string;

  @ApiProperty({
    name: 'external_user_id',
    required: true,
    example: 'usuario',
  })
  external_user_id: string;

  @ApiProperty({
    name: 'contact',
    required: true,
    example: 88888888,
  })
  contact: number;

  @ApiProperty({
    name: 'address',
    required: true,
    example: 'address',
  })
  address: string;

  @ApiProperty({
    name: 'address',
    required: true,
    example: 'address',
  })
  password: string;

  @ApiProperty({
    name: 'address',
    required: true,
    example: 'address',
  })
  email: string;

  @ApiProperty({
    name: 'status',
    required: true,
    example: true,
  })
  status: boolean;

  @ApiProperty({
    name: 'creatdAt',
    required: true,
    example: '12/12',
  })
  creatdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    required: true,
    example: '12/12',
  })
  updatedAt: Date;
}
