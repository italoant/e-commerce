import { Controller, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { User } from '../../domain/entities/user.entity';
import { SalesReport } from '../../domain/entities/saleReport.entity';
import { SalesResportCase } from '../../use-cases/cases/report/sales-report.case';

@Controller('sales-report')
@ApiTags('sales-report')
export class SalesResportController {
  constructor(private readonly salesResport: SalesResportCase) {}

  @ApiBody({
    type: String,
    required: true,
  })
  @Get('/')
  async getReport(@CurrentUser() user: User): Promise<SalesReport[]> {
    return await this.salesResport.exec(user);
  }
}
