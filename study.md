# 1. 安装nest脚手架

*需要node版本 > v18.17.0*可以使用nvm下载最新的LTS长期支持版本
````bash
npm i -g @nestjs/cli
````

# 2. 使用nestjs脚手架创建项目

````bash
nest new project-name

cd project-name

npm run start
````

# 3. nest脚手架命令

````bash
创建一个crud
nest g res moduleName

创建一个中间件
nest g mi middlewareName
````





## 模块

nestjs中创建的模块默认是模块内调用，比如现在有 User 和 List 两个模块，默认情况下 List模块是无法访问User模块中的service

解决办法

1. 在User模块中使用exports导出
2. 在List模块中使用exports导出过的模块

示例

````typescript
// File User Module user.module.ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { LoggerMiddleware } from "../middleware/logger/logger.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // ‼️ exports导出
})


// File List Module list.controller.ts
import { UserService } from '../user/user.service'; // 导入
import { Get, Controller } from '@nestjs/common';
@Controller()
export class ListController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUserList(){
    return this.userService.getUserList()
  }
}

````





## 中间件

中间件是路由处理程序之前调用的函数，中间件函数可以访问请求和相应对象

### 非全局中间件

使用`nest g mi middlewareName`可以快速创建一个中间件，命令会生成文件，关注后缀名为`.middleware.ts`的文件

````typescript
// 创建中间件
// middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // NestMiddleware 内需要实现 use方法
  use(req: Request, res: Response, next: NextFunction){
    
    // 这里可以写各种操作
    console.log('我是路过的.....')
    
    // next() 才会执行下一步，否则就是挂起
    next()
  }
}

// 使用中间件
// .module.ts
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { LoggerMiddleware } from "../middleware/logger/logger.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  // NestModule 需要实现 configure 方法
  configure(consumer: MiddlewareConsumer) {
    // 默认写法
    // consumer.apply(LoggerMiddleware).forRoutes(UserController); // ‼️ 关注这里
    
    // 只拦截某类请求 RequestMethod 可枚举， ALL GET POST PUT ......
    consumer.apply(LoggerMiddleware).forRoutes({
      path: "user",
      method: RequestMethod.GET,
    }); // 只拦截Get请求
  }
}

// 以上是非全局中间件的创建和使用方法
````

### 全局中间件

在main.ts中使用app.use(middlewareFunction)来注册全局中间件

需要注意全局中间件必须是一个函数，不能是类

````typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Request, Response, NextFunction } from "express";

const globalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("全局中间件：", req.method, req.originalUrl ?? req.url);
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware); // 这里注册全局中间件
  await app.listen(process.env.PORT ?? 3000);
}
````

### 文件上传

需要安装以下依赖

`@nestjs/platform-express`为nestjs自带

```bash
npm install multer -S 
npm install @types/multer -D
```

#### 实现一个文件上传接口


````typescript
// File upload.module.ts
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "../uploads"), // 存放地址
        filename: (req, file, cb) => {
          // 对接收到的文件重新命名并存放在本地
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
})


// File upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("images")
  @UseInterceptors(FileInterceptor("file")) // file是接受字段名
  uploadImages(@UploadedFile() file) { // 装饰器装饰
    console.log(file);
    return true;
  }
}

````





