import { SalesReportRepositoryInterface } from 'src/common/service-interfaces/sales-report-interface/sales-report.repository.interface';
import { PrismaService } from '../../../../prisma.service';
import { SalesReport } from '../../../domain/entities/salesReport/saleReport.entity';
import { SalesReportRequest } from '../../controllers/dto/sale-report.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesReportRepository implements SalesReportRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data: SalesReportRequest): Promise<SalesReport> {
    try {
      const salesReport = await this.prisma.salesReport.findFirst({
        where: {
          file_path: data.file_path,
        },
      });

      return {
        id: salesReport.id,
        period: salesReport.period,
        total_sales: salesReport.total_sale,
        total_orders: salesReport.total_orders,
        filePath: salesReport.file_path,
      } as SalesReport;
    } catch (e) {
      return e;
    }
  }

  async getReport(): Promise<any> {
    const totalUsers = await this.prisma.user.count();

    const totalActiveClients = await this.prisma.client.count({
      where: {
        isActive: true,
      },
    });

    const totalProductsInStock = await this.prisma.product.aggregate({
      _sum: {
        stock_quantity: true,
      },
    });

    const totalOrders = await this.prisma.order.count();

    const totalSales = await this.prisma.order.aggregate({
      _sum: {
        total_order: true,
      },
    });

    return {
      total_users: totalUsers,
      total_active_clients: totalActiveClients,
      total_products_in_stock: totalProductsInStock._sum.stock_quantity || 0,
      total_orders: totalOrders,
      total_sales: totalSales._sum.total_order || 0,
    };
  }

  async updateReport(data: SalesReportRequest): Promise<SalesReport> {
    const { id } = data;
    try {
      const updateSalesReportRequest = await this.prisma.salesReport.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateSalesReportRequest.id,
        period: updateSalesReportRequest.period,
        total_sales: updateSalesReportRequest.total_sale,
        total_orders: updateSalesReportRequest.total_orders,
        filePath: updateSalesReportRequest.file_path,
      } as SalesReport;
    } catch (e) {
      return e;
    }
  }
}
