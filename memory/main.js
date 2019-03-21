"use strict"


// works kind of wonky... maybe with the avatar picture on the front it will work?
$('.flip-card').on('click', function() {
  $(this).css('transform', 'rotateY(180deg)');
  console.log("this works");
  console.log(this);
})


// testing
// new branch