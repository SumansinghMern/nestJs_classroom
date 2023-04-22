import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Utils } from 'src/utils/utils';
import { Request } from 'express';

@Injectable()
export class StudentAuthGuard implements CanActivate {
  constructor() {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(
      '🚀 ~ file: teacher.guard.ts:22 ~ TeacherAuthGuard ~ canActivate ~ token:',
      token,
    );

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = Utils.decryptJwt(token);
      console.log(
        request,
        '🚀 ~ file: teacher.guard.ts:27 ~ AuthGuard ~ canActivate ~ payload:',
        payload,
      );
      if (
        request.session.userId === payload.userId &&
        payload.Role == 'Student'
      ) {
        return true;
      }
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
    } catch {
      throw new UnauthorizedException();
    }
    return false;
  }
}
