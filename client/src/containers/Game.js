import React from 'react';
import { connect } from 'react-redux';
import Flock from './Flock';
import Decks from './Decks';
import PlayerArea from './PlayerArea';
import './Game.css';
import { showDice, gameOver } from '../actions/GameActions';

class Game extends React.Component {
  componentDidUpdate(){
    if (this.props.birdDeck.length === 0
        && this.props.flock.length === 0){
    //GAME OVER
      this.props.gameOver()
        .then(() => this.props.history.push('/game_over'));
    }
  }

  render(){
    return(
      <div>
        <Decks/>
        <Flock />
        <PlayerArea />
      </div>
    )
  }
}


const mapStateToProps = state =>{
  return {
    game: state.game,
    birdDeck: state.decks.bird,
    backyard: state.player.backyard,
    flock: state.flock
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showDice: () => dispatch(showDice()),
    gameOver: () => dispatch(gameOver())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);