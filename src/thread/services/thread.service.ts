import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from '../entities/thread.entity.js';
import { CreateThreadDto } from '../dto/create-thread.dto.js';
import { UpdateThreadDto } from '../dto/update-thread.dto.js';
import { ForumService } from '../../forum/services/forum.service.js';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(Thread)
    private readonly threadRepository: Repository<Thread>,
    private readonly forumService: ForumService,
  ) {}

  async create(dto: CreateThreadDto, authorId: string) {
    // Throws 404 if the forum doesn't exist
    await this.forumService.getForum(dto.forumId);

    const thread = this.threadRepository.create({
      title: dto.title,
      content: dto.content,
      forumId: dto.forumId,
      authorId,
    });
    const saved = await this.threadRepository.save(thread);

    return this.getThread(saved.id);
  }

  getThreads(forumId?: string) {
    return this.threadRepository.find({
      where: forumId ? { forumId: forumId } : {},
      relations: { author: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getThread(id: string) {
    const thread = await this.threadRepository.findOne({
      where: { id: id },
      relations: { author: true },
    });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return thread;
  }

  async update(id: string, dto: UpdateThreadDto) {
    const thread = await this.getThread(id);

    return this.threadRepository.save(this.threadRepository.merge(thread, dto));
  }

  async remove(id: string) {
    const thread = await this.getThread(id);

    await this.threadRepository.remove(thread);
  }
}
