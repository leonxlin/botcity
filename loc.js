function Loc(x, y) {
    this.x = x;
    this.y = y;
}
Loc.prototype.plus = function(loc) {
    return new Loc(this.x + loc.x, this.y + loc.y);
}

function Map(layer, nr, nc) {
    this.layer = layer;
    this.nr = nr;
    this.nc = nc;
    this.cellSize = 40;
    this.pic = new Kinetic.Group({
        x: 20,
        y: 20
    });

    this.cells = new Array(nr);
    for (i=0; i<nc; i++) {
        this.cells[i] = new Array(nc);
    }

    layer.add(this.pic);
}
Map.prototype.cell = function(r, c) {
    r = r >= this.nr ? this.nr-1 : (r < 0 ? 0 : r);
    c = c >= this.nc ? this.nc-1 : (c < 0 ? 0 : c);
    if (!this.cells[r][c]) {
       this.cells[r][c] = new Cell(this, r, c); 
    }
    return this.cells[r][c];
}
Map.prototype.drawGrid = function() {
    for (r=0; r<=this.nr; r++) {
        for (c=0; c<=this.nc; c++) {
            this.pic.add(new Kinetic.Circle({
                x: r*this.cellSize,
                y: c*this.cellSize,
                radius: 1,
                fill: 'gray',
                strokeWidth: 0
            }));
        }
    } 
    this.layer.draw();
}

function Cell(map, r, c) {
    this.map = map;
    this.r = r;
    this.c = c;
}
Cell.dirDeltas = [[-1,0],[0,1],[1,0],[0,-1]];
Cell.prototype.plusDir = function(dir) {
    delta = Cell.dirDeltas[dir];
    return this.map.cell(this.r + delta[0], this.c + delta[1]);
}
Cell.fixDir = function(d) {
    return (d%4 + 4)%4;
}

Cell.prototype.topLeft = function() {
    return new Loc(this.map.cellSize*this.c, this.map.cellSize*this.r);
};

Cell.prototype.center = function() {
    return this.topLeft().plus(
        new Loc(this.map.cellSize/2, this.map.cellSize/2));
};

