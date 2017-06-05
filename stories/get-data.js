const R = require("ramda");
const extent = [ 1325376000, 1356822000 ];
const HOUR = 60 * 60;
const getSunrise = R.path([ "daily", "sunriseTime" ]);
const getSunset = R.path([ "daily", "sunsetTime" ]);

const timeToIndex = array => {
  const byTime = R.indexBy(R.head, array);
  const out = [];
  let i = extent[0];
  while (i <= extent[1]) {
    let item = byTime[i];
    if (!item) {
      let prev = R.last(out) || array[0];
      item = R.update(0, i, prev);
    }
    console.log(item);
    out.push(item);
    i += HOUR;
  }
  return out;
};

const getTemparatures = R.compose(
  timeToIndex,
  R.map(({ temperature, time }) => [ time, temperature ]),
  R.flatten,
  R.pluck("hourly")
);

const getClouds = R.compose(
  timeToIndex,
  R.map(({ cloudCover, time }) => [ time, cloudCover ]),
  R.reject(a => R.isNil(a.cloudCover)),
  R.flatten,
  R.pluck("hourly")
);

const joinData = ({ time, cloudCover }, sunrise) => [
  time,
  sunrise,
  cloudCover
];

const getDaySunriseData = day => {
  const up = getSunrise(day);
  const down = getSunset(day);
  return R.compose(
    R.zipWith(joinData, day.hourly),
    R.append("night"),
    R.map(([ start, end ]) => {
      if (start < up && end > up) return "sunrise";
      if (start < up) return "night";
      if (start < down && end > down) return "sunset";
      if (start < down) return "day";
      return "night";
    }),
    R.aperture(2),
    R.pluck("time"),
    R.prop("hourly")
  )(day);
};

const getSunriseData = R.compose(
  timeToIndex,
  R.unnest,
  R.map(getDaySunriseData)
);

module.exports = { getSunriseData, getClouds, getTemparatures };
