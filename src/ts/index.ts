import { Grid } from './grid' 
import { DrawObjectFrame, IDrawObjects } from './drawObjectsFrame'

export interface IPlotterOptions {
    cellSizeX: number;
    cellSizeY: number;
}
export class Plotter {
    private readonly _grid: Grid;
    private _frames: Array<DrawObjectFrame> | null = null;
    private _motionIndex: number = 0;
    private _i: number = 0;

    constructor(options: IPlotterOptions) {
        this._grid = new Grid(options.cellSizeX, options.cellSizeY, "canva");
    }

    private get NextObject(): DrawObjectFrame | null {
        if (this._frames == null || this._motionIndex > this._frames.length) return null;
        return this._frames[this._motionIndex++];
    }

    public ClearMap() {
        this._grid.Clear();
        this._grid.DrawGrid();
    }

    public Run() {
        this._motionIndex = 0;
        this._i = setInterval(() => {
            let nexElement = this.NextObject;

            if (nexElement == null) {
                clearInterval(this._i);
                return;
            } else {
                this._grid.Clear();
                this._grid.DrawGrid();
                this._grid.DrawPlanetCollection(nexElement.SkyObjects);
            }

        }, 150);
    }

    public DataFrameSelect(frameId: number) {
        if (isNaN(Number(frameId))) {
            throw new Error(`FrameId mast be integer!`)
        }

        const id = Number(frameId);

        if (id > this._frames!.length - 1) {
            throw new Error(`Frame with id ${frameId} no found.`);
        }
        this._grid.Clear();
        this._grid.DrawGrid();
        this._grid.DrawPlanetCollection(this._frames![frameId].SkyObjects);
    }

    public set UpdateDataset(objects: Array<IDrawObjects>) {
        this._frames = objects.map(obj => new DrawObjectFrame(obj));
        this._grid.DrawPlanetCollection(this._frames[0].SkyObjects);
    }
}
