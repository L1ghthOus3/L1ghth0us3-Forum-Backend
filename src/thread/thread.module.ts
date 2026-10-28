import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity.js';
import { ThreadService } from './services/thread.service.js';
import { ThreadController } from './controller/thread.controller.js';
import { ForumModule } from '../forum/forum.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Thread]), ForumModule],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
