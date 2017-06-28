import React from 'react'
import { render } from 'enzyme'
import Ranges from '../ranges/Ranges'

const defaults = {
  canvasWidth: 3000,
  height: 1190,
  headerHeight: 60,
  visibleTimeStart: 3000,
  visibleTimeEnd: 6000
}

const zoom = defaults.visibleTimeEnd - defaults.visibleTimeStart // 3000
const canvasTimeStart = defaults.visibleTimeStart - (defaults.visibleTimeEnd - defaults.visibleTimeStart) // 0
const canvasTimeEnd = canvasTimeStart + zoom * 3 // 9000

const keys = {
  rangeIdKey: 'id',
  rangeTimeStartKey: 'start',
  rangeTimeEndKey: 'end'
}

describe('Ranges', () => {
  it('render Range in visible time', () => {
    const wrapper = render(
      <Ranges canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={defaults.canvasWidth}
              height={defaults.height}
              headerHeight={defaults.headerHeight}
              keys={keys}
              ranges={[{id: 1, start: 4000, end: 5000}]}
              visibleTimeStart={defaults.visibleTimeStart}
              visibleTimeEnd={defaults.visibleTimeEnd}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('do not render Range with end smaller than visible time start', () => {
    const wrapper = render(
      <Ranges canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={defaults.canvasWidth}
              height={defaults.height}
              headerHeight={defaults.headerHeight}
              keys={keys}
              ranges={[{id: 2, start: 1000, end: 2000}]}
              visibleTimeStart={defaults.visibleTimeStart}
              visibleTimeEnd={defaults.visibleTimeEnd}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('do not render Range with start after than visible time end', () => {
    const wrapper = render(
      <Ranges canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={defaults.canvasWidth}
              height={defaults.height}
              headerHeight={defaults.headerHeight}
              keys={keys}
              ranges={[{id: 3, start: 7000, end: 8000}]}
              visibleTimeStart={defaults.visibleTimeStart}
              visibleTimeEnd={defaults.visibleTimeEnd}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('render Range that overlaps visible time start', () => {
    const wrapper = render(
      <Ranges canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={defaults.canvasWidth}
              height={defaults.height}
              headerHeight={defaults.headerHeight}
              keys={keys}
              ranges={[{id: 4, start: 2000, end: 4000}]}
              visibleTimeStart={defaults.visibleTimeStart}
              visibleTimeEnd={defaults.visibleTimeEnd}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('render Range that overlaps visible time end', () => {
    const wrapper = render(
      <Ranges canvasTimeStart={canvasTimeStart}
              canvasTimeEnd={canvasTimeEnd}
              canvasWidth={defaults.canvasWidth}
              height={defaults.height}
              headerHeight={defaults.headerHeight}
              keys={keys}
              ranges={[{id: 5, start: 5000, end: 7000}]}
              visibleTimeStart={defaults.visibleTimeStart}
              visibleTimeEnd={defaults.visibleTimeEnd}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
