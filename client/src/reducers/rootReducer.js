import GameReducer from './GameReducer';
import FlockReducer from './FlockReducer';
import DecksReducer from './DecksReducer';
import PlayerReducer from './PlayerReducer';
import PastScoresReducer from './PastScoresReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  game: GameReducer,
  flock: FlockReducer,
  decks: DecksReducer,
  player: PlayerReducer,
  pastScores: PastScoresReducer
});

export default rootReducer;