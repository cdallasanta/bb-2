export function nextPhase() {
  return {type: "NEXT_PHASE"}
}

export function selectBirdAgain(){
  return {type: "SET_PHASE", phase: 3}
}

export function skipToFlight(){
  return {type: "SET_PHASE", phase: 5}
}

export function skipBirdDraw(){
  return {type: "SET_PHASE", phase: 1}
}

export function selectCard(card) {
  return {type: "SELECT_CARD", card}
}

export function toggleDice() {
  return {type: "TOGGLE_DICE"}
}

export function showDice() {
  return {type: "SHOW_DICE"}
}

export function getGames() {
  return dispatch => {
    dispatch({type:"LOADING_SCORES"}, {method: "GET"})
    fetch('/api/high_scores')
      .then(resp => resp.json())
      .then(scores => dispatch({type:"SET_SCORES", payload: scores}))
  }
}

export function gameOver(){
  return (dispatch, getState) => {
    // post the game
    const wholeState = getState();
    const gameData = {
      player: wholeState.player.playerName,
      score: wholeState.player.score,
      season: wholeState.game.season.name
    }

    return fetch('/api/games', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(gameData)
    })
  }
}