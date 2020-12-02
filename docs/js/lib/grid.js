export class Grid {
    constructor(cellWidth, cellHeight, canvaId) {
        this._virtualGridSizeX = 360;
        this._virtualGridSizeY = 90;
        this._offsetGrid = 25;
        let canva = document.getElementById(canvaId);
        let context = canva.getContext("2d");
        this._canvaSizeX = canva.width;
        this._canvaSizeY = canva.height;
        this._gridSizeX = this._canvaSizeX - this._offsetGrid * 2;
        this._gridSizeY = this._canvaSizeY - this._offsetGrid * 2;
        this._cellSizeY = cellHeight;
        this._cellSizeX = cellWidth;
        this._context = context;
        this.DrawGrid();
    }
    get dX() {
        return this._gridSizeX / (this._virtualGridSizeX / this._cellSizeX);
    }
    get dY() {
        return this._gridSizeY / (this._virtualGridSizeY / this._cellSizeY);
    }
    DrawPlanet(skyObject) {
        if (skyObject.Y < 0)
            return;
        let xx = (skyObject.X / this._cellSizeX) * this.dX;
        let yy = ((this._virtualGridSizeY - skyObject.Y) / this._cellSizeY) * this.dY;
        this._context.fillStyle = 'green';
        this._context.beginPath();
        this._context.arc((skyObject.X / this._cellSizeX) * this.dX, yy, 5, 0, 2 * Math.PI, false);
        this._context.fill();
        this._context.lineWidth = 1;
        this._context.strokeStyle = '#003300';
        this._context.stroke();
        this.DrawText(xx + 10, yy - 10, skyObject.Name, 20, "green");
    }
    DrawPlanetCollection(objects) {
        objects.forEach(p => this.DrawPlanet(p));
    }
    Clear() {
        this._context.clearRect(0, 0, this._canvaSizeX, this._canvaSizeY);
    }
    DrawGrid() {
        for (let i = 0; i < this._virtualGridSizeX / this._cellSizeX + 1; i++) {
            let step = this.dX * i;
            if ((i * this._cellSizeX) % 90 == 0) {
                this.DrawLine(step, 0, step, this._gridSizeY + 20, 2);
                this.DrawText(step, this._gridSizeY + 40, (i * this._cellSizeX).toString(), 14, "red", "center");
            }
            else {
                this.DrawLine(step, 0, step, this._gridSizeY + 10);
                this.DrawText(step, this._gridSizeY + 25, (i * this._cellSizeX).toString(), 10, "black", "center");
            }
        }
        for (let i = 0; i < this._virtualGridSizeY / this._cellSizeY + 1; i++) {
            let step = this.dY * i;
            if ((i * this._cellSizeY) % 45 == 0) {
                this.DrawLine(0, step, this._gridSizeX + 20, step, 2);
                this.DrawText(this._gridSizeX + 25, step, (this._virtualGridSizeY - i * this._cellSizeY).toString(), 19, "red");
            }
            else {
                this.DrawLine(0, step, this._gridSizeX + 10, step);
                this.DrawText(this._gridSizeX + 20, step, (this._virtualGridSizeY - i * this._cellSizeY).toString(), 12, "black");
            }
        }
    }
    DrawLine(x1, y1, x2, y2, size = 1) {
        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.lineWidth = size;
        this._context.strokeStyle = "#9e9e9e";
        this._context.stroke();
    }
    DrawText(x, y, text, size, color = "black", alignVertical = "start", alignHorizontal = "middle") {
        this._context.fillStyle = color;
        this._context.font = `bold ${size}px sans-serif`;
        this._context.textAlign = alignVertical;
        this._context.textBaseline = alignHorizontal;
        this._context.fillText(text, x, y);
    }
}
