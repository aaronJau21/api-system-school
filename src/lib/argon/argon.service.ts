import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService {
  async hash(data: string) {
    return await argon.hash(data);
  }

  async verify(hash: string, plain: string) {
    return await argon.verify(hash, plain);
  }
}
