import React from 'react';
import './cards.css'

const CardBack = props => {
  return(
    <div className="deck">
      <img
        src={props.card.src}
        alt={props.card.name}
        name={props.card.name}
        className={`card bird cardBack${props.enabled ? "" : " disabled"}`}
        onClick={props.handleClick}
      />
    </div>
  );
}

export default CardBack;