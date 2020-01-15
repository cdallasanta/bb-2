import React from 'react';
import Hand from './Hand';
import Score from '../components/Score';
import Backyard from './Backyard';
import { connect } from 'react-redux';
import { toggleHand } from '../actions/PlayerActions'

class PlayerArea extends React.Component {
  render(){
    return (
      <div className="top-level-container" id="playerArea">
        {this.props.handVisible ? <Hand /> : null }
        <Backyard />
        <Score score={this.props.score} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    handVisible: state.player.handVisible,
    score: state.player.score
  }
}

const mapDisptachToProps = dispatch => {
  return {
    toggleHand: () => dispatch(toggleHand())
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(PlayerArea);