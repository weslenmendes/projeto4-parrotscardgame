let numberOfCards = null;

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
    html = `<div class="card">
      <img class="front" src="assets/front.png" alt="Frente" />
      <img class="back" src="assets/${allCards[indexCards]}" alt="${nameCard}" />
    </div>
    `;

    htmlCards.push(html);
    htmlCards.push(html);

    index += 2;
    indexCards++;
  }

  htmlCards = shuffleCards(htmlCards);
  console.log(htmlCards);
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

  for (let index = 0; index < cards.length; index++) {
    divCards.innerHTML += cards[index];
  }
}

// Adicionar evento de click nas cartas
// Colocar as cartas no HTML

window.onload = init();
