var chesscharm = require('./index');
var keypress = require('keypress');
var game = chesscharm();
//game.showBoard({perspective:'black'});
game.showBoard({perspective:'white'});
game.setOpponent({name:'Jamal',color:'black'});
game.setPlayer({name:'David',color:'white'});
game.showOpponent();
game.showPlayer();
keypress(process.stdin);
process.stdin.on('keypress', function(ch,key) {
    if (key !== undefined) {
        switch (key.name) {
            case 'left': 
                    game.setBoundaries();
                break;
            case 'right': 
                    game.setBoundaries();
                break;
            case 'up': 
                    game.setBoundaries();
                break;
            case 'down': 
                    game.setBoundaries();
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
