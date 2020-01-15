import React from 'react';
import ReactDice from 'react-dice-complete';
import { connect } from 'react-redux';
import 'react-dice-complete/dist/react-dice-complete.css';
import { nextPhase, selectBirdAgain, toggleDice } from '../actions/GameActions';
import { scoreBird } from '../actions/PlayerActions';
import { selectBird } from '../actions/FlockActions';

// this is based off of react-dice by Adam Taylor, found here:
// https://github.com/AdamTyler/react-dice-complete/blob/master/src/Die.js

class Dice extends React.Component {
  state = {
    loaded: false
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //this gets around the rollDone function running once it renders
  rollDone = async roll => {
    if (!this.state.loaded){
      this.setState({loaded: true});
    } else {
      if(this.props.phase === "attractBird"){
        this.checkForSuccess(roll);
      } else if (this.props.phase === "flightRoll") {
        this.flightCheck(roll);
        await this.sleep(1000);
        this.props.toggleDice();
        this.props.nextPhase();
      }
    }
  }

  checkForSuccess = roll => {
    const BYcards = this.gatherBYcards();
    const bonus = this.setBonus(BYcards);
    const card = document.getElementById(`bird-${this.props.selectedBird.id}`);

    if(roll === 6) {
      card.classList.add("flyToScore");
      this.props.scoreBird(this.props.selectedBird, BYcards);
      this.props.selectBirdAgain();
    } else if(roll >= 4-bonus){
      card.classList.add("flyToScore");
      this.props.scoreBird(this.props.selectedBird, BYcards);
      this.props.nextPhase();
    } else {
      card.classList.remove('selected');
      this.props.selectBird(null);
      this.props.nextPhase();
    }
  }

  gatherBYcards = () => {
    // checks the backyard for the first card that matches the bird's need
    // if there are undefined values, pass through again looking for a second copy of the first need
    // the filter removes 'undefined' from the array when no backyard card matches the need
    const BYcopy = [...this.props.backyard]
    const BYcards = []
    
    let passThrough = () => {
      this.props.selectedBird.habitat.forEach(need =>{
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

  setBonus = BYcards => {
    if (BYcards.length === 1) {
      return 0;
    } else if (BYcards[0].type === BYcards[1].type) {
      return 1;
    } else {
      return 2;
    }
  }

  flightCheck = async roll => {
    this.props.flock.forEach(async bird => {
      if (bird.flightNums.includes(roll)) {
        await this.sleep(150);
        const birdElem = document.getElementById(`bird-${bird.id}`)
        birdElem.style.setProperty('--flightAngle', `${Math.random()*600 - 300}%`)
        birdElem.classList.add("flyAway");
      }
    })
  }

  render() {
    return(
      <div id="dice">
        <ReactDice
          numDice={1}
          rollDone={this.rollDone}
          ref={dice => this.reactDice = dice}
          outline={true}
          faceColor="#FFF"
          dotColor="#000"
        /> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedBird: state.game.selectedBird,
    backyard: state.player.backyard,
    phase: state.game.phase,
    flock: state.flock
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextPhase: () => dispatch(nextPhase()),
    selectBirdAgain: () => dispatch(selectBirdAgain()),
    toggleDice: () => dispatch(toggleDice()),
    scoreBird: (bird, BYcards) => dispatch(scoreBird(bird, BYcards)),
    selectBird: bird => dispatch(selectBird(bird))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);