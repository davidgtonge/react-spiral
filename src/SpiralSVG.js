import * as R from "ramda"
import React from "react"
import {interpolateRdYlBu} from "d3-scale-chromatic"
const d3 = require("d3")

const getRadiusAndAngle = (rScale, aScale, origin) => (value, idx) => {
  const _r = rScale(idx)
  const angle = aScale(idx)
  const degrees = angle * (180 / Math.PI)
  return {
    x: origin + _r * Math.cos(angle),
    y: origin + _r * Math.sin(angle),
    degrees,
    value,
  }
}

const getPointsWithIndex = (data, origin, rotations, offset) => {
  const period = Math.round(data.length / rotations)
  const radiusScale = d3
    .scaleLinear()
    .range([offset, origin])
    .domain([0, data.length])
  const angleScale = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, period])
  return data.map(getRadiusAndAngle(radiusScale, angleScale, origin))
}

const getPointsWithTime = (data, origin, rotations, offset) => {
  const extent = d3.extent(R.map(R.head, data))
  const period = Math.round((extent[1] - extent[0]) / rotations)

  const radiusScale = d3
    .scaleLinear()
    .range([offset, origin])
    .domain(extent)
  const angleScale = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([extent[0], extent[0] + period])

  const _getVals = getRadiusAndAngle(radiusScale, angleScale, origin)
  return R.map(([time, val, val2]) => _getVals([val, val2], time))(data)
}

const defaults = {
  data: [],
  margin: 0,
  width: 500,
  height: 500,
  color: interpolateRdYlBu,
  rotations: 6,
  offset: 0,
  opacity: () => 1,
  segment: [15, 1],
  size: v => v * 3,
}

const Spiral = props => {
  const {
    data,
    margin,
    rotations,
    color,
    width,
    height,
    offset,
    segment,
    opacity,
  } = R.merge(defaults, props)

  const origin = width / 2 - 30
  let points
  if (data[0] && data[0].length) {
    points = getPointsWithTime(data, origin, rotations, offset)
  } else {
    points = getPointsWithIndex(data, origin, rotations, offset)
  }

  const [pointWidth, pointHeight] = segment

  return (
    <svg className="spiral" width={width} height={height}>
      <g transform={`translate(${margin},${margin})`}>
        {points.map(({x, y, value, degrees}, idx) => (
          <rect
            x={0}
            y={0}
            key={idx}
            width={pointWidth}
            height={pointHeight}
            transform={`translate(${x},${y}) rotate(${degrees},${0},${0})`}
            fill={color(value)}
            opacity={opacity(value)}
          />
        ))}
      </g>
    </svg>
  )
}

// <circle key={idx} cx={x} cy={y} r={size(v)} fill={color(v)} />
export default Spiral
