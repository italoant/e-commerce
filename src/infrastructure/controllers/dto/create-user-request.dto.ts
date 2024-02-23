import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty({
    name: 'nome',
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

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'Admin',
    required: true,
    example: true,
  })
  type: ClientType;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'code',
    required: true,
    example: 123456,
  })
  code: string;
}
