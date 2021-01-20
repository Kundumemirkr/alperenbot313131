const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const chrome = new Discord.MessageEmbed()
  .setTitle("Davet Linkleri Altta Belirtilmiştir")
  .setColor("RANDOM")
    .addField("» **Botun Sahibi**", "<@!595605651531759627>| AlperenGT#2021 ")
    .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/cVMjC3rrdd)", )
    .addField("**» Davet Linki**", " [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)", )
      .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
  message.channel.send(chrome);   //DevTR
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
};