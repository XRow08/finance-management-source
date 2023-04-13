import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: ["http://localhost:3000", "https://xr-finance.netlify.app"],
    })
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidNonWhitelisted: true })
  );
  await app.listen(process.env.HTTP_PORT || 3333);
}
bootstrap();
