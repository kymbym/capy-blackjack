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
  message: "", // win $ or dealer win's or push
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
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const newGameButton = document.getElementById("new-game-button");
const nextRoundButton = document.getElementById("next-round-button");
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

const renderPlayerScore = () => {
  document.getElementById("player-score").innerText = `Player Score: ${game.player.score}`;
};

const renderDealerScore = () => {
  document.getElementById("dealer-score").innerText = `Dealer Score: ${game.dealer.score}`;
};

/*-------------------------------- Functions --------------------------------*/

const updateBankCoinVisibility = () => { // function to update visibility of bank coin buttons from player's bank amount
  const maxPossibleBet = game.player.bank; // determines how much the player is allowed to bet based on bank amount

  bankCoinButton.forEach((button) => {
    const coinValue = parseInt(button.getAttribute("data-value"));
    if (coinValue <= maxPossibleBet) { // if coinvalue is less or equal to bank amount then show coins
      button.style.display = "block";
    } else { // but if the coinvalue is more than bank amount then it will hide because not enough money
      button.style.display = "none";
    }
  });
};

const getBetCoin = (coinValue) => { // getbetcoin function retrieves the bet coin button and displays or hides according to player's action
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
    button.style.display = "none"; // initially bet coin display are hidden
  });
};
getBetCoinDisplay(); // init function for bet coin display

const handleBankCoinClick = (event) => { // when player clicks a bank coin button, this is triggered and will update shownbetcoins 
  const coinValue = parseInt(event.target.getAttribute("data-value"));
  if (game.player.bank >= coinValue) { // checks if player has sufficient money in bank to place bet 
    game.player.bet += coinValue; // adds coin value to player's bet
    game.player.bank -= coinValue; // removes coin value from player's bank
    renderBetAmount(); // updates bet display amount using render bet amount function
    renderBankAmount(); // updates bank display amount using render bank amount function

    if (betCoins.style.display === "none") {
      // if bet coins clicked are currently hidden, it will be shown after bank coins clicked
      betCoins.style.display = "block";
    };
  };

  const retrieveBetCoinButton = getBetCoin(coinValue); // retrieve bet coin button that matches the value of clicked bank coin button
  if (retrieveBetCoinButton) { // if button is found
    retrieveBetCoinButton.style.display = "block"; // shows the bet coins 
    shownBetCoins[coinValue]++; // increments the counts in the shownbetcoins object
  } else {
    // console.log("not enough coins in the bank to place this bet!");
  }
  updateBankCoinVisibility(); 
  getDealButton();
};

const handleBetCoinClick = (event) => { // when player clicks a bet coin button, this is triggered 
  const coinValue = parseInt(event.target.getAttribute("data-value"));
  if (shownBetCoins[coinValue] > 0) {
    // checks if there are still coins for this value in the bet displayed
    if (game.player.bet >= coinValue) {
      // checks if player has sufficient money in bet to remove coin from bet
      game.player.bet -= coinValue; // removes coin value from player's bet
      game.player.bank += coinValue; // adds coin value to player's bank
      renderBetAmount();
      renderBankAmount();
      shownBetCoins[coinValue]--; // decreases count of coin value in the shownbetcoins object

      if (shownBetCoins[coinValue] === 0) {
        // hides the coin display if no more coin value of the coin is left 
        event.target.style.display = "none";
      } else {
        // console.log("not enough coins in the bank to place this bet!");
      }
      updateBankCoinVisibility();
      getDealButton();
    };
  };
};

const getDealButton = () => { // deal button is displayed if player bet any amount of money (anything > 0)
  if (game.player.bet > 0) {
    dealButton.style.display = "block";
  } else { // deal button is hidden if no bets placed
    dealButton.style.display = "none";
  }
};

