//Start all panel functions once page is ready
$(document).ready( function(){
    startTime(); 
    setDate();
    setSunriseSunset();
    updateWeather();
    //getParkingData();
    $("#parking-data").attr("src", "https://secure.parking.ucf.edu/GarageCount");
    //initMap();
    //refreshParkingData();
    
});

//Begin keeping and displaying time
//Basis for clock function taken from:
//http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime() {
    var today = new Date();
    var hour = today.getHours();
    var AMPM = "AM";
    if(hour > 11){
        AMPM = "PM";
    }
    hour = hour%12;
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    minutes = formatTime(minutes);
    seconds = formatTime(seconds);
    document.getElementById('clock').innerHTML =
    hour + ":" + minutes + " " + AMPM;// + ":" + seconds; removed seconds
    var t = setTimeout(startTime, 500);	//restart function every 500 ms

}

    //Helper function for timer, adds zeros for familiar formatting
    function formatTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

function updateWeather() {
    
    var connectionString = 'http://api.openweathermap.org/data/2.5/weather?id='+cityId+'&units=imperial&appid='+apiKey

    // var lat = ;
    // var lon = ;

    var UVconnectionString = 'http://api.openweathermap.org/data/2.5/uvi?lat='+lat+'&lon='+lon+'&appid='+apiKey

    $.ajax({
        method: 'GET',
        url: connectionString,
        dataType: 'jsonp',
        success: (res) => {
            console.log(res)
            var actualTemp = res.main.temp;
            // var feelTemp = parsedWeatherData.current_observation.feelslike_string;
            var weatherIcon = weatherIcons[res.weather[0].icon];
            var humidity = res.main.humidity;
            // var UV = parsedWeatherData.current_observation.UV;
            var weatherstring = res.weather[0].description
                .toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                //https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city

            $("#temp-real").html(parseInt(actualTemp)+"° F");
            // $("#temp-feel").html(feelTemp);
            $("#weather-icon").html("<i class='"+weatherIcon+"'></i>");
            $("#humidity").html(humidity+"%");  //update humidity 		
            // $("#UV").html(UV);              //update UV 			
            // //update chance of rain $("#chance-of-rain").html();
            $("#weather-string").html(weatherstring);
        } 
    });

    $.ajax({
        method: 'GET',
        url: UVconnectionString,
        dataType: 'json',
        success: (res) => {
            console.log(res)
            var UV = res.value;
            $("#UV").html(UV);              //update UV 	
        } 
    });

    setTimeout(updateWeather, 360000);	//fetch weather every 6 min
    
    //Helper function for updateWeather(), Gets weather data via json request and returns it as a JSON string
    function getWeatherData(){
        /* 
        
            No longer needed but leaving in as a memorial to a time when I relied on synchronous requests and for the Weather Underground API, which I used in the first version of this but was retired in Dec 2018. RIP
        
        */
        //var apiKey = "";
        //var connectionString = "https://api.wunderground.com/api/129fd8588ff952ea/conditions/q/FL/Oviedo.json";
        //var weatherData = httpGet(connectionString);
            
        //var Httpreq = new XMLHttpRequest();
        //Httpreq.open("GET", connectionString, false);
        //Httpreq.send(null);

        //return Httpreq.responseText;  
    }
    
}

//Displays the date in a familiar, legible format.
function setDate(){
                    
    var today = new Date();
    var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var weekDay = weekDays[today.getDay()];
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November","December"];
    var month = monthNames[today.getMonth()];
    var day = today.getDate();
    var year = today.getFullYear();
    
    var dateString = weekDay+" "+month+" "+day+", "+year;
    $('#date').html(dateString);
    var t = setTimeout(setDate, 1000);	//Restart function every 1000 ms (1 second)
}

function setSunriseSunset(){
    sunriseSunsetData = JSON.parse(getSunriseSunset());
    var sunrise = convertUTCtoLocal("01/01/1999 "+sunriseSunsetData.results.sunrise+" UTC");
    var sunset = convertUTCtoLocal("01/01/1999 "+sunriseSunsetData.results.sunset+" UTC");

    $("#sunrise").html(sunrise);
    $("#sunset").html(sunset);
    
    var t = setTimeout(startTime, 500000);	//restart function 
    
    function getSunriseSunset(){

        var connectionString = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon;
        
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", connectionString, false);
        Httpreq.send(null);
        
        return Httpreq.responseText;
    }
}

function convertUTCtoLocal(time){	//Big ups to digitalbath! http://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time-using-javascript
    var localTimeFull = new Date(time);

    var hour = localTimeFull.getHours();
    var AMPM = "AM";
    if(hour > 11){
        AMPM = "PM";
    }
    hour = hour%12;
    var minutes = localTimeFull.getMinutes();
    minutes = formatTime(minutes);
    
    var localTime = hour + ":" + minutes + " " + AMPM;
    
    return localTime;  
}


