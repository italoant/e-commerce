import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { PrismaService } from 'src/prisma.service';
import { OrderItemDto } from '../../controllers/dto/order-item.request.dto';
import { Prisma } from '@prisma/client';

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
        unitaryPrice: orderItem.unitaryPrice,
        subTotal: orderItem.subTotal,
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
        unitaryPrice: orderItem.unitaryPrice,
        subTotal: orderItem.subTotal,
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

      return {
        id: orderItem.id,
        external_order: orderItem.external_order_id,
        external_product: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unitaryPrice: orderItem.unitaryPrice,
        subTotal: orderItem.subTotal,
      } as OrderItem;
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
          unitaryPrice: orderItem.unitaryPrice,
          subTotal: orderItem.subTotal,
        } as OrderItem);
      }

      return orderItemList;
    } catch (error) {
      return error;
    }
  }

  async createOrderItem(data: OrderItemDto): Promise<OrderItem> {
    const subTotalCalc = data.quantity * Number(data.unitaryPrice);
    data.subTotal = new Prisma.Decimal(subTotalCalc);

    try {
      const orderItem = await this.prisma.orderItems.create({
        data,
      });
      return {
        id: orderItem.id,
        external_order: orderItem.external_order_id,
        external_product: orderItem.external_product_id,
        quantity: orderItem.quantity,
        unitaryPrice: orderItem.unitaryPrice,
        subTotal: orderItem.subTotal,
      } as OrderItem;
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
  async updateOrderItem(id, data): Promise<OrderItem> {
    try {
      const updateOrderItem = await this.prisma.orderItems.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateOrderItem.id,
        external_order: updateOrderItem.external_order_id,
        external_product: updateOrderItem.external_product_id,
        quantity: updateOrderItem.quantity,
        unitaryPrice: updateOrderItem.unitaryPrice,
        subTotal: updateOrderItem.subTotal,
      } as OrderItem;
    } catch (e) {
      return e;
    }
  }
}
