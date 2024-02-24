import { SalesReport } from '../entities/saleReport.entity';

export interface SalesReportRepositoryInterface {
  getReport(): Promise<SalesReport[]>;
}
