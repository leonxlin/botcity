var Game = {
    bots: [],
    init: function() {
        this.stage = new Kinetic.Stage({
            container: 'map',
            width: 800,
            height: 800
        });
        
        this.layer = new Kinetic.Layer();
        this.stage.add(this.layer);

        Map.init();

        bot = new Bot();
        bot.place(Map.cell(5,5));

        this.draw();
    },
    focus: function(obj) {
        if (this.focusedObj) {
            this.focusedObj.blur();
        }
        obj.focus();
        this.focusedObj = obj;
        this.draw();
    },
    draw: function() {
        this.layer.draw();
    }
};

Game.init();



