export function toggleHand() {
  return {type:"TOGGLE_HAND"};
}

export function playBYcards(cards) {
  return {type:"PLAY_BACKYARD_CARDS", cards};
} 

export function scoreBird(bird, BYcards) {
  return (dispatch, getState) => {
    const wholeState = getState();
    dispatch({
      type: "SCORE_BIRD",
      payload: {
        bird,
        BYcards,
        score: wholeState.game.season.points[bird.season]
      }
    })
  }
}