let displayBoard = document.querySelector('#whot-display');
let humanSide = document.querySelector('#your-box');
let aiSide = document.querySelector('#ai-box');
let user = [humanSide, aiSide];
let pickedUser = user[0];
let normalSound = new Audio('assets/sounds/swish.m4a');

// Store the current card in play
let currentCard = null;

function play() {
    let cardNumbers = prompt('How many cards do you want to start with?');
    for (let i = 0; i < cardNumbers; i++) {
        generateCard(humanSide);
        generateCard(aiSide);
    }
    // Initialize the first card in the display area
    generateCard(displayBoard, true);
    currentCard = displayBoard.querySelector('img');
    normalSound.play();
}

function generateCard(target, isInitial = false) {
    let cardImage = document.createElement('img');
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let card = numbers[Math.floor(Math.random() * numbers.length)];
    let shapeArray = ['square', 'circle', 'triangle', 'star'];
    let shapeImage = shapeArray[Math.floor(Math.random() * shapeArray.length)];
    cardImage.src = `assets/images/${card}${shapeImage}.png`;
    cardImage.dataset.number = card;
    cardImage.dataset.shape = shapeImage;

    if (isInitial) {
        target.appendChild(cardImage);
    } else {
        cardImage.addEventListener('click', function () {
            playCard(this, target);
        });
        target.appendChild(cardImage);
    }
}

function playCard(card, playerSide) {
    // Check if the card matches the current card in play
    if (
        card.dataset.number === currentCard.dataset.number ||
        card.dataset.shape === currentCard.dataset.shape
    ) {
        // Remove the card from the player's hand and move it to the display area
        currentCard.remove();
        currentCard = card;
        playerSide.removeChild(card);
        displayBoard.appendChild(card);

        // Check for win condition
        checkWin(playerSide);

        // AI Turn
        if (playerSide === humanSide) {
            setTimeout(aiPlay, 1000);
        }
    } else {
        alert('Invalid move! Card must match by number or shape.');
    }
}

function aiPlay() {
    let aiCards = aiSide.querySelectorAll('img');
    for (let i = 0; i < aiCards.length; i++) {
        if (
            aiCards[i].dataset.number === currentCard.dataset.number ||
            aiCards[i].dataset.shape === currentCard.dataset.shape
        ) {
            currentCard.remove();
            currentCard = aiCards[i];
            aiSide.removeChild(aiCards[i]);
            displayBoard.appendChild(aiCards[i]);
            checkWin(aiSide);
            return;
        }
    }
    // If no valid card, AI goes to market
    market(aiSide);
}

function market(target) {
    generateCard(target);
    normalSound.play();
}

function reset() {
    humanSide.innerHTML = '<h2>You</h2>';
    aiSide.innerHTML = '<h2>AI</h2>';
    displayBoard.innerHTML = '';
    currentCard = null;
}


function checkWin(playerSide) {
    if (playerSide.querySelectorAll('img').length === 0) {
        if (playerSide === humanSide) {
            alert('You win!');
            updateScore('wins');
        } else {
            alert('AI wins!');
            updateScore('losses');
        }
        reset();
    }
}

function updateScore(resultType) {
    let scoreElement = document.querySelector(`#${resultType}`);
    scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
}
