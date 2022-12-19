import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { CoreModule } from "./core/core.module";
import {IDatabaseConfig} from "./core/data/configs/database.config";
import {ConfigKey} from "./core/data/configs/config-keys";
import {IAppConfig} from "./core/data/configs/app.config";


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      CoreModule,
      new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const appConfig = await configService.get<IAppConfig>(ConfigKey.APP)

  useContainer(app.select(CoreModule), { fallbackOnErrors: true });

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Booking REST API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);



  await app.listen(process.env.SERVER_PORT ?? appConfig.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
