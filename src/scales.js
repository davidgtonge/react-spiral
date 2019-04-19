const d3 = require("d3")

import {interpolateRdYlBu} from "d3-scale-chromatic"

const MIN = -10
const MAX = 40

const memoizeOne = fn => {
  const results = {}
  return arg => {
    if (!results[arg]) results[arg] = fn(arg)
    return results[arg]
  }
}

const scale = d3
  .scaleLinear()
  .range([0, 1])
  .domain([MIN, MAX])
const tempScale = memoizeOne(val => interpolateRdYlBu(1 - scale(val)))

export const temperatureScale = val => tempScale(val[0])

const blueGrayScale = memoizeOne(
  d3
    .scaleLinear()
    .range(["#00b2ee", "#bbdfeb", "rgb(255,255,255)"])
    .domain([0, 0.5, 1])
    .clamp(true)
)

export const cloudScale = val => blueGrayScale(val[0])
