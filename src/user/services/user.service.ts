import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(name: string, hashedPassword: string) {
    const existing = await this.userRepository.findOne({
      where: { name: name },
    });

    if (existing) {
      throw new ConflictException('Name already in use');
    }

    const user = this.userRepository.create({
      name,
      password: hashedPassword,
    });
    const { password: _, ...saved } = await this.userRepository.save(user);

    return saved;
  }

  findByNameWithPassword(name: string) {
    return this.userRepository.findOne({
      where: { name: name },
      select: { id: true, name: true, password: true },
    });
  }
}
