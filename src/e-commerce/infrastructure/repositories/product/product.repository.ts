import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { PrismaService } from 'src/prisma.service';

export class ProductRepository implements ProductInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data): Promise<Product> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          productName: data.name,
        },
      });

      return {
        id: product.id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        creationDate: product.createAt,
        updatedDate: product.updatedAt,
      } as Product;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const productList = [];
      const products = await this.prisma.product.findMany();

      for (const product of products) {
        productList.push({
          id: product.id,
          productName: product.productName,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          creationDate: product.createAt,
          updatedDate: product.updatedAt,
        } as Product);

        return productList;
      }
    } catch (error) {
      return error;
    }
  }

  async createProduct(data): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data,
      });
      return {
        id: product.id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        creationDate: product.createAt,
        updatedDate: product.updatedAt,
      } as Product;
    } catch (e) {
      return e;
    }
  }
  async deleteProduct(id): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: id,
        },
      });
      return;
    } catch (e) {
      return e;
    }
  }
  async updateProduct(id, data): Promise<Product> {
    try {
      const updateProduct = await this.prisma.product.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateProduct.id,
        productName: updateProduct.productName,
        description: updateProduct.description,
        price: updateProduct.price,
        stockQuantity: updateProduct.stockQuantity,
        creationDate: updateProduct.createAt,
        updatedDate: updateProduct.updatedAt,
      } as Product;
    } catch (e) {
      return e;
    }
  }
}
