import React, { Component, PropTypes } from 'react'
import Range from './Range'
import { _get, arraysEqual } from '../utils'

export default class Ranges extends Component {
  static propTypes = {
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    keys: PropTypes.object.isRequired,
    ranges: PropTypes.array.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.height === this.props.height &&
             nextProps.keys === this.props.keys &&
             nextProps.headerHeight === this.props.headerHeight &&
             arraysEqual(nextProps.ranges, this.props.ranges) &&
             nextProps.visibleTimeStart === this.props.visibleTimeStart &&
             nextProps.visibleTimeEnd === this.props.visibleTimeEnd
      )
  }

  getVisibleRanges (visibleTimeStart, visibleTimeEnd, ranges) {
    return this.props.ranges.filter(range => {
      let position = {
        start: range.start,
        end: range.end
      }

      if (visibleTimeStart >= range.start) {
        position.start = visibleTimeStart
      }

      if (visibleTimeEnd <= range.end) {
        position.end = visibleTimeEnd
      }

      if (visibleTimeStart > position.end || visibleTimeEnd < position.start) {
        position = {}
        return
      }

      return position
    })
  }

  rangeIsVisible (range) {
    function isNumber (value) {
      return value !== undefined && typeof (value) === 'number' && !isNaN(value)
    }

    if (isNumber(range.start) && isNumber(range.end)) {
      return range
    }
  }

  render () {
    const { visibleTimeStart, visibleTimeEnd } = this.props
    const { rangeIdKey } = this.props.keys
    let visibleRanges = this.getVisibleRanges(visibleTimeStart, visibleTimeEnd, this.props.ranges)

    return (
      <div className='rct-ranges'>
        {visibleRanges.filter(range => this.rangeIsVisible(range))
                      .map(range => <Range canvasTimeStart={this.props.canvasTimeStart}
                                           canvasTimeEnd={this.props.canvasTimeEnd}
                                           canvasWidth={this.props.canvasWidth}
                                           className={range.className}
                                           height={this.props.height}
                                           headerHeight={this.props.headerHeight}
                                           key={_get(range, rangeIdKey)}
                                           keys={this.props.keys}
                                           range={range}
                                           rangeStart={range.start}
                                           rangeEnd={range.end} />)}
      </div>
    )
  }
}
