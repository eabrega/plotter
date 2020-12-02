export class DrawObject {
    constructor(obj) {
        this._name = obj.name;
        this._x = obj.x;
        this._y = obj.y;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get Name() {
        return this._name;
    }
    get IsVisible() {
        if (this._y > 0)
            return true;
        return false;
    }
}
