import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UploadModule } from "./upload/upload.module";
import { HelloModule } from "./hello/hello.module";
import { PModule } from "./p/p.module";
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [UserModule, UploadModule, HelloModule, PModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
