function Bot () {
}
Bot.prototype.setCell = function(cell) {
    if (this.cell) {
        this.cell.content = null;
    }
    cell.content = this;
    this.cell = cell;
}
Bot.prototype.place = function(cell) {
    this.pic = new Kinetic.Group({
        x: cell.center().x,
        y: cell.center().y,
        rotationDeg: 0
    });
    this.setCell(cell);
    this.dir = 0; // values: 0 1 2 3

    this.pic.body = this.body();
    this.pic.eyes = this.eyes();
    this.pic.add(this.pic.body).add(this.pic.eyes);
    this.pic.setScale(Map.cellSize);

    this.pic.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    this.pic.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    me = this;
    this.pic.on('click', function(evt) {
        Game.focus(me);
        evt.cancelBubble = true;
    });

    Map.pic.add(this.pic);
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
        strokeWidth: 0.05,
        shadowColor: 'black',
        shadowBlur: 5,
        shadowOffset: 0,
        shadowOpacity: 0.8,
        shadowEnabled: false
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
    this.setCell(cell);
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
Bot.prototype.focus = function() {
    this.pic.body.setShadowEnabled(true);
}
Bot.prototype.blur = function() {
    this.pic.body.setShadowEnabled(false);
}
