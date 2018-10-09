import React from 'react';
import { shallow } from '../../enzyme';
import SumField from '../SumField';

const setup = propOverrides => {
  const props = Object.assign({
    recalculate: jest.fn()
  }, propOverrides)

  const wrapper = shallow(<SumField {...props} />)

  return {
    props,
    wrapper,
    inputField: wrapper.find('.sum-input')
  }
}

describe('SumField', () => {
  it('renders SumField', () => {
    const wrapper = shallow(<SumField />)
    expect(wrapper.exists()).toBe(true)
  })

  it('calls recalculate on input change', () => {
    const fn = jest.fn()
    const { inputField } = setup({recalculate: fn})
    inputField.simulate('change', {
      target: { value: '100' }
    })
    expect(fn).toHaveBeenCalled()
  })
})
