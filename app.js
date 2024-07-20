/*-------------------------------- Constants --------------------------------*/

const initialDeck = [
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

// Declare variables
let deck1 = [];
let deck2 = [];
let cardToRemove;

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

/*---------------------------- Render Functions -----------------------------*/

const renderBetAmount = () => { // render bet amount on display
  document.getElementById("bet-total").innerText = `Bet: ${game.player.bet}`;
}

const renderBankAmount = () => {
  document.getElementById("bank-total").innerText = `Bank: ${game.player.bank}`
}

/*-------------------------------- Functions --------------------------------*/

const getBetCoin = (coinValue) => { // 
  return Array.from(betCoinButton).find((button) => { // converts nodelist to array 
    return parseInt(button.getAttribute("data-value")) === coinValue; // matches coin button who matches the data-value attribute of bet-coin
  }) // parseInt converts it to an integer
}

const getBetCoinDisplay = () => {
  betCoinButton.forEach((button) => {
    // iterates over each bet coin button
    const coinValue = parseInt(button.getAttribute("data-value")); // retrieves the data-value of the bet-coin button and converts it to integer
    shownBetCoins[coinValue] = 0; // shown bet coins starts at 0
  }); 
}
getBetCoinDisplay();

const handleBankCoinClick = (event) => {
  const coinValue = parseInt(event.target.getAttribute("data-value"));
  game.player.bet += coinValue; // adds coin value to player's bet
  game.player.bank -= coinValue; // removes coin value from player's bank
  renderBetAmount(); // updates bet display amount using render bet amount function
  renderBankAmount(); // updates bank display amount using render bank amount function

  if (betCoins.style.display === "none") {
    // if bet coins are currently hidden, it will be shown after bank coins clicked
    betCoins.style.display = "block";
  }

  const retrieveBetCoinButton = getBetCoin(coinValue); // retrieve bet coin button that matches the value of clicked bank coin button
  if (retrieveBetCoinButton) {
    retrieveBetCoinButton.style.display = "block"; // shows the bet coins
    shownBetCoins[coinValue]++; // increments the counts in the shownbetcoins object
  }
};

const handleBetCoinClick = (event) => {
  const coinValue = parseInt(event.target.getAttribute("data-value"));
    if (shownBetCoins[coinValue] > 0) { // checks if there are still coins for this value in the bet
      if (game.player.bet >= coinValue) { // ensure the player has money in bet to remove coin from bet
        game.player.bet -= coinValue; // subtracts coin from bet
        game.player.bank += coinValue;
        renderBetAmount();
        renderBankAmount();
        shownBetCoins[coinValue]--; // decreases count of coin value in the shownbetcoins object

        if (shownBetCoins[coinValue] === 0) { // hides the coin display if no more coin value is left
          event.target.style.display = "none";
        } 
      }
    } 
}

betAmount.style.display = "block"; // bet amount will show up after clicking on coins
// need to find a way to add coins to the above and to minus the amount accordingly!!!!!!!
dealButton.style.display = "block";

// bankCoinButton.addEventListener("click", () => {
  // betAmount.style.display = "block"; // bet amount will show up after clicking on coin
  // dealButton.style.display = "block";
  // const g = game.currentPlayer;
//   // game.player[g].bank = calcBank; // create a bank calculator
//   }
// )

dealButton.addEventListener("click", () => {
  deal();
});

const deal = () => { 
  // dealing cards
}

const handleDealerChoice = () => { // dealer choice
  // dealer's choice
}
handleDealerChoice();

const handlePlayerChoice = () => {
  // player's choice
}
/*----------------------------- Event Listeners -----------------------------*/

gamePage.style.display = "none"; // game default page is the start page
startButton.addEventListener("click", () => {
  // click start button to hide start page and show game page
  startPage.style.display = "none";
  cardDisplay.style.display = "none";
  buttons.style.display = "none";
  dealButton.style.display = "none";
  betCoins.style.display = "none";
  gamePage.style.display = "block";
});

bankCoinButton.forEach((button) => {
    // iterates over each bank coin button
    button.addEventListener("click", handleBankCoinClick)
});

betCoinButton.forEach((button) => {
  // betCoins.style.display = "block";
  button.addEventListener("click", handleBetCoinClick)
});

// document.querySelector("#hit-button");
// document.addEventListener("click", () => 
// console.log("clicked"));