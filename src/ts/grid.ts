import { DrawObject } from 'drawObject';

export class Grid {
    private readonly _virtualGridSizeX: number = 360;
    private readonly _virtualGridSizeY: number = 90;
    private readonly _offsetGrid: number = 25;
    private readonly _gridSizeX: number;
    private readonly _gridSizeY: number;
    private readonly _canvaSizeX: number;
    private readonly _canvaSizeY: number;
    private readonly _cellSizeX: number;
    private readonly _cellSizeY: number;
    private readonly _context: CanvasRenderingContext2D;

    private get dX() {
        return this._gridSizeX / (this._virtualGridSizeX / this._cellSizeX);
    }

    private get dY() {
        return this._gridSizeY / (this._virtualGridSizeY / this._cellSizeY);
    }

    constructor(cellWidth: number, cellHeight: number, canvaId: string) {
        let canva = document.getElementById(canvaId) as HTMLCanvasElement;
        let context = canva.getContext("2d");

        this._canvaSizeX = canva.width;
        this._canvaSizeY = canva.height;

        this._gridSizeX = this._canvaSizeX - this._offsetGrid * 2;
        this._gridSizeY = this._canvaSizeY - this._offsetGrid * 2;

        this._cellSizeY = cellHeight;
        this._cellSizeX = cellWidth;

        this._context = context!;

        this.DrawGrid();
    }

    public DrawPlanet(skyObject: DrawObject): void {
        if (skyObject.Y < 0) return;
        let xx = (skyObject.X / this._cellSizeX) * this.dX;
        let yy = ((this._virtualGridSizeY - skyObject.Y) / this._cellSizeY) * this.dY
        this._context.fillStyle = 'green';
        this._context.beginPath();
        this._context.arc((skyObject.X / this._cellSizeX) * this.dX, yy, 5, 0, 2 * Math.PI, false);
        this._context.fill();
        this._context.lineWidth = 1;
        this._context.strokeStyle = '#003300';
        this._context.stroke();
        this.DrawText(xx + 10, yy - 10, skyObject.Name, 20, "green");
    }

    public DrawPlanetCollection(objects: Array<DrawObject>) {
        objects.forEach(p => this.DrawPlanet(p));
    }

    public Clear(): void {
        this._context.clearRect(0, 0, this._canvaSizeX, this._canvaSizeY);
    }

    public DrawGrid() {
        for (let i = 0; i < this._virtualGridSizeX / this._cellSizeX + 1; i++) {
            let step = this.dX * i;
            if ((i * this._cellSizeX) % 90 == 0) {
                this.DrawLine(step, 0, step, this._gridSizeY + 20, 2);
                this.DrawText(step, this._gridSizeY + 40, (i * this._cellSizeX).toString(), 14, "red", "center")
            } else {
                this.DrawLine(step, 0, step, this._gridSizeY + 10);
                this.DrawText(step, this._gridSizeY + 25, (i * this._cellSizeX).toString(), 10, "black", "center")
            }
        }
        for (let i = 0; i < this._virtualGridSizeY / this._cellSizeY + 1; i++) {
            let step = this.dY * i;
            if ((i * this._cellSizeY) % 45 == 0) {
                this.DrawLine(0, step, this._gridSizeX + 20, step, 2);
                this.DrawText(this._gridSizeX + 25, step, (this._virtualGridSizeY - i * this._cellSizeY).toString(), 19, "red")
            }
            else {
                this.DrawLine(0, step, this._gridSizeX + 10, step);
                this.DrawText(this._gridSizeX + 20, step, (this._virtualGridSizeY - i * this._cellSizeY).toString(), 12, "black")
            }
        }
    }

    private DrawLine(x1: number, y1: number, x2: number, y2: number, size: number = 1) {
        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.lineWidth = size;
        this._context.strokeStyle = "#9e9e9e";
        this._context.stroke();
    }

    private DrawText(
        x: number,
        y: number,
        text: string,
        size: number,
        color: string = "black",
        alignVertical: CanvasTextAlign = "start",
        alignHorizontal: CanvasTextBaseline = "middle") {
        this._context.fillStyle = color;
        this._context.font = `bold ${size}px sans-serif`;
        this._context.textAlign = alignVertical;
        this._context.textBaseline = alignHorizontal;
        this._context.fillText(text, x, y);
    }
}
