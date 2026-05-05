import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ref = this.Reflector.get<string[]>("role", context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();

    console.log(ref);
    if (!req.headers["token"]) {
      throw new UnauthorizedException("你没有权限访问该接口");
    }
    // 如果有token, 获取token并且找到用户角色与ref匹配
    const role: string = "admin"; // 从token中获取用户角色
    if (ref && !ref.includes(role)) {
      throw new UnauthorizedException("你没有权限访问该接口");
    }
    return true;
  }
}
