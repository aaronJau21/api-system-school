import { ConflictException, Inject, Injectable } from '@nestjs/common';
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
    const existUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const hashedPassword = await this.argonService.hash(createUserDto.password);
    await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return {
      msg: 'Usuario creado exitosamente',
    };
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findAll() {
    const users = await this.userRepository.getAll();
    return users;
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
