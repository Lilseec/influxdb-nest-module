import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluxModule } from './influxdb/influxdb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfluxModule.forRoot({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    global: true,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
