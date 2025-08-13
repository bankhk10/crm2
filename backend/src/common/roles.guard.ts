import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    const token = typeof header === 'string' ? header.replace('Bearer ', '') : undefined;
    const user = token ? this.authService.validate(token) : null;
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = user;
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    return requiredRoles.includes(user.role);
  }
}
