import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUserRepository } from 'src/modules/user/interfaces/repository/iuser.repository';

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
}
