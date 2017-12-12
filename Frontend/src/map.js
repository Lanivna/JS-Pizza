// https://developers.google.com/maps/documentation/javascript/examples/distance-matrix
var $input = $('#input-addr');
var geocoder = new google.maps.Geocoder;
var map = null;
var $map = document.getElementById('order-map');
// var mapNode = document.getElement

function setAddressCenter(map, address){
    // var _val = $input.val();
    // console.log(_val);
    //
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: resultsMap,
            //     position: results[0].geometry.location
            // });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initMap() {
    var _center = {lng: 30.523011, lat: 50.465890};
    var mapOptions = {
        center: _center,
        zoom: 16,
//            mapTypeId: google.maps.MapTypeId.HYBRID
    };
    // var map =
    // window.$MAP =
    map =
    new google.maps.Map($map, mapOptions);

//        var _markerPos = {lat: 44.5, lng: 48.5};
    var _markerPos = _center;
    var marker = new google.maps.Marker({
        position: _markerPos,
        map: map,
        title: 'LanaPizza',
        icon: "/assets/images/map-icon.png",
    });

    $input.on('change', function(){
        setAddressCenter(map, $input.val());
    });

    return map;
}

module.exports = {
    initMap: initMap,
};

