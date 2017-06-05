import React from "react";
import { storiesOf } from "@kadira/storybook";
import Chooser from "../src/spiral-chooser";
import R from "ramda";
import { temperatureScale, cloudScale } from "../src/scales";

const bristolClouds = require("./data/bristol-clouds.json");
const bristolSunrise = require("./data/bristol-sunrise.json");
const bristolTemp = require("./data/bristol-temp.json");
const ljuClouds = require("./data/lju-clouds.json");
const ljuSunrise = require("./data/lju-sunrise.json");
const ljuTemp = require("./data/lju-temp.json");
const niceClouds = require("./data/nice-clouds.json");
const niceSunrise = require("./data/nice-sunrise.json");
const niceTemp = require("./data/nice-temp.json");

storiesOf("Chooser - temperature data", module)
  .add(`temparature - year`, () => {
    return (
      <Chooser
        width={750}
        height={750}
        sources={[ bristolTemp, ljuTemp, niceTemp ]}
        labels={[ "Bristol", "Ljubliana", "Nice" ]}
        rotations={4}
        offset={220}
        segment={[ 25, 1 ]}
        color={temperatureScale}
        size={R.always(1)}
      />
    );
  })
  .add("temparature - month", () => {
    return (
      <Chooser
        width={750}
        height={750}
        sources={[ bristolTemp, ljuTemp, niceTemp ]}
        labels={[ "Bristol", "Ljubliana", "Nice" ]}
        rotations={12}
        offset={160}
        segment={[ 15, 4 ]}
        color={temperatureScale}
        size={R.always(1)}
      />
    );
  })
  .add("temparature - week", () => {
    return (
      <Chooser
        width={750}
        height={750}
        sources={[ bristolTemp, ljuTemp, niceTemp ]}
        labels={[ "Bristol", "Ljubliana", "Nice" ]}
        rotations={52}
        offset={200}
        segment={[ 5, 15 ]}
        color={temperatureScale}
        size={R.always(1)}
      />
    );
  })
  .add("temparature - day", () => {
    return (
      <Chooser
        width={750}
        height={750}
        sources={[ bristolTemp, ljuTemp, niceTemp ]}
        labels={[ "Bristol", "Ljubliana", "Nice" ]}
        rotations={363}
        offset={0}
        segment={[ 1, 20 ]}
        color={temperatureScale}
        size={R.always(1)}
      />
    );
  });

storiesOf("Chooser - cloud data", module).add("year", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolClouds, ljuClouds, niceClouds ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={4}
      offset={100}
      segment={[ 55, 1 ]}
      color={cloudScale}
      size={R.always(1)}
    />
  );
}).add("month", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolClouds, ljuClouds, niceClouds ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={12}
      offset={160}
      segment={[ 10, 2 ]}
      color={cloudScale}
      size={R.always(1)}
    />
  );
}).add("week", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolClouds, ljuClouds, niceClouds ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={52}
      offset={100}
      segment={[ 4, 15 ]}
      color={cloudScale}
      size={R.always(1)}
    />
  );
}).add("day", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolClouds, ljuClouds, niceClouds ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={363}
      offset={0}
      segment={[ 1, 20 ]}
      color={cloudScale}
      size={R.always(1)}
    />
  );
});

const sunriseColors = {
  night: "black",
  sunrise: "orange",
  sunset: "orange",
  day: "yellow"
};
const sunriseScale = ([ val, cloud ]) => {
  if (val === "night") {
    return "white";
  } else {
    return cloudScale([ cloud ]);
  }
  return sunriseColors[val] || "black";
};
const cloudOpacityScale = ([ val, cloud ]) => 1;

storiesOf("Chooser - sunrise data", module).add("sunrise", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolSunrise, ljuSunrise, niceSunrise ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={4}
      offset={150}
      segment={[ 43, 1 ]}
      color={sunriseScale}
      opacity={cloudOpacityScale}
      size={R.always(1)}
    />
  );
}).add("sunrise - month", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolSunrise, ljuSunrise, niceSunrise ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={12.1}
      offset={160}
      segment={[ 15, 2 ]}
      color={sunriseScale}
      opacity={cloudOpacityScale}
      size={R.always(1)}
    />
  );
}).add("sunrise - week", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolSunrise, ljuSunrise, niceSunrise ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={52}
      offset={50}
      segment={[ 5, 10 ]}
      color={sunriseScale}
      opacity={cloudOpacityScale}
      size={R.always(1)}
    />
  );
}).add("sunrise - day", () => {
  return (
    <Chooser
      width={750}
      height={750}
      sources={[ bristolSunrise, ljuSunrise, niceSunrise ]}
      labels={[ "Bristol", "Ljubliana", "Nice" ]}
      rotations={363}
      offset={100}
      segment={[ 1, 20 ]}
      color={sunriseScale}
      opacity={cloudOpacityScale}
      size={R.always(1)}
    />
  );
});
