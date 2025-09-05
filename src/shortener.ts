import { Cache } from "./cache";
import { IUrlShortenerDB } from "./db/db.interface";

function genRandomStr(len: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < len; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

export class Shortener {

    constructor(readonly db: IUrlShortenerDB) { }

    async saveUrl(url: string): Promise<string> {
        const randomCode = genRandomStr(5);
        await this.db.saveUrl(randomCode, url)
        return randomCode
    }

    async searchByCode(code: string): Promise<string> {
        let url = await Cache.get(code)
        
        if (url)
            return url;

        url = await this.db.fetchUrl(code)
        await Cache.set(code, url)
        return url
    }

    async deleteExpiredUrls() {
        await this.db.deleteExpiredUrl()
    }

}
