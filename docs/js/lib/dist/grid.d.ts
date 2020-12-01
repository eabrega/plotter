import { DrawObject } from 'drawObject';
export declare class Grid {
    private readonly _virtualGridSizeX;
    private readonly _virtualGridSizeY;
    private readonly _offsetGrid;
    private readonly _gridSizeX;
    private readonly _gridSizeY;
    private readonly _canvaSizeX;
    private readonly _canvaSizeY;
    private readonly _cellSizeX;
    private readonly _cellSizeY;
    private readonly _context;
    private get dX();
    private get dY();
    constructor(cellWidth: number, cellHeight: number, canvaId: string);
    DrawPlanet(skyObject: DrawObject): void;
    DrawPlanetCollection(objects: Array<DrawObject>): void;
    Clear(): void;
    DrawGrid(): void;
    private DrawLine;
    private DrawText;
}
