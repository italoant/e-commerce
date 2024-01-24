import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { PrismaService } from '../../../../prisma.service';
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
        purchaseStatus: order.order_status,
        purchaseDate: order.creation_date,
        purhcaseTotal: order.total_order,
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
          purchaseStatus: order.order_status,
          purchaseDate: order.creation_date,
          purhcaseTotal: order.total_order,
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
          purchaseStatus: order.order_status,
          purchaseDate: order.creation_date,
          purhcaseTotal: order.total_order,
        } as Order);
      }
      return orderList;
    } catch (error) {
      return error;
    }
  }

  async createOrder(data: OrderRequestDto, id: string): Promise<Order> {
    const remapData = {
      order_status: data.order_status,
      creation_date: data.creation_date,
      total_order: data.total_order,
      external_client: { connect: { id: id } },
    };
    try {
      const order = await this.prisma.order.create({
        data: remapData,
      });
      return {
        id: order.id,
        clientId: order.external_client_id,
        purchaseStatus: order.order_status,
        purchaseDate: order.creation_date,
        purhcaseTotal: order.total_order,
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
  async updateOrder(data: OrderRequestDto): Promise<Order> {
    const { id } = data;
    try {
      const updateOrder = await this.prisma.order.update({
        data: data,
        where: {
          id,
        },
      });

      return {
        id: updateOrder.id,
        clientId: updateOrder.external_client_id,
        purchaseStatus: updateOrder.order_status,
        purchaseDate: updateOrder.creation_date,
        purhcaseTotal: updateOrder.total_order,
      } as Order;
    } catch (e) {
      return e;
    }
  }
}
