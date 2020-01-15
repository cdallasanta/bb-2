import React from 'react';

const Score = props => {
  return(
    <p id="score">
      Score: {props.score}
    </p>
  );
}

export default Score;