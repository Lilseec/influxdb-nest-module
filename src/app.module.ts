import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluxModule } from './influxdb/influxdb.module';

@Module({
  imports: [InfluxModule.forRoot({
    url: 'http://localhost:8086/',
    token: '8-LBH6AzX2QrX2JFJ6rLXXxPkPGnH3_gMAIvrnSa_gjNNcR2V2sQr3KiU3GJHz35WudF8kv612GLNozjQAyvPQ==',
    global: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
