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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard.js';
import { CurrentUser } from '../../auth/current-user.decorator.js';
import type { JwtPayload } from '../../auth/auth.service.js';
import { ThreadService } from '../services/thread.service.js';
import { CreateThreadDto } from '../dto/create-thread.dto.js';
import { UpdateThreadDto } from '../dto/update-thread.dto.js';
import { GetThreadsQueryDto } from '../dto/get-threads-query.dto.js';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateThreadDto, @CurrentUser() user: JwtPayload) {
    return this.threadService.create(body, user.sub);
  }

  @Get()
  getThreads(@Query() query: GetThreadsQueryDto) {
    return this.threadService.getThreads(query.forumId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getThread(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadService.getThread(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateThreadDto,
  ) {
    return this.threadService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadService.remove(id);
  }
}
