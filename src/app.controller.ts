import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':temperature')
  writeTemperature(@Param() params): string {
    return this.appService.writeTemperature(params);
  }
}
