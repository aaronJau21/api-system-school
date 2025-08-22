import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import type { IRoleRepository } from './interfaces/repository/irole.repository';

@Injectable()
export class RolesService {
  constructor(
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepository.findByName(createRoleDto.name);
    if (existRole) {
      throw new ConflictException('El Rol ya existe');
    }

    const role = await this.roleRepository.create(createRoleDto);
    return role;
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  findOne(id: number) {
    return this.roleRepository.findById(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
