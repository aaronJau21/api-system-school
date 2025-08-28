import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { IUser } from '../response/getAll.interface';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  getAll(): Promise<IUser[]>;
}
