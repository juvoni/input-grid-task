import React from 'react';
import { formatToThirdDigit } from '../util/util';

function Result ({ total }) {
  return <div className="resultField">{formatToThirdDigit(total)}</div>
}

export default Result;
