(function(){
    'use strict';
    console.log('autorun');
    // keep track of whose turn it is
    let currentPlayer = 1; 
    // gameboard module
    const tictactoe = {
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
        bindEvents: function(){
            for (let i = 0; i < this.spaces.length; i++){ // add events to all the spaces
                this.spaces[i].addEventListener('click', this.selectSpace);
            }
        }
    }
    tictactoe.init();
    // player factory function
    const playerFactory = (order, name) => {
        return {order: order, name: name};
    }
    // create two players
    const playerOne = playerFactory(1, 'Player One');
    const playerTwo = playerFactory(2, 'Player Two');
    // 
})();