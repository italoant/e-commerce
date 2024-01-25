import { SalesReport } from '../../../e-commerce/domain/entities/salesReport/saleReport.entity';
import { SalesReportRequest } from '../../../e-commerce/infrastructure/controllers/dto/sale-report.request.dto';

export interface SalesReportRepositoryInterface {
  findOne(data: SalesReportRequest): Promise<SalesReport>;
  getReport(): Promise<any[]>;
  updateReport(data: SalesReportRequest): Promise<SalesReport>;
}
