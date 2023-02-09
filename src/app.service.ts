import { Injectable } from '@nestjs/common';
import { InfluxService } from './influxdb/influxdb.service';

@Injectable()
export class AppService {
  constructor(private influxService: InfluxService) {}

  writeTemperature(params): string {
    const writeApi = this.influxService.getWriteApi('Dyvo', 'Test');

    const point = this.influxService.createPoint('temperature')
        .tag('sensor_id', 'TLM010')
        .floatField('value', params.temperature);
  
    writeApi.writePoint(point);
    writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })

    return `Temperature written, value - ${params.temperature}`;
  }
}
