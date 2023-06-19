// for territory outline
const styleTerritories = () => {
  return {
    color: "#000000",
    opacity: 1,
    weight: 4,
  };
};

const styleByIndex1 = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByIndex1(feature.properties["index1"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByIndex1 = (x) => {
  return x > 600
    ? "#e93e3a"
    : x > 400
    ? "#ed683c"
    : x > 200
    ? "#f3903f"
    : x > 100
    ? "#fdc70c"
    : "#fff33b";
};

const styleByIndex1Scaled = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByIndex1Scaled(feature.properties["index1 scaled"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByIndex1Scaled = (x) => {
  return x > 7
    ? "#e93e3a"
    : x > 5
    ? "#ed683c"
    : x > 3
    ? "#f3903f"
    : x > 1
    ? "#fdc70c"
    : "#fff33b";
};

const styleByPopulation = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByPopulation(feature.properties["population"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByPopulation = (x) => {
  return x > 40000
    ? "#e93e3a"
    : x > 30000
    ? "#ed683c"
    : x > 20000
    ? "#f3903f"
    : x > 10000
    ? "#fdc70c"
    : "#fff33b";
};

const styleByBusinesses = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByBusinesses(feature.properties["businesses"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByBusinesses = (x) => {
  return x > 2000
    ? "#e93e3a"
    : x > 1500
    ? "#ed683c"
    : x > 1000
    ? "#f3903f"
    : x > 500
    ? "#fdc70c"
    : "#fff33b";
};

const styleByManufacturing = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByManufacturing(feature.properties["manufacturing"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByManufacturing = (x) => {
  return x > 100
    ? "#e93e3a"
    : x > 75
    ? "#ed683c"
    : x > 50
    ? "#f3903f"
    : x > 25
    ? "#fdc70c"
    : "#fff33b";
};

const styleByConstruction = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByConstruction(feature.properties["construction"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByConstruction = (x) => {
  return x > 100
    ? "#e93e3a"
    : x > 75
    ? "#ed683c"
    : x > 50
    ? "#f3903f"
    : x > 25
    ? "#fdc70c"
    : "#fff33b";
};

const styleByService = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByService(feature.properties["service"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByService = (x) => {
  return x > 800
    ? "#e93e3a"
    : x > 600
    ? "#ed683c"
    : x > 400
    ? "#f3903f"
    : x > 200
    ? "#fdc70c"
    : "#fff33b";
};

const styleByTransportation = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByTransportation(
      feature.properties["transportation"]
    ),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByTransportation = (x) => {
  return x > 120
    ? "#e93e3a"
    : x > 90
    ? "#ed683c"
    : x > 60
    ? "#f3903f"
    : x > 30
    ? "#fdc70c"
    : "#fff33b";
};

const styleByRetail = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByRetail(feature.properties["retail"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByRetail = (x) => {
  return x > 800
    ? "#e93e3a"
    : x > 600
    ? "#ed683c"
    : x > 400
    ? "#f3903f"
    : x > 200
    ? "#fdc70c"
    : "#fff33b";
};

const styleByWholesale = (feature) => {
  return {
    color: "#000000",
    fillColor: "#ff0000",
    fillColor: chooseColorByWholesale(feature.properties["wholesale"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 1,
  };
};

const chooseColorByWholesale = (x) => {
  return x > 250
    ? "#e93e3a"
    : x > 200
    ? "#ed683c"
    : x > 100
    ? "#f3903f"
    : x > 50
    ? "#fdc70c"
    : "#fff33b";
};
