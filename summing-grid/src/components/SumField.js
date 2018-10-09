import React from 'react';

function SumField ({recalculate}) {
  return (
    <input className="sum-input" type="text" onChange={recalculate}></input>
  );
}

export default SumField;
