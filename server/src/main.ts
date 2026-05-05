import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType, ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ResponseInterception } from "./common/response"; // 导入全局响应拦截器
import { HttpExceptionFilter } from "./common/filter"; // 导入全局异常过滤器
import { join } from "path";

const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("全局中间件：", req.method, req.originalUrl ?? req.url);
  next();
};

async function bootstrap() {
  // 新版本 集成跨域功能 可以不使用cors中间件解决跨域问题
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets(join(__dirname, "uploads"), {
    prefix: "/uploads",
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(globalMiddleware);
  app.use(session({ secret: "saeqs", rolling: true, name: "connect.sid" }));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterception());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
