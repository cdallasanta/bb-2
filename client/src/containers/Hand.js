import React from 'react';
import { connect } from 'react-redux';
import BackyardCard from '../components/cards/backyardCard';
import { playBYcards } from '../actions/PlayerActions'
import { toggleHand } from '../actions/PlayerActions'
import { nextPhase } from '../actions/GameActions'

class Hand extends React.Component {
  state = {
    selectedCards: []
  }

  handleClick = (e, card) => {
    // unselect card if it is already selected
    if(e.target.classList.contains("selected")) {
      e.target.classList.remove('selected');
      this.setState({
        selectedCards: [...this.state.selectedCards.splice( this.state.selectedCards.indexOf(card), 1 )]
      })
    } else {
      // otherwise add it to selected cards
      e.target.classList.add('selected');
      this.setState({
        selectedCards: [...this.state.selectedCards, card]
      }, () => {
        // and if there are two selected cards, play them
        if (this.state.selectedCards.length === 2){
          this.moveTheCards();
        }
      });
    }
  }

  moveTheCards = () => {
    this.props.playBYcards(this.state.selectedCards);
    this.setState({
      selectedCards: []
    })
    // add the slideDown class to make the hand slide down out of site, where it will hit the animationEnd function and be hidden
    document.getElementById('hand').classList.add("slideDown");
  }

  handleAnimationEnd = e => {
    if (e.target.classList.contains("slideDown")){
      e.target.classList.remove("slideDown");
      this.props.toggleHand();
      this.props.nextPhase();
    }
  }

  renderBYcards(){
    return this.props.hand.map((card, i) => {
      return <BackyardCard card={card} key ={i} handleClick={this.handleClick} />
    })
  }

  render(){
    return (
      <div className="hand" id="hand" onAnimationEnd={this.handleAnimationEnd} >
        {this.renderBYcards()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {hand: state.player.hand}
}

const mapDispatchToProps = dispatch => {
  return {
    playBYcards: cards => dispatch(playBYcards(cards)),
    toggleHand: () => dispatch(toggleHand()),
    nextPhase: () => dispatch(nextPhase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand);