import R from "ramda";
import React from "react";
import { interpolateBlues, interpolateRdYlBu } from "d3-scale-chromatic";
import { Motion, spring } from "react-motion";

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

const animate = (duration, callback) => {
  let start;
  const fn = time => {
    if (!start) start = time;
    if (time >= start + duration) return callback(1);
    const t = (time - start) / duration;
    callback(t);
    requestAnimationFrame(fn);
  };
  requestAnimationFrame(fn);
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
  segment: [ 15, 1 ],
  size: v => v * 3
};

const filter5th = (d, i) => i % 5 === 0;

class Canvas extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate(prevProps) {
    this.updateCanvas(prevProps);
  }
  updateCanvas(prevProps) {
    const { rects } = this.props;
    if (prevProps) {
      const filteredPrev = prevProps.rects;
      //.filter(filter5th);
      const filteredNext = rects;
      //.filter(filter5th);
      const interpolator = d3.interpolate(filteredPrev, filteredNext);
      animate(1000, t => {
        if (t === 1) {
          this.drawRects(rects, 10);
        } else {
          this.drawRects(interpolator(t), Math.floor(t * 10));
        }
      });
    } else {
      this.drawRects(rects, 10);
    }
  }
  drawRects(rects, t) {
    const isFinal = t == 10;
    const ctx = this.refs.canvas.getContext("2d");
    const { pointWidth, pointHeight, width, height } = this.props;
    ctx.clearRect(0, 0, width, height);
    let i = rects.length - 1;
    let yOffset = 0;
    let rectHeight = pointHeight;
    // if (!isFinal) {
    //   rectHeight *= 5;
    //   //yOffset -= rectHeight / 2;
    // }
    while (i >= 0) {
      const { x, y, fill, opacity, rotation } = rects[i];
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `rgb(${Math.floor(fill[0])},${Math.floor(
        fill[1]
      )},${Math.floor(fill[2])})`;
      ctx.translate(x + yOffset, y);
      ctx.rotate(rotation);
      ctx.fillRect(0, 0, pointWidth, rectHeight);
      ctx.restore();
      i--;
    }
  }

  render() {
    const { width, height } = this.props;
    return <canvas ref="canvas" width={width} height={height} />;
  }
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
    size,
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
