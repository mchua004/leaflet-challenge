// Create a map object
var map = L.map("mapid", {
    center: [40, -100],
    zoom: 5
  });

  // the base map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 10,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(map);

function Markers(response){
	console.log(response)
	for (var i=0; i< response.features.length; i++){
			//retrieve the coordinates for each marker
			coords = [response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]]
			// retrieving the depth of the earthquake - it will determine the color of the circle
			var depth = response.features[i].geometry.coordinates[2];
			
			//inset data in the popup
			var date = new Date(response.features[i].properties.time*1000)
			var pl = response.features[i].properties.place
			var mag = response.features[i].properties.mag

        // Create the circles for each earthquake report and add to the baseMap layer.
        L.dots(coords, {
            opacity: .7,
            fillOpacity: 0.80,
            weight: .7,
            color: 'red',
            fillColor: colorDepth(depth),
            radius: 7000 * response.features[i].properties.mag
    }).bindPopup(`<p align = "left"> <strong>Date:</strong> ${date} <br>
     <strong>Location:</strong> ${pl} <br> <strong>Magnitude:</strong> ${mag} </p>`).addTo(map)
	};
};
