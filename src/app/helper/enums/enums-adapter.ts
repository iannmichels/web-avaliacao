export default class EnumAdapter<T> {

    private readonly _map = {};

    constructor(public readonly entries: EnumNameValuePair<T>[]) {
        entries.forEach(entry => {
            this._map[entry.value] = entry.name;
            this._map[entry.name] = entry.value;
        });
    }

    public static toEnumAdapter<T>(enumType: object): EnumAdapter<T> {
        const enumNameValuePairs = Object.entries(enumType).map(entry => {
            return ({ name: entry[0], value: entry[1] });
        });
        return new EnumAdapter(enumNameValuePairs);
    }

  public for(enumEntry: T | string): string {
        return this._map['' + enumEntry] || '';
    }

}

export interface EnumNameValuePair<T> {
    readonly name: string;
    readonly value: string;
}
