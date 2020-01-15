import React from 'react';
import { connect } from 'react-redux';
import { getGames } from '../actions/GameActions';
import './high_scores.css'

class HighScores extends React.Component {
  componentDidMount() {
    this.props.getGames();
  }

  renderScores = () => {
    return this.props.games.map(game => {
      return(
        <li key={game.id} ><strong>{game.player}</strong> -- {game.season} -- {game.score}</li>
      )
    })
  }

  render(){
    if (this.props.loading){return "...Loading high scores..."}
    return(
      <div id="scores">
        <h2>High Scores:</h2>
        <ol>
          {this.renderScores()}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.pastScores.games,
    loading: state.pastScores.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {getGames: () => dispatch(getGames())}
}

export default connect(mapStateToProps, mapDispatchToProps)(HighScores);