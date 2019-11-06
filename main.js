const Botgram = require('botgram');
let request = require('request');
var functions = require('./minfunctions.js');

const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new Botgram(TELEGRAM_BOT_TOKEN);

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}
console.log("Ambientabot arrancado con éxito.")


var city = "Madrid";
let apiKey ='58cc62bd4434bf3238b5327a65df8c0e';

//Event handler for /start or /help
bot.command("start", "help", (msg, reply) =>{

var args = msg.args().split(" ");
if(args[0]===""){
  reply.text(`Greetings 👍,
I can tell you what's the weather like in a city you must previously select.
There are only a few commands available:
To set a new location, do:
/location <city>
To check which is the current location selected, do:
/currentlocation
To get the current weather of that location, do:
/currentweather
To get the Forecast for the current day, do:
/forecast <options>

You can get specific help typing /help <command name>,for example:
/help forecast`)
}
if(args[0]==="forecast"){
  reply.text(`Forecast lets you get a maximum of 3 days forecast.
You can select from how many days you want to get weather information.
To get today's forecast, do:
/forecast
To get tomorrow's forecast, do:
/forecast tomorrow
To get 3 day's forecast, do:
/forecast all`)
}

if(args[0]==="location"){
  reply.text(`Command /location lets you choose the city from which you want to gather weather data.
Just type /location <city name> and you will choose a new city.`)
}

if(args[0]==="currentlocation"){
  reply.text(`Command /currentlocation just returns the name of the current selected city`)
}

if(args[0]==="currentweather"){
  reply.text(`Command /currentweather will give you the current weather information from the city you have already selected.
Just type /currentweather and you will receive the data.`)
}
})




//Event handler for /location
bot.command("location", (msg, reply, next) => {
  console.log("Received a /location command from", msg.from.username);
  city = msg.args(1)
  reply.text("The new selected city is: \n" + city +".\nTyping /currentweather will give you the current weather of " +city +".")
})

//Event handler for /currentlocation
bot.command("currentlocation", (msg, reply, next) => {
  console.log("Received a /currentlocation command from", msg.from.username);
  reply.text("The current location selected is: " + city)
})

//Event handler for /currentweather
bot.command("currentweather", (msg, reply, next) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  console.log("Received a /currentweather command from", msg.from.username);
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      let message = functions.getCurrentWeatherMsg(JSON.parse(body));
      reply.text(message);
    }
  })
});

//Event handler for /forecast
bot.command("forecast", (msg, reply, next) => {
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  console.log("Received a /forecast command from", msg.from.username);
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      var args = msg.args().split(" ");
      var weather = JSON.parse(body)
      reply.text(functions.getForecastMsg(weather));
    }
  })
});

//Event handler for any message received that is not supported by other handlers
function onMessage(msg, reply) {
  let message = `${msg.text} is not a supported function.\nTry /help`;
  reply.text(message);
}
bot.text(onMessage);
