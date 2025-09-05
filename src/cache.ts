import { createClient } from "redis";

const redisPort = process.env["REDIS_PORT"]

const redisClient = createClient({
    url: `redis://redis:${redisPort}`
})

redisClient.connect()

export class Cache {

    static async set(code: string, url: string): Promise<void> {
        await redisClient.setEx(code, 120, url)
    }

    static async get(code: string): Promise<string|null> {
        return await redisClient.get(code)
    }

}