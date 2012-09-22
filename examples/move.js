var chessCharm = require('../index.js');
var board = chessCharm();
board.setOpponent({name:'jamal',color:'black'})
board.setPlayer({name:'Johannes',color:'white'})
board.showOpponent()
board.showPlayer();
board.showBoard();
setTimeout(function() {
    board.move('e2e4');
    setTimeout(function() {
        board.move('e7e5');
        setTimeout(function() {
            board.move('g1f3');
            setTimeout(function() {
                board.move('d7d6');
                setTimeout(function() {
                    board.move('f1b5');
                    setTimeout(function() {
                        board.move('b8c6');
                        setTimeout(function() {
                            board.move('e1g1');
                        },1000);
                    },1000);
                },1000);
            },1000);
        },1000);
    },1000);
},1000);
