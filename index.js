const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require('fs')

const prefix = "!";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "mute" || "m") {
      message.channel.send('SHHHHH!')

      const channel = message.guild.channels.cache.get(message.member.voice.channel.id);

      for (const [memberID, member] of channel.members) {
        if (member.user.username !== 'MuteVoiceForEveryOne') {
          member.voice.setMute(true);
        }
      }

      channel.join().then(connection => {
        const dispatcher =  connection.play(fs.createReadStream('./beep.opus'), {
          type: 'ogg/opus',
        });

        dispatcher.on("end", end => {VC.leave()});
      })
  }

  if (command === 'talk' || command == 't') {
    message.channel.send('You can talk now!')
    const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {

        member.voice.setMute(false);
      }
      channel.join().then(connection => {
        const dispatcher =  connection.play(fs.createReadStream('./beep.opus'), {
          type: 'ogg/opus',
        });

        dispatcher.on("end", end => {VC.leave()});
    })
  }
});

client.login(config.BOT_TOKEN);