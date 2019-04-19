/* eslint-disable react/prop-types */
/* eslint-disable max-statements */
import React from "react"
const d3 = require("d3")

const animate = (duration, callback) => {
  let start
  const fn = time => {
    if (!start) start = time
    if (time >= start + duration) return callback(1)
    const t = (time - start) / duration
    callback(t)
    return requestAnimationFrame(fn)
  }
  requestAnimationFrame(fn)
}

class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate(prevProps) {
    this.updateCanvas(prevProps)
  }
  updateCanvas(prevProps) {
    const {rects} = this.props
    if (prevProps) {
      const filteredPrev = prevProps.rects
      // .filter(filter5th);
      const filteredNext = rects
      // .filter(filter5th);
      const interpolator = d3.interpolate(filteredPrev, filteredNext)
      animate(1000, t => {
        if (t === 1) {
          this.drawRects(rects, 10)
        } else {
          this.drawRects(interpolator(t), Math.floor(t * 10))
        }
      })
    } else {
      this.drawRects(rects, 10)
    }
  }
  drawRects(rects) {
    // const isFinal = t == 10;
    const ctx = this.refs.canvas.getContext("2d")
    const {pointWidth, pointHeight, width, height} = this.props
    ctx.clearRect(0, 0, width, height)
    let i = rects.length - 1
    const yOffset = 0
    const rectHeight = pointHeight
    // if (!isFinal) {
    //   rectHeight *= 5;
    //   //yOffset -= rectHeight / 2;
    // }
    while (i >= 0) {
      const {x, y, fill, opacity, rotation} = rects[i]
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = `rgb(${Math.floor(fill[0])},${Math.floor(
        fill[1]
      )},${Math.floor(fill[2])})`
      ctx.translate(x + yOffset, y)
      ctx.rotate(rotation)
      ctx.fillRect(0, 0, pointWidth, rectHeight)
      ctx.restore()
      i--
    }
  }

  render() {
    const {width, height} = this.props
    return <canvas ref="canvas" width={width} height={height} />
  }
}

export default Canvas
