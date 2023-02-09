import { DynamicModule, Provider } from '@nestjs/common';
import { InfluxDB } from '@influxdata/influxdb-client'
import { InfluxService } from './influxdb.service';

export interface InfluxModuleOptions {
    /** InfluxDB url */
    url: string;
    /** InfluxDB access token */
    token: string;
    /** When "true", makes a module global-scoped. */
    global: boolean;
}

export const INFLUX_TOKEN = 'INFLUX_TOKEN';

export class InfluxModule {
    static forRoot(options: InfluxModuleOptions): DynamicModule {
        const influxProvider: Provider = {
            provide: INFLUX_TOKEN,
            useFactory: async () => {
                const url = options.url;
                const token = options.token;
                return new InfluxDB({url, token});
            },
        };
        return {
            module: InfluxModule,
            providers: [influxProvider, InfluxService],
            exports: [InfluxService],
            global: options.global,
        }
    }
}