export function drawBird() {
  return (dispatch, getState) => {
    const wholeState = getState();
    if (wholeState.decks.bird.length > 0) {
      dispatch({
        type: "DRAW_BIRD",
        newBird: wholeState.decks.bird[0]
      });
    }
  };
}

export function removeBird(bird){
  return {type: "REMOVE_BIRD", bird}
}

export function selectBird(bird) {
  return {
    type: "SELECT_BIRD",
    bird
  }
}