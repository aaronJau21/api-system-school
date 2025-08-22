import { Module } from '@nestjs/common';
import { ArgonService } from './argon/argon.service';

@Module({
  providers: [ArgonService],
  exports: [ArgonService],
})
export class LibModule {}
