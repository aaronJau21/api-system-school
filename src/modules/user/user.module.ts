import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrisma } from './repository/prisma/user.prisma';
import { LibModule } from 'src/lib/lib.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserPrisma,
    },
  ],
  imports: [PrismaModule, LibModule],
  exports: [UserService],
})
export class UserModule {}
