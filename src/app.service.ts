import { Injectable } from '@nestjs/common';
import { InfluxService } from './influxdb/influxdb.service';


@Injectable()
export class AppService {
  constructor(private influxService: InfluxService) {}

  getHello(): string {
    const writeApi = this.influxService.getWriteApi('Dyvo', 'Test');

    const point = this.influxService.createPoint('node')
        .tag('sensor_id', 'TLM010')
        .floatField('value', 80);
  
    writeApi.writePoint(point);
    writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })

    return 'Hello World!';
  }
}
