import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
