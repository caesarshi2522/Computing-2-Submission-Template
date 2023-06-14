import Slidingpuzzle from "../web-app/Sliding-puzzle.js";

//String literials
const image_sources = [
    "./assets/1.png",
    "./assets/2.png",
    "./assets/3.png",
    "./assets/4.png",
    "./assets/5.png",
    "./assets/6.png",
    "./assets/7.png",
    "./assets/8.png",
    "./assets/9.png",
    "./assets/10.png",
    "./assets/11.png",
    "./assets/12.png",
    "./assets/13.png",
    "./assets/14.png",
    "./assets/15.png",
    "./assets/empty.png"
];

const image_alts=[
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "empty"
];

const result_text = [
    "The puzzle was restored!"
];

const game_board = document.getElementById("game_board");
const boardsize=4;
const result_dialog = document.getElementById("result_dialog");

//Shuffle the puzzle by random moving of empty cell
const Shuffletimes=1000;
const boardmatrix = Slidingpuzzle.initial_board();
//for (let i=0;i<Shuffletimes;i++) {
    //const emptycell=Slidingpuzzle.findzerocell(boardmatrix)
    //const randommove=Slidingpuzzle.randommove(emptycell)
    //boardmatrix=Slidingpuzzle.move(randommove,emptycell,boardmatrix)
  //};
const shuffleboard= Slidingpuzzle.shuffle(boardmatrix);
let i=0;
let j=0;
for(i=0;i<4;i++){
    const tr = document.createElement("tr");
    for(j=0;j<4;j++){
        const td = document.createElement("td");
        td.textContent=shuffleboard[i][j];
        tr.append(td);
    }
    game_board.append(tr);
}






