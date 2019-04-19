import React from "react"
import {storiesOf} from "@storybook/react"
import Spiral from "../src/Spiral"
import Chooser from "../src/spiral-chooser"
import * as R from "ramda"
import {temperatureScale, cloudScale} from "../src/scales"
// const {tempertureData, cloudData, sunriseData} = require("./get-data")

const simpleData = R.repeat(1, 1500)
simpleData.push(0)
const variableData = simpleData.map(() => Math.random())

storiesOf("Chooser", module).add("with sources", () => (
  <Chooser sources={[simpleData, variableData]} labels={["one", "two"]} />
))

storiesOf("Spiral", module)
  .add("defaults", () => <Spiral data={simpleData} />)
  .add("with more rotations", () => <Spiral rotations={12} data={simpleData} />)
  .add("with even more rotations", () => (
    <Spiral rotations={50} data={simpleData} />
  ))
  .add("with variable data", () => <Spiral rotations={4} data={variableData} />)
  .add("with variable data same size", () => (
    <Spiral rotations={4} size={R.always(2)} data={variableData} />
  ))
  .add("with variable data same color", () => (
    <Spiral rotations={4} color={R.always("black")} data={variableData} />
  ))

storiesOf("Temp scale", module)
  .add("default range", () => {
    const items = R.range(-12, 43)
    return (
      <div>
        {items.map(val => (
          <div
            style={{
              display: "inline-block",
              width: 20,
              height: 50,
              background: temperatureScale([val]),
            }}
          >
            {val}
          </div>
        ))}
      </div>
    )
  })
  .add("cloud scale", () => {
    const items = R.range(0, 11).map(x => x / 10)
    return (
      <div>
        {items.map(val => (
          <div
            style={{
              display: "inline-block",
              width: 100,
              height: 50,
              background: cloudScale([val]),
            }}
          >
            {val}
          </div>
        ))}
      </div>
    )
  })
