import { SalesReport } from '../../../domain/entities/saleReport.entity';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';

export interface SalesReportInterface {
  exec(user: UserRequest): Promise<SalesReport[]>;
}
