const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
const client = new Discord.Client
// const config = require('./config.json') 

client.on('ready', () => {
    console.log('READY!')

    new WOKCommands(client)
})

client.login(process.env.TOKEN)