module.exports.run = (bot, message, args, con) => {
	if(!bot.hasPermission(message, "MANAGE_MESSAGES")) return message.channel.send("You do not have permission to do this.");
	
	const target = message.mentions.users.first() || message.guild.members.get(args[0]);
	if(!target) return message.channel.send("Invalid target.");

	con.get(`SELECT * FROM blacklist WHERE snowflake = ? AND guild = ?`, target.id, message.guild.id, (err, r) => {
		if(err) throw err;
		if(!r) return message.channel.send("This user is not blacklisted.");
		con.run(`DELETE FROM blacklist WHERE id = ?`, r.id, (err) => {
			if(err) throw err;
			message.channel.send(`${target.tag} \`(${target.id})\` has been removed from the blacklist.`)
		})
	});
}

module.exports.help = {
	name: "unblacklist"
}