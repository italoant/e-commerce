import { Product } from 'src/domain/entities/product.entity';
import { PrismaService } from '../../prisma.service';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductRequest } from '../../infrastructure/controllers/dto/create-product.request.dto';
import { ProductInterface } from '../repositories-interfaces/product.repository.interface';

@Injectable()
export class ProductRepository implements ProductInterface {
  constructor(private readonly db: PrismaService) {}
  async findOne(data: ProductRequest): Promise<Product> {
    try {
      const product = await this.db.product.findFirst({
        where: {
          ...(data.id && { id: data.id }),
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
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao procurar produto, error ${e}`,
      );
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      const product = await this.db.product.findUnique({
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
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao procurar produto por id, error ${e}`,
      );
    }
  }

  async findAll(data?: ProductRequest): Promise<Product[]> {
    try {
      const productList = [];
      let products;
      if (data) {
        products = await this.db.product.findMany({});
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
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao procurar lista de produtos, error ${e}`,
      );
    }
  }

  async findManyWithFilters(data?: ProductRequest): Promise<Product[]> {
    try {
      const productList = [];
      let products;
      if (data) {
        products = await this.db.product.findMany({
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
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao procurar lista de produtos, error ${e}`,
      );
    }
  }

  async create(data: ProductRequest): Promise<Product> {
    try {
      const product = await this.db.product.create({
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
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao criar produto, error ${e}`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.db.product.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `erro ao deletar produto, error ${e}`,
      );
    }
  }
  async update(data: Product): Promise<Product> {
    const id = data.id;
    try {
      const updateProduct = await this.db.product.update({
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
      throw new InternalServerErrorException(
        `erro ao atualizar produto, error ${e}`,
      );
    }
  }
}
