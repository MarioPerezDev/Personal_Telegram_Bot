
function getIcon(iconCode){
  switch (iconCode) {
    case "01d":
      return"☀"
      break;
    case "02d":
      return"🌤"
      break;
    case "03d":
      return"🌥"
      break;
    case "04d":
      return"☁️"
      break;
    case "09d":
      return"🌦"
      break;
    case "10d":
      return"🌧"
      break;
    case "11d":
      return"⛈"
      break;
    case "13d":
      return ""
      break;
    case "50d":
      return""
      break;

    case "01n":
      return"🌕"
      break;
    case "02n":
      return"🌤"
      break;
    case "03n":
      return"🌥"
      break;
    case "04n":
      return"☁"
      break;
    case "09n":
      return"🌦"
      break;
    case "10n":
      return"🌧"
      break;
    case "11n":
      return"⛈"
      break;
    case "13n":
      return"🌨"
      break;
    case "50n":
      return"🌫"
      break;
    default:
      console.log("No existe")
      break;
  }
}

exports.getForecastMsg = function(weather){
let mensaje="";
for (i = 0; i < getRemainingCounts(); i++) {
let item = weather.list[i];
mensaje = mensaje.concat(`Data for ${getTime(item.dt)}:
${item.main.temp}º
`)
}
return mensaje;
}

exports.getCurrentTime = function(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time
}

function getRemainingCounts(){
  var today = new Date();
  var remainingCounts = Math.floor((24 - today.getHours())/3)
  return remainingCounts
}


function getTime(dt){
var date = new Date(dt*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime;
}

exports.getCurrentWeatherMsg = function(weather){
  var icon = getIcon(weather.weather[0].icon);
  var clouds = weather.clouds.all;
  if(weather.main){
  let message =
`${weather.name} weather:
op
${weather.weather[0].main}(${weather.weather[0].description}${icon}).
☁️${clouds}%
🌡${weather.main.temp}º
[${weather.main.temp_min}º - ${weather.main.temp_max}º]`;
  return message;
}else{
  let message = "Sorry, there has been an error, have you typed your city correctly?"
  return message;
}
}
