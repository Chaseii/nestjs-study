import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "../uploads"), // 存放地址
        filename: (req, file, cb) => {
          // 重新命名
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
})
export class UploadModule {}
