import { ApiProperty } from '@nestjs/swagger';

export class ClientRequestDto {
  @ApiProperty({
    name: 'nome',
    required: false,
    example: 'usuario',
  })
  readonly id?: string;

  @ApiProperty({
    name: 'nome',
    required: true,
    example: 'usuario',
  })
  readonly userFullName: string;

  @ApiProperty({
    name: 'contact',
    required: true,
    example: 88888888,
  })
  readonly contact: number;

  @ApiProperty({
    name: 'adress',
    required: true,
    example: 'adress',
  })
  readonly adress: string;

  @ApiProperty({
    name: 'adress',
    required: true,
    example: 'adress',
  })
  readonly password: string;

  @ApiProperty({
    name: 'adress',
    required: true,
    example: 'adress',
  })
  readonly email: string;

  @ApiProperty({
    name: 'status',
    required: true,
    example: true,
  })
  readonly status: boolean;

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
