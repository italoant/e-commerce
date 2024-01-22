import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientRequestDto {
  @ApiProperty({
    name: 'nome',
    required: false,
    example: 'usuario',
  })
  readonly userFullName?: string;
}
