/* eslint-disable react/prop-types */
import React from "react"
import Spiral from "./Spiral"
import * as R from "ramda"
const d3 = require("d3")

const getExtent = R.compose(
  d3.extent,
  R.map(R.head),
  R.unnest
)

export default class Chooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {idx: 0}
  }

  render() {
    // const data = this.props.sources[this.state.idx];
    const extent = getExtent(this.props.sources)
    return (
      <div>
        {this.props.labels.map((name, idx) => (
          <button key={idx} onClick={() => this.setState({idx})}>
            {name}
          </button>
        ))}
        <h3>{this.props.labels[this.state.idx]}</h3>
        <Spiral
          {...this.props}
          extent={extent}
          data={this.props.sources[this.state.idx]}
        />
      </div>
    )
  }
}
