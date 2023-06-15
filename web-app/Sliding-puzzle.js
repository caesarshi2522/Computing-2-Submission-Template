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
                board[i][j]="0";
            }
        }
    }
    return board
};

//Find the row and column of zero
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

//Check whether the cell can be moved(beside to emptycell)
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



//Make a random move of the empty cell
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

//Move the  cell to empty-cell
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

//Check whether the game is successful
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
//Shuffle the puzzle by random moving of empty cell
const Shuffletimes=50;
Slidingpuzzle.shuffle=function(board){
    for (let i=0;i<Shuffletimes;i++) {
        const emptycell=Slidingpuzzle.findzerocell(board)
        const randommovecell=Slidingpuzzle.randommove(emptycell)
        board=Slidingpuzzle.move(randommovecell,emptycell,board)
      };
    }
//console.log(Slidingpuzzle.findzerocell(Slidingpuzzle.initial_board()));
//console.log(Slidingpuzzle.randommove(Slidingpuzzle.findzerocell(Slidingpuzzle.initial_board())))
//console.log(Slidingpuzzle.shuffle(Slidingpuzzle.initial_board()))
//console.log(Slidingpuzzle.successful([0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]))
export default Object.freeze(Slidingpuzzle)