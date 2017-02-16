import React, { Component } from 'react'

export default class Range extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.className === this.props.className &&
             nextProps.height === this.props.height &&
             nextProps.headerHeight === this.props.headerHeight &&
             nextProps.keys === this.props.keys &&
             nextProps.rangeStart === this.props.rangeStart &&
             nextProps.rangeEnd === this.props.rangeEnd
    )
  }

  left (canvasTimeStart, rangeStart, ratio) {
    if (rangeStart < canvasTimeStart) {
     return 0
    }

    if (rangeStart > canvasTimeStart) {
      return Math.round(((rangeStart - canvasTimeStart) * ratio))
    }
  }

  width (canvasTimeEnd, canvasTimeStart, canvasWidth, left, rangeEnd, ratio) {
    if (rangeEnd < canvasTimeEnd) {
      return Math.round(((rangeEnd - canvasTimeStart) * ratio) - left)
    }

    if (rangeEnd > canvasTimeEnd) {
      return canvasWidth
    }
  }

  render () {
    if (this.props.rangeStart !== null && this.props.rangeEnd !== null) {
      const { canvasTimeEnd, canvasTimeStart, canvasWidth, rangeEnd, rangeStart } = this.props
      let ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
      let top = this.props.headerHeight
      let height = this.props.height - this.props.headerHeight
      let left = this.left(canvasTimeStart, rangeStart, ratio)
      let width = this.width(canvasTimeEnd, canvasTimeStart, canvasWidth, left, rangeEnd, ratio)
 
      let styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`
      }

      let classNames = 'rct-range' + ' ' + this.props.className

      return <div className={classNames} style={styles} />
    } else {
      return <div />
    }
  }
}

Range.propTypes = {
  rangeStart: React.PropTypes.number.isRequired,
  rangeEnd: React.PropTypes.number.isRequired,
  keys: React.PropTypes.object.isRequired,
  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired
}
Range.defaultProps = {
}
