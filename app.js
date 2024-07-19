/*-------------------------------- Constants --------------------------------*/



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

/*------------------------ Cached Element References ------------------------*/

const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");
const bankCoins = document.getElementById("bank-coins");
const betCoins = document.getElementById("bet-coins");
const betAmount = document.getElementById("bet-display");
const dealButton = document.getElementById("deal-button");
const cardDisplay = document.getElementById("card-display");
// const buttons = document.getElementById("buttons");

/*---------------------------- Render Functions -----------------------------*/



/*-------------------------------- Functions --------------------------------*/


const init = {
  deck: [
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
  ],
}

const startButton = document.getElementById("start-button");
gamePage.style.display = "none"; // game default is the start page
startButton.addEventListener("click", () => { // click start button to hide start page and show game page
  startPage.style.display = "none";
  cardDisplay.style.display = "none";
  buttons.style.display = "none";
  dealButton.style.display = "none";
  betCoins.style.display = "none";
  gamePage.style.display = "block";
})

const bankCoinButton = document.querySelectorAll("#bank-coins .bank-coin");
betAmount.style.display = "none";
dealButton.style.display = "none";
// betCoins.style.display = "none";

bankCoinButton.forEach(button => {
  button.addEventListener("click", (event) => {
    const coinValue = parseInt(event.target.getAttribute("data-value"));
    game.player.bet += coinValue;
    document.getElementById("bet-total").innerText = (`Bet: ${game.player.bet}`)
   
const betCoinButton = document.querySelectorAll("#bet-coins .bet-coin");
// need to do something to reveal the specific coin when clicked
const getBetCoin = (coinValue) => {
  return Array.from(betCoinButton).find(button => {
    return parseInt(button.getAttribute("data-value")) === coinValue;
  })
}

if (betCoins.style.display === "none") {
      betCoins.style.display = "block";
    }

const retrieveBetCoinButton = getBetCoin(coinValue);
if (retrieveBetCoinButton) {
  retrieveBetCoinButton.style.display = "block";
}

betCoinButton.forEach(button => {
  // betCoins.style.display = "block";
  button.addEventListener("click", (event) => {
    const coinValue = parseInt(event.target.getAttribute("data-value"));
    game.player.bet -= coinValue; // game.player.bet is 0 right now so i need to update it
    document.getElementById("bet-total").innerText = `Bet: ${game.player.bet}`;
  })
})
})

  betAmount.style.display = "block"; // bet amount will show up after clicking on coins 
  // need to find a way to add coins to the above and to minus the amount accordingly!!!!!!!
  dealButton.style.display = "block";
})

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

const calcBank = () => { // calculate bank amount
  // console.log("hello");
}
calcBank();

const deal = () => {

}

const dealerChoice = () => { // dealer choice

}
dealerChoice();


/*----------------------------- Event Listeners -----------------------------*/

const handlePlayerChoice = (choice) => {
  
}

document.querySelector("#hit-button");
document.addEventListener("click", () => 
console.log("clicked"));