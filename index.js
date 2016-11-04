var TelegramBot = require('node-telegram-bot-api');
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));

// Setup telegram polling
var bot = new TelegramBot(config["Telegram_token"], { polling: true });

//incoming telegram /echo
bot.onText(/\/echo (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

//incoming telegram /start
bot.onText(/\/start/i, function (msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

//incoming telegram /addvalue
bot.onText(/^\/addvalue[\s]+(.+\s*)+/ig, function (msg, match) {
	var fromId = msg.chat.id || msg.from.id;
	var params = match[1].split(" ", 2);	
	console.log("received message: ", params);
	
	var userid = params[0].toLowerCase();
	var addvalue = parseInt(params[1]);
	
	var msgoptions = {
		disable_web_page_preview:true,
		reply_to_message: msg.message_id
	};
	
	var db = JSON.parse(fs.readFileSync("accounts.json"));
	
	if(db[userid]){
		db.userid += addvalue;
	}
	else {
		db.userid = addvalue;
	}
	var newvalue = db.userid
	
	fs.writeFileSync(JSON.stringify(db));
	
	bot.sendMessage(fromId, params[0] + " total now at " + newvalue.toString(), msgoptions);
});

//incoming telegram /addvalue
bot.onText(/^\/showvalue[\s]+(.+\s*)+/ig, function (msg, match) {
	var fromId = msg.chat.id || msg.from.id;
	var params = match[1].split(" ", 1);	
	console.log("received message: ", params);
	
	var userid = params[0].toLowerCase();
	
	var msgoptions = {
		disable_web_page_preview:true,
		reply_to_message: msg.message_id
	};
	
	var db = JSON.parse(fs.readFileSync("accounts.json"));
	
	if(db[userid]){
		bot.sendMessage(fromId, params[0] + " total now at " + db.userid.toString(), msgoptions);
	}
	else {		
		bot.sendMessage(fromId, params[0] + " not present in DB", msgoptions);
	}
	
});