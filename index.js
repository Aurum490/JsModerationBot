const Discord = require('discord.js');
const client = new Discord.Client;

client.on('ready', () => {
	console.log('READY!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong!');
	} else if (message.content == 'Hi') {
		message.channel.send('Hello');
	}
});