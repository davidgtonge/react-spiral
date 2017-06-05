import { configure } from "@kadira/storybook";

function loadStories() {
  require("../stories/index.js");
  require("../stories/weather.js");
  // You can require as many stories as you need.
}

configure(loadStories, module);
