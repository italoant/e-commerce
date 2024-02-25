import { ApiProperty } from '@nestjs/swagger';

export class ClientRequest {
  @ApiProperty({
    name: 'name',
    required: false,
    example: 'usuario',
  })
  id?: string;

  @ApiProperty({
    name: 'full_name',
    required: false,
    example: 'usuario',
  })
  full_name?: string;

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
    name: 'status',
    required: true,
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    name: 'creation_date',
    required: true,
    example: '12/12',
  })
  creation_date: Date;

  @ApiProperty({
    name: 'update_date',
    required: true,
    example: '12/12',
  })
  update_date: Date;
}
