import { ApiProperty } from '@nestjs/swagger';

enum ClientType {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class CreateUserRequest {
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

  @ApiProperty({
    name: 'Admin',
    required: true,
    example: true,
  })
  readonly type: ClientType;
}
