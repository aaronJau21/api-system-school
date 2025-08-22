import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { IUserRepository } from './interfaces/repository/iuser.repository';
import { ArgonService } from 'src/lib/argon/argon.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    private readonly argonService: ArgonService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.argonService.hash(createUserDto.password);
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
