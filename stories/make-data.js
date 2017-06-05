const fs = require("fs");
const path = require("path");
const R = require("ramda");
const { getSunriseData, getClouds, getTemparatures } = require("./get-data");
const lju = require("./test-data.json");
const bristol = require("./bristol-2014.json");
const nice = require("./nice-2014.json");

const cities = { lju, bristol, nice };

R.mapObjIndexed((data, name) => {
  fs.writeFileSync(
    path.join(__dirname, `./data/${name}-clouds.json`),
    JSON.stringify(getClouds(data), null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, `./data/${name}-sunrise.json`),
    JSON.stringify(getSunriseData(data), null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, `./data/${name}-temp.json`),
    JSON.stringify(getTemparatures(data), null, 2)
  );
})(cities);
