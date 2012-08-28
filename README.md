![chess-charm](https://github.com/rook2pawn/node-chess-charm/raw/master/screen.png)

chess-charm
===========

    var chessCharm = require('chess-charm');

    var board = chessCharm()
        .showBoard()
        .setOpponent({name:'jamal',color:'black'})
        .setWhiteName({name:'Johannes',color:'white'})
        .showOpponent()
        .showPlayer();
        
        board
            .move('e2e4')
            .move('e7e5')
            .move('g1f3')
            .move('d7d6')
            .move('f1b5')
            .move('b8c6')
            .move('e1g1');


Draw chess positions, make moves, and see a chess board in beautiful ansi + unicode chess fonts!

Interactive!
============

Select with space bar
---------------------
Select a piece with the arrow keys, and move the arrow keys to the piece's desired location, 

Move with the "m" key
---------------------
After you have a piece selected, then press m!

View this example in ./test.js


Methods
=======

.move(movestring)
-----------------
Updates the board with the move (given in Modified Standard Algebraic Notation)

.showBoard()
------------
Shows the board as it currently stands.

.setPlayer({name:"foo",color:"black"})
-------------------
Sets your player.

.setOpponent({name:'bar',color:'white'})
-------------------
Sets the opponent.

Exit 
====

Push "CTRL + C"

CREDITS
=======

chess-charm was done in [Charm](https://github.com/substack/node-charm) by [Substack](https://github.com/substack)
