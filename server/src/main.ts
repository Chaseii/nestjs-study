import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import session from "express-session";
import { Request, Response, NextFunction } from "express";

const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("全局中间件：", req.method, req.originalUrl ?? req.url);
  next();
};

async function bootstrap() {
  // 新版本 集成跨域功能 可以不使用cors中间件解决跨域问题
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(globalMiddleware);
  app.use(session({ secret: "saeqs", rolling: true, name: "connect.sid" }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
