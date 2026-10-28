import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard.js';
import { ForumService } from '../services/forum.service.js';
import { CreateForumDto } from '../dto/create-forum.dto.js';
import { UpdateForumDto } from '../dto/update-forum.dto.js';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateForumDto) {
    return this.forumService.create(body);
  }

  @Get()
  getForums() {
    return this.forumService.getForums();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getForum(@Param('id', ParseUUIDPipe) id: string) {
    return this.forumService.getForum(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateForumDto) {
    return this.forumService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.forumService.remove(id);
  }
}
