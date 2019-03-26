"use strict"
$(()=>{
    /* or this? for IIFE?
$(document).ready(function() {
    */


const cards = document.querySelectorAll('.flip-card');


 
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  this.classList.toggle('flip');
  this.classList.add('flip');

if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

// works kind of wonky... maybe with the avatar picture on the front it will work?
// $('.flip-card').on('click', function() {
//   $(this).css('transform', 'rotateY(180deg)');
//   console.log("this works");
//   console.log(this);
// })

  let pickCount = 0;
  let firstPick;
  let firstPickId;
  let secondPick;
  let secondPickId;


  $(`.flip-card`).on(`click`, cardClick);

  function cardClick() {
    if (pickCount === 0) {
      pickCount++;
      console.log({ pickCount });
      firstPick = $(this).find('img').attr(`alt`);
      firstPickId = $(this).attr('id');
      console.log({ firstPick });
      console.log({ firstPickId });
    } else if (pickCount === 1) {
      secondPickId = $(this).attr('id');
      if (firstPickId === secondPickId) {
        return;
      } else {
        pickCount = 0;
        console.log({ pickCount });
        secondPick = $(this).find('img').attr(`alt`);
        console.log({ secondPick });
        let matchBoolean = doTheyMatch(firstPick, secondPick);
        console.log({ matchBoolean });
        if (matchBoolean === true) {
          console.log("its a match");
        } else {
          console.log("NOT A MATCH!!");
        }
      }
    }
  }

  function doTheyMatch(pick1, pick2) {
    if (pick1 === pick2) {
      return true;
    } else {
      return false;
    }
  }



/* card randomizer function here */

const cardRandomizer = function(){
    let cardDivArray = [];
    const createCardDivArray = function(){
        $("div").each(function(){
            if ($(this).hasClass("flip-card")===true){
                cardDivArray.push(this);
                return cardDivArray;
            }
        })
    };
    createCardDivArray();
    cardDivArray.forEach(function(n){
        $(n).css("order", `${Math.floor(Math.random()*99)}`);
    });
};

/* Start button Logic*/
/* on click of emerald (will clicking start text work?) */

$("#start-button").click(function() {
  cardRandomizer();
  /*clear cover-sheet*/
  $('#cover-sheet').addClass("hidden");
  /* hide start-button */
  $('#start-button').addClass("hidden");
  /* start clock */
  /*other options: bring up difficulty menu &/or multiplayer options*/
});

/* Re-start button Logic */

$("#restart-button").click(function() {
  /*bring up start button*/
  if ($("#start-button").hasClass("hidden")===true){
    $("#start-button").removeClass("hidden");
  };
  /*un hide cards*/
  let cardCoverArray = [];
  const createCoverDivArray = function(){
    $("div").each(function(){
        if ($(this).hasClass("card-cover")===true){
            cardCoverArray.push(this);
            return cardCoverArray;
        };
      });
  };
  createCoverDivArray();
  console.log(cardCoverArray);
  cardCoverArray.forEach(function(n){
    if ($(n).hasClass("hidden")===false){
      $(n).addClass("hidden");
    }
  });
  /*flip cards if they aren't hidden on cover-up*/

  /*stop clock*/

  /*zero out clock*/

});

/* dave copy/paste */
const cards = document.querySelectorAll('.flip-card');

 let cardHasFlipped = false;
 let gameLock = false;  // When the user flips the second card, gameLock will be set to true
 let firstCard;
 let secondCard;

 function flipCard() {
   if (gameLock) return;
   if (this === firstCard) return;

   this.classList.add('flip');

   if (!cardHasFlipped) {
     cardHasFlipped = true;
     firstCard = this;
    return;
    console.log("Is this working?");
  }

  secondCard = this;
  // cardHasFlipped = false;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards(); // On line 47
    return;
  }

  unflipCards();  // On line 50
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetGame(); // On line 63
}

function unflipCards() {
  gameLock = true; // This will prevent further card flips until both cards are hidden or matched


  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // gameLock = false;
    resetGame();
  }, 700);  // The time limit before the card flips back over
}

function resetGame() {
  [cardHasFlipped, gameLock] = [false, false];
  [firstCard, secondCard] = [null, null];
}


cards.forEach(card => card.addEventListener('click', flipCard));







// works kind of wonky... maybe with the avatar picture on the front it will work?
// $('.flip-card').on('click', function() {
//   $(this).css('transform', 'rotateY(180deg)');
//   console.log("this works");
//   console.log(this);
// })

  let pickCount = 0;
  let firstPick;
  let firstPickId;
  let secondPick;
  let secondPickId;


  $(`.flip-card`).on(`click`, cardClick);

  function cardClick() {
    if (pickCount === 0) {
      pickCount++;
      console.log({ pickCount });
      firstPick = $(this).find('img').attr(`alt`);
      firstPickId = $(this).attr('id');
      console.log({ firstPick });
      console.log({ firstPickId });
    } else if (pickCount === 1) {
      secondPickId = $(this).attr('id');
      if (firstPickId === secondPickId) {
        return;
      } else {
        pickCount = 0;
        console.log({ pickCount });
        secondPick = $(this).find('img').attr(`alt`);
        console.log({ secondPick });
        let matchBoolean = doTheyMatch(firstPick, secondPick);
        console.log({ matchBoolean });
        if (matchBoolean === true) {
          console.log("its a match");
        } else {
          console.log("NOT A MATCH!!");
        }
      }
    }
  }

  function doTheyMatch(pick1, pick2) {
    if (pick1 === pick2) {
      return true;
    } else {
      return false;
    }
  }
/*end*/



});