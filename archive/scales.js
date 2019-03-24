const d3 = require("d3");
import R from "ramda";
import {
  interpolateRdYlBu,
  interpolateGreys,
  interpolateBlues
} from "d3-scale-chromatic";
const MIN = -10;
const MAX = 40;
const scale = d3.scaleLinear().range([ 0, 1 ]).domain([ MIN, MAX ]);
export const temperatureScale = val => interpolateRdYlBu(1 - scale(val[0]));
const blueGrayScale = d3
  .scaleLinear()
  .range([ "#00b2ee", "#eaeaea" ])
  .domain([ 0, 1 ])
  .clamp(true);
export const cloudScale = val => {
  const a = blueGrayScale(val[0]);
  if (a === "rgb(0, 0, 0)") {
    console.log(val, a);
  }
  return a;
};