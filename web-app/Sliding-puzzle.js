/**
 * Sliding-puzzle.js is a module to model and play Sliding puzzle game.
 * https://en.wikipedia.org/wiki/Sliding_puzzle
 * @namespace Slidingpuzzle
 * @author Caesar Shi
 * @version 2022/23
 */
const Slidingpuzzle = Object.create(null);


/**
 * Initialize an empty sliding puzzle board.
 * Creates a 4x4 board with numbers from 1 to 15 arranged in ascending order,
 * with the bottom-right cell empty represented by 0.
 * @memberof Slidingpuzzle
 * @function
 * @returns {number[][]} An initial board for a sliding puzzle game.
 */
Slidingpuzzle.initial_board = function () {
    const board=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    const boardsize=4;
    let number=0;
    for (let i=0; i<boardsize; i++){
        for(let j=0; j<boardsize; j++){
            number=i*boardsize+j+1
            if (number<(boardsize*boardsize)){
                board[i][j]=number;
            }
            else {
                board[i][j]="0";
            }
        }
    }
    return board
};


/**
 * Find the row and column of the zero cell in the sliding puzzle board.
 * @memberof Slidingpuzzle
 * @function findzerocell
 * @param {number[][]} board - The sliding puzzle board.
 * @returns {number[]} An array containing the row and column indices of the zero cell.
*/
Slidingpuzzle.findzerocell = function(board){
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (board[i][j]==="0"){
                return [i,j]
            }
        }
    }
    console.log("We should never be here");
}


/**
 * Check if a cell is movable to the empty cell in the sliding puzzle.
 * @memberof Slidingpuzzle
 * @function movable
 * @param {number[]} cell - The coordinates of the cell to check for movability.
 * @param {number[]} emptycell - The coordinates of the empty cell.
 * @returns {boolean} True if the cell is movable to the empty cell, false otherwise.
 * */
Slidingpuzzle.movable= function(cell,emptycell){
    const cellrow=cell[0];
    const cellcol=cell[1];
    const emptycellrow=emptycell[0];
    const emptycellcol=emptycell[1];
    if(cellcol===emptycellcol+1 && cellrow===emptycellrow){
        return true;
    }
    else{
        if(cellcol===emptycellcol && cellrow===emptycellrow+1){
            return true;
        }
        else{
            if(cellcol===emptycellcol && cellrow===emptycellrow-1){
                return true;
            }
            else{
                if(cellcol===emptycellcol-1 && cellrow===emptycellrow){
                    return true
                }
            }
        }
    }
    return false
}


/**
 * Generate a random move for the empty cell in a sliding puzzle.
 * @memberof Slidingpuzzle
 * @function randommove
 * @param {number[]} emptycell - The coordinates of the empty cell.
 * @returns {number[]|undefined} The coordinates of the randomly selected cell to move the empty cell to, or undefined if no valid moves are available.
 * */
Slidingpuzzle.randommove = function(emptycell){
    let cell0=emptycell[0]
    let cell1=emptycell[1]
    const possiblemoves=[]
    if(cell0>0){
        possiblemoves.push([cell0-1,cell1])
    }
    if(cell0<3){
        possiblemoves.push([cell0+1,cell1])
    }
    if(cell1>0){
        possiblemoves.push([cell0,cell1-1])
    }
    if(cell1<3){
        possiblemoves.push([cell0,cell1+1])
    }
    if(possiblemoves.length>0){
        const randomindex=Math.floor(Math.random()*possiblemoves.length);
        return possiblemoves[randomindex]
    }
}


/**
 * Move a cell to the empty cell in a sliding puzzle board.
 * @memberof Slidingpuzzle
 * @function move
 * @param {number[]} cell - The coordinates of the cell to be moved.
 * @param {number[]} emptycell - The coordinates of the empty cell.
 * @param {number[][]} board - The sliding puzzle board.
 * @returns {number[][]} The updated sliding puzzle board after the move.
 * */
Slidingpuzzle.move= function(cell,emptycell,board){
    const cellrow=cell[0];
    const cellcol=cell[1];
    const emptycellrow=emptycell[0];
    const emptycellcol=emptycell[1];
    const temp=board[cellrow][cellcol];
    board[cellrow][cellcol]=board[emptycellrow][emptycellcol];
    board[emptycellrow][emptycellcol]=temp;
    return board
}


/**
 * Check if the sliding puzzle board represents a successful arrangement.
 * @memberof Slidingpuzzle
 * @function successful
 * @param {number[][]} board - The sliding puzzle board to check.
 * @returns {boolean} True if the board represents a successful arrangement, false otherwise.
 * */
Slidingpuzzle.successful =function(board){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            const number=i*4+j+1;
            if (number===16){
                if(board[i][j]!=="0"){
                    return false;
                };
            }
            else{
                if (number!==board[i][j]){
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Shuffle the sliding puzzle board by performing random moves.
 * @memberof Slidingpuzzle
 * @function shuffle
 * @param {number[][]} board - The sliding puzzle board to shuffle.
 * @returns {number[][]} The shuffled sliding puzzle board.
 * */
const Shuffletimes=100;
Slidingpuzzle.shuffle=function(board){
    for (let i=0;i<Shuffletimes;i++) {
        const emptycell=Slidingpuzzle.findzerocell(board)
        const randommovecell=Slidingpuzzle.randommove(emptycell)
        board=Slidingpuzzle.move(randommovecell,emptycell,board)
      };
    }

export default Object.freeze(Slidingpuzzle)