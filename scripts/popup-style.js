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
    feature.properties["index1"] +
    "</p>" +
    '<p class="popup-text">Index 1 Scaled: ' +
    feature.properties["index1 scaled"] +
    "</p>" +
    '<p class="popup-text">Population: ' +
    feature.properties["population"] +
    "</p>" +
    '<p class="popup-text">Businesses: ' +
    feature.properties["businesses"] +
    "</p>" +
    '<p class="popup-text">Manufacturing: ' +
    feature.properties["manufacturing"] +
    "</p>" +
    '<p class="popup-text">Construction: ' +
    feature.properties["construction"] +
    "</p>" +
    '<p class="popup-text">Service: ' +
    feature.properties["service"] +
    "</p>" +
    '<p class="popup-text">Transportation: ' +
    feature.properties["transportation"] +
    "</p>" +
    '<p class="popup-text">Retail: ' +
    feature.properties["retail"] +
    "</p>" +
    '<p class="popup-text">Wholesale: ' +
    feature.properties["wholesale"] +
    "</p>";

  layer.bindPopup(popupContent, { closeButton: true });

  // const layerName = layer
  // const value = feature.properties["wholesale"]

  const layerName = layer.options.name; // Assuming you have set a unique name for each layer
  console.log("layerName: ", layerName);

  const value = feature.properties[layerName];
  const tooltipContent = '<p class="tooltip-text">' + value + "</p>";

  layer.bindTooltip(tooltipContent, {
    permanent: true,
    direction: "center",
  });
}
