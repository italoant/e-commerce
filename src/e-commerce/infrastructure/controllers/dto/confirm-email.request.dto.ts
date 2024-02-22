import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailRequest {
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
    name: 'code',
    required: false,
    example: '123456',
  })
  readonly code: string;
}
