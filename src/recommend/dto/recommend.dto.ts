import { IsString } from 'class-validator';
import { isTypedArray } from 'util/types';

export class RecommendDto {
  @IsString()
  username: string;
}
