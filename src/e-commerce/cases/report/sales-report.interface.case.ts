import { SalesReport } from '../../domain/entities/salesReport/saleReport.entity';
import { User } from '../../domain/entities/users/user.entity';

export interface SalesReportInterface {
  exec(user: User, filter): Promise<SalesReport[]>;
}
