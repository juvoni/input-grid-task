import React from 'react';
import { shallow } from '../../enzyme';
import Result from '../Result';

const setup = propOverrides => {
  const props = Object.assign({
    total: 0
  }, propOverrides)

  const wrapper = shallow(<Result {...props} />)

  return {
    props,
    wrapper,
    result: wrapper.find('.resultField')
  }
}

describe('Result', () => {
  it('should render', () => {
    const { wrapper } = setup({})
    expect(wrapper.exists()).toBe(true)
  })

  const cases = [
    { total: 1000, formatted: '1000' },
    { total: 10000, formatted: '10000' },
    { total: 100000, formatted: '100K' },
    { total: 1000000, formatted: '1.00M' },
    { total: 10000000, formatted: '10M' },
    { total: 100000000, formatted: '100M' },
    { total: 1000000000, formatted: '1.00B' },
  ]

  cases.forEach(({total, formatted}) => {
    it(`when sum is ${total}`, () => {
      const { wrapper, result } = setup({total})
      expect(result.text()).toEqual(formatted)
    })
  })
})
