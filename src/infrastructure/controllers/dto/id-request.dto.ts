import { ApiProperty } from '@nestjs/swagger';

export class IdRequests {
  @ApiProperty({
    name: 'id',
    required: true,
    example: '123',
  })
  readonly id: string;
}
