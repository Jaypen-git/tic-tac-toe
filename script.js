(function(){
    'use strict';
    // player factory function
    const playerFactory = (order, name, mark) => {
        let selectSpace = (e) => {
            e.target.innerText = currentPlayer.mark;
            e.target.style.pointerEvents = 'none';
            gameController.switchPlayer();
            console.log(currentPlayer);
        }
        return {order, name, mark, selectSpace};
    }
    // create two players
    const playerOne = playerFactory(1, 'Player One', 'X');
    const playerTwo = playerFactory(2, 'Player Two', 'O');
    // keep track of whose turn it is
    let currentPlayer = playerOne; 
    // gameboard module
    const gameboard = {
        spaces: [Array.from(document.querySelectorAll('.space'))], // store spaces in an array
        init: function(){ // function to initialize app
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function(){ // all DOM queries happen here
            for (let i = 0; i < 9; i++){
                this.spaces[i] = document.getElementById(i);
            }
        },
        bindEvents: function(){ // all event bindings happen here
            for (let i = 0; i < this.spaces.length; i++){ // add events to all the spaces
                this.spaces[i].addEventListener('click', currentPlayer.selectSpace);
            }
        }
    }
    // Can't initialize gameboard here because gameController needs to be initialized first
    const gameController = {
        // win conditions can't be stored here yet, the gameboard needs to initialize
        switchPlayer: function(){
            if (currentPlayer === playerOne){
                currentPlayer = playerTwo;
            } else if (currentPlayer === playerTwo){
                currentPlayer = playerOne;
            }
        },
        winCheck: function(){
            // for each item in the winning moves array

            // check if each item in sub-array have the same text content

            // if one of the winning moves all have "X", player 1 wins

            // if one of the winning moves all have "O", player 2 wins

            // otherwise, record as a tie
        }
    }
    gameboard.init();
    // store the win conditions in an array and add it to gameController object
    gameController.winningMoves = [
        [gameboard.spaces[0], gameboard.spaces[1], gameboard.spaces[2]],
        [gameboard.spaces[3], gameboard.spaces[4], gameboard.spaces[5]],
        [gameboard.spaces[6], gameboard.spaces[7], gameboard.spaces[8]],
        [gameboard.spaces[0], gameboard.spaces[3], gameboard.spaces[6]],
        [gameboard.spaces[1], gameboard.spaces[4], gameboard.spaces[7]],
        [gameboard.spaces[2], gameboard.spaces[5], gameboard.spaces[8]],
        [gameboard.spaces[0], gameboard.spaces[4], gameboard.spaces[8]],
        [gameboard.spaces[2], gameboard.spaces[4], gameboard.spaces[6]]
    ];
    // Can I access the gameboard spaces because the gameboard was already initialized?
    console.log(gameController.winningMoves);
})();