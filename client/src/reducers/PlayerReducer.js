const initState = {
  playerName: "Unknown Birder",
  score: 0,
  hand: [],
  backyard: [],
  handVisible: false
}

function PlayerReducer(state = initState, action){
  switch(action.type){
    case "START_GAME":
      return Object.assign(
        {},
        state,
        {playerName: action.payload.playerName}
      )

    case "DRAW_BACKYARD_CARD":
      // add the BY card in the 0 index from the deck to the hand
      const newSortedHand = [...state.hand, ...action.BYdeck.slice(0, action.numToDraw)].sort((a,b) => a.id-b.id)

      return Object.assign(
        {},
        state,
        {hand: newSortedHand}
      )

    case "TOGGLE_HAND":
      return Object.assign({}, state, {handVisible: !state.handVisible})

    case "PLAY_BACKYARD_CARDS":
      // hand with the selected cards filtered out
      const newHand = state.hand.slice()
      newHand.splice(newHand.indexOf(action.cards[0]), 1);
      newHand.splice(newHand.indexOf(action.cards[1]), 1);

      return Object.assign({}, state, {
        backyard: [...state.backyard, ...action.cards].sort((a,b) => a.id-b.id),
        hand: newHand
      })
    
    case "SCORE_BIRD":
      const newBY = state.backyard
      action.payload.BYcards.forEach(by => {
        newBY.splice(newBY.indexOf(by),1);
      })
      return Object.assign(
        {},
        state,
        {score: state.score + action.payload.score},
        {backyard: newBY}
      );
    case "RESET_GAME":
      return initState;
    default:
      return state;
  }
}

export default PlayerReducer