/* Geo Location */

var lat;
var lon;

function getLocation() {
  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return false;
  }

  function success(position) {
    lat=position.coords.latitude;
    lat=lat.toFixed(1);
    lon=position.coords.longitude;
    lon = lon.toFixed(1);
    document.getElementById("latitude").value=lat;
    document.getElementById("longitude").value=lon;
  }
  function error() {alert("Unable to retrieve your location use ip info");}
  navigator.geolocation.getCurrentPosition(success, error);
}

function getIpLocation(){
  $.getJSON('http://ipinfo.io', function(data){
    var arr=data.loc.split(",");
    lat=arr[0];
        lon=arr[1];
    document.getElementById("latitude").value=lat;
    document.getElementById("longitude").value=lon;
  });
}

/*search window functions*/

    function showSearch(){
        document.getElementById("searchWindow").style.visibility='visible';
    }
    function hideSearch(){
        document.getElementById("searchWindow").style.visibility='hidden';
    }

/* Search for weather by coords given in inputs */

function getWeather(){
    var lat=document.getElementById("latitude").value;
    var lon=document.getElementById("longitude").value;
    var xmlhttp = new XMLHttpRequest();
    var url = "//api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e155690e9c5a721192a3d32032c12449";
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var out = JSON.parse(xmlhttp.responseText);
            v(out);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    
        function v(x) {
        var temperature=Math.floor(x.main.temp - 273)+"<sup>o</sup>";
        document.getElementById("temperature").innerHTML=temperature;
        document.getElementById("city").innerHTML=x.name;
        document.getElementById("description").innerHTML=x.weather[0]["main"];
        document.getElementById("icon").innerHTML="<img src='http://openweathermap.org/img/w/"+x.weather[0]["icon"]+".png'>";
        }
        hideSearch();
}

    
