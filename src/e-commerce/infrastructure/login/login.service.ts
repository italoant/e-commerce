import { Injectable } from '@nestjs/common';
// import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UserInterface } from 'src/common/service-interfaces/login-interface/login.service.interface';
import { PrismaService } from 'src/prisma.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class UserService implements UserInterface {
  constructor(private readonly prisma: PrismaService) {}
  findOne(login: string, email: string, password: string): Promise<any> {
    const user = this.prisma.user.findFirst({
      where: {
        name: login,
        password: password,
        email: email,
      },
    });

    return user;
  }

  findAll(): Promise<any> {
    return;
  }

  async createUser(data: CreateLoginDto): Promise<void> {
    data.creatdAt = new Date();
    data.updatedAt = new Date();

    await this.prisma.user.create({
      data,
    });
  }
  deleteUser(id: string): Promise<void> {
    console.log(id);
    return;
  }
  updateUser(id: string, updateLoginDto: UpdateLoginDto): Promise<void> {
    console.log(id);
    console.log(updateLoginDto);

    return;
  }
}
