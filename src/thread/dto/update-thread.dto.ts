import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateThreadDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
