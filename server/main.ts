import 'reflect-metadata';
import { BadRequestException, Body, Controller, Get, Module, Post } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { cities, isValidAddress } from './mock-data';

@Controller()
class AddressController {
  @Get('cities')
  getCities() {
    return cities;
  }

  @Post('submit')
  submit(@Body() body: unknown) {
    if (!isValidAddress(body)) {
      throw new BadRequestException('A name and a valid city are required.');
    }
    return { success: true };
  }
}

@Module({ controllers: [AddressController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:4200' });
  await app.listen(3000);
}

void bootstrap();
