const {
  compose,
  map,
  reject,
  flatten,
  isNil,
  append,
  zipWith,
  aperture,
  prop,
  path,
  last,
  update,
  indexBy,
  head,
  unnest,
  pluck,
} = require("ramda")
const extent = [1325376000, 1356822000]
const HOUR = 60 * 60
const getSunrise = path(["daily", "sunriseTime"])
const getSunset = path(["daily", "sunsetTime"])

const timeToIndex = array => {
  const byTime = indexBy(head, array)
  const out = []
  let i = extent[0]
  while (i <= extent[1]) {
    let item = byTime[i]
    if (!item) {
      const prev = last(out) || array[0]
      item = update(0, i, prev)
    }
    console.log(item)
    out.push(item)
    i += HOUR
  }
  return out
}

export const getTemparatures = compose(
  timeToIndex,
  map(({temperature, time}) => [time, temperature]),
  flatten,
  pluck("hourly")
)

export const getClouds = compose(
  timeToIndex,
  map(({cloudCover, time}) => [time, cloudCover]),
  reject(a => isNil(a.cloudCover)),
  flatten,
  pluck("hourly")
)

const joinData = ({time, cloudCover}, sunrise) => [time, sunrise, cloudCover]

const getDaySunriseData = day => {
  const up = getSunrise(day)
  const down = getSunset(day)
  return compose(
    zipWith(joinData, day.hourly),
    append("night"),
    map(([start, end]) => {
      if (start < up && end > up) return "sunrise"
      if (start < up) return "night"
      if (start < down && end > down) return "sunset"
      if (start < down) return "day"
      return "night"
    }),
    aperture(2),
    pluck("time"),
    prop("hourly")
  )(day)
}

export const getSunriseData = compose(
  timeToIndex,
  unnest,
  map(getDaySunriseData)
)

// module.exports = { getSunriseData, getClouds, getTemparatures };
