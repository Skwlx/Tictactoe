const playerX = document.getElementById('X');
const playerO = document.getElementById('O');
const reset = document.getElementById('reset');
let msg = document.getElementById('message');
let boxes = document.querySelectorAll('.box');
let board = Array.from(boxes);
let table = document.getElementById('circuit');
let playerClass = 'checkedPlayer';
let comClass = 'checkedCom';
let player = '';
let com = '';
let helper = [];
let i = 0;
function eventOnBoard(obj){
    for(i = 0; i < obj.length; i++){
        obj[i].addEventListener('click', play);
    }
}
eventOnBoard(board); //setting eventlistener on the board
playerX.addEventListener('click', (e) => {
    player = playerX.value;
    console.log('Player is playing as X.')
    startGame();
  }, false);
  playerO.addEventListener('click', (e) => {
    player = playerO.value;
    console.log('Player is playing as O.')
    startGame();
  }, false);
  reset.addEventListener('click', (e) =>{
    table.classList.add('noClick');
    playerX.style.display = 'inline-block';
    playerO.style.display = 'inline-block';
    reset.style.display = 'none';
    msg.classList.remove('animate');
    msg.innerHTML = 'Here we go again.';
    helper = [];
    console.clear();
    for(i=0; i < board.length; i++){
            board[i].classList.remove(playerClass);
            board[i].classList.remove(comClass);
            board[i].innerHTML = '';
    }
  }, false);
function startGame(){
    playerX.style.display = 'none';
    playerO.style.display = 'none';
    msg.innerHTML = "You play as: "+ player;
    msg.style.display = 'block';
    table.classList.add('animate');
    table.classList.remove('noClick');
    reset.style.display = 'block';
}
  function comMove(){
    if(player == 'X'){
        com = 'O';
    }
    if(player == 'O'){
        com = 'X';
    }
    let comPick = board[Math.floor(Math.random()*board.length)];
    if(comPick.classList.contains(playerClass) || comPick.classList.contains(comClass)){ // if box is picked by player or computer we need to roll once again
        if(helper.length < 7){
            console.log('This box is already picked:', comPick);
            comMove();
        }
        else{
            return 0;
        }
    }
    else{
            comPick.innerHTML = com;
            comPick.classList.add(comClass);
            helper.push(comPick);
            console.log('Computer is making a move on: ', comPick);
        }
}
function play(){
    this.innerHTML = player;
    this.classList.add(playerClass);
    checkTheBoard(playerClass);
    comMove();
    checkTheBoard(comClass);
    helper.push(this);
}
function checkTheBoard(gamerClass){
    for(i = 0; i < board.length; i = i+3){
        if(board[i].classList.contains(gamerClass) && board[i+1].classList.contains(gamerClass) && board[i+2].classList.contains(gamerClass)){
            typeTheWinner(); // checking for the winner horizontal
        }
    }
    for(i = 0; i < 3; i = i+1){
        if(board[i].classList.contains(gamerClass) && board[i+3].classList.contains(gamerClass) && board[i+6].classList.contains(gamerClass)){
            typeTheWinner(); // checking for the winner vertical
        }
    }
    if(board[0].classList.contains(gamerClass) && board[4].classList.contains(gamerClass) && board[8].classList.contains(gamerClass)){
        typeTheWinner(); // checking for the winner slant
    }
    if(board[2].classList.contains(gamerClass) && board[4].classList.contains(gamerClass) && board[6].classList.contains(gamerClass)){ 
        typeTheWinner(); // checking for the winner slant
    }
    if(helper.length > 7){
        msg.classList.add('animate');
        msg.innerHTML = 'Tie';
        table.classList.add('noClick');
        console.log('Tie.');
    }
    function typeTheWinner(){
        if(gamerClass == playerClass){
            msg.classList.add('animate');
            msg.innerHTML = 'You win!';
            table.classList.add('noClick');
            console.log('This error is made on purpose to stop the computer.', 'Player win.');
            comMove(er); // i did it on purpose so comupter don't play when game is over
        }
        if(gamerClass == comClass){
            msg.classList.add('animate');
            msg.innerHTML = 'You lose!';
            table.classList.add('noClick');
            console.log('Player lose.')
        }
    }
}