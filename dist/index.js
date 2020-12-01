import { Grid } from './grid';
import { DrawObjectFrame } from './drawObjectsFrame';
export class Plotter {
    constructor(options) {
        this._frames = null;
        this._motionIndex = 0;
        this._i = 0;
        this._grid = new Grid(options.cellSizeX, options.cellSizeY, "canva");
    }
    get NextObject() {
        if (this._frames == null || this._motionIndex > this._frames.length)
            return null;
        return this._frames[this._motionIndex++];
    }
    ClearMap() {
        this._grid.Clear();
        this._grid.DrawGrid();
    }
    Run() {
        this._motionIndex = 0;
        this._i = setInterval(() => {
            let nexElement = this.NextObject;
            if (nexElement == null) {
                clearInterval(this._i);
                return;
            }
            else {
                this._grid.Clear();
                this._grid.DrawGrid();
                this._grid.DrawPlanetCollection(nexElement.SkyObjects);
            }
        }, 150);
    }
    DataFrameSelect(frameId) {
        if (isNaN(Number(frameId))) {
            throw new Error(`FrameId mast be integer!`);
        }
        const id = Number(frameId);
        if (id > this._frames.length - 1) {
            throw new Error(`Frame with id ${frameId} no found.`);
        }
        this._grid.Clear();
        this._grid.DrawGrid();
        this._grid.DrawPlanetCollection(this._frames[frameId].SkyObjects);
    }
    set UpdateDataset(objects) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this._grid.DrawPlanetCollection(this._frames[0].SkyObjects);
    }
}
//# sourceMappingURL=index.js.map