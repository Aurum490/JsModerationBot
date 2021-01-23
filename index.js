const Discord = require('discord.js');
const client = new Discord.Client;
const {
	prefix,
	word_array,
	bot_age,
	bot_info,
} = require('./config.json');
client.once('ready', () => {
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
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split('/ +/');
	const command = args.shift().toLowerCase();

	if (command === 'args') {
		if (!args.length) {
			return message.channel.send(`You have not input any arguments, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
});

//	if (!message.content.startsWith(prefix) || message.author.bot) return;
//	if (message.content === `${prefix}ping`) {
//		message.channel.send('Pong!');
//	} else if (message.content === `${prefix}Hi`) {
//		message.channel.send('Hello');
//	} else if (message.content === `${prefix}name`) {
//		message.channel.send(message.guild.name);
//	} else if (message.content === `${prefix}members`) {
//		message.channel.send(`Total Members: ${message.guild.memberCount}`);
//	} else if (message.content === `${prefix}me`) {
//		message.channel.send(`Username: ${message.author.username}`);
//		message.channel.send(`ID: ${message.author.id}`);
//	}
// });