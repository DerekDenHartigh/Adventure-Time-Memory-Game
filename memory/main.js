"use strict"

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
