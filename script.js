(function(){
    'use strict';
    // player factory function
    const playerFactory = (name, mark) => {
        let selectSpace = (e) => {
            e.target.firstChild.src = currentPlayer.mark;
            e.target.firstChild.style.display = 'block';
            e.target.style.pointerEvents = 'none';
            gameboard.markedSpaces.push(e.target);
            gameController.winCheck(e);
            gameController.switchPlayer();
        }
        return {name, mark, selectSpace};
    }
    // // create two players
    let playerOne = playerFactory('', '');
    let playerTwo = playerFactory('', '');
    // keep track of whose turn it is
    let currentPlayer = playerOne;
    // general function to add items to array
    const addToArray = (array, target) => {
        for (let i = 0; i < array.length; i++){
            let item = array[i];
            target.push(item);
        }
    }
    // general function to switch displays
    const swapdisplay = (item1, item2) => {
        item1.style.display = 'none';
        item2.style.display = 'block';
    }
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
            this.markedSpaces = [];
            this.submit = document.querySelector('#submit');
            this.player1name = document.querySelector('#player1name');
            this.player2name = document.querySelector('#player2name');
            this.start = document.querySelector('.start');
            this.playericons = document.querySelectorAll('.playericon');
        },
        bindEvents: function(){ // all event bindings happen here
            for (let i = 0; i < this.spaces.length; i++){ // add events to all the spaces
                this.spaces[i].addEventListener('click', currentPlayer.selectSpace);
            }
            this.submit.addEventListener('click', () => {
                swapdisplay(this.start, this.board);
                playerOne.name = this.player1name.value;
                playerTwo.name = this.player2name.value;
            })
            for (let i = 0; i < this.playericons.length; i++){
                this.playericons[i].addEventListener('click', (e) => {
                    if (e.target.classList.contains('player1')){
                        playerOne.mark = e.target.src;
                    } else if (e.target.classList.contains('player2')){
                        playerTwo.mark = e.target.src;
                    }
                    e.target.classList.add('selected');
                    e.target.parentNode.style.pointerEvents = 'none';
                });
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
            // loop through all the moves in the matches array and add it to the list array
            let list = [];
            addToArray(matches, list);
            // check if each item in sub-array have the same text content
            for (let i = 0; i < list.length; i++){
                let moves = list[i];
                // do this if the "moves" item contains the picked space
                if (moves.includes(e.target)){
                    // check if any of the statements are true
                    switch(true){
                        // if one of the winning moves all have player 1's icon, player 1 wins
                        case moves[0].firstChild.src === moves[1].firstChild.src && moves[0].firstChild.src === moves[2].firstChild.src && moves[0].firstChild.src === playerOne.mark:
                            console.log('Player 1 wins!');
                            gameboard.board.style.pointerEvents = 'none';
                            break;
                        // if one of the winning moves all have player 2's icon, player 2 wins
                        case moves[0].firstChild.src === moves[1].firstChild.src && moves[0].firstChild.src === moves[2].firstChild.src && moves[0].firstChild.src === playerTwo.mark:
                            console.log('Player 2 wins!');
                            gameboard.board.style.pointerEvents = 'none';
                            break;
                        case gameboard.markedSpaces.length === 9 && moves[0] !== moves[1]:
                            console.log('It was a tie!'); // QUESTION: why is this firing twice?
                            break;
                        default:
                            break;
                    }
                }            
            }         
            // if there is no winning move and all the spaces are filled, record it as a tie
        }
    }
})();