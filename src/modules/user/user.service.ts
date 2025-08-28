import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async updateStatus(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return await this.userRepository.updateStatus(id, !user.status);
  }

  findOne(id: number) {
    return this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
