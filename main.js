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

bot.command("start", "help", (msg, reply) =>
  reply.text(`Greetings 👍,
I can tell you what's the weather like in a city you must previously select.
There are only a few commands avaliable:
To set a new location, do:
/location <city>
To check which is the current location selected, do:
/currentlocation
To get the weather of that location, do:
/weather`))

bot.command("location", (msg, reply, next) => {
  console.log("Received a /location command from", msg.from.username);
  city = msg.args(1)
  reply.text("The new selected city is: \n" + city +".\nTyping /weather will give you the current weather of " +city +".")
})

bot.command("currentlocation", (msg, reply, next) => {
  console.log("Received a /currentlocation command from", msg.from.username);
  reply.text("The current location selected is: " + city)
})

bot.command("weather", (msg, reply, next) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  console.log("Received a /weather command from", msg.from.username);
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      let message = getWeatherMsg(JSON.parse(body));
      reply.text(message);
    }
  })
});

function getWeatherMsg(weather){
  var icon = functions.getIcon(weather.weather[0].icon);
  var clouds = weather.clouds.all;
  if(weather.main){
  let message =
`${weather.name} weather:

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

function onMessage(msg, reply) {
  let message = `${msg.text} is not a supported function.\nTry /help`;
  reply.text(message);
}
bot.text(onMessage);
