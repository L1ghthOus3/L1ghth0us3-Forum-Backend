import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forum } from '../entities/forum.entity.js';
import { CreateForumDto } from '../dto/create-forum.dto.js';
import { UpdateForumDto } from '../dto/update-forum.dto.js';
import { CategoryService } from '../../category/services/category.service.js';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateForumDto) {
    const category = await this.categoryService.getCategory(dto.categoryId);

    const forum = this.forumRepository.create({
      name: dto.name,
      category: category,
    });

    return this.forumRepository.save(forum);
  }

  getForums() {
    return this.forumRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getForum(id: string) {
    const forum = await this.forumRepository.findOne({ where: { id: id } });

    if (!forum) {
      throw new NotFoundException('Forum not found');
    }

    return forum;
  }

  async update(id: string, dto: UpdateForumDto) {
    const forum = await this.getForum(id);

    if (dto.name !== undefined) {
      forum.name = dto.name;
    }

    if (dto.categoryId !== undefined) {
      forum.category = await this.categoryService.getCategory(dto.categoryId);
    }

    return this.forumRepository.save(forum);
  }

  async remove(id: string) {
    const forum = await this.getForum(id);

    await this.forumRepository.remove(forum);
  }
}
