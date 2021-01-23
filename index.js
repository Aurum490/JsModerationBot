const Discord = require('discord.js');
const client = new Discord.Client;
const { prefix, word_array, bot_age, bot_info } = require('./config.json');
client.on('ready', () => {
	console.log(prefix);
	console.log(bot_age);
	console.log(bot_info.name);
	console.log(bot_info.version);
	console.log(word_array[0]);
	console.log(word_array[1]);
	console.log(word_array[2]);
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong!');
	} else if (message.content === `${prefix}Hi`) {
		message.channel.send('Hello');
	}
});