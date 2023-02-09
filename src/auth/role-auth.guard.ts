import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.model';
import { AuthRequest } from './jwt-auth.guard';
import { ROLES_KEY } from './role-auth.decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();
    if (
      ['login', 'registration', 'jsonRPC'].includes(context.getHandler().name)
    ) {
      return true;
    }

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException(
          "Header 'Authorization' not found! User unauthorize",
        );
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User unauthorize');
      }

      const user = this.jwtService.verify<User>(token);
      req.user = user;

      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!roles) {
        return true;
      }

      return user.roles.some((role) => roles.includes(role.name));
    } catch (e) {
      throw new ForbiddenException(e.message + '; User access is denied');
    }
  }
}
