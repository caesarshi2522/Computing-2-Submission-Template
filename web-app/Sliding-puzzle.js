const Slidingpuzzle = Object.create(null);

//Initialise the board
Slidingpuzzle.initial_board = function () {
    const board=[];
    const boardsize=4;
    let number=0;
    for (let i=0; i<boardsize; i++){
        board[i]=[];
        for(let j=0; j<boardsize; j++){
            number=i*boardsize+j*boardsize+1
            if (number<boardsize*boardsize){
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
Slidingpuzzle.findzerocell = function(){
    for (let i=0; i<boardsize; i++){
        for (let j=0; j<boardsize; j++){
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
Slidingpuzzle.move= function(cell,emptycell){
    const cellrow=cell[row];
    const cellcol=cell[column];
    const emptycellrow=emptycell[row];
    const emptycellcol=emptycell[colume];

    const temp=board[cellrow][cellcol];
    board[cellrow][cellcol]=board[emptycellrow][emptycellcol];
    board[emptycellrow][emptycellcol]=temp;
}

//Check whether the game is successful
Slidingpuzzle.successful =function(board){
    for(i=0;i<boardsize;i++){
        for(j=1;j<boardsize;j++){
            number=i*4+j*4+1;
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