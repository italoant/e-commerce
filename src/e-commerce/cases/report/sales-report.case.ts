import { Inject, InternalServerErrorException } from '@nestjs/common';
import { SalesReport } from '../../domain/entities/salesReport/saleReport.entity';
import { SalesReportInterface } from './sales-report.interface.case';
import { SalesReportRepositoryInterface } from '../../../common/service-interfaces/sales-report-interface/sales-report.repository.interface';
import { ClientType } from '../../domain/entities/users/user-enum';
import { User } from '../../domain/entities/users/user.entity';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import { PrismaService } from '../../../prisma.service';

export class SalesResportCase implements SalesReportInterface {
  constructor(
    @Inject('SalesReportRepositoryInterface')
    private readonly salesReportRepository: SalesReportRepositoryInterface,
    private readonly prismaService: PrismaService,
  ) {}
  async exec({ type }: User): Promise<SalesReport[]> {
    if (type === ClientType.ADMIN) {
      const report = await this.salesReportRepository.getReport();

      const remapList = [];

      for (const remapReport of report) {
        remapList.push({
          product_name: remapReport.product_name,
          quantity: remapReport.orderItem.quantity,
          subtotal: remapReport.orderItem.subtotal,
        });
      }

      const downloads = path.join('c:/Users/italo/Downloads');

      const csvPath = path.join(
        downloads,
        'general_report$' +
          new Date().toISOString().replace(/[^0-9]/g, '') +
          '.csv',
      );

      const csvWriter = createObjectCsvWriter({
        path: csvPath,
        header: [
          { id: 'productname', title: 'product' },
          { id: 'quantity', title: 'quantity' },
          { id: 'subtotal', title: 'sutbTotal' },
        ],
      });

      for (const report of remapList) {
        await csvWriter.writeRecords([report]);
      }

      return remapList;
    }
    throw new InternalServerErrorException(
      'apenas usuarios admin podem acessar esse recurso',
    );
  }
}
