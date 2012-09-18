var chesscharm = require('./index');
var keypress = require('keypress');
var game = chesscharm();
//game.showBoard({perspective:'black'});
game.showBoard({perspective:'white'});
game.setOpponent({name:'Jamal',color:'black'});
game.setPlayer({name:'David',color:'white'});
game.showOpponent();
game.showPlayer();
game.position(6,6);
keypress(process.stdin);
process.stdin.on('keypress', function(ch,key) {
    if (key !== undefined) {
        switch (key.name) {
            case 'left': 
                    game.setBoundaries('left');
                break;
            case 'right': 
                    game.setBoundaries('right');
                break;
            case 'up': 
                    game.setBoundaries('up');
                break;
            case 'down': 
                    game.setBoundaries('down');
                break;
            case 'space' :
                    game.select();
                break;
            case 'm' : 
                    game.moveSelect();
                break;
            case 'enter' : 
                break;
            default: 
                    game.showBoard();
                break;
        }
    }
});
