const board=[];
    const boardsize=4;
    let number=0;
    for (let i=0; i<boardsize; i++){
        board[i]=[];
        for(let j=0; j<boardsize; j++){
            number=i*boardsize+j+1
            if (number<boardsize*boardsize){
                board[i][j]=number;
            }
            else {
                board[i][j]=0;
            }
        }
    }
console.log(board)