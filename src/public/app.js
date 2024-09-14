const playerDecks = {
  1: [
    { name: "Dragão Branco", attack: 3000, defense: 2500 },
    { name: "Mago Negro", attack: 2500, defense: 2100 },
    { name: "Gaia", attack: 2300, defense: 2100 }
  ],
  2: [
    { name: "Dragão Negro", attack: 2800, defense: 2400 },
    { name: "Cavaleiro de Fogo", attack: 2000, defense: 1800 },
    { name: "Leão Guerreiro", attack: 2100, defense: 1600 }
  ]
};

const playerHands = {
  1: [],
  2: []
};

function drawCard(player) {
  console.log('x');
  if (playerDecks[player].length === 0) {
    showMessage(`Jogador ${player} não tem mais cartas no deck!`);
    return;
  }

  const drawnCard = playerDecks[player].shift(); // Retira a primeira carta do deck
  playerHands[player].push(drawnCard); // Adiciona a carta à mão do jogador

  renderHand(player);
}

function renderHand(player) {
  const cardZone = document.getElementById(`player${player}-cards`);
  cardZone.innerHTML = ""; // Limpa o campo

  playerHands[player].forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.innerHTML = `<strong>${card.name}</strong><br>Ataque: ${card.attack}<br>Defesa: ${card.defense}`;
    cardZone.appendChild(cardDiv);
  });
}

function showMessage(message) {
  document.getElementById('message').textContent = message;
}
