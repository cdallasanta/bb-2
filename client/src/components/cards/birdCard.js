import React from 'react';
import './cards.css'
import { removeBird } from '../../actions/FlockActions';
import { connect } from 'react-redux';

class BirdCard extends React.Component {
  state = {
    zoomed: false
  }

  zoomCard = e => {
    e.preventDefault();
    this.setState({zoomed: !this.state.zoomed})
  }

  handleAnimationEnd = e => {
    if (e.target.classList.contains("flyToScore")){
      this.props.removeBird(this.props.selectedBird);
    } else if (e.target.classList.contains("flyAway")) {
      const birdToRemove = this.props.flock.find(b => `bird-${b.id}` === e.target.id);
      this.props.removeBird(birdToRemove);
    }
  }

  render(){
    return(
      <img
        src={this.props.card.src}
        alt={this.props.card.name}
        className={`card bird${this.state.zoomed ? " zoomed" : ""}${this.props.selected ? " selected" : ""}`}
        onContextMenu={this.zoomCard}
        onClick={e => this.props.handleClick(e, this.props.card)} 
        onAnimationEnd={this.handleAnimationEnd}
        id={`bird-${this.props.card.id}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedBird: state.game.selectedBird,
    flock: state.flock
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeBird: bird => dispatch(removeBird(bird))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdCard);