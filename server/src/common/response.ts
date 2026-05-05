import { Injectable, CallHandler, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterception<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          data: data,
          status: 0,
          message: "操作成功",
          success: true,
        };
      }),
    );
  }
}
