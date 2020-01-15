export function drawBYcard(numToDraw = 1) {
  return (dispatch, getState) => {
    const wholeState = getState();
    dispatch({
      type: "DRAW_BACKYARD_CARD",
      BYdeck: wholeState.decks.backyard,
      numToDraw: numToDraw
    });
  };
}