const handleDealButton = () => { // when player clicks deal button, this is triggered
  dealCards();
  cardDisplay.style.display = "block"; // cards are displayed
  dealButton.style.display = "none"; // deal button is hidden
  hitButton.style.display = "block"; // hit button is displayed
  standButton.style.display = "block"; // stand button is displayed
  newGameButton.style.display = "block"; // new game button is displayed


  // disable bank coins and bet coins after clicking deal button
  bankCoinButton.forEach((button) => {
    button.removeEventListener("click", handleBankCoinClick); // because we have dealt the cards, bank coin buttons should not be working
    button.disabled = true;
  });

  betCoinButton.forEach((button) => {
    button.removeEventListener("click", handleBetCoinClick); // same with bet coin buttons! players are not allowed to edit bettings in game
    button.disabled = true;
  });
};

// searched for the Fisher-Yates shuffle algorithm as i read that this method of shuffling is more shuffled than simply iterating through 52 cards
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); // generates random index from 0 to i
    [deck[i], deck[j]] = [deck[j], deck[i]]; // swaps card at index i with index j (this method is more thorough)
  }
  return deck;
};

const shuffledDeck = shuffleDeck(cardDeck.slice()); // stores a shuffled deck of cards into shuffledDeck

// deal card if hit
const dealCard = (handEl, card, faceDown) => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card"); // stores card value in data attribute html

  if (faceDown) {
    cardEl.classList.add("face-down"); // add a class for the face down cards
    cardEl.innerText = ""; // hides card value by setting an empty string
    // cardEl.style.backgroundColor = "darkblue"; // 
  } else {
    cardEl.innerText = card; // displays card value of face-up cards
    // cardEl.style.backgroundImage = `url('/Users/kymmyfong/Documents/ga/capy-blackjack/images/cards/${card}.png')`;
  }

  cardEl.dataset.value = card; // stores card value in card attribute 
  handEl.appendChild(cardEl); // add card element to player or dealer hand accordingly

  if (handEl === playerHandEl) { // if hand is player's hand
    game.player.score = calculateHandScore(playerHandEl); // calculates player's score with updated hand
    renderPlayerScore(); 
  } else if (handEl === dealerHandEl) { 
    game.dealer.score = calculateHandScore(dealerHandEl, true); // calculates dealer's score of only visible cards
    renderDealerScore();
  }
  // console.log(`dealt card: ${card}, face down: ${faceDown}`);
};

// deal initial cards
const dealCards = () => {
  // console.log(`shuffled deck: ${shuffledDeck}`);

  // deal first card to player
  dealCard(playerHandEl, shuffledDeck.pop(), false);
  // displays card are player-hand html element, removes and returns the last cards from shuffledDeck and sends as a 'card' argument to dealCard(), face up card

  // deal second card to dealer (face down)
  dealCard(dealerHandEl, shuffledDeck.pop(), true); // handelement1, card, facedown = true so second card of dealer should be faced down

  // deal third card to player
  dealCard(playerHandEl, shuffledDeck.pop(), false);

  // deal fourth card to dealer
  dealCard(dealerHandEl, shuffledDeck.pop(), false);
};

const handleHitButton = () => {
  if (!game.player.isStanding && !game.player.isBust) { // if player is not standing and not bust aka player hits
    dealCard(playerHandEl, shuffledDeck.pop(), false); // deals new card to the player's hand from shuffledDeck

    game.player.score = calculateHandScore(playerHandEl); // recalculates player total score with addition of card(s)
    renderPlayerScore();
    console.log(game.player.score)

    if (game.player.score > 21) { // if player bust > 21 
      game.player.isBust = true; // isbust is set to true
      hitButton.style.display = "none"; // hides hit button
      standButton.style.display = "none"; // hides stand button

determineWinner();
revealDealerSecondCard(); // reveals dealer's second card automatically if player busts

      // console.log("bust");
  }
};
};

