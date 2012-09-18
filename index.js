var chess = require('./lib/chess');
var bg = require('./lib/backgrounds')();
var EE = require('events').EventEmitter;
var getNewCoords = function(x,y,perspective,offset) {
    var bx = x - offset - 1;//column 
    var by = 7 + offset - y; // row
    if (perspective == 'black') {
        bx = 7 - bx;
        by = 7 - by;
    }
    return {x:bx,y:by};
};
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
    var offset = 3;
    var selected = {};
    var self = {};
    self.isSelected = false;
    self.showBoard = function(params) {
        setColors(); 
        if (params === undefined) params = {};
        board = params.board || chess.startboard;
        perspective = params.perspective || perspective;
        var viewBoard = undefined;
        if (perspective === 'black') {
            var newBoard = [];
            for (var i = 0; i < board.length; i++) {
                newBoard.push(board[i].slice(0).reverse()); 
            }
            viewBoard = newBoard;
            
        } else {
            viewBoard = board.slice(0).reverse();
        }
        for (var row = 0; row <= 7; row++) {
            charm.position(offset, row+offset);
            if (perspective == 'black') {
                charm.write((row + 1).toString());
            } else {
                charm.write((8 - row).toString());
            }
        }
        for (var col = 0; col <= 7; col++) {
            charm.position(col+offset + 1, offset+8);
            if (perspective == 'black') {
                charm.write(String.fromCharCode((7-col)+97));
            } else {
                charm.write(String.fromCharCode(col+97));
            }
        }
        for (var row = 0; row <= 7; row++) {
            for (var col = 0; col <= 7; col++) {
                charm.position(col+1+offset,row+offset);
                var piece = viewBoard[row][col]
                if ((row+col) % 2 === 1) {
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
    self.setOpponent = function(opp) {
        opponent = opp
        return self;
    };
    self.setPerspective = function(pers) {
        perspective = pers;
        return self;
    };
    self.showOpponent = function() {
        setColors();
        if (opponent.color == perspective)
            charm.position(offset + 10, offset + 8);
        else 
            charm.position(offset + 10, offset - 1);
        charm.write(opponent.name);
        if (opponent.color == 'black') {
            charm.write(' (B)');
        } else {
            charm.write(' (W)');
        }
        return self;
    };
    self.showPlayer = function() {
        setColors();
        if (player.color == perspective)
            charm.position(offset + 10,offset + 8);
        else 
            charm.position(offset + 10,offset - 1);
        charm.write(player.name);
        if (player.color == 'black') {
            charm.write(' (B)');
        } else {
            charm.write(' (W)');
        }
        return self;
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
    self.setBoundaries = function(key) {
        charm.position(function(x,y) {
            switch (key) {
                case 'right' :
                    if (x >= offset + 8) 
                        charm.position(offset+8,y);
                    break;
                case 'left' :
                    if (x <= offset+1) 
                        charm.position(offset+1,y);
                    break;
                case 'down' :
                    if (y >= offset+7) 
                        charm.position(x,offset+7);
                    break;
                case 'up' :
                    if (y <= offset) 
                        charm.position(x,offset);
                    break;
                default:
                    break; 
            };
        });
    };
    self.reportStatus = function() {
        setColors();
        charm.position(function(x,y) {
            self.showBoard({perspective:perspective});
            
            setColors();
            var pos = getNewCoords(x,y,perspective,offset);
            var bx = pos.x;
            var by = pos.y;
/*
            var id = self.identifySquare({col:bx,row:by});
            charm.write("id:" + id);
            var piece = chess.getPiece(board,{row:by, col:bx});
            charm.write(" " + piece);
*/
            charm.write("x:" + x + " y:" + y);
            charm.write("x:" + bx + " y:" + by);
/*
            var letter = String.fromCharCode(bx+97);
            var number = by + 1;
            charm.write("-> " + letter + "" + number);
*/
            charm.position(x,y);
        });
    };
    self.moveSelect = function() {
        setColors();
        charm.position(function(x,y) {
            self.showBoard({perspective:perspective});
            
            setColors();
            var pos = getNewCoords(x,y,perspective,offset);
            var bx = pos.x;
            var by = pos.y;
            var color = self.identifySquare({col:bx,row:by});
            var letter = String.fromCharCode(bx+97);
            var piece = chess.getPiece(board,{row:by, col:bx});
            var number = by + 1;
            if (selected.piece !== undefined) {
                charm.write("Move to: " + letter.concat(number));
                var movestring = selected.msanpos;
                movestring = movestring.concat(letter.concat(number));
                self.move(movestring);
            } else {
                selected = {};
                charm.erase('end'); 
            }
            charm.position(x,y);
        });
    };
    self.select = function(cb) {
        setColors();
        charm.position(function(x,y) {
            self.showBoard({perspective:perspective});
            setColors();
            var pos = getNewCoords(x,y,perspective,offset);
            var bx = pos.x;
            var by = pos.y;
            var color = self.identifySquare({col:bx,row:by});
            var letter = String.fromCharCode(bx+97);
            var piece = chess.getPiece(board,{row:by, col:bx});
            var number = by + 1;
            charm.position(offset + 10 ,offset + 4);
            if ((color !== ' ') && (piece !== '1')) {
                selected.piece = piece;
                selected.pos = {row:by, col:bx};
                selected.msanpos = letter.concat(number);
                charm.write("Selected: " + piece + "("+color.charAt(0)+")" + letter + number);
                charm.position(x,y);
                self.isSelected = true;
            } else {
                selected = {};
                charm.erase('end'); 
                charm.position(offset + 10 ,offset + 5);
                charm.erase('end'); 
                charm.position(x,y);
            }
        });
    };
    self.identifySquare = function(pos) {
        var piece = board[pos.row][pos.col];
        var piececolor = " ";
        if (piece != '1') {
            if (piece == piece.toUpperCase()) {
                piececolor = 'white';
            } else {
                piececolor = 'black';
            }
        } 
        return piececolor;
    };
    self.position = function(x,y) {
        charm.position(x,y);
    };
    self.move = function(msanMove) {
        var obj = chess.updateBoardMSAN(board,msanMove);
        board = obj.board;
        self.showBoard();
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
