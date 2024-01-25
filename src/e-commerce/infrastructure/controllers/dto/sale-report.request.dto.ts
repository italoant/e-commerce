import { ApiProperty } from '@nestjs/swagger';
import Entity from '../../../../common/entity/entity';

export class SalesReportRequest extends Entity {
  @ApiProperty({
    name: 'file_path',
    required: true,
    example: '/src',
  })
  file_path: string;

  @ApiProperty({
    name: 'period',
    required: true,
    example: '12-12',
  })
  initial_period: Date;

  @ApiProperty({
    name: 'period',
    required: true,
    example: '12-12',
  })
  final_period: Date;
}
