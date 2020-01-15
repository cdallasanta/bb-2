import React from 'react';
import './cards.css'

const BackyardCard = props => {
  return(
    <img
      src={props.card.src}
      alt="backyard"
      className="card"
      onClick={e => props.handleClick(e, props.card)}
    />
  );
}

export default BackyardCard;