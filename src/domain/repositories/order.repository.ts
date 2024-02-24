import { Order } from 'src/domain/entities/order.entity';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderRequest } from '../../infrastructure/controllers/dto/Order.request.dto';
import { OrderInterface } from '../repositories-interfaces/order.repository.interface';
@Injectable()
export class OrderRepository implements OrderInterface {
  constructor(private readonly db: PrismaService) {}

  async findById(id: string): Promise<Order> {
    try {
      const order = await this.db.order.findFirst({
        where: {
          id: id,
        },
      });

      return {
        id: order.id,
        external_client_id: order.external_client_id,
        payment_status: order.payment_status,
        order_status: order.order_status,
        creation_date: order.creation_date,
        total_order: order.total_order,
      } as Order;
    } catch (e) {
      return e;
    }
  }

  async findByExternalClient(externalId: string): Promise<Order[]> {
    try {
      const orderClientList = [];
      const orders = await this.db.order.findMany({
        where: {
          external_client_id: externalId,
        },
      });

      for (const order of orders) {
        orderClientList.push({
          id: order.id,
          external_client_id: order.external_client_id,
          payment_status: order.payment_status,
          order_status: order.order_status,
          creation_date: order.creation_date,
          total_order: order.total_order,
        } as Order);
      }
      return orderClientList;
    } catch (e) {
      return e;
    }
  }
  async findByClientAndLastCreationDate(
    externalClient: string,
  ): Promise<Order> {
    try {
      const order = await this.db.order.findFirst({
        orderBy: [
          {
            creation_date: 'desc',
          },
        ],
        where: {
          AND: [
            { external_client_id: externalClient },
            { payment_status: 'aguardando pagamento' },
          ],
        },
      });

      return {
        id: order.id,
        external_client_id: order.external_client_id,
        payment_status: order.payment_status,
        order_status: order.order_status,
        creation_date: order.creation_date,
        total_order: order.total_order,
      } as Order;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orderList = [];
      const orders = await this.db.order.findMany();

      for (const order of orders) {
        orderList.push({
          id: order.id,
          external_client_id: order.external_client_id,
          payment_status: order.payment_status,
          order_status: order.order_status,
          creation_date: order.creation_date,
          total_order: order.total_order,
        } as Order);
      }
      return orderList;
    } catch (error) {
      return error;
    }
  }

  async createOrder(id: string): Promise<Order> {
    const remapData = {
      external_client: { connect: { id: id } },
    };
    try {
      const order = await this.db.order.create({
        data: remapData,
      });
      return {
        id: order.id,
        external_client_id: order.external_client_id,
        payment_status: order.payment_status,
        order_status: order.order_status,
        creation_date: order.creation_date,
        total_order: order.total_order,
      } as Order;
    } catch (e) {
      return e;
    }
  }
  async deleteOrder(id: string): Promise<void> {
    try {
      await this.db.order.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
  async updateOrder(data: OrderRequest): Promise<Order> {
    const id = data.id;
    try {
      const updateOrder = await this.db.order.update({
        data: data,
        where: {
          id,
        },
      });

      return {
        id: updateOrder.id,
        external_client_id: updateOrder.external_client_id,
        payment_status: updateOrder.payment_status,
        order_status: updateOrder.order_status,
        creation_date: updateOrder.creation_date,
        total_order: updateOrder.total_order,
      } as Order;
    } catch (e) {
      return e;
    }
  }
}
