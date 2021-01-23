const Discord = require('discord.js');
const client = new Discord.Client;
// const config = require('./config.json');

client.on('ready', () => {
	console.log('READY!');
});

client.login(process.env.TOKEN);