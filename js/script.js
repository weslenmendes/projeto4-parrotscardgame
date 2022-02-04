let numberOfCards = null;
let upturnedCards = 0;
let card1 = null,
  card2 = null;
let points = 0;

// Função Inicial
function init() {
  numberOfCards = parseInt(
    prompt("Digite a quantidade de cartas: Ex.: 2, 4, 6, ..., 14")
  );

  while (numberOfCards < 2 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = parseInt(
      prompt("Digite a quantidade de cartas: Ex.: 2, 4, 6, ..., 14")
    );
  }

  createCards(numberOfCards);
}

// Criar as cartas
function createCards(numCards) {
  let htmlCards = [];

  const allCards = [
    "metalparrot.gif",
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif",
  ];

  let indexCards = 0;
  let index = 0;
  let nameCard, html;

  while (index < numCards) {
    nameCard = allCards[indexCards].split(".")[0];
    html = `<div class="card" onclick="flipCard(this)">
      <div class="front-face face">
        <img src="assets/front.png" alt="Frente" />
      </div>
      <div class="back-face face">
        <img src="assets/${allCards[indexCards]}" alt="${nameCard}" />
      </div>
    </div>`;

    htmlCards.push(html);
    htmlCards.push(html);

    index += 2;
    indexCards++;
  }

  htmlCards = shuffleCards(htmlCards);
  insertCardsInsideTheHTML(htmlCards);
}

// Embaralhar as cartas
function comparator() {
  return Math.random() - 0.5;
}

function shuffleCards(cards) {
  return cards.sort(comparator);
}

// Inserir as cartas no HTML
function insertCardsInsideTheHTML(cards) {
  const divCards = document.querySelector(".cards");
  let allHTML = cards[0];

  for (let index = 1; index < cards.length; index++) {
    allHTML += cards[index];
  }

  divCards.innerHTML = allHTML;
}

function flipCard(card) {
  if (upturnedCards < 2 && !card.classList.contains("turn")) {
    card.classList.add("turn");
  }

  if (upturnedCards === 0) {
    card1 = card;
    upturnedCards++;
  } else if (upturnedCards === 1) {
    card2 = card;
    upturnedCards++;
  }

  compareTheCards(card1, card2);

  if (card1 && card2) {
    const imgCard1 = card1.querySelector(".back-face img");
    const imgCard2 = card2.querySelector(".back-face img");
    let idTimeout;

    const isEqual = imgCard1.alt === imgCard2.alt;

    if (isEqual) {
      markPoint();
    } else {
      idTimeout = setTimeout(() => untapCards(idTimeout), 1000);
    }
  }
}

function clearVariables() {
  card1 = null;
  card2 = null;
  upturnedCards = 0;
}

function untapCards(idTimeout) {
  let idToTimeout;

  card1.classList.remove("turn");
  card2.classList.remove("turn");

  clearInterval(idTimeout);
  idToTimeout = setTimeout(clearVariables, 300);

  return () => clearTimeout(idToTimeout);
}

function markPoint() {
  points += 1;

  gameOver();
  clearVariables();
}

function compareTheCards(cardOne, cardTwo) {
  if (cardOne === cardTwo) {
    card2 = null;
    upturnedCards = 1;
  }
}

function gameOver() {
  let idTimeout;

  if (numberOfCards / 2 === points) {
    idTimeout = setTimeout(() => alert("Terminou"), 500);
  }

  return () => clearInterval(idTimeout);
}

window.onload = init;
