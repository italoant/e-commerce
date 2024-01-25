import { SalesReport } from '../../../e-commerce/domain/entities/salesReport/saleReport.entity';
import { SalesReportRequest } from '../../../e-commerce/infrastructure/controllers/dto/sale-report.request.dto';

export interface SalesReportRepositoryInterface {
  findOne(data: SalesReportRequest): Promise<SalesReport>;
  getReport(filter: SalesReportRequest): Promise<SalesReport[]>;
  createSalesReport(data: SalesReportRequest): Promise<SalesReport>;
  deleteSalesReport(id: string): Promise<void>;
  updateReport(data: SalesReportRequest): Promise<SalesReport>;
}
