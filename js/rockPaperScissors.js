// Rock Paper Scissors web console game

// GLOBAL VARIABLES
let arrScore = [0, 0];
let sndRock = new Audio('./audio/rock.wav');
let sndPaper = new Audio('./audio/paper.wav');
let sndScissors = new Audio('./audio/scissors.wav');
const robotScore = document.querySelector('#robotScore');
const playerScore = document.querySelector('#playerScore')
const scoreBox = document.querySelector('#score-box');
const result = document.querySelector('#result');


//              ------ FUNCTIONS ------             //

// Start new game
function newGame() {
    arrScore[0] = 0;
    arrScore[1] = 0;
    robotScore.textContent = 'Computer ' + arrScore[0];
    playerScore.textContent = 'Player ' + arrScore[1];
    result.textContent = 'Are you ready?'
    replay.disabled = true;
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
}

// Return computer selection
function getComputerChoice() {
    let compRPS = Math.ceil(Math.random()*3);
    let rps = ""
    switch (compRPS) {
        case 1:
            rps = "rock";
            break;
        case 2:
            rps = "paper";
            break;
        case 3:
            rps = "scissors"
            break;
    }
    return rps;
}

// Return int result of 1 round
function getResult(cRPS, pRPS) {
    if (cRPS === pRPS){
        // Tie
        return 0;
    } else if ((cRPS === "scissors" && pRPS === "paper") || 
                (cRPS === "rock" && pRPS === "scissors") || 
                (cRPS === "paper" && pRPS === "rock")) {
        // Computer wins
        return 1;
    } else {
        // Player wins
        return 2;
    }
}

// Play 1 round, set scoring array
function getRound(strPlayer) {
    
    let strComputer = getComputerChoice()
        
    switch (getResult(strComputer, strPlayer)) {
        case 0:
            result.textContent = (`Tie. You both picked ${strPlayer}.`);
            break;
        case 1: 
            result.textContent = (`${strComputer.charAt(0).toUpperCase()+strComputer.slice(1)} beats ${strPlayer}, you lose!`);
            arrScore[0] += 1;
            break;
        case 2:
            result.textContent = (`${strPlayer.charAt(0).toUpperCase()+strPlayer.slice(1)} beats ${strComputer}, you win!`);
            arrScore[1] += 1;
            break;
    }
    if (arrScore[0] === 3) {
        result.textContent = 'You Lose! Final Score: Computer ' + arrScore[0] + ' Player ' + arrScore[1];
        replay.disabled = false;
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
    } else if (arrScore[1] === 3) {
        result.textContent = 'You Win! Final Score: Player ' + arrScore[1] + ' Computer ' + arrScore[0];  
        replay.disabled = false; 
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
    }
    robotScore.textContent = 'Computer ' + arrScore[0];
    playerScore.textContent = 'Player ' + arrScore[1];
}

// Event Listeners

rock.addEventListener('click', function() {
    sndRock.play();
    getRound('rock');
});

paper.addEventListener('click', function() {
    sndPaper.play();
    getRound('paper');
});

scissors.addEventListener('click', function() {
    sndScissors.play();
    getRound('scissors');
});

replay.addEventListener('click', function() {
    newGame();
});