export function formatToThirdDigit (input) {
  if (isNaN(input)) {
    throw Error('Unable to format as input is not a number')
  }
  if (input < 99999)
    return input
  if (input < 1000000)
    return Math.round(input/1000) + 'K'
  if (input < 10000000)
    return (input/1000000).toFixed(2) + 'M'
  if(input < 1000000000)
    return Math.floor(input/1000000) + 'M'
  if(input < 1000000000000)
    return (input/1000000000).toFixed(2) + 'B'
}
