// User stories which document what the user can do with your game
// play game
// restart game
// hit / stand
// bank total
// bet total
// bet winnings
// message stating who won or push

// Pseudocode -> if you have complex interactions
// aces are first 11 but if the total value is over 21, aces value becomes 1
// dealer’s logic is that as long as its current total is < player’s, it will hit

/*-------------------------------- Constants --------------------------------*/
/*---------------------------- Variables (state) ----------------------------*/

const game = {
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

// i think i need more game variable state

/*------------------------ Cached Element References ------------------------*/




/*---------------------------- Render Functions -----------------------------*/



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/
