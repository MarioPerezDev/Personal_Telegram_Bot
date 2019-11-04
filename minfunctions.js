
exports.getIcon = function(iconCode){
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
