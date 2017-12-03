
function myMap() {
    var $map = document.getElementById('order-map');
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    return new google.maps.Map($map, mapOptions);
}

module.exports = {
    initMap: myMap,
};

