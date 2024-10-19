import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Укажите домен вашего фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если вам нужно передавать куки или авторизационные заголовки
  };

  app.enableCors(corsOptions);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
