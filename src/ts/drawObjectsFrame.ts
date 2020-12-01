import { IDrawObject, DrawObject } from './drawObject'

export interface IDrawObjects {
    time: string;
    skyObject: Array<IDrawObject>
}

export class DrawObjectFrame {
    //TODO заменить на id
    private _dateTime: string;
    private _drawObjects: Array<DrawObject>;
    public constructor(skyInfo: IDrawObjects) {
        this._dateTime = skyInfo.time;
        this._drawObjects = skyInfo.skyObject.map(o => new DrawObject(o));
    }

    public get SkyObjects(): Array<DrawObject> {
        return this._drawObjects;
    }
    public get Time(): string {
        return this._dateTime;
    }
}