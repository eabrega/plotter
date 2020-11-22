///<reference path="grid.ts"/>
///<reference path="drawObject.ts"/>
///<reference path="drawObjectsFrame.ts"/>
namespace Plotter {
    export interface IPlotterOptions {
        cellSizeX: number;
        cellSizeY: number;
    }
    export class Map {
        private readonly _grid: Grid;
        private _skyInfo: Array<DrawObjectFrame> | null = null;
        private _motionIndex: number = 0;
        private _i: number = 0;

        constructor(options: IPlotterOptions) {
            this._grid = new Grid(options.cellSizeX, options.cellSizeY, "canva");
        }

        private get NextObject(): DrawObjectFrame | null {
            if (this._skyInfo == null || this._motionIndex > this._skyInfo.length) return null;
            return this._skyInfo[this._motionIndex++];
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

        public set UpdateDataset(objects: Array<IDrawObjects>) {
            this._skyInfo = objects.map(obj => new DrawObjectFrame(obj));
            this._grid.DrawPlanetCollection(this._skyInfo[0].SkyObjects);
        }
    }
}