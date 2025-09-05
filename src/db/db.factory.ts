import { IUrlShortenerDB } from "./db.interface";
import { UrlPostgreDB } from "./db.postgresql";

type DBTypes = 'postgre'

export class DBFactory {
    public static async build(db: DBTypes = 'postgre'): Promise<IUrlShortenerDB> {
        switch (db) {
            case 'postgre':
                return await new UrlPostgreDB().init();
                break;
        }
        return new UrlPostgreDB()
    }
}