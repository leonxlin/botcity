function Loc(x, y) {
    this.x = x;
    this.y = y;
}
Loc.prototype.plus = function(loc) {
    return new Loc(this.x + loc.x, this.y + loc.y);
}

var Map = {
    nr: 10,
    nc: 10,
    cellSize: 40,
    init: function() {
        this.pic = new Kinetic.Group({
            x: 20,
            y: 20
        });
        Game.layer.add(this.pic);

        this.cells = new Array(this.nr);
        for (i=0; i<this.nc; i++) {
            this.cells[i] = new Array(this.nc);
        }

        this.drawGrid();

        this.pic.on('click', function() {
            Game.focus(Map);
        });
    },
    cell: function(r, c) {
        r = r >= this.nr ? this.nr-1 : (r < 0 ? 0 : r);
        c = c >= this.nc ? this.nc-1 : (c < 0 ? 0 : c);
        if (!this.cells[r][c]) {
           this.cells[r][c] = new Cell(r, c); 
        }
        return this.cells[r][c];
    },
    drawGrid: function() {

        this.pic.add(new Kinetic.Rect({
            x: 0,
            y: 0,
            width: this.nr*this.cellSize,
            height: this.nc*this.cellSize,
            fill: 'white',
        }));

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
    },
    focus: function() {},
    blur: function() {}
};


function Cell(r, c) {
    this.r = r;
    this.c = c;
}
Cell.dirDeltas = [[-1,0],[0,1],[1,0],[0,-1]];
Cell.prototype.plusDir = function(dir) {
    delta = Cell.dirDeltas[dir];
    return Map.cell(this.r + delta[0], this.c + delta[1]);
}
Cell.fixDir = function(d) {
    return (d%4 + 4)%4;
}

Cell.prototype.topLeft = function() {
    return new Loc(Map.cellSize*this.c, Map.cellSize*this.r);
};

Cell.prototype.center = function() {
    return this.topLeft().plus(
        new Loc(Map.cellSize/2, Map.cellSize/2));
};

