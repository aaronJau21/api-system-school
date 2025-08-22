import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LibModule } from 'src/lib/lib.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, LibModule],
})
export class AuthModule {}
