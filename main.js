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
	//console.log(`Listoco: ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.content.startsWith('&help')) {
        return message.channel.send(`&w2g => Crea sala para ver videos en youtube\n&bounce [usuario] [cantidad de vueltas {default: 1}] => Hace rebotar al usuario por todos los canales de voz una cierta cantidad de veces.`);
    };
    
    if (message.content.toLowerCase().includes('paja')) {
        return message.channel.send(message.author.toString(), {files: ["https://cdn.discordapp.com/attachments/692819163458175057/860017361850859520/unknown.png"]});
    };

    if (message.content.toLowerCase().includes('puta')) {
        const randomElement = photos[Math.floor(Math.random() * photos.length)];
        return message.channel.send(message.author.toString(), {files: [randomElement]});
    };

    if (message.content.startsWith('&w2g')) {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
                return message.channel.send(`Click aqui para crear/unirse ${invite.code}`);
            });
        }else{
            return message.channel.send(`Para utilizar este comando debes estar en un canal de voz primero.`);
        }
    };

    if (message.content.startsWith('&bounce')) {
        const userToMove = message.mentions.users.first();
        const guildMember = message.guild.member(userToMove);
        const channelConnectedTo = guildMember.voice.channel;
        const args = message.content.trim().split(/ +/g);
        const timesToRepeat = parseInt(args[2] ? args[2] : 1);

        message.delete();
        
        if(channelConnectedTo != null){
            const timeBetweenMoves = 500;
            const voiceChannels = client.channels.cache.filter(channel => channel.type === 'voice');
            const voiceChannelsQuantity = voiceChannels.size;

            let index = 0;
            let timeout = 0;

            for(let i = 1; i <= timesToRepeat; i++){
                voiceChannels.forEach((channel, channelId) => {
                    timeout = index * timeBetweenMoves;

                    guildMember.voice.setChannel(channelId).then(() => {
                        setTimeout(function () {
                            //console.log(`User ${userToMove.username} moved to ${channel.name}`);

                            if((index) == voiceChannelsQuantity * timesToRepeat){
                                //console.log(`User ${userToMove.username} moved to original position.`);
                                guildMember.voice.setChannel(channelConnectedTo.id);
                            }
                        }, timeout);
                    })

                    index++;
                });
            }
        }else{
            return message.channel.send(`El usuario no se encuentra en un canal de voz.`);
        }
    }
});

client.login(process.env.TOKEN);