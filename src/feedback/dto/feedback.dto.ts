import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class FeedbackDto {
  @IsString()
  Comment: string;
  
}
