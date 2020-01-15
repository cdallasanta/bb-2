import React from 'react';

const phaseInstructions = {
  drawBirds: "Draw Bird Cards",
  drawBYcards: "Draw Backyard Cards",
  playBYcards: "Play 2 Backyard Cards",
  chooseBird: "Choose a bird to attract",
  attractBird: "Roll to attract the bird",
  flightRoll: "Roll to see which birds fly away"
};
  
const Instructions = props => {
  return(
    <div className="instructions" id="instructions">
      <p>
        {phaseInstructions[props.phase]}
      </p>
    </div>
  )
}

export default Instructions