var chess = require('./lib/chess');
var bg = require('./lib/backgrounds')();
var EE = require('events').EventEmitter;
var chessCharm = function() {
    var charm = require('charm')(process);
    var setColors = function() {
        charm.background('black').foreground(47);
    };
    charm.on('^C', function() {
        charm.destroy();
        process.exit();
    });
    charm.reset();
    charm.cursor(true);
    var opponent = {};
    var player = {};
    var perspective = "white";
    var board = undefined;
    var offset = 1;
    var self = {};
    self.showBoard = function(params) {
        setColors(); 
        if (params === undefined) params = {};
        board = params.board || chess.startboard;
        perspective = params.perspective || 'white';
        var viewBoard = undefined;
        if (perspective === 'black') {
            viewBoard = board.slice(0);
        } else {
            viewBoard = board.slice(0).reverse();
        }
        for (var row = 0; row <= 7; row++) {
            charm.position(1, row+2);
            charm.write((8 - row).toString());
        }
        for (var col = 0; col <= 7; col++) {
            charm.position(col+2, 10);
            charm.write(String.fromCharCode(col+97));
        }
        var modvalue = 1;
        if (perspective == 'black') modvalue = 0;
        for (var row = 0; row <= 7; row++) {
            for (var col = 0; col <= 7; col++) {
                charm.position(col+1+offset,row+1+offset);
                var piece = viewBoard[row][col]
                if ((row+col) % 2 === modvalue) {
                    charm.background(bg.getDarkSquare());
                } else {
                    charm.background(bg.getLightSquare());
                }
                if (chess.isWhite(viewBoard[row][col])) {
                    charm.foreground(bg.getPieceLight());
                } else {
                    charm.foreground(bg.getPieceDark());
                }
                charm.write(chess.pieces[piece]);
            }
        }
        return self;
    };
    self.cycleColors = function() {
        charm.reset();
        bg.cycleColors();
        self.showBoard();
        charm.position(x,y);
    };
    self.updateBoard = function(newboard) {
        board = newboard;
        return self;
    };
    self.showNames = function() {
/*
        charm.background('black').foreground('white');
        charm.position(12,blackPosName);
        charm.write(blackname + " (B)");
        charm.background('black').foreground('white');
        charm.position(12,whitePosName);
        charm.write(whitename + " (W)");
*/
    };
    self.setOpponent = function(opp) {
        opponent = opp
        return self;
    };
    self.showOpponent = function() {
        setColors();
        if (opponent.color == perspective)
            charm.position(11,9);
        else 
            charm.position(11,2);
        charm.write(opponent.name);
        if (opponent.color == 'black') {
            charm.write(' (B)');
        } else {
            charm.write(' (W)');
        }
    };
    self.showPlayer = function() {
        setColors();
        if (player.color == perspective)
            charm.position(11,9);
        else 
            charm.position(11,2);
        charm.write(player.name);
        if (player.color == 'black') {
            charm.write(' (B)');
        } else {
            charm.write(' (W)');
        }
        charm.position(6,8);
    };
    self.setPlayer = function(you) {
        player = you;
        return self;
    };
    self.getOpponent = function() {
        return opponent;
    };
    self.getPlayer = function() {
        return player;
    };
    self.done = function() {
        setColors();
        charm.reset();
        return self;
    };
    self.write = function(msg) {
        charm.write(msg);  
    };
    self.writeReset = function() {
    };
    self.setBoundaries = function() {
        charm.position(function(x,y) {
            if (x > 9) {
                charm.position(x-1,y);
            }
            if (x <= 2) {
                charm.position(2,y);
            }
            if (y <= 1) {
                charm.position(x,y+1);
            }
            if (y >= 10) {
                charm.position(x,y-1);
            }

        });
    };
    self.reportStatus = function() {
        setColors();
        charm.position(function(x,y) {
            self.showBoard({perspective:perspective});
            charm.position(15,5);
            var bx = x - 2 - offset;//column 
            var by = 8 - y + 2; // row
            charm.write('row: ' + by + ' col: ' +  String.fromCharCode(bx+97));
            var piece = chess.getPiece(board,{row:by, col:bx}, perspective);
            console.log(piece);
            charm.position(x-1,y);
        });
    };
    self.move = function(msanMove) {
        var obj = chess.updateBoardMSAN(board,msanMove);
        board = obj.board;
        if (obj.color == 'black') {
/*
            charm.position(12,2);
            charm.foreground('green').background('black');
            charm.write(msanMove);
*/
        }
        if (obj.color == 'white') {
/*
            charm.position(12,7);
            charm.foreground('green').background('black');
            charm.write(msanMove);
*/
        }
        return self;
    };
    return self;
};
module.exports = exports = chessCharm;
