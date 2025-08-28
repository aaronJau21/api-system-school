import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUser } from '../response/getAll.interface';
import { UpdateUserDto } from '../../dto/update-user.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<IUser[]>;
  updateStatus(id: number, status: boolean): Promise<IUser>;
  updateUser(id: number, data: UpdateUserDto): Promise<IUser>;
}
