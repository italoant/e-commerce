// import { SalesReport } from '@prisma/client';
// import { SalesReportInterface } from 'src/common/service-interfaces/sales-report-interface/sales-report.repository.interface';
// import { PrismaService } from '../../../../prisma.service'; from 'src/prisma.service';

// export class SalesReportRepository implements SalesReportInterface {
//   constructor(private readonly prisma: PrismaService) {}
//   async findOne(data): Promise<SalesReport> {
//     try {
//       const salesReport = await this.prisma.salesReport.findFirst({
//         where: {
//           id: data.id,
//         },
//       });

//       return {
//         id: salesReport.id,
//         period: salesReport.period,
//         totalSale: salesReport.totalSale,
//         purchaseProduct: salesReport.purchaseProduct,
//         filePath: salesReport.filePath,
//       } as SalesReport;
//     } catch (e) {
//       return e;
//     }
//   }

//   async findAll(): Promise<SalesReport[]> {
//     try {
//       const salesReportList = [];
//       const ordersItems = await this.prisma.salesReport.findMany();

//       for (const salesReport of ordersItems) {
//         salesReportList.push({
//           id: salesReport.id,
//           external_order_id: salesReport.external_order_id,
//           external_product_id: salesReport.external_product_id,
//           quantity: salesReport.quantity,
//           unityPrice: salesReport.unityPrice,
//           subtotal: salesReport.subtotal,
//         } as SalesReport);

//         return salesReportList;
//       }
//     } catch (error) {
//       return error;
//     }
//   }

//   async createOrderItemRequest(data): Promise<SalesReport> {
//     try {
//       const salesReport = await this.prisma.salesReport.create({
//         data,
//       });
//       return {
//         id: salesReport.id,
//         external_order_id: salesReport.external_order_id,
//         external_product_id: salesReport.external_product_id,
//         quantity: salesReport.quantity,
//         unityPrice: salesReport.unityPrice,
//         subtotal: salesReport.subtotal,
//       } as SalesReport;
//     } catch (e) {
//       return e;
//     }
//   }
//   async deleteOrderItemRequest(data): Promise<void> {
//     try {
//       await this.prisma.salesReport.delete({
//         where: {
//           id: data.id,
//         },
//       });
//       return;
//     } catch (e) {
//       return e;
//     }
//   }
//   async updateOrderItemRequest(id, data): Promise<SalesReport> {
//     try {
//       const updateOrderItemRequest = await this.prisma.salesReport.update({
//         data,
//         where: {
//           id,
//         },
//       });

//       return {
//         id: updateOrderItemRequest.id,
//         external_order_id: updateOrderItemRequest.external_order_id,
//         external_product_id: updateOrderItemRequest.external_product_id,
//         quantity: updateOrderItemRequest.quantity,
//         unityPrice: updateOrderItemRequest.unityPrice,
//         subtotal: updateOrderItemRequest.subtotal,
//       } as SalesReport;
//     } catch (e) {
//       return e;
//     }
//   }
// }
