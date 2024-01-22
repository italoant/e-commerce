import { OrderItems } from '@prisma/client';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { PrismaService } from 'src/prisma.service';

export class OrderItemsRepository implements OrderItemsInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data): Promise<OrderItems> {
    try {
      const orderItem = await this.prisma.orderItems.findFirst({
        where: {
          external_order_id: data.id,
        },
      });

      return {
        id: orderItem.id,
        external_order_id: orderItem.external_order_id,
        external_product_id: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unityPrice: orderItem.unityPrice,
        subTotal: orderItem.subTotal,
      } as OrderItems;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<OrderItems[]> {
    try {
      const orderItemList = [];
      const ordersItems = await this.prisma.orderItems.findMany();

      for (const orderItem of ordersItems) {
        orderItemList.push({
          id: orderItem.id,
          external_order_id: orderItem.external_order_id,
          external_product_id: orderItem.external_product_id,
          quantity: orderItem.quantity,
          unityPrice: orderItem.unityPrice,
          subTotal: orderItem.subTotal,
        } as OrderItems);

        return orderItemList;
      }
    } catch (error) {
      return error;
    }
  }

  async createOrderItem(data): Promise<OrderItems> {
    try {
      const orderItem = await this.prisma.orderItems.create({
        data,
      });
      return {
        id: orderItem.id,
        external_order_id: orderItem.external_order_id,
        external_product_id: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unityPrice: orderItem.unityPrice,
        subTotal: orderItem.subTotal,
      } as OrderItems;
    } catch (e) {
      return e;
    }
  }
  async deleteOrderItem(data): Promise<void> {
    try {
      await this.prisma.orderItems.delete({
        where: {
          id: data.id,
        },
      });
      return;
    } catch (e) {
      return e;
    }
  }
  async updateOrderItem(id, data): Promise<OrderItems> {
    try {
      const updateOrderItem = await this.prisma.orderItems.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateOrderItem.id,
        external_order_id: updateOrderItem.external_order_id,
        external_product_id: updateOrderItem.external_product_id,
        quantity: updateOrderItem.quantity,
        unityPrice: updateOrderItem.unityPrice,
        subTotal: updateOrderItem.subTotal,
      } as OrderItems;
    } catch (e) {
      return e;
    }
  }
}
