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
  };

  /* Start button Logic*/
  $("#start-button").click(function() {
    cardRandomizer();
   /*clear cover-sheet*/
    $('#cover-sheet').addClass("hidden");
    /* hide start-button */
    $('#start-button').fadeOut(500);
    /* start clock */
    timerStart();
   });

  //reset button functions

  $("#restart-button").click(function() {
    /*bring up start button*/
      uncoverAllCards();
    if ($("#start-button").is(":visible")===false){
      $("#cover-sheet").removeClass("hidden");
      $("#start-button").fadeIn(300);
    };
    
     /*un hide cards*/
    // let cardCoverArray = [];
    // const createCoverDivArray = function () {
    //   $("div").each(function () {
    //     if ($(this).hasClass("card-cover") === true) {
    //       cardCoverArray.push(this);
    //       return cardCoverArray;
    //     };
    //   });
    // };
    // createCoverDivArray();
    // console.log(cardCoverArray);
    // cardCoverArray.forEach(function (n) {
    //   if ($(n).hasClass("hidden") === false) {
    //     $(n).addClass("hidden");
    //   }
    // });
    $("div").each(function () {
      if ($(this).hasClass("flip") === true) {
        this.classList.remove('flip');
      }
      if ($(this).hasClass("invisible") === true) {
        this.classList.remove('invisible');
      }
    });
    timerStop();
    timerReset();
    timerLabel.innerHTML = '00:00:00';
    $(`#timerLabel`).css('color', 'none')
  });


  /*matching card logic */
  $(`.flip-card`).on(`click`, cardClick);
  function cardClick() {
    if ($(this).hasClass("invisible")===true){
      return;
    }
    else if (pickCount === 0) {
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
            uncoverAllCards();
          }
          hideMatch();         
          coverCards();
          console.log("its a match");
        } else {
          unflipCards();
          console.log("NOT A MATCH!!");        }
      }
    }
  }

  function hideMatch() {
    $("#cover-sheet").removeClass("hidden");
    setTimeout(function() {
      firstCard.classList.add(`invisible`);
      secondCard.classList.add(`invisible`);
    }, 700);
    setTimeout(function(){
      $("#cover-sheet").addClass("hidden")}, 700);
  };

  function doTheyMatch(pick1, pick2) {
    if (pick1 === pick2) {
      return true;
    } else {
      return false;
    }
  };

  function unflipCards() {
    $("#cover-sheet").removeClass("hidden");
    setTimeout( function(){
      firstCard.classList.remove(`flip`);
      secondCard.classList.remove(`flip`);
    }, 700);
    setTimeout(function(){
      $("#cover-sheet").addClass("hidden")}, 700);;
  };

  /* card randomizer function here */
  const cardRandomizer = function () {
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

  const coverCards = function(){
    $(firstCard.childNodes[5]).removeClass("hidden").addClass("z2");
    $(secondCard.childNodes[5]).removeClass("hidden").addClass("z2");
  }

  const uncoverAllCards = function(){
    cardDivArray.forEach(function (n) {
      console.warn($(n.childNodes[5]))
      $(n.childNodes[5]).removeClass("z2").addClass("hidden");
      console.log($(n.childNodes[5]))
    });
  };

});