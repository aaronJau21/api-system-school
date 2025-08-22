import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  user_id: number;
}
