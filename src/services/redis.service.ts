import {createClient} from 'redis';
import * as process from "node:process";

class RedisService {
    private client: any;

    constructor() {

    }

    public async connectRedis() {

        this.client = createClient({
            password: process.env.REDIS_PASWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT)
            }
        });

        this.client.on('error', (err: Error | null) => console.log('Redis Client Error', err));
        await this.client.connect();

        return this.client;
    }

    public async closeRedis() {
        if (this.client) {
            await this.client.quit();
        }
    }
}

export {RedisService}
