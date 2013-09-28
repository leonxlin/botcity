function Bot () {
}
Bot.prototype.place = function(cell) {
    this.pic = new Kinetic.Group({
        x: cell.center().x,
        y: cell.center().y,
        rotationDeg: 0
    });

    body = this.body()
    body.setScale(cell.map.cellSize);
    this.pic.add(body);
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
        strokeWidth: 0.1
    }); 
};
//Bot.prototype.moveTo = function(loc) {
//    (new Kinetic.Tween({
//        node: this.pic,
//        x: loc.x,
//        y: loc.y,
//        duration: 0.3
//    })).play();
//};
//Bot.prototype.moveBy = function(dir) {
//    this.moveTo(this.loc().plus(dir));
//};

