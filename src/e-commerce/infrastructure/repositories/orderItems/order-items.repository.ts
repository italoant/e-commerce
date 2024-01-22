import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { PrismaService } from 'src/prisma.service';

export class OrderItemsRepository implements OrderItemsInterface {
  constructor(private readonly prisma: PrismaService) {}
  findOneForUpdate(data: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async findOne(data): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItems.findFirst({
        where: {
          external_order_id: data.id,
        },
      });

      return {} as OrderItem;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<OrderItem[]> {
    try {
      const orderItemList = [];
      const ordersItems = await this.prisma.orderItems.findMany();

      for (const orderItem of ordersItems) {
        orderItemList.push({} as OrderItem);

        return orderItemList;
      }
    } catch (error) {
      return error;
    }
  }

  async createOrderItem(data): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItems.create({
        data,
      });
      return {} as OrderItem;
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

      return {} as OrderItem;
    } catch (e) {
      return e;
    }
  }
}
