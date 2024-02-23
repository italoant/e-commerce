import { SalesReport } from '../../domain/entities/salesReport/saleReport.entity';

export interface SalesReportRepositoryInterface {
  getReport(): Promise<SalesReport[]>;
}
