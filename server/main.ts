import 'reflect-metadata';
import { BadRequestException, Body, Controller, Get, Module, Post } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

const cities = [
  { id: 1, name: 'Jerusalem' },
  { id: 2, name: 'Tel Aviv' },
  { id: 3, name: 'Haifa' },
  { id: 4, name: 'Rishon LeZion' },
  { id: 5, name: 'Petah Tikva' },
  { id: 6, name: 'Ashdod' },
  { id: 7, name: 'Netanya' },
  { id: 8, name: 'Beersheba' },
  { id: 9, name: 'Bnei Brak' },
  { id: 10, name: 'Holon' },
  { id: 11, name: 'Ramat Gan' },
  { id: 12, name: 'Ashkelon' },
  { id: 13, name: 'Rehovot' },
  { id: 14, name: 'Bat Yam' },
  { id: 15, name: 'Beit Shemesh' },
  { id: 16, name: 'Kfar Saba' },
  { id: 17, name: 'Herzliya' },
  { id: 18, name: 'Hadera' },
  { id: 19, name: 'Modiin-Maccabim-Reut' },
  { id: 20, name: 'Nazareth' },
];

@Controller()
class AddressController {
  @Get('cities')
  getCities() {
    return cities;
  }

  @Post('submit')
  submit(@Body() body: unknown) {
    const data = body as { username?: unknown; city?: unknown } | null;
    if (
      !data ||
      typeof data.username !== 'string' ||
      !data.username.trim() ||
      typeof data.city !== 'string' ||
      !cities.some((city) => city.name === data.city)
    ) {
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
