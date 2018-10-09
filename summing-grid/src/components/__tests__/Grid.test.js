import React from 'react';
import { mount, shallow } from '../../enzyme';
import Grid from '../Grid';

const setup = () => {
  const wrapper = mount(<Grid />)
  wrapper.setState({
    totalFields: {},
    total: 0
  })
  return {
    wrapper,
    sumFields: wrapper.find('SumField'),
    resultField: wrapper.find('Result')
  }
}

describe('Grid', () => {
  it('should render', () => {
    expect (shallow(<Grid />).find('.grid').exists()).toBe(true)
  })

  it('should render with state', () => {
    const { wrapper } = setup()
    expect(wrapper.state('total')).toEqual(0)
    expect(wrapper.state('totalFields')).toEqual({})
  })

  it('should render 3 SumFields', () => {
    const { sumFields } = setup()
    expect (sumFields.length).toEqual(3)
  })

  it('should render Result', () => {
    const { resultField } = setup()
    expect (resultField.length).toEqual(1)
  })

  it('add sums to total', () => {
    const { wrapper, sumFields, resultField } = setup()

    sumFields.at(0).simulate('change', {
      target: { value: '100' }
    })
    sumFields.at(1).simulate('change', {
      target: { value: '50' }
    })
    sumFields.at(2).simulate('change', {
      target: { value: '50' }
    })

    expect(wrapper.state('total')).toEqual(200)
    expect(resultField.text()).toEqual('200')
  })

  it('add sums including negatives factored into total', () => {
    const { wrapper, sumFields, resultField } = setup()

    sumFields.at(0).simulate('change', {
      target: { value: '-100' }
    })
    sumFields.at(1).simulate('change', {
      target: { value: '-25' }
    })
    sumFields.at(2).simulate('change', {
      target: { value: '300' }
    })

    expect(wrapper.state('total')).toEqual(175)
    expect(resultField.text()).toEqual('175')
  })

  it('updates sums on removals', () => {
    const { wrapper, sumFields, resultField } = setup()

    sumFields.at(0).simulate('change', {
      target: { value: '100' }
    })
    sumFields.at(1).simulate('change', {
      target: { value: '50' }
    })
    sumFields.at(2).simulate('change', {
      target: { value: '50' }
    })

    expect(wrapper.state('total')).toEqual(200)
    expect(resultField.text()).toEqual('200')

    sumFields.at(1).simulate('change', {
      target: { value: '' }
    })

    expect(wrapper.state('total')).toEqual(150)
    expect(resultField.text()).toEqual('150')
  })

  it('updates sums excluding non-numerical', () => {
    const { wrapper, sumFields, resultField } = setup()

    sumFields.at(0).simulate('change', {
      target: { value: '100.5' }
    })
    sumFields.at(1).simulate('change', {
      target: { value: 'abc' }
    })
    sumFields.at(2).simulate('change', {
      target: { value: '50.5' }
    })

    expect(wrapper.state('total')).toEqual(151)
    expect(resultField.text()).toEqual('151')
  })

  const cases = [
    { type:'Sub Hundred Thousand', values: [10000, 10000, 6000], total: 26000, result: '26000'},
    { type:'Hundreds of Thousands', values: [100000, 100000, 60000], total: 260000, result: '260K'},
    { type:'Millions', values: [50000, 70000, 900000], total: 1020000, result: '1.02M'},
    { type:'Hundrends of Million', values: [400000, 8000000, 200000000], total: 208400000, result: '208M'},
  ]

  cases.forEach(({ type, values, total, result }) => {
    it(`calculates and formats total for ${type} total`, () => {
      const { wrapper, sumFields, resultField } = setup()
      const [firstInput, secondInput, thirdInput] = values

      sumFields.at(0).simulate('change', {
        target: { value: firstInput }
      })
      sumFields.at(1).simulate('change', {
        target: { value: secondInput }
      })
      sumFields.at(2).simulate('change', {
        target: { value: thirdInput }
      })

      expect(wrapper.state('total')).toEqual(total)
      expect(resultField.text()).toEqual(result)

    })
  })

})
