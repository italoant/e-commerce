import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserRequest {
  @ApiProperty({
    name: 'id',
    required: true,
    example: 'a23298832-123232',
  })
  readonly id?: string;

  @IsString()
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'usuario',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    name: 'email',
    required: true,
    example: 'usuario@email.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    required: true,
    example: '123456',
  })
  password?: string;

  @IsString()
  @ApiProperty({
    name: 'type',
    required: false,
    example: 'ADMIN',
  })
  type?: string;
}
