const Slidingpuzzle = Object.create(null);

//Initialise the board
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
                board[i][j]=0;
            }
        }
    }
    return board
};

//Find the row and column of zero
Slidingpuzzle.findzerocell = function(board){

    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (board[i][j]===0){
                return {row:i,column:j}
            }
        }
    }
}

//Check whether the cell can be moved(beside to emptycell)
Slidingpuzzle.movable= function(cell,emptycell){
    const cellrow=cell[row];
    const cellcol=cell[column];
    const emptycellrow=emptycell[row];
    const emptycellcol=emptycell[colume];
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

//Move the  cell to empty-cell
Slidingpuzzle.move= function(cell,emptycell,board){
    const cellrow=cell["row"];
    const cellcol=cell["column"];
    const emptycellrow=emptycell["row"];
    const emptycellcol=emptycell["colume"];

    const temp=board[cellrow][cellcol];
    board[cellrow][cellcol]=board[emptycellrow][emptycellcol];
    board[emptycellrow][emptycellcol]=temp;
    return board
}
const cell={row:"",col:""};
//Make a random move of the empty cell
Slidingpuzzle.randommove = function(cell){
    
    const possiblemoves=[]
    if(cell.row>0){
        possiblemoves.push({row:cell.row-1,col:cell.col})
    }
    if(cell.row<3){
        possiblemoves.push({row:cell.row+1,col:cell.col})
    }
    if(cell.col>0){
        possiblemoves.push({row:cell.row,col:cell.col-1})
    }
    if(cell.col<3){
        possiblemoves.push({row:cell.row,col:cell.col+1})
    }
    if(possiblemoves.length>0){
        const randomindex=Math.floor(Math.random()*possiblemoves.length);
        return possiblemoves[randomindex]
    }
}
//Check whether the game is successful
Slidingpuzzle.successful =function(board){
    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            number=i*4+j+1;
            if (number===16){
                number=0;
            }
            if (number!==board[i][j]){
                return false;
            }
        }
    }
    return true;
}
//Shuffle the puzzle by random moving of empty cell
Slidingpuzzle.shuffle=function(board){
    for (let i=0;i<Shuffletimes;i++) {
        const emptycell=Slidingpuzzle.findzerocell(board)
        const randommove=Slidingpuzzle.randommove(emptycell)
        board=Slidingpuzzle.move(randommove,emptycell,board)
      };
}
export default Object.freeze(Slidingpuzzle)