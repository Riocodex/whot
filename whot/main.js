let displayBoard = document.querySelector('#whot-display');
let humanSide = document.querySelector('#your-box');
let aiSide = document.querySelector('#ai-box');
let user = [humanSide, aiSide];
let pickedUser = humanSide; // Default to player
let normalSound = new Audio('assets/sounds/swish.m4a');
let winSound = new Audio('assets/sounds/cash.mp3')
let looseSound = new Audio('assets/sounds/aww.mp3')

let whotback = 'assets/images/whotback.png'

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
    
    // Assign the actual card details
    cardImage.dataset.number = card;
    cardImage.dataset.shape = shapeImage;
    
    // Show the front image for human or display board
    if (target === humanSide || isInitial) {
        cardImage.src = `assets/images/${card}${shapeImage}.png`;
    } else {
        // Show the back of the card for AI
        cardImage.src = 'assets/images/whotback.png';
    }

    if (isInitial) {
        target.appendChild(cardImage);
    } else {
        if (target === humanSide) {
            // Allow only human cards to be clickable
            cardImage.addEventListener('click', function () {
                playCard(this, target);
            });
        }
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

        if (card.dataset.number === "1") {
            normalSound.play();
            // If the card number is 1, allow the player to play again
            return; // Do not switch turn
        }

        if (card.dataset.number === "14") {
            // If the card number is 14, opponent automatically picks one card
            pickedUser = (playerSide === humanSide) ? aiSide : humanSide;
            market(); // Opponent picks one card
            normalSound.play();
            return; // Allow the current player to play again
        }

       

        // Switch turn to the next player
        if (playerSide === humanSide) {
            pickedUser = aiSide;
            setTimeout(aiPlay, 1000); // AI plays automatically
        } else {
            pickedUser = humanSide;
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
    cardImage.dataset.number = card;
    cardImage.dataset.shape = shapeImage;

    // If the current player is AI, show the back of the card
    if (pickedUser === aiSide) {
        cardImage.src = whotback;
    } else {
        // For the human player, show the actual card
        cardImage.src = `assets/images/${card}${shapeImage}.png`;
        cardImage.addEventListener('click', function () {
            playCard(this, pickedUser); // Human plays the card
        });
    }

    // Add the card to the current user's hand (human or AI)
    pickedUser.appendChild(cardImage);
    normalSound.play();

    // After the player (human or AI) goes to market, switch to the opponent
    pickedUser = (pickedUser === humanSide) ? aiSide : humanSide;
    setTimeout(pickedUser === aiSide ? aiPlay : humanPlay, 1000); // Switch to AI or human depending on the current user
}
function marketTwo() {
    // Generate a random card for the player (human or AI)
    let cardImage = document.createElement('img');
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let card = numbers[Math.floor(Math.random() * numbers.length)];
    let shapeArray = ['square', 'circle', 'triangle', 'star'];
    let shapeImage = shapeArray[Math.floor(Math.random() * shapeArray.length)];
    cardImage.dataset.number = card;
    cardImage.dataset.shape = shapeImage;

    // If the current player is AI, show the back of the card
    if (pickedUser === aiSide) {
        cardImage.src = whotback;
    } else {
        // For the human player, show the actual card
        cardImage.src = `assets/images/${card}${shapeImage}.png`;
        cardImage.addEventListener('click', function () {
            playCard(this, pickedUser); // Human plays the card
        });
    }

    // Add the card to the current user's hand (human or AI)
    pickedUser.appendChild(cardImage);
    pickedUser.appendChild(cardImage);
    normalSound.play();

    // After the player (human or AI) goes to market, switch to the opponent
    pickedUser = (pickedUser === humanSide) ? aiSide : humanSide;
    setTimeout(pickedUser === aiSide ? aiPlay : humanPlay, 1000); // Switch to AI or human depending on the current user
}

function aiPlay() {
    let aiCards = aiSide.querySelectorAll('img');
    let hasValidCard = false;

    for (let i = 0; i < aiCards.length; i++) {
        // Check if the AI card matches the current card
        if (
            aiCards[i].dataset.number === currentCard.dataset.number ||
            aiCards[i].dataset.shape === currentCard.dataset.shape
        ) {
            // Reveal the AI card before playing
            aiCards[i].src = `assets/images/${aiCards[i].dataset.number}${aiCards[i].dataset.shape}.png`;

            currentCard.remove();
            currentCard = aiCards[i];
            aiSide.removeChild(aiCards[i]);
            displayBoard.appendChild(aiCards[i]);
            checkWin(aiSide);

            hasValidCard = true;

            if (aiCards[i].dataset.number === "1") {
                // If AI plays a "1", AI plays again
                setTimeout(aiPlay, 1000);
                normalSound.play();
                return; // Exit to prevent switching turns
            }

            if (aiCards[i].dataset.number === "14") {
                // If AI plays a "14", human automatically picks one card
                pickedUser = humanSide;
                market(); // Human picks one card
                setTimeout(aiPlay, 1000); // AI continues playing
                normalSound.play();
                return; // Exit to prevent switching turns
            }

           

            break;
        }
    }

    if (!hasValidCard) {
        // If no valid card, AI goes to market and switches to human turn
        market();
    } else {
        // Switch back to human's turn
        pickedUser = humanSide;
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
            updateScore('wins');
            
        } else {
            looseSound.play()
            updateScore('losses');
            
        }
        reset();
    }
}

function updateScore(resultType) {
    let scoreElement = document.querySelector(`#${resultType}`);
    scoreElement.textContent = parseInt(scoreElement.textContent) + 1;
}
