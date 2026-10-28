import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from './auth.service.js';

// Use on routes protected by AuthGuard, which sets request.user
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest<Request & { user: JwtPayload }>().user,
);
