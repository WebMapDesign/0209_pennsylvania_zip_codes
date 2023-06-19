// table
let arrayIds = [];
let arrayZipcodes = [];
let arrayZipcodeNames = [];
let arrayTerritories = [];

for (let i = 0; i < geojsonZipcodes["features"].length; i++) {
  arrayIds.push(geojsonZipcodes["features"][i]["properties"]["id"]);
  arrayZipcodes.push(geojsonZipcodes["features"][i]["properties"]["zip_code"]);
  arrayZipcodeNames.push(
    geojsonZipcodes["features"][i]["properties"]["zip_code_n"]
  );
  arrayTerritories.push(
    geojsonZipcodes["features"][i]["properties"]["territory"]
  );
}

let divNewTable = document.getElementById("table-data");
document.getElementById("table-data").style.height = "auto";
const tableHeaders = ["Zip Codes", "Zip Code Names", "Territories"];

let tableZipcodes = document.createElement("table");
tableZipcodes.id = "table-zipcodes";
let tr = tableZipcodes.insertRow(-1);

for (let i = 0; i < tableHeaders.length; i++) {
  let th = document.createElement("th");
  tr.appendChild(th);
  th.outerHTML = "<th>" + tableHeaders[i] + "</th>";
}

let maxSize = Math.max(
  arrayZipcodes.length,
  arrayZipcodeNames.length,
  arrayTerritories.length
);

for (let i = 0; i < maxSize; i++) {
  tr = tableZipcodes.insertRow(-1);
  tr.id = arrayZipcodes[i];
  let cell1 = tr.insertCell(-1);
  cell1.innerHTML = arrayZipcodes[i];
  let cell2 = tr.insertCell(-1);
  cell2.innerHTML = arrayZipcodeNames[i];
  let cell3 = tr.insertCell(-1);
  cell3.innerHTML = arrayTerritories[i];
}

divNewTable.innerHTML = "";
divNewTable.appendChild(tableZipcodes);

let selectedTable = document.getElementById("table-zipcodes");
let tableBody = selectedTable.getElementsByTagName("tbody")[0];
let allTableRows = tableBody.getElementsByTagName("tr");

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
}).addTo(map);

const layerIndex1Scaled = L.geoJson(geojsonZipcodes, {
  style: styleByIndex1Scaled,
  onEachFeature: onEachFeature,
});

const layerPopulation = L.geoJson(geojsonZipcodes, {
  style: styleByPopulation,
  onEachFeature: onEachFeature,
});

const layerBusinesses = L.geoJson(geojsonZipcodes, {
  style: styleByBusinesses,
  onEachFeature: onEachFeature,
});

const layerManufacturing = L.geoJson(geojsonZipcodes, {
  style: styleByManufacturing,
  onEachFeature: onEachFeature,
});

const layerConstruction = L.geoJson(geojsonZipcodes, {
  style: styleByConstruction,
  onEachFeature: onEachFeature,
});

const layerService = L.geoJson(geojsonZipcodes, {
  style: styleByService,
  onEachFeature: onEachFeature,
});

const layerTransportation = L.geoJson(geojsonZipcodes, {
  style: styleByTransportation,
  onEachFeature: onEachFeature,
});

const layerRetail = L.geoJson(geojsonZipcodes, {
  style: styleByRetail,
  onEachFeature: onEachFeature,
});

const layerWholesale = L.geoJson(geojsonZipcodes, {
  style: styleByWholesale,
  onEachFeature: onEachFeature,
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
