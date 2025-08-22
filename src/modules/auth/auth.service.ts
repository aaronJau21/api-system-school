import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ArgonService } from 'src/lib/argon/argon.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly argon: ArgonService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const isMatch = await this.argon.verify(user.password, data.password);

    if (!isMatch) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const { email, name, father_lastname, mother_lastname } = user;

    return {
      email,
      name,
      father_lastname,
      mother_lastname,
    };
  }
}