const calculateHandScore = (handEl, isDealer = false) => {
  const cards = handEl.querySelectorAll(".card");
  let score = 0; // score default is 0 
  let hasAce = false; // tracks if card hasAce. true = hasAce

  cards.forEach((cardEl) => {
    if (!cardEl.classList.contains("face-down") || !isDealer) { // if card is not face-down or not dealer aka if card is face up and player
      const cardValue = cardEl.dataset.value; // retrieves stored card value 
      const value = getCardValue(cardValue); // assigns value to card number
      console.log(`Card: ${cardValue}, Value: ${value}`);
      score += value; // adds card's value to the total score
      if (cardValue.includes("A")) hasAce = true; // check if card has ace if it does then true then it goes down to if hasAce condition below
    }
  });

  /// ace adjustment!!! 21 or 1 depending on hand
  if (hasAce && score + 10 <= 21) {
    score += 10; // if hasAce which is 1, and + 10 will be <= 21, then we can add 10 to ace and treat it as 11. else ace = 1
  };
  return score;
};

const getCardValue = (card) => {
  if ((card.includes("J") || card.includes("Q") || card.includes("K"))) {
    return 10; // face card values = 10
  } else if ((card.includes("A"))){
    return 1; // ace = 1 first and is adjusted when calculating hand score
  } else {
    value = parseInt(card.slice(1)); // using slice method will extract the numeric part of the card like d09 1 is the second index of 09 
} 
  return value;
};

const handleStandButton = () => {
  game.player.isStanding = true; // player chooses stands
  hitButton.style.display = "none"; // hide hit button
  standButton.style.display = "none"; // hide stand button after clicking stand button
  // dealButton.style.display = "none";
  revealDealerSecondCard(); // reveals dealer's second card automatically if player busts
  dealerTurn(); // dealer's turn 
};

const revealDealerSecondCard = () => {
  const dealerCards = dealerHandEl.querySelectorAll(".card"); // selects all of dealer's cards
  if (dealerCards.length > 1) {
    // if there is more than 1 card (aka retrieves the face-down card)
    // reveal dealer's face down card
    
      const faceDownCard = dealerCards[0]; // reveals first face-down card of dealer
      faceDownCard.classList.remove("face-down"); // removes face-down and reveals card
      faceDownCard.innerText = faceDownCard.dataset.value; // updates with actual value
      // faceDownCard.innerText = shuffledDeck.pop(); // no this is wrong this takes a new card? i think???
      game.dealer.score = calculateHandScore(dealerHandEl, false); // recalculate score with all of dealer's cards now
    
    renderDealerScore();
  }
};

const drawDealerCard = () => {
  dealCard(dealerHandEl, shuffledDeck.pop(), false); // deal a new card to dealer
  game.dealer.score = calculateHandScore(dealerHandEl); // recalculate dealer's hand score
  renderDealerScore();
};

const dealerTurn = () => {
  revealDealerSecondCard();

  // if not
  const dealerDrawCards = () => {
    if (game.dealer.score < game.player.score && game.dealer.score <= 21) {
      // need to adjust this to if game.dealer.score < game.player.score but not sure how so i put 17 first
      setTimeout(drawDealerCard, 2000); // draw card if conditions met!
      setTimeout(dealerDrawCards, 4000); // setTimeout() from MDN - waits 3 seconds before drawing next card
    } else {
    determineWinner();
  } // after dealer turn over, determine winner
}
dealerDrawCards();
};

const determineWinner = () => { 
  game.player.isBust = game.player.score > 21;
  game.dealer.isBust = game.dealer.score > 21;

  if (game.player.isBust || (game.player.score < game.dealer.score && game.dealer.score <= 21 )) { // only the part where player.isbust is not working!
    console.log(game.player.score);
    console.log(game.dealer.score) 
    console.log("dealer wins"); 
    handlePayout(false);
  } else if (game.dealer.isBust || (game.player.score > game.dealer.score && game.player.score <= 21)) { // dealer bust or game player score higher than dealer
    console.log("player wins");
    handlePayout(true);
  } else { // tie
    console.log("push");
    handlePayout(null);
  }
  // console.log(game.message); 
  // nextRoundButton.style.display = "block"; ??????????????
};

