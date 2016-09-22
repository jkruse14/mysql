
import Query = require('./protocol/sequences/Query');
import {OkPacket, RowDataPacket, FieldPacket} from './protocol/packets/index';
import Connection = require('./Connection');
import {EventEmitter} from 'events';

declare namespace Pool {

    export interface PoolOptions extends Connection.ConnectionOptions {
        /**
         * The milliseconds before a timeout occurs during the connection acquisition. This is slightly different from connectTimeout,
         * because acquiring a pool connection does not always involve making a connection. (Default: 10 seconds)
         */
        acquireTimeout?: number;

        /**
         * Determines the pool's action when no connections are available and the limit has been reached. If true, the pool will queue
         * the connection request and call it when one becomes available. If false, the pool will immediately call back with an error.
         * (Default: true)
         */
        waitForConnections?: boolean;

        /**
         * The maximum number of connections to create at once. (Default: 10)
         */
        connectionLimit?: number;

        /**
         * The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there
         * is no limit to the number of queued connection requests. (Default: 0)
         */
        queueLimit?: number;
    }
}

declare class Pool extends EventEmitter {

    config: Pool.PoolOptions;

    getConnection(callback: (err: NodeJS.ErrnoException, connection: Connection) => any): void;

    query(sql: string, callback?: (err: Query.QueryError, result: RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[], fields: FieldPacket[]) => any): Query;
    query(sql: string, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError, result: RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[], fields: FieldPacket[]) => any): Query;
    query(options: Query.QueryOptions, callback?: (err: Query.QueryError, result: RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[], fields: FieldPacket[]) => any): Query;
    query(options: Query.QueryOptions, values: any | any[] | { [param: string]: any }, callback?: (err: Query.QueryError, result: RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[], fields: FieldPacket[]) => any): Query;

    end(callback?: (err: NodeJS.ErrnoException, ...args: any[]) => any): void;

    on(event: string, listener: Function): this;
    on(event: 'connection', listener: (connection: Connection) => any): this;
}

export = Pool;