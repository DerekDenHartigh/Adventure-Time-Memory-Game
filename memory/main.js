"use strict"


// works kind of wonky... maybe with the avatar picture on the front it will work?
// $('.flip-card').on('click', function() {
//   $(this).css('transform', 'rotateY(180deg)');
//   console.log("this works");
//   console.log(this);
// })
$(() => {
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

});