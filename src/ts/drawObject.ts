export interface IDrawObject {
    x: number;
    y: number;
    name: string;
}

export class DrawObject {
    private readonly _x: number;
    private readonly _y: number;
    private readonly _name: string;

    public constructor(obj: IDrawObject) {
        this._name = obj.name;
        this._x = obj.x;
        this._y = obj.y;
    }

    public get X(): number {
        return this._x;
    }
    public get Y(): number {
        return this._y;
    }
    public get Name(): string {
        return this._name;
    }
    public get IsVisible(): boolean {
        if (this._y > 0) return true;
        return false;
    }
}