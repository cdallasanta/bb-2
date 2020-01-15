import React from 'react';
import BackyardCard from '../components/cards/backyardCard';
import { connect } from 'react-redux';

class Backyard extends React.Component {
  //this does nothing so the backyard cards in the backyard do nothing (as opposed to the hand)
  handleClick = () => {}

  renderBYcards(){
    return this.props.backyard.map((card, i) => {
      return <BackyardCard card={card} key ={i} handleClick={this.handleClick} />
    })
  }

  render(){
    return (
      <div className="backyard" id="backyard">
        {this.renderBYcards()}
      </div>
    );
  }
}
  
const mapStateToProps = state => {
  return {
    player: state.player,
    backyard: state.player.backyard
  }
}

export default connect(mapStateToProps)(Backyard);