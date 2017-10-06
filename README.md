# daily-info-panel
A simple dashboard UI for UCF students

## Features

* Weather info including current temperatures, humidity, and UV index
* A traffic map of the area near campus
* A nice weather cam near the beach
* An inset listing of the available spaces in on-campus parking garages
* Time and Date
* Sunrise/Sunset times

## Usage

To use the dashboard all you need is a computer with a modern web browser and two API keys. 

The application consists of two components, an .html file and a .js file. They should be located in the same directory to work together. To run, simply open the .html file with a compatible web browser.

For the application to get the required data it needs a Google Maps API key and a Weather Underground API key. These can both be acquired for free but I cannot provide them because the versions that can be gotten for free have usage limits that would limit subsequent users.

### API Keys

A Weather Underground key can be acquired for free [here](https://www.wunderground.com/weather/api/).

A Google Maps key can be acquired for free [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

The Weather Underground key can be entered as a variable in the getWeatherData() function of the .js file.
The Google Maps key can be entered as variable in the \<script> tags of the map div.

For convenience I have included commented out variable declarations. Simply remove the // and add the keys inside the quotes. In the future I hope to have these stored in a config file.
