import { Inject, Injectable } from '@nestjs/common';
import { INFLUX_TOKEN } from './influxdb.module';
import { InfluxDB, Point, WriteOptions, WritePrecisionType , WriteApi, QueryOptions, QueryApi} from '@influxdata/influxdb-client'


@Injectable()
export class InfluxService {
    constructor(@Inject(INFLUX_TOKEN) private InfluxDB: InfluxDB) {}

    /**
     * Creates WriteApi for the supplied organization and bucket. BEWARE that returned instances must be closed
     * in order to flush the remaining data and close already scheduled retry executions.
     *
     * @remarks
     * Use {@link WriteOptions} to customize retry strategy options, data chunking
     * and flushing options. See {@link DEFAULT_WriteOptions} to see the defaults.
     *
     * See also {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/write.mjs | write example},
     * {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/writeAdvanced.mjs | writeAdvanced example},
     * and {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/index.html | browser example}.
     *
     * @param org - Specifies the destination organization for writes. Takes either the ID or Name interchangeably.
     * @param bucket - The destination bucket for writes.
     * @param precision - Timestamp precision for line items.
     * @param writeOptions - Custom write options.
     * @returns WriteApi instance
     */
    getWriteApi(org: string, bucket: string, precision?: WritePrecisionType, writeOptions?: Partial<WriteOptions>): WriteApi {
        return this.InfluxDB.getWriteApi(org, bucket, precision, writeOptions);
    }

    /**
     * Creates QueryApi for the supplied organization .
     *
     * @remarks
     * See also {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/query.ts | query.ts example},
     * {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/queryWithParams.mjs | queryWithParams.mjs example},
     * {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/rxjs-query.ts | rxjs-query.ts example},
     * and {@link https://github.com/influxdata/influxdb-client-js/blob/master/examples/index.html | browser example},
     *
     * @param org - organization or query options
     * @returns QueryApi instance
     */
    getQueryApi(org: string | QueryOptions): QueryApi {
        return this.InfluxDB.getQueryApi(org);
    }

    /**
     * Create a new Point with specified a measurement name.
     *
     * @param measurementName - the measurement name
     */
    createPoint(measurementName?: string) {
        return new Point(measurementName)
    }
}

