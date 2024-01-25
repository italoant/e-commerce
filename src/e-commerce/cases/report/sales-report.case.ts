import { Inject, InternalServerErrorException } from '@nestjs/common';
import { SalesReport } from '../../domain/entities/salesReport/saleReport.entity';
import { SalesReportInterface } from './sales-report.interface.case';
import { SalesReportRepositoryInterface } from '../../../common/service-interfaces/sales-report-interface/sales-report.repository.interface';
import { ClientType } from '../../domain/entities/users/user-enum';
import { User } from '../../domain/entities/users/user.entity';

export class SalesResportCase implements SalesReportInterface {
  constructor(
    @Inject('SalesReportRepositoryInterface')
    private readonly salesReportRepository: SalesReportRepositoryInterface,
  ) {}
  async exec({ type }: User, filter): Promise<SalesReport[]> {
    if (type === ClientType.ADMIN) {
      return await this.salesReportRepository.getReport(filter);
    }
    throw new InternalServerErrorException(
      'apenas usuarios admin podem acessar esse recurso',
    );
  }
}
