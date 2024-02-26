import { ApiProperty } from '@nestjs/swagger';
import Entity from '../../../common/entity/entity';
import { IsDate, IsString } from 'class-validator';

export class SalesReportRequest extends Entity {
  @IsString()
  @ApiProperty({
    name: 'file_path',
    required: true,
    example: '/src',
  })
  file_path: string;

  @IsDate()
  @ApiProperty({
    name: 'period',
    required: true,
    example: '12-12',
  })
  initial_period: Date;

  @IsDate()
  @ApiProperty({
    name: 'period',
    required: true,
    example: '12-12',
  })
  final_period: Date;
}
