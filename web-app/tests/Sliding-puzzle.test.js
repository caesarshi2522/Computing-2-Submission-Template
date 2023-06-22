import { dissoc } from "ramda";
import SlidingPuzzle from "../Sliding-puzzle.js";

const DISPLAY_MODE = "to_string";

const display_functions = {
    "json": JSON.stringify,
};
const display_board = function (board) {
    try {
        return "\n" + board;
    } catch (ignore) {
        return "\n" + JSON.stringify(board);
    }
};

// Tests for boards
// Test whether the initial board and board after shuffling is an 2D array
// Test whether the board only contains number from 0 to 15
// Test whether the board is 4*4
describe("Test_for_board", function(){
    it("The initial board is 2D array",function(){
        const initial_board=SlidingPuzzle.initial_board();
        if (!Array.isArray(initial_board) || !Array.isArray(initial_board[0])) {
            throw new Error(
                "The initial_board is not a 2D array: " + display_board(initial_board)
            );
        }
    });
    it("The shuffled board is 2D array",function(){
        const shuffled_board=SlidingPuzzle.shuffle(SlidingPuzzle.initial_board());
        if (!Array.isArray(shuffled_board) || !Array.isArray(shuffled_board[0])) {
            throw new Error(
                "The shuffled_board is not a 2D array: " + display_board(shuffled_board)
            );
        }
    });
    it("The shuffled board only contains number from 0 to 15",function(){
        const shuffled_board=SlidingPuzzle.shuffle(SlidingPuzzle.initial_board());
        for (let i=0; i<boardsize; i++){
            for(let j=0; j<boardsize; j++){
                if (shuffled_board[i][j]<0 || shuffled_board[i][j]>15){
                    throw new Error(
                        "The shuffled_board contains wrong number: " + display_board(shuffled_board)
                    );
                }
            }
        }
    });
    it("The shuffled board is 4*4",function(){
        const shuffled_board=SlidingPuzzle.shuffle(SlidingPuzzle.initial_board());
        if(shuffled_board.length!==4 || shuffled_board[0].length!==4){
            throw new Error(
                "The shuffled_board is not 4*4:" + display_board(shuffled_board)
            );
        }
    })
})

//Tests for operation
//Test whether the cells beside empty cell can move to empty cell
//Test whether the cells that are not beside empty cell can move to empty cell
//Test whether two non-zero cells can move to position of each other
describe("Test_for_operations",function(){
    it("The cells beside empty cell can move to empty cell",function(){
        const boardbeforemove=[[4,12,1,3],[0,5,8,9],[2,15,11,10],[6,7,14,13]];
        const emptycell=SlidingPuzzle.findzerocell(boardbeforemove);
        if(SlidingPuzzle.move([1,1],emptycell,boardbeforemove)!==[[4,12,1,3],[5,0,8,9],[2,15,11,10],[6,7,14,13]]){
            throw new Error(
                "The cell beside empty cell can not move to empty cell:" + display_board(boardbeforemove)
            );
        }
    })
    it("The cells that are not beside empty cell can not move to empty cell", function(){
        const boardbeforemove=[[4,12,1,3],[0,5,8,9],[2,15,11,10],[6,7,14,13]];
        const emptycell=SlidingPuzzle.findzerocell(boardbeforemove);
        if(SlidingPuzzle.movable([3,3],emptycell)===true){
            throw new Error(
                "The cell that is not beside empty cell can move to empty cell:" + display_board(boardbeforemove)
            );
        }
    })
    //This one is difficult to test cause this situation cannot happen as the program in main.js
    it("The two non-zero cells can not move to position of each other", function(){
        const boardbeforemove=[[4,12,1,3],[0,5,8,9],[2,15,11,10],[6,7,14,13]];
        if(SlidingPuzzle.movable([3,3],[1,1]===true)){
            throw new Error(
                "The two non-zero cells can move to position of each other:" + display_board(boardbeforemove)
            );
        }
    })
});

//Tests for results
//Test whether the game is successful when the board is in right order
//Test whether the game is successful when the board is in wrong order
//Test whether the game is successful when the board is not in correct form
describe("Test for results",function(){
    it("The game is sucessful when the board is in right order",function(){
        const rightboard=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]
        if(SlidingPuzzle.successful(rightboard)!==true){
            throw new Error(
                "The game is not successful when the board is in right order:" + display_board(rightboard)
            );
        }
    })
    it("The game is not successful when the board is in wrong order",function(){
        const wrongboard=[[4,12,1,3],[0,5,8,9],[2,15,11,10],[6,7,14,13]]
        if(SlidingPuzzle.successful(wrongboard)===true){
            throw new Error(
                "The game is still successful when the board is in wrong order:" + display_board(wrongboard)
            );
        }
    })
    it("The game is not successful when the board is in wrong form",function(){
        const wrongboard=[[4,12,1,3],[5,8,9],[0,2,15,11,10],[6,7,14,13]]
        if(SlidingPuzzle.successful(wrongboard)===true){
            throw new Error(
                "The game is still successful when the board is in wrong form:" + display_board(wrongboard)
            );
        }
    })
})
