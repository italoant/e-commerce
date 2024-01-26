import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { PrismaService } from '../../../../prisma.service';
import { ProductRequest } from '../../controllers/dto/create-product.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data: ProductRequest): Promise<Product> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          ...(data.id && { product_id: data.id }),
          ...(data.product_name && { product_name: data.product_name }),
          ...(data.description && { description: data.description }),
          ...(data.price !== undefined && { price: data.price }),
          ...(data.stock_quantity !== undefined && {
            stock_quantity: data.stock_quantity,
          }),
        },
      });
      if (product) {
        return {
          id: product.id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          stock_quantity: product.stock_quantity,
          creation_date: product.creation_date,
          update_date: product.update_date,
        } as Product;
      }
      return;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findByid(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (product) {
      return {
        id: product.id,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        creation_date: product.creation_date,
        update_date: product.update_date,
      } as Product;
    }
  }

  async findAll(data?: ProductRequest): Promise<Product[]> {
    try {
      const productList = [];
      let products;
      if (data) {
        products = await this.prisma.product.findMany({
          where: {
            ...(data.product_name && { product_name: data.product_name }),
            ...(data.description && { description: data.description }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.stock_quantity !== undefined && {
              stock_quantity: data.stock_quantity,
            }),
          },
        });
      }

      for (const product of products) {
        productList.push({
          id: product.id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          stock_quantity: product.stock_quantity,
          creation_date: product.creation_date,
          update_date: product.update_date,
        } as Product);
      }
      return productList;
    } catch (error) {
      return error;
    }
  }

  async createProduct(data: ProductRequest): Promise<Product> {
    try {
      const product = await this.prisma.product.create({
        data: data,
      });

      if (product) {
        return {
          id: product.id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          stock_quantity: product.stock_quantity,
          creation_date: product.creation_date,
          update_date: product.update_date,
        } as Product;
      }
      return;
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
  async updateProduct(data: ProductRequest): Promise<Product> {
    const id = data.id;
    try {
      const updateProduct = await this.prisma.product.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateProduct.id,
        product_name: updateProduct.product_name,
        description: updateProduct.description,
        price: updateProduct.price,
        stock_quantity: updateProduct.stock_quantity,
        creation_date: updateProduct.creation_date,
        update_date: updateProduct.update_date,
      } as Product;
    } catch (e) {
      return e;
    }
  }
}