const handlePayout = (playerWins) => {
  if (playerWins === true) {
    const initialPlayerHand = Array.from(
      playerHandEl.querySelectorAll(".card")
    );
    const initialPlayerScore =
      initialPlayerHand.length === 2 && calculateHandScore(playerHandEl, false);
    if (initialPlayerScore === 21) {
      game.player.bank += game.player.bet * 2.5; // or 3.5?
      game.player.bet -= game.player.bet;
    } else {
      game.player.bank += game.player.bet * 2;
      game.player.bet -= game.player.bet;
    }
  } else if (playerWins === false) {
    game.player.bet -= game.player.bet;
  } else {
    game.player.bank += game.player.bet;
    game.player.bet -= game.player.bet;
  }
  renderBankAmount();
  renderBetAmount(); // deal button is showing up because of render bet amount and it contains getDealButton(); hm but it's not showing up now
  nextRoundButton.style.display = "block"; // this should show up after payouts are done
};

const handleNextRound = () => {
  bankCoinButton.forEach((button) => {
    button.addEventListener("click", handleBankCoinClick); // because we have dealt the cards, bank coin buttons should not be working
    button.disabled = false;
  });

  betCoinButton.forEach((button) => {
    button.addEventListener("click", handleBetCoinClick); // same with bet coin buttons! players are not allowed to edit bettings in game
    button.disabled = false;
  });
}

const handleNewGame = () => {
  // new game button function

  game.player.hand = [];
  game.player.score = 0;
  game.player.isBust = false;
  game.player.isStanding = false;
  game.player.bank = 1000;
  game.player.bet = 0;
  
  game.dealer.hand = [];
  game.dealer.score = 0;
  game.dealer.isBust = false;
  game.dealer.isStanding = false;

  playerHandEl.innerHTML = "";
  dealerHandEl.innerHTML = "";

  cardDisplay.style.display = "none";
  dealButton.style.display = "none";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  newGameButton.style.display = "none";
  nextRoundButton.style.display = "none";
  betCoins.style.display = "none";

  renderBankAmount();
  renderBetAmount();
  updateBankCoinVisibility();

  bankCoinButton.forEach((button) => {
    button.addEventListener("click", handleBankCoinClick); // because we have dealt the cards, bank coin buttons should not be working
    button.disabled = false;
  })

  betCoinButton.forEach((button) => {
    button.addEventListener("click", handleBetCoinClick); // same with bet coin buttons! players are not allowed to edit bettings in game
    button.disabled = false;
  })

  const shuffledDeck = shuffleDeck(cardDeck.slice()); 

  betCoinButton.forEach((button) => (button.style.display = "none"));

  startPage.style.display = "block";
  gamePage.style.display = "none"; // game default page is the start page
};



// new game = reset everything
// next round = save bank and bet details
// nextRoundButton.style.display = "block"; // this button should show up only after the cards have been dealt
// why is deal button showing up randomly after a game has ended? it should only be new game
/*----------------------------- Event Listeners -----------------------------*/

gamePage.style.display = "none"; // game default page is the start page
startButton.addEventListener("click", () => {
  // click start button to hide start page and show game page
  startPage.style.display = "none";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  newGameButton.style.display = "none";
  dealButton.style.display = "none";
  betCoins.style.display = "none";
  nextRoundButton.style.display = "none";
  gamePage.style.display = "block";
});

bankCoinButton.forEach((button) => {button.addEventListener("click", handleBankCoinClick)});
// iterates over each bank coin button

betCoinButton.forEach((button) => {button.addEventListener("click", handleBetCoinClick)});

dealButton.addEventListener("click", handleDealButton);

hitButton.addEventListener("click", handleHitButton);

standButton.addEventListener("click", handleStandButton);

newGameButton.addEventListener("click", handleNewGame);

nextRoundButton.addEventListener("click", handleNextRound);

// document.querySelector("#hit-button");
// document.addEventListener("click", () => 
// console.log("clicked"));

