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
bot.command("start", "help", (msg, reply) =>
  reply.text(`Greetings 👍,
I can tell you what's the weather like in a city you must previously select.
There are only a few commands avaliable:
To set a new location, do:
/location <city>
To check which is the current location selected, do:
/currentlocation
To get the current weather of that location, do:
/currentweather
To get the Forecast for the current day, do:
/forecast`))

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
