(function(){
    'use strict';
    // keep track of whose turn it is
    let currentPlayer = 1; 
    // gameboard module
    const gameboard = {
        spaces: [], // store the spaces in an array
        init: function(){// function to initialize app
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function(){
            for (let i = 0; i < 9; i++){
                this.spaces[i] = document.getElementById(i);
            }
        },

        bindEvents: function(){
            for (let i = 0; i < this.spaces.length; i++){ // add events to all the spaces
                this.spaces[i].addEventListener('click', gameController.selectSpace);
            }
        }
    }
    console.log(gameboard.spaces);
    const gameController = {
        // store the win conditions in an array
        winningMoves: [
            [gameboard.spaces[0], gameboard.spaces[1], gameboard.spaces[2]],
            [gameboard.spaces[3], gameboard.spaces[4], gameboard.spaces[5]],
            [gameboard.spaces[6], gameboard.spaces[7], gameboard.spaces[8]],
            [gameboard.spaces[0], gameboard.spaces[3], gameboard.spaces[6]],
            
        ],
        selectSpace: function(e){
            if (currentPlayer === 1){
                e.target.innerText = 'X';
                currentPlayer = 2;
            } else if (currentPlayer === 2){
                e.target.innerText = 'O';
                currentPlayer = 1;
            }
            e.target.style.pointerEvents = 'none';
        },
        winCheck: function(){
            switch (result) {
                default:
                    console.log('It was a tie!');
            }
        }

    }
    gameboard.init();
    // player factory function
    const playerFactory = (order, name) => {
        return {order: order, name: name};
    }
    // create two players
    const playerOne = playerFactory(1, 'Player One');
    const playerTwo = playerFactory(2, 'Player Two');
    // 
})();