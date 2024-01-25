import { SalesReport } from '../../../e-commerce/domain/entities/salesReport/saleReport.entity';

export interface SalesReportRepositoryInterface {
  getReport(): Promise<SalesReport[]>;
}
