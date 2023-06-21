// map
const bounds = [
  [40.34, -75.5],
  [39.99, -74.75],
];

const map = L.map("map", {
  fullScreenControl: true,
  zoomSnap: 0.5,
  dragging: true,
});

map.fitBounds(bounds);

window.addEventListener("resize", function (event) {
  map.fitBounds(bounds);
});

L.control
  .scale({ metric: false, imperial: true, position: "bottomright" })
  .addTo(map);

L.easyButton(
  '<span class="star" style="padding:0px;">&starf;</span>',
  function (btn, map) {
    map.fitBounds(bounds);
  },
  "Default View"
).addTo(map);

const osm = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors </a>',
  }
).addTo(map);

const layerIndex1 = L.geoJson(geojsonZipcodes, {
  style: styleByIndex1,
  onEachFeature: onEachFeature,
  name: "index1",
}).addTo(map);

const layerIndex1Scaled = L.geoJson(geojsonZipcodes, {
  style: styleByIndex1Scaled,
  onEachFeature: onEachFeature,
  name: "index1 scaled",
});

const layerPopulation = L.geoJson(geojsonZipcodes, {
  style: styleByPopulation,
  onEachFeature: onEachFeature,
  name: "population",
});

const layerBusinesses = L.geoJson(geojsonZipcodes, {
  style: styleByBusinesses,
  onEachFeature: onEachFeature,
  name: "businesses",
});

const layerManufacturing = L.geoJson(geojsonZipcodes, {
  style: styleByManufacturing,
  onEachFeature: onEachFeature,
  name: "manufacturing",
});

const layerConstruction = L.geoJson(geojsonZipcodes, {
  style: styleByConstruction,
  onEachFeature: onEachFeature,
  name: "construction",
});

const layerService = L.geoJson(geojsonZipcodes, {
  style: styleByService,
  onEachFeature: onEachFeature,
  name: "service",
});

const layerTransportation = L.geoJson(geojsonZipcodes, {
  style: styleByTransportation,
  onEachFeature: onEachFeature,
  name: "transportation",
});

const layerRetail = L.geoJson(geojsonZipcodes, {
  style: styleByRetail,
  onEachFeature: onEachFeature,
  name: "retail",
});

const layerWholesale = L.geoJson(geojsonZipcodes, {
  style: styleByWholesale,
  onEachFeature: onEachFeature,
  name: "wholesale",
});

const layerTerritories = L.geoJson(geojsonTerritories, {
  style: styleTerritories,
}).addTo(map);

const baseLayers = {
  Index1: layerIndex1,
  "Index1 Scaled": layerIndex1Scaled,
  Population: layerPopulation,
  Businesses: layerBusinesses,
  Manufacturing: layerManufacturing,
  Construction: layerConstruction,
  Service: layerService,
  Transportation: layerTransportation,
  Retail: layerRetail,
  Wholesale: layerWholesale,
};

const overlays = {
  "Open Street Map": osm,
  Territories: layerTerritories,
};

const layerControl = L.control
  .layers(baseLayers, overlays, { collapsed: false, position: "bottomleft" })
  .addTo(map);

map.on("baselayerchange", function (eventLayer) {
  layerTerritories.bringToFront();
});

let tooltipVisible = true;

function handleCheckboxChange() {
  if (tooltipVisible === true) {
    const elements = document.querySelectorAll(
      ".tooltip-style, .leaflet-tooltip, .tooltip-text"
    );

    elements.forEach((element) => {
      element.classList.remove("tooltip-text");
      element.classList.add("tooltip-text-hidden");
    });
  } else {
    const elements = document.querySelectorAll(
      ".tooltip-style, .leaflet-tooltip, .tooltip-text-hidden"
    );

    elements.forEach((element) => {
      element.classList.remove("tooltip-text-hidden");
      element.classList.add("tooltip-text");
    });
  }

  tooltipVisible = !tooltipVisible;
}

const tooltipCheckbox = document.getElementById("tooltipCheckbox");
tooltipCheckbox.addEventListener("change", handleCheckboxChange);
