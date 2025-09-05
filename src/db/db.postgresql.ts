import { IUrlShortenerDB } from "./db.interface";
import { Pool } from "pg";

export class UrlPostgreDB implements IUrlShortenerDB {

    pool: Pool

    constructor() {

        const user     = process.env["DB_USER"]
        const password = process.env["DB_PASSWORD"]
        const host     = process.env["DB_HOST"]
        const port     = Number(process.env["DB_PORT"])
        const name     = process.env["DB_NAME"]

        this.pool = new Pool({
            user: user,
            host: host,
            database: name,
            password: password,
            port: port,
        });
    }

    async init(): Promise<IUrlShortenerDB> {
        try {
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS url_code (
                  code VARCHAR(5) UNIQUE NOT NULL,
                  url TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT NOW()
                );
            `);
            return this
        } catch (error) {
            console.log('could not create table: ', error)
            throw error
        }
    }

    async saveUrl(code: string, url: string): Promise<void> {
        try {
            await this.pool.query("INSERT INTO url_code (code, url) VALUES ($1, $2)", [code, url])
        } catch (error) {
            throw new Error(`${code} is already in use!`)
        }
    }

    async fetchUrl(code: string): Promise<string> {
        const url = await this.pool.query<{url: string}>("SELECT url FROM url_code WHERE code = $1", [code])
        if (url) {return url.rows[0].url};
        throw new Error('no url was found')
    }

    async deleteExpiredUrl(): Promise<void> {
        try {
            this.pool.query("DELETE FROM urls WHERE created_at < NOW() - INTERVAL '1 hour';")
        } catch (error) {
            console.log('error when deleteing expired urls: ', error)
        }
    }
}