// Add point to map
const add_point = () => {
  // Hide the input dialog
  document.getElementById('point_dialog').style.display = 'none';

  // Get parameters of point
  const lon = parseFloat(document.getElementById('pt_lon').value);
  const lat = parseFloat(document.getElementById('pt_lat').value);

  console.log(`Add a new point at (${lon}, ${lat})`);

  // Add a new point

  var entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    ellipse: {
      semiMinorAxis: 1000.0,
      semiMajorAxis: 1000.0,
      material: Cesium.Color.BLUE.withAlpha(0.5)
    }
  });

  // Fly to the point
  viewer.flyTo(viewer.entities);
}


// Open a dialog for input parameters for new point
const show_point_dialog = () => {
  document.getElementById('point_dialog').style.display = 'block';
}


var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  shouldAnimate: true,
  timeline: false,
  animation: false,
  shadow: false,
  infoBox: false,
  selectionIndicator: false,
  geocoder: false,
  homeButton: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  fullscreenButton: false,
});
viewer._cesiumWidget._creditContainer.style.display = 'none';
