function Bot () {
}
Bot.prototype.place = function(cell) {
    this.pic = new Kinetic.Group({
        x: cell.center().x,
        y: cell.center().y,
        rotationDeg: 0
    });
    this.cell = cell;
    this.dir = 0; // values: 0 1 2 3

    this.pic.add(this.body()).add(this.eyes());
    //this.pic.add(this.eyes());
    this.pic.setScale(cell.map.cellSize);
    this.pic.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    this.pic.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });
    cell.map.pic.add(this.pic);
    cell.map.layer.draw();
};
Bot.prototype.body = function() {
    // scaled to fit in 1x1
    var mid = 0.45;
    var jig = 0.1;
    var randDim = function() {
        return mid*(1 - jig + 2*Math.random()*jig); 
    };

    return new Kinetic.Polygon({
        points: [0, -randDim(),
                 randDim(), 0,
                 0, randDim(),
                 -randDim(), 0],
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 0.05
    }); 
};
Bot.prototype.eyes = function() {
    // scaled to fit in 1x1 
    function eye(x) {
        return new Kinetic.Circle({
            x: x,
            y: 0,
            radius: 0.04,   
            fill: 'black'
        });
    }
    var eyes = new Kinetic.Group({
        x: 0,
        y: -0.25,
        rotationDeg: 0
    });
    eyes.add(eye(0.05)).add(eye(-0.05));
    return eyes;
};
Bot.prototype.moveTo = function(cell) {
    this.cell = cell;
    (new Kinetic.Tween({
        node: this.pic,
        x: cell.center().x,
        y: cell.center().y,
        duration: 0.1
    })).play();
};
Bot.prototype.move = function() {
    this.moveTo(this.cell.plusDir(this.dir));
}
Bot.prototype.turnTo = function(rad) {
    (new Kinetic.Tween({
        node: this.pic,
        rotation: rad,
        duration: 0.1
    })).play();
}
Bot.prototype.turn = function(ddir) {
    this.dir = Cell.fixDir(this.dir + ddir);
    this.turnTo(this.pic.getRotation() + ddir*Math.PI/2);
};

