const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '-'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('RANDOM')
.addField('Moderasyon Komutlar',`

**-isimdeğiştir** : Etiketlediğiniz kişinin kullanıcı adını değiştirir .isimdeğiştir <@kullanıcı> <isim>

**-küfür-engel [aç-kapat]** : Küfürleri engeller

**-reklam [aç-kapat]** : Reklamları engeller

**-ever-here-engel [aç-kapat]**  : Everyone ve here engeller

**-oylama** : oylama yapar <oylama <oylayacağınız şey>

**-kilitle** : Kanala hiçkimse mesaj atamaz (Kanalı belirttiğiniz süre boyunca kilitler) kilitle <süre>

**-emojiekle** : İstediğiniz emojiyi ekler emojiekle <emoji urlsi> <olmasını istediğiniz ad>

**-yetkilerim** : Etiketlediğiniz kişinin yetkilerini gösterir. (yetkilerim`)
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
  name: "moderasyon",
  category: "yardım",
  description: "Moderasyon Komutları Gösterir."
};