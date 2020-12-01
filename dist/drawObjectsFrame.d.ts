import { IDrawObject, DrawObject } from './drawObject';
export interface IDrawObjects {
    time: string;
    skyObject: Array<IDrawObject>;
}
export declare class DrawObjectFrame {
    private _dateTime;
    private _drawObjects;
    constructor(skyInfo: IDrawObjects);
    get SkyObjects(): Array<DrawObject>;
    get Time(): string;
}
