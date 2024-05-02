import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Testando swagger")
  .setDescription("Api 1 para testar")
  .setVersion('1.0')
  .addTag('users')
  .build()
  const document = SwaggerModule.createDocument(app , config)
  SwaggerModule.setup('api' , app , document)

  const option = new DocumentBuilder().addBasicAuth()
  await app.listen(process.env.PORT);
}
bootstrap();
