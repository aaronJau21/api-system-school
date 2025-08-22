import { Role } from '@prisma/client';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';
// import { UpdateRoleDto } from 'src/roles/dto/update-role.dto';

export interface IRoleRepository {
  create(data: CreateRoleDto): Promise<Role>;
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  update(id: number, data: UpdateRoleDto): Promise<Role | null>;
  delete(id: number): Promise<Role | null>;
}
