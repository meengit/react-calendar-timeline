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
    ranges: PropTypes.array.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.height === this.props.height &&
             nextProps.keys === this.props.keys &&
             nextProps.headerHeight === this.props.headerHeight &&
             arraysEqual(nextProps.ranges, this.props.ranges)
      )
  }

  getVisibleRanges (canvasTimeStart, canvasTimeEnd, ranges) {
    return this.props.ranges.filter(range => {
      return range.start <= canvasTimeEnd && range.end >= canvasTimeStart
    })
  }

  render () {
    const { canvasTimeStart, canvasTimeEnd } = this.props
    const { rangeIdKey } = this.props.keys
    let visibleRanges = this.getVisibleRanges(canvasTimeStart, canvasTimeEnd, this.props.ranges)
    return (
      <div className='rct-ranges'>
        {visibleRanges.map(range => <Range canvasTimeStart={this.props.canvasTimeStart}
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
