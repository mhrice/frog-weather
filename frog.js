// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
// Create your ID on openweathermap.org
// Get your api from there and set that in API_WEATHER
// To get CITY_WEATHER means city ID get the longitude and latitute from google maps for your location
// Replace the longitude, latitute and YOUR_API_KEY in the given link http://api.openweathermap.org/data/2.5/weather?lat=Latitude&lon=Longitude&appid=YOUR_API_KEY&units=metric and look for your city ID in the resultant text.
// Set that ID to CITY_WEATHER

//API_KEY
let API_WEATHER = "";


Location.setAccuracyToBest();
let curLocation = await Location.current();
console.log(curLocation.latitude);
console.log(curLocation.longitude);
let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";

const data = await fetchWeatherData(url);
console.log("City Name: " + data.name);
console.log("City ID: " + data.id);

let CITY_WEATHER = data.id
let UNIT_TYPE = "F";//C for Celius and F for fernite

//create Data
var today = new Date();

//Initlize Widget
let widget = new ListWidget();

//Get storage
var fm = FileManager.iCloud();
var base_path = fm.documentsDirectory() + "/weather/";

//color
var textcolor = new Color("#ffffff");

// Fetch Image from Url
async function fetchimageurl(url) {
  const request = new Request(url)
  console.log("URL: " + url)
  var res = await request.loadImage();
  console.log("RES: " + res)
  return res;
}

// Get formatted Date
function getformatteddate() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[today.getMonth()] + " " + today.getDate()
}

// Load image from local drive
async function fetchimagelocal(path, isBackground) {
  var finalPath;
  if (isBackground) {
    finalPath = base_path + path.split("/").pop();
    console.log("finalPath: " + finalPath);
  } else {
    finalPath = base_path + path + ".png";
  }
  if (fm.fileExists(finalPath) == true) {
    console.log("file exists: " + finalPath);
    return finalPath;
  } else {
    //throw new Error("Error file not found: " + path);
    if (fm.fileExists(base_path) == false) {
      console.log("Directry not exist creating one.");
      fm.createDirectory(base_path);
    }
    console.log("Downloading file: " + finalPath);
    await downloadimg(path, isBackground, finalPath);
    if (fm.fileExists(finalPath) == true) {
      console.log("file exists after download: " + finalPath);
      return finalPath;
    } else {
      throw new Error("Error file not found: " + path);
    }
  }
}

async function downloadimg(path, isBackground, finalPath) {
  var imgurl = null;
  if (isBackground) {
    imgurl = path;
  } else {
    const url = "https://github.com/mhrice/frog-weather/raw/main/new-frog.json";
    const data = await fetchWeatherData(url);
    var dataimg = null;
    var name = null;
    if (path.includes("bg")) {
      dataimg = data.background;
      name = path.replace("_bg", "");
    } else {
      dataimg = data.icon;
      name = path.replace("_ico", "");
    }
    switch (name) {
      case "01d":
        imgurl = dataimg._01d;
        break;
      case "01n":
        imgurl = dataimg._01n;
        break;
      case "02d":
        imgurl = dataimg._02d;
        break;
      case "02n":
        imgurl = dataimg._02n;
        break;
      case "03d":
        imgurl = dataimg._03d;
        break;
      case "03n":
        imgurl = dataimg._03n;
        break;
      case "04d":
        imgurl = dataimg._04d;
        break;
      case "04n":
        imgurl = dataimg._04n;
        break;
      case "09d":
        imgurl = dataimg._09d;
        break;
      case "09n":
        imgurl = dataimg._09n;
        break;
      case "10d":
        imgurl = dataimg._10d;
        break;
      case "10n":
        imgurl = dataimg._10n;
        break;
      case "11d":
        imgurl = dataimg._11d;
        break;
      case "11n":
        imgurl = dataimg._11n;
        break;
      case "13d":
        imgurl = dataimg._13d;
        break;
      case "13n":
        imgurl = dataimg._13n;
        break;
      case "50d":
        imgurl = dataimg._50d;
        break;
      case "50n":
        imgurl = dataimg._50n;
        break;
    }
  }
  const image = await fetchimageurl(imgurl);
  console.log("Downloaded Image");
  fm.writeImage(finalPath, image);
}

//get Json weather
async function fetchWeatherData(url) {
  const request = new Request(url);
  const res = await request.loadJSON();
  return res;
}

async function select_random_bg(id, day_or_night) {
  const url = "https://github.com/mhrice/frog-weather/raw/main/new-frog.json";
  const data = await fetchWeatherData(url);
  if (Number(id) >= 800) {
    if (day_or_night == "night") {
      id += "n";
    } else {
      id += "d";
    }
  }
  images = data.background[id];
  const random = Math.floor(Math.random() * images.length);
  return images[random];
}

//start Programming

// Get Location
/*Location.setAccuracyToBest();
let curLocation = await Location.current();
console.log(curLocation.latitude);
console.log(curLocation.longitude);*/
let unit_id = "";
let unit_s = "";
if (UNIT_TYPE == "F") {
  unit_id = "imperial";
  unit_s = "\u2109";
} else {
  unit_id = "metric";
  unit_s = "\u2103";
}
let wetherurl = "http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=" + unit_id;
//"http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";
//"http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=metric"

const weatherJSON = await fetchWeatherData(wetherurl);
console.log(weatherJSON);
const cityName = weatherJSON.name;
const weatherarry = weatherJSON.weather;
const iconData = weatherarry[0].icon;
const weathername = weatherarry[0].main;
const id = weatherarry[0].id;
const curTempObj = weatherJSON.main;
const curTemp = curTempObj.temp;
const highTemp = curTempObj.temp_max;
const lowTemp = curTempObj.temp_min;
const feel_like = curTempObj.feels_like;
//Completed loading weather data
console.log("ID");
console.log(id)
// Widget Background Image
path = await select_random_bg(id, iconData.includes("n") ? "night" : "day");
console.log("Path");
console.log(path);
widget.backgroundImage = Image.fromFile(await fetchimagelocal(path, true));

//Start Spacing
widget.addSpacer(0);

//Widget weather Image
// var img = Image.fromFile(await fetchimagelocal(iconData + "_ico", false));
// var widgetimg = widget.addImage(img);
// widgetimg.imageSize = new Size(74, 74);
// widgetimg.rightAlignImage();

// Widget Date
var dateText = widget.addText(getformatteddate() + ", " + weathername);
dateText.textColor = textcolor;
dateText.font = Font.regularSystemFont(15);

// Widget Weather Temp
var tempText = widget.addText(Math.round(curTemp) + unit_s);
tempText.textColor = textcolor;
tempText.font = Font.boldSystemFont(35);

// Widget feel temp
let feel = "Feels like " + Math.round(feel_like) + unit_s;//"H:"+highTemp+"\u2103"+" L:"+lowTemp+"\u2103"
var hltempText = widget.addText(feel);
hltempText.textColor = textcolor;
hltempText.font = Font.regularSystemFont(15);

// Widget city Name
var citynameText = widget.addText(cityName);
citynameText.textColor = textcolor;
citynameText.font = Font.regularSystemFont(10);


// Bottom Spacer
widget.addSpacer();
//widget.setPadding(5, 15, 0, 15)

Script.setWidget(widget);
console.log("yay")
