import React from 'react';
import { connect } from 'react-redux';
import BirdCard from '../components/cards/birdCard';
import { selectBird } from '../actions/FlockActions';
import { nextPhase, showDice, skipToFlight } from '../actions/GameActions';

class Flock extends React.Component {
  componentDidUpdate(){
    if(this.props.phase === "chooseBird"){
      // check if there are available birds, and if there are none, set phase to flight
      let skip = true;

      this.props.flock.forEach(bird => {
        this.props.backyard.forEach(by => {
          if (bird.habitat.includes(by.type)){
            skip = false;
          }
        })
      })

      if(skip){
        this.props.skipToFlight();
        this.props.showDice();
      }
    }
  }

  renderBirdCards = () => {
    return this.props.flock.map((bird, i) => {
      return <BirdCard card={bird} key ={bird.id} handleClick={this.handleClick} selected={this.props.selectedBird === bird} />
    })
  }

  gatherBYcards = bird => {
    // checks the backyard for the first card that matches the bird's need
    // if there are undefined values, pass through again looking for a second copy of the first need
    // the filter removes 'undefined' from the array when no backyard card matches the need
    const BYcopy = [...this.props.backyard]
    const BYcards = []
    
    let passThrough = () => {
      bird.habitat.forEach(need =>{
        let matchingCard = BYcopy.find(by => by.type === need)
        if(!!matchingCard){
          BYcards.push(BYcopy.splice(BYcopy.indexOf(matchingCard), 1)[0])
        }
      })
    }

    passThrough();
    if (BYcards.length < 2) {passThrough()}

    return BYcards;
  }

  handleClick = (e, bird) => {
    if(this.gatherBYcards(bird).length > 0){
      if (this.props.phase === "chooseBird") {
        this.props.selectBird(bird);
        this.props.nextPhase();
        this.props.showDice();
      } else if (this.props.phase === "attractBird") {
        this.props.selectBird(bird);
      }
    }
  }

  render(){
    return (
      <div className="top-level-container" id="flock">
        {this.renderBirdCards()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    flock: state.flock,
    phase: state.game.phase,
    backyard: state.player.backyard,
    selectedBird: state.game.selectedBird
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectBird: bird => dispatch(selectBird(bird)),
    nextPhase: () => dispatch(nextPhase()),
    skipToFlight: () => dispatch(skipToFlight()),
    showDice: () => dispatch(showDice())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flock);