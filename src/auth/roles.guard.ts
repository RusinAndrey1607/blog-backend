import { JwtService } from '@nestjs/jwt/dist';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass()
      ])
      if (!requiredRoles){
        return true
      }
      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const bearer = authHeader.split(' ')[0];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: "user isn't authorized" });
      }
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return decoded.roles.some(role => requiredRoles.includes(role.value));
    } catch (error) {
      console.log(error);

      throw new HttpException({ message: "You aren't allowed" },HttpStatus.FORBIDDEN);
    }
  }
}
