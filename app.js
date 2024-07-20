/*-------------------------------- Constants --------------------------------*/

const cardDeck = [
    "dA",
    "dQ",
    "dK",
    "dJ",
    "d10",
    "d09",
    "d08",
    "d07",
    "d06",
    "d05",
    "d04",
    "d03",
    "d02",
    "hA",
    "hQ",
    "hK",
    "hJ",
    "h10",
    "h09",
    "h08",
    "h07",
    "h06",
    "h05",
    "h04",
    "h03",
    "h02",
    "cA",
    "cQ",
    "cK",
    "cJ",
    "c10",
    "c09",
    "c08",
    "c07",
    "c06",
    "c05",
    "c04",
    "c03",
    "c02",
    "sA",
    "sQ",
    "sK",
    "sJ",
    "s10",
    "s09",
    "s08",
    "s07",
    "s06",
    "s05",
    "s04",
    "s03",
    "s02",
  ];

/*---------------------------- Variables (state) ----------------------------*/

const game = {
  cards: [],
  player: {
    hand: [], // or 0
    score: 0,
    isBust: false, // starts as false in a neutral state to commence the game. if player exceed 21, bust is true
    isStanding: false, // player and computer can make decision to stand or hit. if player or computer stands, stand is true
    bank: 1000,
    bet: 0,
  },
  dealer: {
    hand: [],
    score: 0,
    isBust: false,
    isStanding: false,
  },
  currentPlayer: "",
  message: "", // place your bets - win $ or dealer win's
};

const shownBetCoins = {};

/*------------------------ Cached Element References ------------------------*/

const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");
const bankCoins = document.getElementById("bank-coins");
const betCoins = document.getElementById("bet-coins");
const betAmount = document.getElementById("bet-display");
const dealButton = document.getElementById("deal-button");
const cardDisplay = document.getElementById("card-display");
const startButton = document.getElementById("start-button");
// const buttons = document.getElementById("buttons");

const bankCoinButton = document.querySelectorAll("#bank-coins .bank-coin");
const betCoinButton = document.querySelectorAll("#bet-coins .bet-coin");

const playerHandEl = document.querySelector("#player-hand");
const dealerHandEl = document.querySelector("#dealer-hand");

/*---------------------------- Render Functions -----------------------------*/

const renderBetAmount = () => { // render bet amount on display
  document.getElementById("bet-total").innerText = `Bet: ${game.player.bet}`;
  getDealButton();
}

const renderBankAmount = () => {
  document.getElementById("bank-total").innerText = `Bank: ${game.player.bank}`;
}

/*-------------------------------- Functions --------------------------------*/

