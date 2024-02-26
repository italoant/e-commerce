import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

enum ClientType {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class UserRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'id',
    required: false,
    example: '1234',
  })
  id?: string;

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
  @IsOptional()
  @ApiProperty({
    name: 'password',
    required: true,
    example: '123456',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'type',
    required: true,
    example: 'ADMIN',
  })
  type: ClientType;
}
