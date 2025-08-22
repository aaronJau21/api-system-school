import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolePrisma } from './repository/prisma/role.prisma';

@Module({
  controllers: [RolesController],
  providers: [
    RolesService,
    {
      provide: 'IRoleRepository',
      useClass: RolePrisma,
    },
  ],
  imports: [PrismaModule],
})
export class RolesModule {}
