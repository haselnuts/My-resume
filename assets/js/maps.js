  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        // the center of the map which is showed when entering the interests page
        center: {
            lat: 61.799405590158244, 
            lng: 16.553489627144454},
    });

    // string for letters that mark each location in the locations array
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // array for all locations you visit
    const locations = [
        {lat: 53.29839538582627, lng: -6.178742033668103},
        {lat: 53.332852132628474, lng: 13.693805375340318},
        {lat: 53.39102792393844, lng: 13.73625909069794}
    ];

    // add some Marker's to the map
    // iterates thru locations array
    // map() method works here as forEach() method and has nothing to do with Google Maps
    const markers = locations.map((location, i) => {
        return new google.maps.Marker({
            position: location,
            // i works as index in the locations array
            // "%" the loop will start again with A when end "Z" is reached, if you have more then 26 locations
            label: labels[i % labels.length]
        });                
    });

    // add a marker clusterer to manage the markers.
    const markerCluster = new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
}
