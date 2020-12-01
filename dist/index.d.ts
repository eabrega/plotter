import { IDrawObjects } from './drawObjectsFrame';
export interface IPlotterOptions {
    cellSizeX: number;
    cellSizeY: number;
}
export declare class Plotter {
    private readonly _grid;
    private _frames;
    private _motionIndex;
    private _i;
    constructor(options: IPlotterOptions);
    private get NextObject();
    ClearMap(): void;
    Run(): void;
    DataFrameSelect(frameId: number): void;
    set UpdateDataset(objects: Array<IDrawObjects>);
}
