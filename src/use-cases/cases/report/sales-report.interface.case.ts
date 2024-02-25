import { SalesReport } from '../../../domain/entities/saleReport.entity';
import { User } from '../../../domain/entities/user.entity';

export interface SalesReportInterface {
  exec(user: User): Promise<SalesReport[]>;
}
