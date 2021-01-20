const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//---------------------------------KOMUTLAR---------------------------------\\

//---------------------------------DDOS KORUMASI-----------------------------\\
client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "ddos-system")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});
//---------------------------------DDOS KORUMASI-----------------------------\\

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum  :white_check_mark::`)

  
}
})

//KanalKoruma
client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`Rixnux_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})

//////////////afk
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

  
 //////eklendim atıldım
client.on('guildDelete', guild => {

let avex = new Discord.MessageEmbed()

.setColor("RED")
.setTitle(" Bot Atıldı ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('794868709810110464').send(avex);

});

client.on('guildCreate', guild => {

let avex = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" Bot Eklendi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('794868709810110464').send(avex);

});

//Afk
client.on('message', async message => {

    const ms = require('parse-ms');

  if(message.author.bot) return;

  if(!message.guild) return;

  if(message.content.includes(`${prefix}afk`)) return;

  

  if(await db.fetch(`afk_${message.author.id}`)) {

      var user = message.mentions.users.first();

    let zamans = await db.fetch(`afksüre_${message.author.id}`);

    let timeObj = ms(Date.now() - zamans);

      message.reply(`Artık AFK değilsin, **${timeObj.hours}** Saat **${timeObj.minutes}** Dakika **${timeObj.seconds}** Saniyedir AFKydın`);

        db.delete(`afk_${message.author.id}`);

    db.delete(`afksüre_${message.author.id}`);

  }

  

  var user = message.mentions.users.first();

  if(!user) return;

  var REASON = await db.fetch(`afk_${user.id}`);

  

  if(REASON) {

    let zamant = await db.fetch(`afksüre_${user.id}`);

    let timeObj = ms(Date.now() - zamant);

    const darkcode  = new Discord.MessageEmbed()

     .setDescription(`<@${user.id}> kullanıcısı AFK `)

                  .setColor("2F3136")

                  .addField(`Saat :`,`${timeObj.hours}`,true)

                  .addField(`Dakika :`,`${timeObj.minutes}`,true)

                  .addField(`Saniye :`,`${timeObj.seconds}`,true)

                 .setThumbnail(user.avatarURL())

    message.channel.send(darkcode)

  }

});




client.on("emojiCreate", async(emoji) => {

  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Oluşturma")

  .addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

  .addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

  .setThumbnail(emoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

  client.on("emojiDelete", async(emoji) => {

  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Silme")

  .addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

  .addField("**Silinen emoji**", `${emoji}`)

  .setTimestamp()

  .setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

  .setColor("RANDOM")

  .setThumbnail(emoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Emoji Güncelleme")

  .addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

  .addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

  .addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

  .setThumbnail(oldEmoji.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Yasaklama")

  .addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

  .addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

  .addField("**Yasaklanma sebebi**", `${entry.reason}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

  .setThumbnail(guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

  .setAuthor(entry.executor.username, entry.executor.avatarURL())

  .addField("**Eylem**", "Yasak kaldırma")

  .addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

  .addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

  .setThumbnail(guild.iconURL)

  client.channels.cache.get(modlog).send(embed)
})


///sa-as///
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sa") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");//Lord Creative
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamın Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selam") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    msg.reply("**Aleyküm Selam Hoşgeldin**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Youtube") {
    msg.reply("**__Youtube Link__** : ");//Lord Creative
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "-youtube") {
    msg.reply("**__Youtube Link__: https://www.youtube.com/channel/UCUiZbmPde9hSK5QRGdvxfyQ**");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "hi") {
    msg.reply("**hi**");
  }
});

///küfür///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
  const küfür = ["siktir",
"amcık",
"yarrak",
"orospu",
"piç",
"sikerim",
"sikik",
"amına",
"pezevenk",
"yavşak",
"ananı",
"anandır",
"orospu",
"evladı",
"göt",
"pipi",
"yarak",
"amk",
"aq",
"mk",
"anaskm",
"anask m",
"oc",
"mal",
"o c",
"beyinsiz",
"a m",
"got",
"g ot",
"go t",
"aptal",
"annesiz",
"Götü",
"Senin Kafanı Sikeyim",
"sikmek",
"sg",
"sikmek",
"amınoglu",
"aminoglu",
"aminoğlu",
"amınoğlu",
"sikim", 
"sikiyim",
"orospu çocuğu",
"piç kurusu",
"kahpe",
"sikimi ye",
"mq",
"sik",
"amguard",
"sekssüel",
"seksüel",
"Ânanîn âmını sïkïm",
"oç",
"o ç",
"orosbu",
"Get the fuck outta here",
"What the fuck are you",
"Kick your ass",
"Get the fuck up",
"fuck",
"fuck you",
"shit,",
"damn",
"fahise","sikcem",
"fahişe",
"feriştah",
"ferre",
"fuck",
"fucker",
"fuckin",
"fucking",
"gavad",
"gavat",
"geber",
"geberik",
"gebermek",
"gebermiş",
"gebertir",
"gerızekalı",
"gerizekalı",
"gerizekali",
"gerzek",
"giberim",
"giberler",
"gibis",
"gibiş",
"gibmek",
"gibtiler",
"goddamn",
"godoş",
"godumun",
"gotelek",
"gotlalesi",
"gotlu",
"gotten",
"gotundeki",
"gotunden",
"gotune",
"gotunu",
"gotveren",
"goyiim",
"goyum",
"goyuyim",
"goyyim",
"göt",
"göt deliği",
"götelek",
"göt herif",
"götlalesi",
"götlek",
"götoğlanı",
"göt oğlanı",
"götoş",
"götten",
"götü",
"götün",
"götüne",
"götünekoyim",
"götüne koyim",
"götünü",
"götveren",
"göt veren",
"göt verir",
"gtelek",
"gtn",
"gtnde",
"gtnden",
"gtne",
"gtten",
"gtveren",
"hasiktir",
"hassikome",
"hassiktir",
"has siktir",
"hassittir",
"haysiyetsiz",
"hayvan herif",
"hoşafı",
"hödük",
"hsktr",
"huur",
"ıbnelık",
"ibina",
"ibine",
"ibinenin",
"ibne",
"ibnedir",
"ibneleri",
"ibnelik",
"ibnelri",
"ibneni",
"ibnenin",
"ibnerator",
"ibnesi",
"idiot",
"idiyot",
"imansz",
"ipne",
"iserim",
"işerim",
"itoğlu it",
"kafam girsin",
"kafasız",
"kafasiz",
"kahpe",
"kahpenin",
"kahpenin feryadı",
"kaka",
"kaltak",
"kancık",
"kancik",
"kappe",
"karhane",
"kaşar",
"kavat",
"kavatn",
"kaypak",
"kayyum",
"kerane",
"kerhane",
"kerhanelerde",
"kevase",
"kevaşe",
"kevvase",
"koca göt",
"koduğmun",
"koduğmunun",
"kodumun",
"kodumunun",
"koduumun",
"koyarm",
"koyayım",
"koyiim",
"koyiiym",
"koyim",
"koyum",
"koyyim",
"krar",
"kukudaym",
"laciye boyadım",
"lavuk",
"liboş",
"madafaka",
"mal",
"malafat",
"malak",
"manyak",
"mcik",
"meme",
"memelerini",
"mezveleli",
"minaamcık",
"mincikliyim",
"mna",
"monakkoluyum",
"motherfucker",
"mudik",
"oc",
"ocuu",
"ocuun",
"OÇ",
"oç",
"o. çocuğu",
"oğlan",
"oğlancı",
"oğlu it",
"orosbucocuu",
"orospu",
"orospucouguv",
"orospu cocugu",
"orospu çoc",
"orospuçocuğu",
"orospu çocuğu",
"orospu çocuğudur",
"orospu çocukları",
"orospudur",
"orospular",
"orospunun",
"orospunun evladı",
"orospuydu",
"orospuyuz",
"orostoban",
"orostopol",
"orrospu",
"oruspu",
"oruspuçocuğu",
"oruspu çocuğu",
"osbir",
"ossurduum",
"ossurmak",
"ossuruk",
"osur",
"osurduu",
"osuruk",
"osururum",
"otuzbir",
"öküz",
"öşex",
"patlak zar",
"penis",
"pezevek",
"pezeven",
"pezeveng",
"pezevengi",
"pezevengin evladı",
"pezevenk",
"pezo",
"pic",
"pici",
"picler",
"piç",
"piçin oğlu",
"piç kurusu",
"piçler",
"pipi",
"pipiş",
"pisliktir",
"porno",
"pussy",
"puşt",
"puşttur",
"rahminde",
"revizyonist",
"s1kerim",
"s1kerm",
"s1krm",
"sakso",
"saksofon",
"salaak",
"salak",
"saxo",
"sekis",
"serefsiz",
"sevgi koyarım",
"sevişelim",
"sexs",
"sıçarım",
"sıçtığım",
"sıecem",
"sicarsin",
"sie",
"sik",
"sikdi",
"sikdiğim",
"sike",
"sikecem",
"sikem",
"siken",
"sikenin",
"siker",
"sikerim",
"sikerler",
"sikersin",
"sikertir",
"sikertmek",
"sikesen",
"sikesicenin",
"sikey",
"sikeydim",
"sikeyim",
"sikeym",
"siki",
"sikicem",
"sikici",
"sikien",
"sikienler",
"sikiiim",
"sikiiimmm",
"sikiim",
"sikiir",
"sikiirken",
"sikik",
"sikil",
"sikildiini",
"sikilesice",
"sikilmi",
"sikilmie",
"sikilmis",
"sikilmiş",
"sikilsin",
"sikim",
"sikimde",
"sikimden",
"sikime",
"sikimi",
"sikimiin",
"sikimin",
"sikimle",
"sikimsonik",
"sikimtrak",
"sikin",
"sikinde",
"sikinden",
"sikine",
"sikini",
"sikip",
"sikis",
"sikisek",
"sikisen",
"sikish",
"sikismis",
"sikiş",
"sikişen",
"sikişme",
"sikitiin",
"sikiyim",
"sikiym",
"sikiyorum",
"sikkim",
"sikko",
"sikleri",
"sikleriii",
"sikli",
"sikm",
"sikmek",
"sikmem",
"sikmiler",
"sikmisligim",
"siksem",
"sikseydin",
"sikseyidin",
"siksin",
"siksinbayav",
"siksinler",
"siksiz",
"siksok",
"siksz",
"sikt",
"sikti",
"siktigimin",
"siktigiminin",
"siktiğim",
"siktiğimin",
"siktiğiminin",
"siktii",
"siktiim",
"siktiimin",
"siktiiminin",
"siktiler",
"siktimv",
"siktim",
"siktimin",
"siktiminin",
"siktir",
"siktir et",
"siktirgit",
"siktir git",
"siktirir",
"siktiririm",
"siktiriyor",
"siktir lan",
"siktirolgit",
"siktir ol git",
"sittimin",
"sittir",
"skcem",
"skecem",
"skem",
"sker",
"skerim",
"skerm",
"skeyim",
"skiim",
"skik",
"skim",
"skime",
"skmek",
"sksin",
"sksn",
"sksz",
"sktiimin",
"sktrr",
"skyim",
"slaleni",
"sokam",
"sokarım",
"sokarim",
"sokarm",
"sokarmkoduumun",
"sokayım",
"sokaym",
"sokiim",
"soktuğumunun",
"sokuk",
"sokum",
"sokuş",
"sokuyum",
"soxum",
"sulaleni",
"sülaleni",
"sülalenizi",
"sürtük",
"şerefsiz",
"şıllık",
"taaklarn",
"taaklarna",
"tarrakimin",
"tasak",
"tassak",
"taşak",
"taşşak",
"tipini s.k",
"tipinizi s.keyim",
"tiyniyat",
"toplarm",
"topsun",
"totoş",
"vajina",
"vajinanı",
"veled",
"veledizina",
"veled i zina",
"verdiimin",
"weled",
"weledizina",
"whore",
"xikeyim",
"yaaraaa",
"yalama",
"yalarım",
"yalarun",
"yaraaam",
"yarak",
"yaraksız",
"yaraktr",
"yaram",
"yaraminbasi",
"yaramn",
"yararmorospunun",
"yarra",
"yarraaaa",
"yarraak",
"yarraam",
"yarraamı",
"yarragi",
"yarragimi",
"yarragina",
"yarragindan",
"yarragm",
"yarrağ",
"yarrağım",
"yarrağımı",
"yarraimin",
"yarrak",
"yarram",
"yarramin",
"yarraminbaşı",
"yarramn",
"yarran",
"yarrana",
"yarrrak",
"yavak",
"yavş",
"yavşak",
"yavşaktır",
"yavuşak",
"yılışık",
"yilisik",
"yogurtlayam",
"yoğurtlayam",
"yrrak",
"zıkkımım",
"zibidi",
"zigsin",
"zikeyim",
"zikiiim",
"zikiim",
"zikik",
"zikim",
"ziksiiin",
"ziksiin",
"zulliyetini",          
"damn","dick","crap","fag","piss","pussy","asshole","slut","cock","darn","douche","bastard","You are dick","You’re so unnecessary","Slut","Shut the fuck up","Shove it up your ass","Motherfucker",
"fucker","bitch","Ass hole"];
    

    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter("AlperenBot Küfür Sistemi", client.user.avatarURL())
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "AlperenBot, " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Küfür Etmek Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///reklam-engelle///
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",//Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.MessageEmbed()
            .setColor(0xffa300)
            .setFooter(
              " Reklam engellendi.",
              client.user.avatarURL()
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL()
            )
            .setDescription(
              "AlperenBot Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});


//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`Bu Sunucuda Everyone ve Here Yasak!`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  }//lrowsxrd
});
            