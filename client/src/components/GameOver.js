import React from 'react';
import { connect } from 'react-redux';
import HighScores from './HighScores'

class GameOver extends React.Component {
  render(){
    return(
      <div id="gameOver">
        <h2>Game Over!</h2>
        You scored: {this.props.score} points!<br />
        <a href="/">Play again?</a>
        <hr />
        <HighScores />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    score: state.player.score
  }
}

export default connect(mapStateToProps)(GameOver);