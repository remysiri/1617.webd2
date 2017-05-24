var map;

google.maps.event.addDomListener(window, 'load', initMaps);

function initMaps() {

	var divMap = document.getElementById('map');
	var mapOptions = {
		zoom : 12,
		center: new google.maps.LatLng(51.08,3.66)
	};

	map = new google.maps.Map(divMap, mapOptions);
}



function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('https://api.myjson.com/bins/yka8t', function(data){
    // do something with your data
    var mapOptions = {
		zoom : 12,
		center: new google.maps.LatLng(50.788306, 3.137029),
		styles: data
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
});


var fldSelect = document.getElementById('styles');
fldSelect.addEventListener('change', changeStyle);

function changeStyle(event) {
	var jsonPath = event.target.value
	var jsonPath = fldSelect.value

	fetchJSONFile(jsonPath, function(data) {
		map.setOptions({
			styles: data
		});
	});
}


var fldSelect = document.getElementById('styles');
var fldLatitude = document.getElementById('latitude');
var fldLongitude = document.getElementById('longitude');
var btnAddMarker = document.getElementById('addMarker');

fldSelect.addEventListener('change', changeStyle);
btnAddMarker.addEventListener('click', addMarker);

function addMarker(event) {
	var latitude = fldLatitude.value;
	var longitude = fldLongitude.value;

	var latLng = new google.maps.LatLng(latitude, longitude);
	var marker = new google.maps.Marker({
		position: latLng,
		map: map
	});

	map.setOptions({
		center: latLng
	})

	fldLatitude.value = ''; fldLongitude.value = '';
}














