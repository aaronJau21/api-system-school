import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';
import { IRoleRepository } from 'src/modules/roles/interfaces/repository/irole.repository';

@Injectable()
export class RolePrisma implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<Role> {
    const role = await this.prisma.role.create({
      data: {
        name: data.name,
        status: true,
        user_id: data.user_id,
      },
    });

    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({ where: { deletedAt: null } });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.prisma.role.findFirst({
      where: {
        name,
      },
    });
  }

  async delete(id: number): Promise<Role | null> {
    return this.prisma.role.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateRoleDto): Promise<Role | null> {
    return this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        status: data.status,
      },
    });
  }
}
