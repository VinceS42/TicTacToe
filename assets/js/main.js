// On charge les informaton utiles

const status =  document.querySelector("h2");
let gameActif = true;
let playerActif = "X";
let statusGame = ["", "", "", "", "", "", "", "", "",];

const conditionsVictory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// Messages

const win = () => `The player ${playerActif} win`;
const draw = () => "Draw"
const turnPlayer = () => `Its the turn of player ${playerActif}`;

status.innerHTML = turnPlayer();

document.querySelectorAll(".cell").forEach(elem => 
    elem.addEventListener('click', gestionClickCell));

document.querySelector("#restart").addEventListener("click", resart)

function gestionClickCell(){

    // On récupère l'index de la cas cliquée

    const indexCell = parseInt(this.dataset.cell);

    if(statusGame[indexCell] !== "" || !gameActif){
        return
    }

    statusGame[indexCell] = playerActif;
    this.innerHTML = playerActif

    verifWin()
}

function verifWin(){
    let winTurn = false;

    for(let conditionVictory of conditionsVictory){
        let val1 = statusGame[conditionVictory[0]]
        let val2 = statusGame[conditionVictory[1]]
        let val3 = statusGame[conditionVictory[2]]
        if(val1 === "" || val2 === "" | val3 == ""){
            continue
        }
        if (val1 === val2 && val2 === val3){
            winTurn = true;
            break
        }
    }
    if(winTurn){
        status.innerHTML = win();
        gameActif = false;
        return;
    }

    if(!statusGame.includes("")){
        status.innerHTML = draw();
        gameActif = false;
        return;
    }

    playerActif = playerActif === "X" ? "O" : "X";
    status.innerHTML = turnPlayer();
}

function resart(){
    playerActif = "X";
    gameActif = true;
    statusGame = ["", "", "", "", "", "", "", "", "",];
    status.innerHTML = turnPlayer();
    document.querySelectorAll(".cell").forEach(elem => 
        elem.innerHTML = "")
}