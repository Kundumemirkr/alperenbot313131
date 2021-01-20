const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Yardım Menüsü',`

**-komutlar** : Botdaki Bütün komutları gösterir

**-uptime** : uptime komutları gösterir

**-m** : Müzik komutları gösterir

**-help** : Yedekleme sistemi komutları gösterir

**-yardımcı-komutlar** : Yardımcı Komutları gösterir

**-moderasyon** : Moderasyon Komutlarını gösterir

**-istatistik** : Botun bilgilerini gösterir

**-koruma-sistemi** : Koruma komutları gösterir

**-çağır** : Kurucuyu çağırır 

**-hata** :Hata veya bug olduyunda bildirin

**-youtube** :Yapımcımın kanalı

**-eğlence** : Eğlence Komutları Açar.`)
    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y'],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  category: "yardım",
    description: "Eğlence Komutları Gösterir."
};