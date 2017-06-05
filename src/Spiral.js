import R from "ramda";
import React from "react";
import { interpolateBlues, interpolateRdYlBu } from "d3-scale-chromatic";
import { Motion, spring } from "react-motion";
import Canvas from "./Canvas";

const d3 = require("d3");

const getRadiusAndAngle = (rScale, aScale, origin) => (value, idx) => {
  const _r = rScale(idx);
  const angle = aScale(idx);
  const degrees = angle * (180 / Math.PI);
  return {
    x: origin + _r * Math.cos(angle),
    y: origin + _r * Math.sin(angle),
    degrees,
    rotation: angle,
    value
  };
};

const getPointsWithIndex = (data, origin, rotations, offset) => {
  const period = Math.round(data.length / rotations);
  const radiusScale = d3
    .scaleLinear()
    .range([ offset, origin ])
    .domain([ 0, data.length ]);
  const angleScale = d3
    .scaleLinear()
    .range([ 0, 2 * Math.PI ])
    .domain([ 0, period ]);
  return data.map(getRadiusAndAngle(radiusScale, angleScale, origin));
};

const getPointsWithTime = (data, origin, rotations, offset, extent) => {
  //const extent = d3.extent(R.map(R.head, data));
  const period = Math.round((extent[1] - extent[0]) / rotations);

  const radiusScale = d3
    .scaleLinear()
    .range([ offset - 30, origin - 30 ])
    .domain(extent);
  const angleScale = d3
    .scaleLinear()
    .range([ 0, 2 * Math.PI ])
    .domain([ extent[0], extent[0] + period ]);

  const _getVals = getRadiusAndAngle(radiusScale, angleScale, origin);
  return R.map(
    ([ time, val, val2 ]) => _getVals([ val, val2, time ], time)
  )(data);
};

const defaults = {
  data: [],
  margin: 0,
  width: 500,
  height: 500,
  color: interpolateRdYlBu,
  rotations: 6,
  offset: 0,
  opacity: () => 1,
  segment: [ 15, 1 ]
};

const filter5th = (d, i) => i % 5 === 0;

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
    extent
  } = R.merge(defaults, props);

  const origin = width / 2 - 30;
  let points;
  if (data[0] && data[0].length) {
    points = getPointsWithTime(data, origin, rotations, offset, extent);
  } else {
    points = getPointsWithIndex(data, origin, rotations, offset);
  }

  const [ pointWidth, pointHeight ] = segment;
  const rects = points.map(a => {
    const fill = d3.rgb(color(a.value));
    a.fill = [ fill.r, fill.g, fill.b ];
    a.opacity = opacity(a.value);
    return a;
  });

  return (
    <Canvas
      width={width}
      height={height}
      rects={rects}
      pointWidth={pointWidth}
      pointHeight={pointHeight}
    />
  );
};

export default Spiral;
