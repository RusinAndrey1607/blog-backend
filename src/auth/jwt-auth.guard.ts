import { JwtService } from '@nestjs/jwt/dist';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const bearer = authHeader.split(' ')[0];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: "user isn't authorized" });
      }
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      return true;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException({ message: "user isn't authorized" });
    }
  }
}
