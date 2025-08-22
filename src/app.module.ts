import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    RolesModule,
    ConfigModule.forRoot(),
    UserModule,
    LibModule,
    AuthModule,
  ],
})
export class AppModule {}
