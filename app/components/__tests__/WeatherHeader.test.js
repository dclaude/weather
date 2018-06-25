import React from 'react'
import WeatherHeader from '../WeatherHeader'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'

test('test with react-dom', () => {
  const node = document.createElement('div');
  ReactDOM.render(<WeatherHeader icon='01n' dt={1521975600} />, node)
  expect(node.innerHTML).toContain('alt="Weather icon"');
})

test('test with react-test-renderer', () => {
  const component = renderer.create(
    <WeatherHeader icon='01n' dt={1521975600} />
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('test with enzyme', () => {
  const comp = shallow(<WeatherHeader icon='01n' dt={1521975600} />);
  expect(comp.find('h2').text()).toEqual('M03 25, Sun')
  const img = comp.find('img')
})

