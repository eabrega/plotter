import { DrawObject } from './drawObject';
export class DrawObjectFrame {
    constructor(skyInfo) {
        this._dateTime = skyInfo.time;
        this._drawObjects = skyInfo.skyObject.map(o => new DrawObject(o));
    }
    get SkyObjects() {
        return this._drawObjects;
    }
    get Time() {
        return this._dateTime;
    }
}
//# sourceMappingURL=drawObjectsFrame.js.map