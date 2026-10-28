import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service.js';
import { AuthGuard } from '../../auth/auth.guard.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }
}
