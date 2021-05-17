// Add point to map
const add_point = ()=> {
  // Hide the input dialog
  document.getElementById('point_dialog').style.display='none';

  // Get parameters of point
  const lon = document.getElementById('pt_lon').value;
  const lat = document.getElementById('pt_lat').value;
  
  console.log(`Add a new point at (${lon}, ${lat})`);
  
  // Add a new point
  
  // Fly to the point
}


// Open a dialog for input parameters for new point
const show_point_dialog = ()=> {
  document.getElementById('point_dialog').style.display='block';
}