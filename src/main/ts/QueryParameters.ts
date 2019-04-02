class QueryParameters {
    private _baseUrl: string;
    private _page: string;
    private _id: string;

    constructor() {
        this._baseUrl = ScriptApp.getService().getUrl();
    }

    public get baseUrl(): string {
        return this._baseUrl;
    }

    public get page(): string {
        return this._page;
    }

    public set page(page: string) {
        this._page = page;
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }
}
