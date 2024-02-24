import { SalesReportRepositoryInterface } from '../repositories-interfaces/sales-report.repository.interface';
import { PrismaService } from '../../prisma.service';
import { SalesReport } from '../entities/saleReport.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesReportRepository implements SalesReportRepositoryInterface {
  constructor(private readonly db: PrismaService) {}
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
