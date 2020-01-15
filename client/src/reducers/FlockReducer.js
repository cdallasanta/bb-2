function FlockReducer(state = [], action){
  switch(action.type){
    case "DRAW_BIRD":
      // add the bird in the 0 index from the bird deck to the flock
      return [...state, action.newBird]
    case "REMOVE_BIRD":
      const newFlock = [...state]
      newFlock.splice(state.indexOf(action.bird),1);
      return newFlock;
    case "RESET_GAME":
        return [];
    default:
      return state;
  }
}

export default FlockReducer