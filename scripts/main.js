// locations
let arrayIds = [];
let arrayZipcodes = [];
let arrayZipcodeNames = [];
let arrayTerritories = [];

// values
let arrayIndex1 = [];
let arrayIndex1Rel = [];
let arrayPopulation = [];
let arrayBusinesses = [];
let arrayManufacturing = [];
let arrayConstruction = [];
let arrayServices = [];
let arrayTransportation = [];
let arrayRetail = [];
let arrayWholesale = [];

for (let i = 0; i < geojsonZipcodes["features"].length; i++) {
  arrayIds.push(geojsonZipcodes["features"][i]["properties"]["id"]);
  arrayZipcodes.push(geojsonZipcodes["features"][i]["properties"]["zip_code"]);
  arrayZipcodeNames.push(
    geojsonZipcodes["features"][i]["properties"]["zip_code_n"]
  );
  arrayTerritories.push(
    geojsonZipcodes["features"][i]["properties"]["territory"]
  );
  // arrayIndex1.push(geojsonZipcodes["features"][i]["properties"]["index1"]);
  // arrayIndex1Rel.push(
  //   geojsonZipcodes["features"][i]["properties"]["index1_rel"]
  // );
  // arrayPopulation.push(
  //   geojsonZipcodes["features"][i]["properties"]["population"]
  // );
  // arrayBusinesses.push(
  //   geojsonZipcodes["features"][i]["properties"]["businesses"]
  // );
  // arrayManufacturing.push(
  //   geojsonZipcodes["features"][i]["properties"]["manufactur"]
  // );
  // arrayConstruction.push(
  //   geojsonZipcodes["features"][i]["properties"]["constructi"]
  // );
  // arrayServices.push(geojsonZipcodes["features"][i]["properties"]["service"]);
  // arrayTransportation.push(
  //   geojsonZipcodes["features"][i]["properties"]["transporta"]
  // );
  // arrayRetail.push(geojsonZipcodes["features"][i]["properties"]["retail"]);
  // arrayWholesale.push(
  //   geojsonZipcodes["features"][i]["properties"]["wholesale"]
  // );
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
console.log(maxSize);

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

// ---------------LEAFLET MAP ---------------
// function to decide fit the map content when the window is resized
// the zoom level is changed depending on the size of the map <div>
function mapZoom(x) {
  let zoomLevel = 9.5;

  // if (x < 500) {
  //   zoomLevel = 10;
  // } else if (x < 750) {
  //   zoomLevel = 10.3;
  // } else if (x < 1200) {
  //   zoomLevel = 10.5;
  // } else if (x < 1500) {
  //   zoomLevel = 10.7;
  // } else {
  //   zoomLevel = 8;
  // }

  return zoomLevel;
}

// determine the map size that dictates the zoom level
let widthMap = document.getElementById("map").clientWidth;
let heightMap = document.getElementById("map").clientHeight;
let sizeMap = Math.min(widthMap, heightMap);

// decide which map zoom to use when map is initiated
let startZoom = mapZoom(sizeMap);

// initiate the map
let map = L.map("map", {
  fullScreenControl: true,
  zoomSnap: 0.5,
  dragging: true,
  maxBounds: [
    [40.3501, -75.5312],
    [39.9641, -74.7121],
  ],
}).setView([40.14245, -75.17198], startZoom);

map.fitBounds([
  [40.3501, -75.5312],
  [39.9641, -74.7121],
]);

const osm = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors </a>',
  }
).addTo(map);

L.control
  .scale({ metric: false, imperial: true, position: "bottomright" })
  .addTo(map);

let defaultView = { lat: 40.14245, lng: -75.17198, zoom: 8 };
L.easyButton(
  '<span class="star" style="padding:0px;">&starf;</span>',
  function (btn, map) {
    map.setView([defaultView.lat, defaultView.lng], defaultView.zoom);
  },
  "Default View"
).addTo(map);

const popupStyle = {
  closeButton: true,
};

function colorArea(a) {
  return a === "KOP"
    ? "#c3ecb2"
    : a === "PM"
    ? "#aadaff"
    : a === "NE Philly"
    ? "#eb9dad"
    : "#ffffff";
}

// color zipcodes by area
function styleTerritories(feature) {
  return {
    color: "#000000",
    fillColor: colorArea(feature.properties["territory"]),
    fillOpacity: 0.8,
    opacity: 1,
    weight: 0.5,
    // className: createClassName(feature.properties.ZCTA5CE20),
  };
}

