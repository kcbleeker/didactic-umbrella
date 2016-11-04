var TelegramBot = require('node-telegram-bot-api');
var sickbeard = require('sickbeard');
var fs = require("fs");
var contents = fs.readFileSync("config.json");
var config = JSON.parse(contents);

// Setup telegram polling
var bot = new TelegramBot(config["Telegram_token"], { polling: true });

//incoming telegram /echo
bot.onText(/\/echo (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

//incoming telegram /echo
bot.onText(/\/start/i, function (msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

//incoming telegram /search
bot.onText(/^\/addvalue[\s]+(.+\s*)+/ig, function (msg, match) {
	var fromId = msg.chat.id || msg.from.id;
	var params = match[1].split(/\s*/, 2);
	console.log("received message: ", params);
	bot.sendMessage(fromId, "No results.", msgoptions);
});