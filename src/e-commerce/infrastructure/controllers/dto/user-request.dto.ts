import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty({
    name: 'id',
    required: true,
    example: 'a23298832-123232',
  })
  readonly id?: string;

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
    name: 'token',
    required: true,
    example: 'token',
  })
  token?: string;

  @ApiProperty({
    name: 'type',
    required: false,
    example: 'ADMIN',
  })
  readonly type: string;
}
