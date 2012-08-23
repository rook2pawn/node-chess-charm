[![build status](https://secure.travis-ci.org/rook2pawn/node-chess-charm.png)](http://travis-ci.org/rook2pawn/node-chess-charm)
![chess-charm](https://github.com/rook2pawn/node-chess-charm/raw/master/screen.png)

chess-charm
===========

    var chessCharm = require('chess-charm');

    var board = chessCharm()
        .showBoard()
        .setBlackName('jamal')
        .setWhiteName('Johannes');
        
        board
            .move('e2e4')
            .move('e7e5')
            .move('g1f3')
            .move('d7d6')
            .move('f1b5')
            .move('b8c6')
            .move('e1g1')
            .showBoard();


Draw chess positions, make moves, and see a chess board in beautiful ansi + unicode chess fonts!

Methods
=======

.move(movestring)
-----------------
Updates the board with the move (given in Modified Standard Algebraic Notation)

.updateBoard(board) 
-------------------
Updates the board completely with the supplied board.

.showBoard()
------------
Shows the board as it currently stands.

.setBlackName(name)
-------------------
Sets the black player's name.

.setWhiteName(name)
-------------------
Sets the white player's name.



Cycle colors
============

Push "c"

Exit 
====

Push "CTRL + C"

CREDITS
=======

chess-charm was done in [Charm](https://github.com/substack/node-charm) by [Substack](https://github.com/substack)
