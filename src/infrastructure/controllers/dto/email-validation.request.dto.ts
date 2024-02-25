import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailValidatorRequest {
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
    name: 'code',
    required: false,
    example: '123456',
  })
  code: string;
}
