import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [UserModule, UploadModule, HelloModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
