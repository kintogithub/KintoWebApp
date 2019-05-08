import React from 'react'
import { mount } from 'enzyme'
import Button from '../Button'

function setup(disabled, isSubmitted) {
  const props = {
    onClick: jest.fn(),
    disabled,
    isSubmitted
  }
  const enzymeWrapper = mount(<Button {...props}>Test</Button>)
  return {
    props,
    enzymeWrapper
  }
}

it('text renders correctly', () => {
  const { enzymeWrapper } = setup()
  expect(enzymeWrapper.text()).toBe('Test')
})

it('onClick is called successfully', () => {
  const { enzymeWrapper, props } = setup()
  expect(props.onClick.mock.calls.length).toBe(0)
  enzymeWrapper.find('button').simulate('click')
  expect(props.onClick.mock.calls.length).toBe(1)
})

it('onClick is not called if button is disabled', () => {
  const { enzymeWrapper, props } = setup(true)
  expect(props.onClick.mock.calls.length).toBe(0)
  enzymeWrapper.find('button').simulate('click')
  expect(props.onClick.mock.calls.length).toBe(0)
})

it('onClick is not called if button is isSubmitted', () => {
  const { enzymeWrapper, props } = setup(false, true)
  expect(props.onClick.mock.calls.length).toBe(0)
  enzymeWrapper.find('button').simulate('click')
  expect(props.onClick.mock.calls.length).toBe(0)
})
