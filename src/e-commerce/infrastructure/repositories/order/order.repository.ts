import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { PrismaService } from 'src/prisma.service';

export class OrderRepository implements OrderInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data): Promise<Order> {
    try {
      const order = await this.prisma.order.findFirst({
        where: {
          external_client_id: data.id,
        },
      });

      return {
        id: order.id,
        clientId: order.external_client_id,
        purchaseStatus: order.orderStatus,
        purchaseDate: order.createAt,
        purhcaseTotal: order.totalOrder,
      } as Order;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orderList = [];
      const orders = await this.prisma.order.findMany();

      for (const order of orders) {
        orderList.push({
          id: order.id,
          clientId: order.external_client_id,
          purchaseStatus: order.orderStatus,
          purchaseDate: order.createAt,
          purhcaseTotal: order.totalOrder,
        } as Order);

        return orderList;
      }
    } catch (error) {
      return error;
    }
  }

  async createOrder(data): Promise<Order> {
    try {
      const order = await this.prisma.order.create({
        data,
      });
      return {
        id: order.id,
        clientId: order.external_client_id,
        purchaseStatus: order.orderStatus,
        purchaseDate: order.createAt,
        purhcaseTotal: order.totalOrder,
      } as Order;
    } catch (e) {
      return e;
    }
  }
  async deleteOrder(data): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id: data.id,
        },
      });
      return;
    } catch (e) {
      return e;
    }
  }
  async updateOrder(id, data): Promise<Order> {
    try {
      const updateOrder = await this.prisma.order.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateOrder.id,
        clientId: updateOrder.external_client_id,
        purchaseStatus: updateOrder.orderStatus,
        purchaseDate: updateOrder.createAt,
        purhcaseTotal: updateOrder.totalOrder,
      } as Order;
    } catch (e) {
      return e;
    }
  }
}
