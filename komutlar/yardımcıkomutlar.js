const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Yardımcı Komutlar',`

**-isimdeğiştir** : Etiketlediğiniz kişinin kullanıcı adını değiştirir .isimdeğiştir <@kullanıcı> <isim>

**-sil** : Mesaj Siler sil <mesaj sayısı>

**-capslock-engel** : Büyük harfleri engeller

**-ping** : Botun pingini gösterir -ping

**-emojiekle** : İstediğiniz emojiyi ekler emojiekle <emoji urlsi> <olmasını istediğiniz ad>`)

    .setImage("https://media.discordapp.net/attachments/792388025443024936/794317376820215828/standard_9.gif")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL())
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardımcıkomut'],
  permLevel: 0
};

exports.help = {
  name: "yardımcı-komutlar",
  category: "yardım",
  description: "Yardımcı Komutları Gösterir."
};