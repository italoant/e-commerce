import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientRequest {
  @ApiProperty({
    name: 'nome',
    required: false,
    example: 'usuario',
  })
  readonly full_name?: string;
}
