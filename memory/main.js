"use strict"
$(()=>{
    /* or this? for IIFE?
$(document).ready(function() {
    */

$('.flip-card').on('click', function() {
  $(this).css('transform', 'rotateY(180deg)');
  console.log("this works");
  console.log(this);
})


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

    console.warn(cardDivArray);

    cardDivArray.forEach(function(n){
        $(n).css("order", `${Math.floor(Math.random()*99)}`);
    });
};

cardRandomizer()
});