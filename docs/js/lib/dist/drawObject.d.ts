export interface IDrawObject {
    x: number;
    y: number;
    name: string;
}
export declare class DrawObject {
    private readonly _x;
    private readonly _y;
    private readonly _name;
    constructor(obj: IDrawObject);
    get X(): number;
    get Y(): number;
    get Name(): string;
    get IsVisible(): boolean;
}
