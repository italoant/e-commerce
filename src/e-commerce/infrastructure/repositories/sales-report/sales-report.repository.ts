import { SalesReportRepositoryInterface } from 'src/common/service-interfaces/sales-report-interface/sales-report.repository.interface';
import { DbService } from '../../../../db.service';
import { SalesReport } from '../../../domain/entities/salesReport/saleReport.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesReportRepository implements SalesReportRepositoryInterface {
  constructor(private readonly db: DbService) {}
  async getReport(): Promise<SalesReport[]> {
    const reportList: SalesReport[] = [];
    const productSales = await this.db.product.findMany({
      include: {
        orderItems: {
          select: {
            quantity: true,
            subtotal: true,
          },
        },
      },
    });

    for (const product of productSales) {
      reportList.push({
        product_name: product.product_name,
        orderItem: product.orderItems.find((quantity) => {
          return quantity.quantity;
        }),
      } as SalesReport);
    }

    return reportList;
  }
}
