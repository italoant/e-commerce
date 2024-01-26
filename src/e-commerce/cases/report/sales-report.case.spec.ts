import { Prisma } from '@prisma/client';
import { SalesReportRepositoryInterface } from '../../../common/service-interfaces/sales-report-interface/sales-report.repository.interface';
import { OrderItem } from '../../domain/entities/orderItems/orderItem.entity';
import { SalesReport } from '../../domain/entities/salesReport/saleReport.entity';
import { UserRequest } from '../../infrastructure/controllers/dto/user-request.dto';
import { SalesResportCase } from './sales-report.case';
import { SalesReportInterface } from './sales-report.interface.case';
import { InternalServerErrorException } from '@nestjs/common';

describe('sales report tests', () => {
  let salesReportCase: SalesReportInterface;

  const salesRepositoy: SalesReportRepositoryInterface = {
    getReport: jest.fn(),
  };

  const reportReponse = {
    product_name: 'produto',
    orderItem: { quantity: 1, subtotal: new Prisma.Decimal(10) } as OrderItem,
  } as SalesReport;

  const remapReportResponse = {
    product_name: 'produto',
    quantity: 1,
    subtotal: new Prisma.Decimal(10),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    salesReportCase = new SalesResportCase(salesRepositoy);

    jest.clearAllMocks();
  });

  it('should be defined', async () => {
    expect(salesReportCase).toBeDefined;
  });

  it('shoudl return report if user is admin', async () => {
    jest.spyOn(salesRepositoy, 'getReport').mockResolvedValue([reportReponse]);

    const response = await salesReportCase.exec({
      type: 'ADMIN',
    } as UserRequest);

    expect(response).toBeDefined();
    expect(response).toEqual([remapReportResponse]);
  });

  it('shoudl return error if user is client', async () => {
    await expect(
      salesReportCase.exec({
        type: 'CLIENT',
      } as UserRequest),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
