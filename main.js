const Botgram = require('botgram');
const figlet = require('figlet');

const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('Seems like you forgot to pass Telegram Bot Token. I can not proceed...');
  process.exit(1);
}
console.log("Ambientabot arrancado con éxito.")

const bot = new Botgram(TELEGRAM_BOT_TOKEN);
var cities = [];
function citiesStoring(msg, reply){
cities.push(msg.text);
reply.text("Datos de la localización " + msg.text+ " guardados.")
reply.text("Los datos guardados son: " + cities)

}

bot.command("newlocation", function (msg, reply, next) {
  console.log("Received a /tiempo command from", msg.from.username);
  reply.text("¿De qué pueblo o ciudad quiere guardar los datos?")
  bot.text(citiesStoring);
});
