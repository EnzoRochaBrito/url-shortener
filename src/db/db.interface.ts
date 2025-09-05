export interface IUrlShortenerDB {
    init(): Promise<IUrlShortenerDB>
    saveUrl(code: string, url: string): Promise<void>
    fetchUrl(code: string): Promise<string>
    deleteExpiredUrl(): Promise<void>
}