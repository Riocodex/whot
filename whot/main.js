var displayTest=0
displayBoard=document.querySelector('#whot-display')
// displayBoard.style.display='none'
humanSide=document.querySelector('#your-box')
aiSide=document.querySelector('#ai-box')
user=[humanSide,aiSide]
pickedUser=user[0]
console.log(pickedUser)
console.log(displayBoard)

//sound variables
normalSound=new Audio('assets/sounds/swish.m4a')

//displaying number of cards according to the user
function play(cardNumbers){
    var cardNumbers=prompt('how many cards do you want to start with')
    for(i=0;i<cardNumbers ;i++){
        let cardImage=document.createElement('img');
        let cardImage_ai=document.createElement('img')
        numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        card=numbers[Math.floor(Math.random()*14)]
        shapeArray=['square','circle','triangle','star']
        shapeImage=shapeArray[Math.floor(Math.random()*4 )]
        cardImage.src=`assets/images/${card}${shapeImage}.png`
        cardImage_ai.src = `assets/images/${card}${shapeImage}.png`
        // user.forEach(items => {
        //     items.appendChild(cardImage)
        // });
        user[1].appendChild(cardImage);
        user[0].appendChild(cardImage_ai);
        normalSound.play()
        gamePlay()
       
    }
}

function market(){
    //generating random cards
    let cardImage=document.createElement('img');
    numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    card=numbers[Math.floor(Math.random()*14)]
    shapeArray=['square','circle','triangle','star']
    shapeImage=shapeArray[Math.floor(Math.random()*4 )]
    cardImage.src=`assets/images/${card}${shapeImage}.png`

    //to stop repetition of cards
    // let uniqueCard=[] 
    // uniqueCard.push(card,shapeImage)
    // if(card==uniqueCard[0] || shapeImage==uniqueCard[1]){
    //     console.log('repetition')
    // }
        pickedUser.appendChild(cardImage);
        normalSound.play()
    
   
}
//reseting the game when player wins or looses or decides to quit halfway
function reset() {
    let yourImages=humanSide.querySelectorAll('img')
    let aiImages=aiSide.querySelectorAll('img')
        for(i=0;i<yourImages.length;i++){
           yourImages[i].remove() 
        } 
        for(i=0;i<aiImages.length;i++){
            aiImages[i].remove() 
         } 
    
}
function gamePlay(){
    let yourImages=humanSide.querySelectorAll('img')
    let aiImages=aiSide.querySelectorAll('img')
    let whotDisplay=document.querySelector('#whot-display')

   
        yourImages[i].addEventListener('click',function(){
            for(i=0;i<yourImages.length;i++){
                yourImages[i].remove()
                whotDisplay.appendChild(yourImages[i])
            }

        })
      
}



