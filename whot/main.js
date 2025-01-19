let displayBoard = document.querySelector('#whot-display');
let humanSide = document.querySelector('#your-box');
let aiSide = document.querySelector('#ai-box');
let user = [humanSide, aiSide];
let pickedUser = humanSide; // Default to player
let normalSound = new Audio('assets/sounds/swish.m4a');
let winSound = new Audio('assets/sounds/cash.mp3')
let looseSound = new Audio('assets/sounds/aww.mp3')

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
    normalSound.play();
}

function playCard(card, playerSide) {
    if (
        card.dataset.number === currentCard.dataset.number ||
        card.dataset.shape === currentCard.dataset.shape
    ) {
        currentCard.remove();
        currentCard = card;
        playerSide.removeChild(card);
        displayBoard.appendChild(card);

        checkWin(playerSide);

        if (playerSide === humanSide) {
            pickedUser = aiSide; // Switch to AI side after human move
            setTimeout(aiPlay, 1000); // AI plays automatically
        }
    } else {
        // No valid card, go to market
        market();
    }
    normalSound.play();
}

function market() {
    // Generate a random card for the player (human or AI)
    let cardImage = document.createElement('img');
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let card = numbers[Math.floor(Math.random() * numbers.length)];
    let shapeArray = ['square', 'circle', 'triangle', 'star'];
    let shapeImage = shapeArray[Math.floor(Math.random() * shapeArray.length)];
    cardImage.src = `assets/images/${card}${shapeImage}.png`;
    cardImage.dataset.number = card;
    cardImage.dataset.shape = shapeImage;

    // Add the card to the current user's hand (human or AI)
    pickedUser.appendChild(cardImage);
    normalSound.play();

    // If the user is human, attach event listener for playing the card
    if (pickedUser === humanSide) {
        cardImage.addEventListener('click', function () {
            playCard(this, pickedUser); // Human plays the card
        });
    }

    // After the player (human or AI) goes to market, switch to the opponent
    pickedUser = (pickedUser === humanSide) ? aiSide : humanSide;
    setTimeout(pickedUser === aiSide ? aiPlay : humanPlay, 1000); // Switch to AI or human depending on the current user
    normalSound.play();
}

function aiPlay() {
    let aiCards = aiSide.querySelectorAll('img');
    let hasValidCard = false;

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
            hasValidCard = true;
            break;
        }
    }

    if (!hasValidCard) {
        // If no valid card, AI goes to market and switches to human turn
        market();
    }
    // If AI plays a card, it switches back to human's turn
    else {
        pickedUser = humanSide; // Switch back to human
    }
    normalSound.play();
}

function reset() {
    humanSide.innerHTML = '<h2>You</h2>';
    aiSide.innerHTML = '<h2>AI</h2>';
    displayBoard.innerHTML = '';
    currentCard = null;
    pickedUser = humanSide;
    normalSound.play();
}

function checkWin(playerSide) {
    if (playerSide.querySelectorAll('img').length === 0) {
        if (playerSide === humanSide) {
            winSound.play()
            alert('You win!');
            updateScore('wins');
            
        } else {
            looseSound.play()
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
