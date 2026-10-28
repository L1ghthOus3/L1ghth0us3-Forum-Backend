import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity.js';
import { Forum } from '../../forum/entities/forum.entity.js';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create(dto);

    return this.categoryRepository.save(category);
  }

  getCategories() {
    return this.categoryRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.getCategory(id);

    return this.categoryRepository.save(
      this.categoryRepository.merge(category, dto),
    );
  }

  async remove(id: string) {
    const category = await this.getCategory(id);
    const forumCount = await this.categoryRepository.manager.count(Forum, {
      where: { category: { id: id } },
    });

    if (forumCount > 0) {
      throw new ConflictException(
        'Category still has forums, move or delete them first',
      );
    }

    await this.categoryRepository.remove(category);
  }
}
