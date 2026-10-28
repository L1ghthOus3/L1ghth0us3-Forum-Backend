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
import { CategoryService } from '../services/category.service.js';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.getCategory(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
