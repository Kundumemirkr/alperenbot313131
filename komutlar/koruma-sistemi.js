const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Moderasyon Komutlar',`

**-kanal-koruma [aç-kapat]** : Kanalları korur`)

    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['moderasyon'],
  permLevel: 0
};

exports.help = {
  name: "koruma-sistemi",
  category: "yardım",
  description: "Koruma Komutları Gösterir."
};