const Discord = require('discord.js');
const bot = new Discord.Client;
const {
	prefix,
} = require('./config.json');
bot.once('ready', () => {
	console.log(prefix);
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle(`${bot.user.username}'s commands`)
			.setDescription(`**Prefix:** ${prefix}`)
			.addField('`ping`', 'Check your bot\'s ping')
			.addField('`kick`', `Usage: **${prefix}kick [@User]**\n**${prefix}kick [@User][Reason]**`)
			.addField('`ban`', `Usage: **${prefix}ban [@User]**\n**${prefix}ban [@User][Reason]**`)
			.addField('`add`', `Adds a role to a user \nUsage: **${prefix}add [@User] [Role]**`)
			.addField('`remove`', `Removes a role from a user \nUsage: **${prefix}remove [@User] [Role]**`)
			.addField('`rps`', 'Play rock paper scissors')
			.addField('`say`', 'Have the bot say something');
		message.channel.send(helpEmbed);
	}

	if (command === 'ping') {
		message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`);
	}

	if (command === 'kick') {
		if (!message.member.hasPermission('KICK_MEMBERS'))
		{return message.channel.send('Insufficient permissions (Requires permission `Kick members`)').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const member = message.mentions.members.first();
		if (!member)
		{return message.channel.send('You have not mentioned a user').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		if (!member.kickable)
		{return message.channel.send('This user is unkickable').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const reason = args.slice(1).join(' ');
		if (member) {
			// eslint-disable-next-line no-shadow
			if (!reason) {return member.kick().then(member => {
				message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
			});}

			// eslint-disable-next-line no-shadow
			if (reason) {return member.kick().then(member => {
				message.channel.send(`${member.user.tag} was kicked for ${reason}`);
			});}
		}
	}

	if (command === 'ban') {
		if (!message.member.hasPermission('BAN_MEMBERS'))
		{return message.channel.send('Insufficient permissions (Requires permission `Ban members`)').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const member = message.mentions.members.first();
		if (!member)
		{return message.channel.send('You have not mentioned a user').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		if (!member.bannable)
		{return message.channel.send('This user is unbannable').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const reason = args.slice(1).join(' ');
		if (member) {
			// eslint-disable-next-line no-shadow
			if (!reason) {return member.ban().then(member => {
				message.channel.send(`${member.user.tag} was banned, no reason was provided`);
			});}

			// eslint-disable-next-line no-shadow
			if (reason) {return member.ban(reason).then(member => {
				message.channel.send(`${member.user.tag} was banned for ${reason}`);
			});}
		}
	}

	if (command === 'add') {
		if (!message.member.hasPermission('MANAGE_ROLES'))
		{return message.channel.send('Insufficient permissions (Requires permission `Manage roles`)').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const member = message.mentions.members.first();
		if (!member)
		{return message.channel.send('You have not mentioned a user').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const add = args.slice(1).join(' ');
		if (!add)
		{return message.channel.send('You have not specified a role').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const roleAdd = message.guild.roles.cache.find(role => role.name === add);
		if (!roleAdd)
		{return message.channel.send('This role does not exist').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		if (member.roles.cache.get(roleAdd.id))
		{return message.channel.send(`This user already has the ${add} role`).then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		// eslint-disable-next-line no-shadow
		member.roles.add(roleAdd.id).then((member) => {
			message.channel.send(`${add} added to ${member.displayName}`);
		});
	}

	if (command === 'remove') {
		if (!message.member.hasPermission('MANAGE_ROLES'))
		{return message.channel.send('Insufficient permissions (Requires permission `Manage roles`)').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const member = message.mentions.members.first();
		if (!member)
		{return message.channel.send('You have not mentioned a user').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const remove = args.slice(1).join(' ');
		if (!remove)
		{return message.channel.send('You have not specified a role').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		const roleRemove = message.guild.roles.cache.find(role => role.name === remove);
		if (!roleRemove)
		{return message.channel.send('This role does not exist').then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		if (!member.roles.cache.get(roleRemove.id))
		{return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
			msg.delete({ timeout: 30000 });
		});}
		// eslint-disable-next-line no-shadow
		member.roles.remove(roleRemove.id).then((member) => {
			message.channel.send(`${remove} removed from ${member.displayName}`);
		});
	}

	if (command === 'say') {
		const text = args.join(' ');
		if(!text) return message.channel.send('You have not specified something to say');
		message.channel.send(text);

	}

	if (command === 'rps') {
		const options = [
			'rock :shell: ',
			'paper :newspaper2:',
			'scissors :scissors: ',
		];
		const option = options[Math.floor(Math.random() * options.length)];
		message.channel.send(`You got ${option}`);
	}

});