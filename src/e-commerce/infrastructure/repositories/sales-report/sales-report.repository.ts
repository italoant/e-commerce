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

  async getReport(filter: SalesReportRequest): Promise<SalesReport[]> {
    try {
      const salesReportList = [];
      const salesReports = await this.prisma.salesReport.findMany({
        data: filter,
      });

      for (const salesReport of salesReports) {
        salesReportList.push({
          id: salesReport.id,
          period: salesReport.period,
          total_sales: salesReport.total_sale,
          total_orders: salesReport.total_orders,
          filePath: salesReport.file_path,
        } as SalesReport);

        return salesReportList;
      }
    } catch (error) {
      return error;
    }
  }

  async createSalesReport(data: SalesReportRequest): Promise<SalesReport> {
    try {
      const salesReport = await this.prisma.salesReport.create(data);
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
  async deleteSalesReport(id: string): Promise<void> {
    try {
      await this.prisma.salesReport.delete({
        where: {
          id: id,
        },
      });
      return;
    } catch (e) {
      return e;
    }
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
