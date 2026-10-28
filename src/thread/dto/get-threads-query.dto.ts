import { IsOptional, IsUUID } from 'class-validator';

export class GetThreadsQueryDto {
  @IsOptional()
  @IsUUID()
  forumId?: string;
}
