const Discord = require("discord.js");
const client = new Discord.Client();
const { DiscordTogether } = require('discord-together');
require('dotenv').config()

const photos = [
    'https://cdn.discordapp.com/attachments/723372418717974608/860555255707336734/Basti-Mouse.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555265366556702/Cris-Kawaii.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555273084338207/Cris-Senora.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555291578204200/Cris-Wekereke.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555306303488010/Cris-Wtf.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555329192460338/Isaac-Senora.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555341308362812/Omar-Amazed.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555347671777280/Sandro-Bunny.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555367759085588/Sandro-Bunny-2.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555378769264670/Sandro-Drunk.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555394462908446/Sandro-Furro.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555403120214057/Sandro-Pokerface.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555408980574218/Sandro-Potato.jpg',
    'https://cdn.discordapp.com/attachments/723372418717974608/860555416605294602/Sandro-Wekere.jpg',
]

client.discordTogether = new DiscordTogether(client);

client.on('ready', () => {
	console.log(`Listoco: ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.content === '&help') {
        return message.channel.send(`&w2g => Crea sala para ver videos en youtube`);
    };
    
    if (message.content.includes('paja')) {
        return message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/692819163458175057/860017361850859520/unknown.png"]});
    };

    if (message.content.includes('puta')) {
        const randomElement = photos[Math.floor(Math.random() * photos.length)];
        return message.channel.send(message.author.toString(), {files: [randomElement]});
    };
    

    if (message.content === '&w2g') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`Click aqui para crear/unirse ${invite.code}`);
            });
        };
    };
});

client.login(process.env.TOKEN);