/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, prevDice;
init();
//dice = Math.floor(Math.random() * 6) + 1;

//console.log(dice);
//Setting Text
//var x = document.querySelector('#current-' + activePlayer).textContent = dice;
//console.log(x);
//Setting HTML with Tags
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>helooo</em>helo'; 

/*function btn(){}*/

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
    //Do Something - Could use a Function within or separate by using a callback function - btn()
    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
   

    // 2. Display Results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score
        if(dice === 6 && prevDice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0'; 
        } else if( dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //next
            nextPlayer();
        }
        prevDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying){

        scores[activePlayer] += roundScore;

        // TODO update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // TODO check if player won game 
        var input = document.querySelector('.final-score').value;
        var winningScore;
        //Undefined, 0, null, "" are COERCED to false
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;


        }else {
            nextPlayer();
        }
    
    }
    // TODO add current score to global

});



function nextPlayer(){
    //next
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //ADD/Remove Classes
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}