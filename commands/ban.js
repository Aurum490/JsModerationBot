module.exports.run = async (bot, message, args, con) => {
	if(!bot.hasPermission(message, "BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.");
	let target = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!target) return message.channel.send("Please provide a valid mention or ID.");

	if(!target.bannable) return message.channel.send("I cannot ban this user.");

	let time = parseInt(args[1]);
	let reason = args.slice(time ? 2 : 1).join(" ");

	try {
		await target.send(`You have been banned from \`${message.guild.name}\`.\n**Reason:** ${reason || "No reason provided."}`);
	} catch(e) {
		message.channel.send("Warning: Could not send this user a DM informing them of their ban. They likely have messages turned off.");
	}

	try {
		await target.ban({reason});
		if(time) {
			con.run("INSERT INTO bans (snowflake, guild, unbannedAt) VALUES (?, ?, ?)", target.id, message.guild.id, Date.now() + time * 1000, (err) => {
				if(err) throw err;
			});
		}
		message.channel.send("User banned.");
	} catch(e) {
		message.channel.send(`Ban failed: ${e.message}`)
	}
}

module.exports.help = {
	name: "ban"
}