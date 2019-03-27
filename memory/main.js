"use strict"
$(() => {
  // variables needed for the matching logic 
  let pickCount = 0;
  let firstPick;
  let firstPickId;
  let secondPick;
  let secondPickId;
  let firstCard;
  let secondCard;
  let numOfMatches = 0;
  let cardDivArray = [];
  //below are variable for the timer
  let status = 0; // 0:stop 1:running
  let time = 0;
  // below are the functions for the timer
  function timerStart() {
    status = 1;
    timer();
  }
  function timerStop() {
    status = 0;

  }
  function timerReset() {
    status = 0;
    time = 0;
    timerLabel.innerHTML = '00:00:00';
  }
  function timer() {
    if (status == 1) {
      setTimeout(function () {
        time++;
        var min = Math.floor(time / 100 / 60);
        var sec = Math.floor(time / 100);
        var mSec = time % 100;
        if (min < 10) min = "0" + min;
        if (sec >= 60) sec = sec % 60;
        if (sec < 10) sec = "0" + sec;
        if (mSec < 10) mSec = "0" + mSec;
        timerLabel.innerHTML = min + ":" + sec + ":" + mSec;
        timer();
      }, 10);
    }
  }

  /* Start button Logic*/
  /* on click of emerald (will clicking start text work?) */
  $("#start-button").click(function() {
    cardRandomizer();
   /*clear cover-sheet*/
    $('#cover-sheet').addClass("hidden");
    /* hide start-button */
    $('#start-button').fadeOut(500);
    /* start clock */
    timerStart();
    /*other options: bring up difficulty menu &/or multiplayer options*/
   });

  //rest button functions

  $("#restart-button").click(function() {
    /*bring up start button*/
    if ($("#start-button").is(":visible")===false){
      $("#cover-sheet").removeClass("hidden");
      $("#start-button").fadeIn(300);
    };
    
     /*un hide cards*/
    let cardCoverArray = [];
    const createCoverDivArray = function () {
      $("div").each(function () {
        if ($(this).hasClass("card-cover") === true) {
          cardCoverArray.push(this);
          return cardCoverArray;
        };
      });
    };
    createCoverDivArray();
    console.log(cardCoverArray);
    cardCoverArray.forEach(function (n) {
      if ($(n).hasClass("hidden") === false) {
        $(n).addClass("hidden");
      }
    });
    /*flip cards if they aren't hidden on cover-up*/

    /*stop clock*/

    /*zero out clock*/

  });


  /*matching card logic */
  $(`.flip-card`).on(`click`, cardClick);
  function cardClick() {
    if (pickCount === 0) {
      pickCount++;
      firstCard = this;
      console.log({ firstCard });
      firstCard.classList.add('flip');
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
        secondCard = this;
        secondCard.classList.add('flip');
        secondPick = $(this).find('img').attr(`alt`);
        console.log({ secondPick });
        let matchBoolean = doTheyMatch(firstPick, secondPick);
        console.log({ matchBoolean });
        if (matchBoolean === true) {

          numOfMatches++;
          console.log({ numOfMatches });
          if (numOfMatches === cardDivArray.length / 2) {
            console.log("you are the winner!!!!!!!!!!!");
            timerStop();
          }
          console.log("its a match");
        } else {
          unflipCards();
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
  // function for unfliping non matches.
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove(`flip`);
      secondCard.classList.remove(`flip`);
    }, 700);
  }

  /* card randomizer function here */
  const cardRandomizer = function () {
    // let cardDivArray = [];

    const createCardDivArray = function () {
      $("div").each(function () {
        if ($(this).hasClass("flip-card") === true) {
          cardDivArray.push(this);
          return cardDivArray;
        }
      })
    };
    createCardDivArray();
    cardDivArray.forEach(function (n) {
      $(n).css("order", `${Math.floor(Math.random() * 99)}`);
    });
  };

});