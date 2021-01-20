const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Eğlence Menüsü',`
**-golat** : Gol Atarsınız
**-kartopu** : Etiketlediğiniz kişiye kar topu atarsınız
**-espri** : Espri Yaparsınız
**-tkm** : Taş Kağıt Makas oynarsınız
**-yumruk-at** : Etiketlediğiniz kişiye yumruk atarsınız
**-adamasmaca** : Adam Asmaca Oyunu
**-avatar** : Etiketlediğiniz kişinin avatarını gösterir
**-atasözü** : Atasözü söyler
**-tokatat** : Etiketlediğin kişiye tokat atar
**-yaz** : Söylediyiniz kelimeyi yazar
**-deyim** : Deyim söyler`)
    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  category: "yardım",
    description: "Eğlence Komutları Gösterir."
};