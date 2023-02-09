## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage
Register module:
```typescript
import { InfluxModule } from './influxdb/influxdb.module';

@Module({
  imports: [
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
```
Get access to `InfluxService` in some your service:
```typescript
import { InfluxService } from './influxdb/influxdb.service';

@Injectable()
export class AppService {
  constructor(private influxService: InfluxService) {}

  writeTemperature(params): string {
    const writeApi = this.influxService.getWriteApi('OrgName', 'BucketName');

    const point = this.influxService.createPoint('temperature')
        .tag('sensor_id', 'TLM010')
        .floatField('value', 79);
  
    writeApi.writePoint(point);
    writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })

    return 'Temperature written, value - 79';
  }
}
```