const layerTerritories = L.geoJson(geojsonZipcodes, {
  style: styleTerritories,
  onEachFeature: onEachFeature,
}).addTo(map);

const allProperties = geojsonZipcodes?.features[0]?.properties;
const relevantProperties = Object.keys(allProperties).filter(
  (item) =>
    ["ZCTA5CE20", "id", "zip_code", "zip_code_n", "territory"].includes(
      item
    ) === false
);

const baseLayers = {};
baseLayers["Territories"] = layerTerritories;

relevantProperties.forEach((prop, index) => {
  const layerCitiesPartner = L.geoJson(geojsonZipcodes, {
    // style: styleFunction,
    onEachFeature: onEachFeature,
  });

  baseLayers[prop] = layerCitiesPartner;
});

function createClassName(a) {
  return "zip" + a;
}

function highlightFeatureSimple(e) {
  var layer = e.target;

  layer.setStyle({
    color: "#000000",
    fillColor: "#c59d34",
    fillOpacity: 1,
    opacity: 1,
    weight: 1,
  });

  tableRow = document.getElementById(e.target.feature.properties.ZCTA5CE20);
  tableRow.className = "highlighted-row";
}

function highlightFeatureStore(e) {
  var layer = e.target;

  layer.setStyle({
    color: "#000000",
    fillColor: "#8f8f8f",
    fillOpacity: 1,
    opacity: 1,
    weight: 1,
  });

  tableRow = document.getElementById(e.target.feature.properties.ZCTA5CE20);
  tableRow.className = "highlighted-row";
}

function resetHighlightStores(e) {
  layerStores.resetStyle(e.target);
  tableRow.className = "";
}

function resetHighlight(e) {
  layerSimple.resetStyle(e.target);
  tableRow.className = "";
}

function onEachFeature(feature, layer) {
  let popupContent =
    '<p class="popup-title">Zip Code: ' +
    feature.properties.ZCTA5CE20 +
    "</p>" +
    '<p class="popup-text">Zip Code Name: ' +
    feature.properties.zip_code_n +
    "</p>" +
    '<p class="popup-text">Territory: ' +
    feature.properties.territory +
    "</p>" +
    '<p class="popup-text">Index 1: ' +
    feature.properties["Index1"] +
    "</p>" +
    '<p class="popup-text">Index 1 Scaled: ' +
    feature.properties["Index1 Scaled"] +
    "</p>" +
    '<p class="popup-text">Population: ' +
    feature.properties["Population"] +
    "</p>" +
    '<p class="popup-text">Businesses: ' +
    feature.properties["Businesses"] +
    "</p>" +
    '<p class="popup-text">Manufacturing: ' +
    feature.properties["Manufacturing"] +
    "</p>" +
    '<p class="popup-text">Construction: ' +
    feature.properties["Construction"] +
    "</p>" +
    '<p class="popup-text">Service: ' +
    feature.properties["Service"] +
    "</p>" +
    '<p class="popup-text">Transportation: ' +
    feature.properties["Transportation"] +
    "</p>" +
    '<p class="popup-text">Retail: ' +
    feature.properties["Retail"] +
    "</p>" +
    '<p class="popup-text">Wholesale: ' +
    feature.properties["Wholesale"] +
    "</p>";

  layer.bindPopup(popupContent, popupStyle);
  // layer.on({
  //   mouseover: highlightFeatureStore,
  //   mouseout: resetHighlightStores,
  // });
}

const overlays = {
  "Open Street Map": osm,
};

L.control
  .layers(baseLayers, overlays, { collapsed: false, position: "bottomleft" })
  .addTo(map);

window.addEventListener("resize", function (event) {
  map.fitBounds([
    [28.8, -82.9],
    [27.1, -81.6],
  ]);
});

let zipcodeId; // zipcode id retrieved from table
let pathClasses = [];
let highlZipcode;

for (let i = 1; i < arrayZipcodes.length; i++) {
  let pathClass = "zip" + i;
  pathClasses.push(pathClass);
}

for (let i = 1; i < allTableRows.length; i++) {
  allTableRows[i].addEventListener("mouseover", function () {
    highlZipcode = document.getElementsByClassName(
      `zip${allTableRows[i].id}`
    )[0];
    highlZipcode.style.fillOpacity = 1;
  });

  allTableRows[i].addEventListener("mouseout", function () {
    highlZipcode.style.fillOpacity = 0.5;
  });
}
