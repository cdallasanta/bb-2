import React from 'react';
import './cards.css'

const SeasonCard = props => {
  return(
    <img src={props.card.src} alt={props.card.name} className="seasonCard" id="seasonCard" />
  );
}

export default SeasonCard;