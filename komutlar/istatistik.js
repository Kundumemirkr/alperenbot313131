const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');


exports.run = (client, message) => {
    const istatistikozel = new Discord.MessageEmbed()
    .setColor(0x36393F)
.setDescription(`${ client.user.username}`)
  .addField(`Bot Sahibi`, `<@595605651531759627>`, )
  .addField("Sunucu Sayısı ", `${client.guilds.cache.size.toLocaleString()}`, true)
  .addField("Toplam Kullanıcı Sayısı ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
  .addField("Ping" , `${client.ws.ping}`, true)
  .addField("Discord.js Sürümü ", `${Discord.version}`, true)  
   .addField(`Destek Sunucum`, `[Tıkla](https://discord.gg/cVMjC3rrdd)`, true)
  .addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=796255738506903572&scope=bot&permissions=805829694)`, true)
  .addField(`Bota Oy Ver`, `[Yakında]( )`, true)
    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
    .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
    message.channel.send(istatistikozel)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik', 'i', 'istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};