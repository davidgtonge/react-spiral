### React Spiral

This is a React component for displaying spiral charts.
It uses D3.js for some of the calculations, but all rendering is handled via React.

There is a demo here: https://weather-spiral.davetonge.co.uk/

There are two rendering modes: SVG and Canvas.
Because many spiral charts will have large amounts of data points - the canvas
implementation is the default and provides the best performance.

The component has animation by default, however it's performance may not be
adequate when dealing with large datasets.

The API is fairly simple:

```javascript

<Spiral
  data={[[x,y,z]]}
  margin={0} // Margin in pixels
  rotations={52}
  color={(val) => "red"}
  width={600}
  height={600}
  offset={100}
  segment={[15,2]} // Size of each data point in pixels
  opacity={(val) => 0.5},
  extent={[0,360]} // The min and max x values
/>

```
