import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from '../../controllers/dto/create-product.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(private readonly prisma: PrismaService) {}
  findOneForUpdate(data: any): Promise<string> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
  async findOne(data: ProductDto): Promise<Product> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          ...(data.id && { id: data.id }),
          ...(data.productName && { productName: data.productName }),
          ...(data.description && { description: data.description }),
          ...(data.price !== undefined && { price: data.price }),
          ...(data.stockQuantity !== undefined && {
            stockQuantity: data.stockQuantity,
          }),
        },
      });
      if (product) {
        return {
          id: product.id,
          productName: product.productName,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          creationDate: product.createAt,
          updatedDate: product.updatedAt,
        } as Product;
      }
      return;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findAll(data?: ProductDto): Promise<Product[]> {
    try {
      const productList = [];
      let products;
      if (data) {
        products = await this.prisma.product.findMany({
          where: {
            ...(data.productName && { productName: data.productName }),
            ...(data.description && { description: data.description }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.stockQuantity !== undefined && {
              stockQuantity: data.stockQuantity,
            }),
          },
        });
      }

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
      }
      return productList;
    } catch (error) {
      return error;
    }
  }

  async createProduct(data: ProductDto): Promise<Product> {
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
  async deleteProduct(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
  async updateProduct(id: string, data: ProductDto): Promise<Product> {
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
