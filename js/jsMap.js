

function ShowOnMap(m) {
    var country = document.getElementById("country").value;
    var town = document.getElementById("town").value;
    var road = document.getElementById("road").value;
    var roadNo = document.getElementById("roadNo").value;
    var address = road + "%20" + roadNo + "%20" + town + "%20" + country;

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&accept-language=en&polygon_threshold=0.0",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "35c7a46fa0msh58e3b2c94969f8ap10e233jsnb258f338c287"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        var position = setPosition(response[0].lat, response[0].lon);
        var mar = new OpenLayers.Marker(position);
        m.addMarker(mar);
        mar.events.register('mousedown', mar, function (evt) {
            handler(position, road);
        }
        );
        return response;
    });


}

function VerifyAddress() {
    var country = document.getElementById("country").value;
    var town = document.getElementById("town").value;
    var road = document.getElementById("road").value;
    var roadNo = document.getElementById("roadNo").value;
    var address = road + "%20" + roadNo + "%20" + town + "%20" + country;

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&accept-language=en&polygon_threshold=0.0",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "35c7a46fa0msh58e3b2c94969f8ap10e233jsnb258f338c287"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        
        var cr = 0;
        var error = document.getElementById("verify");
        let position = 0;
        let text = response[0].display_name;
        
        position = text.indexOf("Crete,");
        if (position === -1) {
            cr = 1;
        }

        if (cr === 0) {

            if (response[0].display_name === null) {
                error.textContent = "The address doesn't exist!";
                error.style.color = "red";
            } else {
                error.textContent = "The address exist!";
                error.style.color = "green";
            }
        } else {
            error.textContent = "The address isn't in Crete!";
            error.style.color = "red";
        }

        return response;
    });

}

function GetAddress(m) {

    var error = document.getElementById("verify");
    var position;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        error.innerHTML = "Geolocation is not supported by this browser.";
        error.style.color = "red";
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=" + lat + "&lon=" + lon + "&accept-language=en&polygon_threshold=0.0",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "35c7a46fa0msh58e3b2c94969f8ap10e233jsnb258f338c287"
            }
        };

        $.ajax(settings).done(function (response) {
           
            console.log(response);
            document.getElementById("road").value = response.address.road;
            document.getElementById("town").value = response.address.city;
            document.getElementById("country").value = response.address.country;

            var position = setPosition(response.lat, response.lon);
            var mar = new OpenLayers.Marker(position);
            m.addMarker(mar);
            mar.events.register('mousedown', mar, function (evt) {
                handler(position, "Current location");
            }
            );

        });
    }

}

//Orismos Thesis
function setPosition(lat, lon) {
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    return position;
}

//Orismos Handler
function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup",
        position, null,
        message, null,
        true // <-- true if we want a close (X) button, false otherwise
    );
    map.addPopup(popup);

}








