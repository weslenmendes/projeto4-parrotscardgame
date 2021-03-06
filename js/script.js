let numberOfCards = null;
let upturnedCards = 0;
let card1 = null,
  card2 = null;
let points = 0;
let numberOfMoves = 0;
let timer = 0;
let timeInSeconds = null;
let idInterval = null;

// Função Inicial
function init() {
  numberOfCards = parseInt(
    prompt("Digite a quantidade de cartas: Ex.: 4, 6, 8, ..., 14")
  );

  while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = parseInt(
      prompt("Digite a quantidade de cartas: Ex.: 4, 6, 8, ..., 14")
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
    html = `<article class="card" onclick="flipCard(this)" data-identifier="card">
      <div class="front-face face" data-identifier="front-face">
        <img src="assets/front.png" alt="Frente" />
      </div>
      <div class="back-face face" data-identifier="back-face">
        <img src="assets/${allCards[indexCards]}" alt="${nameCard}" />
      </div>
    </article>`;

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

  addTimer();
}

function flipCard(card) {
  if (upturnedCards < 2) {
    card.classList.add("turn");
  }

  if (upturnedCards === 0) {
    card1 = card;
    upturnedCards++;
    numberOfMoves++;
  } else if (upturnedCards === 1 && card !== card1) {
    card2 = card;
    upturnedCards++;
    numberOfMoves++;
  }

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

  if (card1 && card2) {
    card1.classList.remove("turn");
    card2.classList.remove("turn");
  }

  clearTimeout(idTimeout);

  idToTimeout = setTimeout(clearVariables, 300);
  
  return () => clearTimeout(idToTimeout);
}

function markPoint() {
  points += 1;

  card1.removeAttribute("onclick");
  card2.removeAttribute("onclick");

  gameOver();
  clearVariables();
}

function gameOver() {
  let idToTimeout;

  if (numberOfCards / 2 === points) {
    removeTimer(idInterval);

    idToTimeout = setTimeout(() => {
      alert(`Você ganhou em ${numberOfMoves} jogadas e em ${timeInSeconds} segundos!`);
      restart();
    }, 500);
  }

  return () => clearTimeout(idToTimeout);
}

function clearScoreAndClock() {
  const clock = document.querySelector(".timer");
  clock.innerHTML = "00:00";
  
  points = 0;
  numberOfMoves = 0;
}

function restart() {
  let ask = null;

  while (ask !== "s" && ask !== "n") {
    ask = prompt("Você quer jogar novamente? s/n");
  }

  if (ask === 's'){
    clearVariables();
    clearScoreAndClock();
    init();
  } 
}

// Funções referentes ao Timer
function addTimer() {
  const timerHTML = document.querySelector(".timer");
  timerHTML.classList.add("show");

  idInterval = setInterval(() => {
    timer++;
    timeInSeconds = timer;
    updateTimer(timer);
  }, 1000);
}

function removeTimer(id) {
  clearInterval(id);

  timer = 0;
}

function updateTimer(value) {
  const timerHTML = document.querySelector(".timer.show");

  let minutes = Math.floor(value / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let seconds = Math.floor(value % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerHTML.innerHTML = `${minutes}:${seconds}`;
}

window.onload = init;
