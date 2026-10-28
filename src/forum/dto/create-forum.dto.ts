import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsUUID()
  categoryId: string;
}
