function PastScoresReducer(state = {
  loading: false,
  games: []
}, action){
  switch(action.type){
    case "LOADING_SCORES":
      return {...state, loading: true}
    case "SET_SCORES":
      return {loading: false, games: action.payload}
    default:
      return state;
  }
}

export default PastScoresReducer;