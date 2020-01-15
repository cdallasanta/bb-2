const phases = ["drawBirds", "drawBYcards", "playBYcards", "chooseBird", "attractBird", "flightRoll"]

const initState = {
  season: {},
  phase: phases[0],
  selectedBird: null,
  diceVisible: false
}

function GameReducer(state = initState, action){
  switch(action.type){
    case "START_GAME":
      return Object.assign({}, state, action.payload);
    case "NEXT_PHASE":
      let newPhaseNum = phases.indexOf(state.phase) + 1 > 5 ? 0 :phases.indexOf(state.phase) + 1;
      let newPhase = phases[newPhaseNum];
      return Object.assign({}, state, {phase: newPhase});
    case "SELECT_BIRD":
      return Object.assign({}, state, {selectedBird: action.bird});
    case "TOGGLE_DICE":
      return Object.assign({}, state, {diceVisible: !state.diceVisible});
    case "SHOW_DICE":
      return Object.assign({}, state, {diceVisible: true});
    case "SET_PHASE":
      return Object.assign({}, state, {phase: phases[action.phase]});
    case "RESET_GAME":
      return initState;
    default:
      return state;
  }
}

export default GameReducer