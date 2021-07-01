const Discord = require("discord.js");
const client = new Discord.Client();
const { DiscordTogether } = require('discord-together');
require('dotenv').config()

client.discordTogether = new DiscordTogether(client);

client.on('ready', () => {
	console.log(`Listoco: ${client.user.tag}!`); 
});

client.on('message', async message => {
    if (message.content === '&help') {
        return message.channel.send(`&watch2gether => Crea sala para ver videos en youtube`);
    };

    
    if (message.content.includes('paja')) {
        return message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/692819163458175057/860017361850859520/unknown.png"]});
    };

    if (message.content === '&watch2gether') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`Click aqui para crear/unirse ${invite.code}`);
            });
        };
    };
});

client.login(process.env.TOKEN);