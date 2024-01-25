import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { PrismaService } from '../../../../prisma.service';
import { OrderItemRequest } from '../../controllers/dto/order-item.request.dto';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemsRepository implements OrderItemsInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItems.findFirst({
        where: {
          id: id,
        },
      });

      return {
        id: orderItem.id,
        external_order: orderItem.external_order_id,
        external_product: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unitary_price: orderItem.unitary_price,
        subtotal: orderItem.subtotal,
      } as OrderItem;
    } catch (e) {
      return e;
    }
  }
  async findByOrder(id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItems.findFirst({
        where: {
          external_order_id: id,
        },
      });

      return {
        id: orderItem.id,
        external_order: orderItem.external_order_id,
        external_product: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unitary_price: orderItem.unitary_price,
        subtotal: orderItem.subtotal,
      } as OrderItem;
    } catch (e) {
      return e;
    }
  }
  async findByProduct(id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItems.findFirst({
        where: {
          external_product_id: id,
        },
      });
      if (orderItem) {
        return {
          id: orderItem.id,
          external_order: orderItem.external_order_id,
          external_product: orderItem.external_product_id,
          quantity: orderItem.quantity,
          unitary_price: orderItem.unitary_price,
          subtotal: orderItem.subtotal,
        } as OrderItem;
      }
      return;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<OrderItem[]> {
    try {
      const orderItemList = [];
      const ordersItems = await this.prisma.orderItems.findMany();

      for (const orderItem of ordersItems) {
        orderItemList.push({
          id: orderItem.id,
          external_order: orderItem.external_order_id,
          external_product: orderItem.external_product_id,
          quantity: orderItem.quantity,
          unitary_price: orderItem.unitary_price,
          subtotal: orderItem.subtotal,
        } as OrderItem);
      }

      return orderItemList;
    } catch (error) {
      return error;
    }
  }

  async createOrderItem(data: OrderItemRequest): Promise<OrderItem> {
    const remap = {
      external_order: { connect: { id: data.external_order } },
      external_product: { connect: { id: data.external_product } },
      quantity: data.quantity,
      unitary_price: new Prisma.Decimal(data.unitary_price),
      subtotal: new Prisma.Decimal(data.subtotal),
    };

    try {
      const orderItem = await this.prisma.orderItems.create({
        data: remap,
      });
      return {
        id: orderItem.id,
        external_order: orderItem.external_order_id,
        external_product: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unitary_price: orderItem.unitary_price,
        subtotal: orderItem.subtotal,
      } as OrderItem;
    } catch (e) {
      return e;
    }
  }
  async deleteOrderItem(data: OrderItemRequest): Promise<void> {
    try {
      await this.prisma.orderItems.deleteMany({
        where: {
          OR: [
            { id: data.id },
            { external_product_id: data.external_product },
            { external_order_id: data.external_order },
          ],
        },
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }
  async updateOrderItem(data: OrderItemRequest): Promise<OrderItem> {
    const { id } = data;
    const remap = {
      id: data.id,
      external_order: { connect: { id: data.external_order } },
      external_product: { connect: { id: data.external_product } },
      quantity: data.quantity,
      unitary_price: new Prisma.Decimal(data.unitary_price),
      subtotal: new Prisma.Decimal(data.quantity * Number(data.unitary_price)),
    };
    try {
      const updateOrderItem = await this.prisma.orderItems.update({
        data: remap,
        where: {
          id,
        },
      });

      return {
        id: updateOrderItem.id,
        external_order: updateOrderItem.external_order_id,
        external_product: updateOrderItem.external_product_id,
        quantity: updateOrderItem.quantity,
        unitary_price: updateOrderItem.unitary_price,
        subtotal: updateOrderItem.subtotal,
      } as OrderItem;
    } catch (e) {
      return e;
    }
  }
}
