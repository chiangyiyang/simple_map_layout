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
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
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

viewer.entities.add({
  id: 'cur_pos',
  label: {
    // position : Cesium.Cartesian2.ZERO, 
    show: true   // Removed semicolon here
  }
});

viewer.scene.canvas.addEventListener('mousemove', function (e) {
  var entity = viewer.entities.getById('cur_pos');
  var ellipsoid = viewer.scene.globe.ellipsoid;
  // Mouse over the globe to see the cartographic position 
  var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(e.clientX, e.clientY), ellipsoid);
  if (cartesian) {
    var cartographic = ellipsoid.cartesianToCartographic(cartesian);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
    entity.position = cartesian;
    entity.label.show = true;
    entity.label.font_style = 84;
    //entity.position= Cesium.Cartesian2.ZERO; 
    entity.label.text = '(' + longitudeString + ', ' + latitudeString + ')';
    var result = entity.label.text;  // We can reuse this
    document.getElementById("mouse_info").innerHTML = result;
  } else {
    entity.label.show = false;
  }
});


viewer.scene.canvas.addEventListener('contextmenu', function (e) {
  var ellipsoid = viewer.scene.globe.ellipsoid;
  var cartesian = viewer.camera.pickEllipsoid(new Cesium.Cartesian3(e.clientX, e.clientY), ellipsoid);
  if (cartesian) {
    var cartographic = ellipsoid.cartesianToCartographic(cartesian);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10);
    console.log('(' + longitudeString + ', ' + latitudeString + ')');
    // Set parameters of point
    document.getElementById('pt_lon').value=longitudeString;
    document.getElementById('pt_lat').value=latitudeString;
    show_point_dialog();
  }
});