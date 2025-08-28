import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUserRepository } from 'src/modules/user/interfaces/repository/iuser.repository';
import { IUser } from '../../interfaces/response/getAll.interface';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserPrisma implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...data,
        status: true,
        images: null,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getAll(): Promise<IUser[]> {
    return await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateStatus(id: number, status: boolean): Promise<IUser> {
    return await this.prisma.user.update({
      where: { id },
      data: { status },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }
}
