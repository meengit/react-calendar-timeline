import React, { Component } from 'react'
import { _get } from '../utils'
export default class Range extends Component {

  constructor (props) {
    super(props)

    this.cacheDataFromProps(props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.className === this.props.className &&
             nextProps.height === this.props.height &&
             nextProps.headerHeight === this.props.headerHeight &&
             nextProps.keys === this.props.keys &&
             nextProps.range === this.props.range
    )
  }

  cacheDataFromProps (props) {
    this.rangeId = _get(props.range, props.keys.rangeIdKey)
    this.rangeTimeStart = _get(props.range, props.keys.rangeTimeStartKey)
    this.rangeTimeEnd = _get(props.range, props.keys.rangeTimeEndKey)
  }

  left (canvasTimeStart, rangeTimeStart, ratio) {
    if (rangeTimeStart < canvasTimeStart) {
      return 0
    }

    if (rangeTimeStart > canvasTimeStart) {
      return Math.round(((rangeTimeStart - canvasTimeStart) * ratio))
    }
  }

  width (canvasTimeEnd, canvasTimeStart, canvasWidth, left, rangeTimeEnd, ratio) {
    if (rangeTimeEnd < canvasTimeEnd) {
      return Math.round(((rangeTimeEnd - canvasTimeStart) * ratio) - left)
    }

    if (rangeTimeEnd > canvasTimeEnd) {
      return canvasWidth
    }
  }

  render () {
    console.log('Range: ', this.props.range)
    if (this.rangeTimeStart !== null && this.rangeTimeEnd !== null) {
      const { canvasTimeEnd, canvasTimeStart, canvasWidth } = this.props
      let ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
      let top = this.props.headerHeight
      let height = this.props.height - this.props.headerHeight
      let left = this.left(canvasTimeStart, this.rangeTimeStart, ratio)
      let width = this.width(canvasTimeEnd, canvasTimeStart, canvasWidth, left, this.rangeTimeEnd, ratio)

      let styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`
      }

      let classNames = 'rct-range' + (this.props.range.className ? ` ${this.props.range.className}` : '')

      return <div className={classNames} style={styles} />
    } else {
      return <div />
    }
  }
}

Range.propTypes = {
  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired,
  keys: React.PropTypes.object.isRequired,
  range: React.PropTypes.object.isRequired
}
Range.defaultProps = {
}
