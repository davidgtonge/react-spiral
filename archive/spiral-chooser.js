/*
Needs to take an array of {name, data}...
hot reloading is still working well here
*/
import React from "react";
import Spiral from "./Spiral";
export default class Chooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idx: 0 };
  }
  render() {
    const data = this.props.sources[this.state.idx];
    console.log(data);
    return (
      <div>
        {
          this.props.labels.map((name, idx) => (
            <button onClick={() => this.setState({ idx })}>{name}</button>
          ))
        }
        <h3>{this.props.labels[this.state.idx]}</h3>
        <Spiral {...this.props} data={this.props.sources[this.state.idx]} />
      </div>
    );
  }
}