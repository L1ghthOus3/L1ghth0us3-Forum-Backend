import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity.js';
import { ForumService } from './services/forum.service.js';
import { ForumController } from './controller/forum.controller.js';
import { CategoryModule } from '../category/category.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Forum]), CategoryModule],
  controllers: [ForumController],
  providers: [ForumService],
  exports: [ForumService],
})
export class ForumModule {}
