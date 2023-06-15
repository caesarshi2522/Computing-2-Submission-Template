import Slidingpuzzle from "../web-app/Sliding-puzzle.js";



//Shuffle the puzzle by random moving of empty cell

var boardmatrix = Slidingpuzzle.initial_board();
//var box=[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]
//const success=Slidingpuzzle.successful(box)
//console.log(success)
const game_board = document.getElementById("game_board");
Slidingpuzzle.shuffle(boardmatrix);
function createTable(){
  var success=Slidingpuzzle.successful(boardmatrix);
  console.log(success)
                if(success===true){
                  alert("good")
                }
  for(let i=0;i<4;i++){
    const tr = document.createElement("tr");
    for(let j=0;j<4;j++){
        const td = document.createElement("td");
        td.textContent=boardmatrix[i][j];
        tr.append(td);
        (function(i,j){
        td.onclick=function () {
            const emptycell=Slidingpuzzle.findzerocell(boardmatrix);
            const clickedCellPos = [i, j];
            if(Slidingpuzzle.movable(clickedCellPos,emptycell)===true){
                boardmatrix=Slidingpuzzle.move(clickedCellPos,emptycell,boardmatrix); 
                console.log(boardmatrix)
                for(let i=0;i<4;i++){
                game_board.firstElementChild.remove();
                }
                createTable();
    }
          };})(i,j);
        
    }
    game_board.append(tr);
}}
createTable()
