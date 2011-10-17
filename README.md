chess-charm
===========

    var chessCharm = require('chess-charm');

    var board = chessCharm()
        .showBoard()
        .setBlackName('jamal')
        .setWhiteName('Johannes');
        
        board
            .move('e2e4');
            .showBoard();


Draw chess positions, make moves, and see a chess board in beautiful ansi + unicode chess fonts!

Cycle colors
============

Push "c"

Exit 
====

Push "CTRL + C"

CREDITS
=======

chess-charm was done in [Charm](https://github.com/substack/node-charm) by [Substack](https://github.com/substack)
