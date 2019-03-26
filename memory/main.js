"use strict"
$(() => {
  /* or this? for IIFE?
$(document).ready(function() {
  */
  //below are the variables for matching logic
  let pickCount = 0;
  let firstPick;
  let firstPickId;
  let secondPick;
  let secondPickId;
  let numOfMatches = 0;
  //below are the variables for flip cards
  let hasFlippedCard = false;
  let firstCard, secondCard;
  //below are variable for the timer
  let minutesLabel = document.getElementById("minutes");
  let secondsLabel = document.getElementById("seconds");
  let totalSeconds = 0;
  let gameTimer;
  //below is the code for the timer
  // this code below has to go in the html to display the timer
  // <label id="minutes">00</label>:<label id="seconds">00</label>
  gameTimer = setInterval(setTime, 1000);
  // put the above line into start and restart function
  // in theroy the code belowshould stop the timer
  // clearInterval(gameTimer);
  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  //below is the code for the flip card
  const cards = document.querySelectorAll('.flip-card');

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

  //below is the code for the matching logic
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
          numOfMatches++
          console.log({ numOfMatches });
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

  const cardRandomizer = function () {
    let cardDivArray = [];
    const createCardDivArray = function () {
      $("div").each(function () {
        if ($(this).hasClass("flip-card") === true) {
          cardDivArray.push(this);
          return cardDivArray;
        }
      })
    };
    createCardDivArray();

    console.warn(cardDivArray);

    cardDivArray.forEach(function (n) {
      $(n).css("order", `${Math.floor(Math.random() * 99)}`);
    });
  };

  // cardRandomizer()

  $(`#startBtn`).on(`click`, startGame);
  $(`#resetBtn`).on(`click`, resetGame);

  function startGame() {
    cardRandomizer();
    pickCount = 0;
    firstPick = 0;
    firstPickId = 0;
    secondPick = 0;
    secondPickId = 0;
    numOfMatches = 0;

  }
  function resetGame() {
    cardRandomizer();
    pickCount = 0;
    firstPick = 0;
    firstPickId = 0;
    secondPick = 0;
    secondPickId = 0;
    numOfMatches = 0;

  }
});