const updateBankCoinVisibility = () => {
  const possibleValues = [1, 5, 10, 25, 50, 100];
  const maxPossibleBet = game.player.bank;

  bankCoinButton.forEach((button) => {
    const coinValue = parseInt(button.getAttribute("data-value"));
    if (coinValue <= maxPossibleBet) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
};

const getBetCoin = (coinValue) => {
  //
  return Array.from(betCoinButton).find((button) => {
    // converts nodelist to array
    return parseInt(button.getAttribute("data-value")) === coinValue; // matches coin button who matches the data-value attribute of bet-coin
  }); // parseInt converts it to an integer
};

const getBetCoinDisplay = () => {
  betCoinButton.forEach((button) => {
    // iterates over each bet coin button
    const coinValue = parseInt(button.getAttribute("data-value")); // retrieves the data-value of the bet-coin button and converts it to integer
    shownBetCoins[coinValue] = 0; // shown bet coins starts at 0
    button.style.display = "none";
  });
};
getBetCoinDisplay();

const handleBankCoinClick = (event) => {
  const coinValue = parseInt(event.target.getAttribute("data-value"));
  if (game.player.bank >= coinValue) {
    game.player.bet += coinValue; // adds coin value to player's bet
    game.player.bank -= coinValue; // removes coin value from player's bank
    renderBetAmount(); // updates bet display amount using render bet amount function
    renderBankAmount(); // updates bank display amount using render bank amount function

    if (betCoins.style.display === "none") {
      // if bet coins are currently hidden, it will be shown after bank coins clicked
      betCoins.style.display = "block";
    }
  }

  const retrieveBetCoinButton = getBetCoin(coinValue); // retrieve bet coin button that matches the value of clicked bank coin button
  if (retrieveBetCoinButton) {
    retrieveBetCoinButton.style.display = "block"; // shows the bet coins
    shownBetCoins[coinValue]++; // increments the counts in the shownbetcoins object
  } else {
    console.log("not enough coins in the bank to place this bet!");
  }
  updateBankCoinVisibility();
  getDealButton();
};

const handleBetCoinClick = (event) => {
  const coinValue = parseInt(event.target.getAttribute("data-value"));
  if (shownBetCoins[coinValue] > 0) {
    // checks if there are still coins for this value in the bet
    if (game.player.bet >= coinValue) {
      // ensure the player has money in bet to remove coin from bet
      game.player.bet -= coinValue; // subtracts coin from bet
      game.player.bank += coinValue;
      renderBetAmount();
      renderBankAmount();
      shownBetCoins[coinValue]--; // decreases count of coin value in the shownbetcoins object

      if (shownBetCoins[coinValue] === 0) {
        // hides the coin display if no more coin value is left
        event.target.style.display = "none";
      } else {
        console.log("not enough coins in the bank to place this bet!");
      }
      updateBankCoinVisibility();
      getDealButton();
    }
  }
};

const getDealButton = () => {
  if (game.player.bet > 0) {
    dealButton.style.display = "block";
  } else {
    dealButton.style.display = "none";
  }
};

// searched for the Fisher-Yates shuffle algorithm
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const dealCard = (handEl, card, faceDown) => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");

  if (faceDown) {
    cardEl.classList.add("face-down"); // add a class for the face down cards
    cardEl.innerText = ""; // hide card value
    cardEl.style.backgroundColor = "darkblue"; //
  } else {
    cardEl.innerText = card; // sets card value
  }

  handEl.appendChild(cardEl);

  // console.log(`dealt card: ${card}, face down: ${faceDown}`);
}

const dealCards = () => {
  const shuffledDeck = shuffleDeck(cardDeck.slice());
  // console.log(`shuffled deck: ${shuffledDeck}`);

  // deal first card to player
  dealCard(playerHandEl, shuffledDeck.pop(), false);

  // deal second card to dealer (face down)
  dealCard(dealerHandEl, shuffledDeck.pop(), true);

  // deal third card to player
  dealCard(playerHandEl, shuffledDeck.pop(), false);

  // deal fourth card to dealer 
  dealCard(dealerHandEl, shuffledDeck.pop(), false);
};

const handleDealButton = () => {
  dealCards();
  cardDisplay.style.display = "block";
  // console.log("deal button clicked");
};

const handleDealerChoice = () => { // dealer choice
  // dealer's choice
}

const handlePlayerChoice = () => {
  // player's choice
}
/*----------------------------- Event Listeners -----------------------------*/

gamePage.style.display = "none"; // game default page is the start page
startButton.addEventListener("click", () => {
  // click start button to hide start page and show game page
  startPage.style.display = "none";
  buttons.style.display = "none";
  dealButton.style.display = "none";
  betCoins.style.display = "none";
  gamePage.style.display = "block";
});

bankCoinButton.forEach((button) => {button.addEventListener("click", handleBankCoinClick)});
// iterates over each bank coin button

betCoinButton.forEach((button) => {button.addEventListener("click", handleBetCoinClick)});

dealButton.addEventListener("click", handleDealButton);

// document.querySelector("#hit-button");
// document.addEventListener("click", () => 
// console.log("clicked"));

