import { ApiProperty } from '@nestjs/swagger';

enum ClientType {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class CreateUserRequestDto {
  @ApiProperty({
    name: 'id',
    required: true,
    example: 'usuario',
  })
  readonly id: string;
  @ApiProperty({
    name: 'nome',
    required: true,
    example: 'usuario',
  })
  readonly name: string;
  @ApiProperty({
    name: 'nome',
    required: true,
    example: 'usuario',
  })
  readonly token: string;

  @ApiProperty({
    name: 'email',
    required: true,
    example: 'usuario@email.com',
  })
  readonly email: string;

  @ApiProperty({
    name: 'password',
    required: true,
    example: '123456',
  })
  readonly password: string;

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

  @ApiProperty({
    name: 'Admin',
    required: true,
    example: true,
  })
  readonly type: ClientType;
}
