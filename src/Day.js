import * as R from "ramda"
import React from "react"
import {interpolateBlues} from "d3-scale-chromatic"
const d3 = require("d3")

const getRadiusAndAngle = (rScale, aScale, vScale, origin) => (value, idx) => {
  const _r = rScale(idx)
  const angle = aScale(idx)
  return {
    x: origin + _r * Math.cos(angle),
    y: origin + _r * Math.sin(angle),
    v: vScale(value),
  }
}

const defaults = {
  data: [],
  margin: 0,
  width: 500,
  height: 500,
  color: interpolateBlues,
  rotations: 6,
  offset: 0,
  size: v => v * 3,
}

const Spiral = props => {
  const {data, margin, rotations, color, width, height, offset, size} = R.merge(
    defaults,
    props
  )
  const period = Math.round(data.length / rotations)
  const origin = width / 2 - size(1)
  const valueScale = d3
    .scaleLinear()
    .range([0, 1])
    .domain(d3.extent(data))
  const radiusScale = d3
    .scaleLinear()
    .range([offset, origin])
    .domain([0, data.length])
  const angleScale = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .domain([0, period])
  const points = data.map(
    getRadiusAndAngle(radiusScale, angleScale, valueScale, origin)
  )

  return (
    <svg className="spiral" width={width} height={height}>
      <g transform={`translate(${margin},${margin})`}>
        {points.map(({x, y, v}, idx) => (
          <circle key={idx} cx={x} cy={y} r={size(v)} fill={color(v)} />
        ))}
      </g>
    </svg>
  )
}

export default Spiral
