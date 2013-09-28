(function() {
    var stage = new Kinetic.Stage({
        container: 'map',
        width: 800,
        height: 800
    });
    
    var layer = new Kinetic.Layer();
    stage.add(layer);

    map = new Map(layer, 10, 10);
    map.drawGrid();

    bot = new Bot();
    cell = map.cell(3,3);
    bot.place(cell);
})();

