import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { PrismaService } from 'src/prisma.service';
import { OrderRequestDto } from '../../controllers/dto/Order.request.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class OrderRepository implements OrderInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Order> {
    try {
      const order = await this.prisma.order.findFirst({
        where: {
          id: id,
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

  async findByExternalClient(externalClient: string): Promise<Order[]> {
    try {
      const orderClientList = [];
      const orders = await this.prisma.order.findMany({
        where: {
          external_client_id: externalClient,
        },
      });

      for (const order of orders) {
        orderClientList.push({
          id: order.id,
          clientId: order.external_client_id,
          purchaseStatus: order.orderStatus,
          purchaseDate: order.createAt,
          purhcaseTotal: order.totalOrder,
        } as Order);
      }
      return orderClientList;
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
      }
      return orderList;
    } catch (error) {
      return error;
    }
  }

  async createOrder(data: OrderRequestDto, id: string): Promise<Order> {
    const remapData = {
      orderStatus: data.orderStatus,
      createAt: data.createat,
      totalOrder: data.totalOrder,
      external_client: { connect: { id: id } },
    };
    try {
      const order = await this.prisma.order.create({
        data: remapData,
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
  async deleteOrder(id: string): Promise<void> {
    try {
      await this.prisma.order.delete({
        where: {
          id: id,
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
