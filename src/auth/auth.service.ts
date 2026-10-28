import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service.js';
import { hashPassword, verifyPassword } from './password.js';

export interface JwtPayload {
  sub: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, password: string) {
    const user = await this.userService.create(
      name,
      await hashPassword(password),
    );

    return this.signToken(user.id, user.name);
  }

  async login(name: string, password: string) {
    const user = await this.userService.findByNameWithPassword(name);

    if (!user || !(await verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.name);
  }

  private async signToken(id: string, name: string) {
    const payload: JwtPayload = { sub: id, name };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
