import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { LoggerMiddleware } from "../middleware/logger/logger.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path: "user",
    //   method: RequestMethod.GET,
    // });
  }
}
