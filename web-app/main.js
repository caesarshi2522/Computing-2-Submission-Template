import Slidingpuzzle from "../web-app/Sliding-puzzle.js";

var boardmatrix = Slidingpuzzle.initial_board();
const game_board = document.getElementById("game_board");
const timerDisplay = document.getElementById("timer");
const clickmusic=document.getElementById("click_music");
const backgroundmusic=document.getElementById("background_music");
var starttime;
var timerinterval;
Slidingpuzzle.shuffle(boardmatrix);

//Show initial dialog and start game
initial_dialog.showModal();
  initial_dialog.onclick= function(){
    clickmusic.play();
    initial_dialog.close();
    createTable();
    starttimer();
  };

  //Start the game
function createTable(){
  backgroundmusic.play();
  var success=Slidingpuzzle.successful(boardmatrix);
  console.log(success);
  if(success===true){
    clearInterval(timerinterval);
    document.getElementById("result_message").textContent=
    ("Congratulations, the puzzle is restored!");
    const currenttime = new Date().getTime();
    const timeused=calculatetimeused(starttime, currenttime);
    const gametimecontent=
    "The game has been finished in only "+timeused+" seconds.";
    document.getElementById("game_time").textContent=gametimecontent;
    result_dialog.showModal();
  }
  for(let i=0;i<4;i++){
    const tr = document.createElement("tr");
    for(let j=0;j<4;j++){
        const td = document.createElement("td");
        td.textContent=boardmatrix[i][j];
        tr.append(td);
        (function(i,j){
        td.onclick=function () {
            clickmusic.play();
            const emptycell=Slidingpuzzle.findzerocell(boardmatrix);
            const clickedcell = [i, j];
            if(Slidingpuzzle.movable(clickedcell,emptycell)===true){
                boardmatrix=
                Slidingpuzzle.move(clickedcell,emptycell,boardmatrix);
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

//Rebegin this game by clicking result_dialog
result_dialog.onclick = function () {
  for(let i=0;i<4;i++){
    game_board.firstElementChild.remove();
    }
  boardmatrix = Slidingpuzzle.initial_board();
  Slidingpuzzle.shuffle(boardmatrix);
  createTable();
  starttimer();
  result_dialog.close();
};

//Start the time
function starttimer() {
  starttime = new Date().getTime();
  timerinterval = setInterval(updatetimer, 1000);
}

//Updated the current time used
function updatetimer() {
  const currenttime = new Date().getTime();
  const timeused = calculatetimeused(starttime, currenttime);
  timerDisplay.textContent = "Time used: " + timeused + "s";
}

//Calculate the time used
function calculatetimeused(starttime, currenttime) {
  const timedifference = currenttime - starttime;
  const seconds = Math.floor(timedifference / 1000);
  return seconds;
}

