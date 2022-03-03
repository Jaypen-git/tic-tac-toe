(function(){
    'use strict';
    // player factory function
    const playerFactory = (order, name, mark) => {
        let selectSpace = (e) => {
            e.target.innerText = currentPlayer.mark;
            e.target.style.pointerEvents = 'none';
            gameController.winCheck(e);
            gameController.switchPlayer();
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
            this.board = document.querySelector('#gameboard');
        },
        bindEvents: function(){ // all event bindings happen here
            for (let i = 0; i < this.spaces.length; i++){ // add events to all the spaces
                this.spaces[i].addEventListener('click', currentPlayer.selectSpace);
            }
        }
    }
    // CHANGE 03/02: Because the select space method belongs to the player object, we can initialize the gameboard here
    gameboard.init();
    const gameController = {
        // CHANGE 03/02: Because the gameboard is already initialized, we can store winning moves here
        winningMoves: [
            [gameboard.spaces[0], gameboard.spaces[1], gameboard.spaces[2]],
            [gameboard.spaces[3], gameboard.spaces[4], gameboard.spaces[5]],
            [gameboard.spaces[6], gameboard.spaces[7], gameboard.spaces[8]],
            [gameboard.spaces[0], gameboard.spaces[3], gameboard.spaces[6]],
            [gameboard.spaces[1], gameboard.spaces[4], gameboard.spaces[7]],
            [gameboard.spaces[2], gameboard.spaces[5], gameboard.spaces[8]],
            [gameboard.spaces[0], gameboard.spaces[4], gameboard.spaces[8]],
            [gameboard.spaces[2], gameboard.spaces[4], gameboard.spaces[6]]
        ],
        storedMoves: new Set(), // A set is a data structure that stores values with no duplicates
        switchPlayer: function(){
            if (currentPlayer === playerOne){
                currentPlayer = playerTwo;
            } else if (currentPlayer === playerTwo){
                currentPlayer = playerOne;
            }
        },
        storeMoves: function(e){ // this stores winning moves that include a space that was picked
            // for each item in the winning moves array
            for (let i = 0; i < this.winningMoves.length; i++){
                let moves = this.winningMoves[i];
                // check for the moves that include a space that was just picked
                if (moves.includes(e.target)){
                    // if a checked winning moves includes the clicked space, add it to the storedMoves set
                    this.storedMoves.add(moves)
                }
            } 
        },
        winCheck: function(e){
            this.storeMoves(e);
            // make an array from the stored moves set
            let matches = Array.from(this.storedMoves);
            // loop through all the moves in the matches array
            let list = [];
            for (let i = 0; i < matches.length; i++){
                let match = matches[i];
                list.push(match);
            }
            for (let i = 0; i < list.length; i++){
                let moves = list[i];
                if (moves.includes(e.target)){
                    if (moves[0].innerText === moves[1].innerText && moves[0].innerText === moves[2].innerText){
                        console.log('3 in a row');
                    }
                }
            }
            // check if each item in sub-array have the same text content

            // if one of the winning moves all have "X", player 1 wins

            // if one of the winning moves all have "O", player 2 wins

            // if there is no winning move and all the spaces are filled, record it as a tie
        }
    }
})();