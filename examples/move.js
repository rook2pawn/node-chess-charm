var chessCharm = require('../index.js');
var board = chessCharm().showBoard().setBlackName('jamal');
board.setWhiteName('Johannes').done();
setTimeout(function() {
    board.move('e2e4');
    board.showBoard();
    setTimeout(function() {
        board.move('e7e5');
        board.showBoard();
        setTimeout(function() {
            board.move('g1f3');
            board.showBoard();
            setTimeout(function() {
                board.move('d7d6');
                board.showBoard();
                setTimeout(function() {
                    board.move('f1b5');
                    board.showBoard();
                    setTimeout(function() {
                        board.move('b8c6');
                        board.showBoard();
                        setTimeout(function() {
                            board.move('e1g1');
                            board.showBoard();
                        },1000);
                    },1000);
                },1000);
            },1000);
        },1000);
    },1000);
},1000);
