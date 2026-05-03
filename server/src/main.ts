import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(session({ secret: "saeqs", rolling: true, name: "connect.sid" }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
