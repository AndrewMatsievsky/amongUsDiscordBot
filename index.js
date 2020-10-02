const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');

const prefix = "/";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "mute") {
      message.channel.send('SHHHHHHH!')

      const channel = message.guild.channels.cache.get(message.member.voice.channel.id);

      for (const [memberID, member] of channel.members) {
        if (member.user.username !== 'MuteVoiceForEveryOne') {
          member.voice.setMute(true);
        }
      }

      channel.join().then(connection => {
        connection.play(fs.createReadStream('./airplane_sound.opus'), {
          type: 'ogg/opus',
        })
      })
  }

  if (command === 'talk') {
    message.channel.send('You can talk now!')
    const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {

        member.voice.setMute(false);
      }
      channel.join().then(connection => {
        connection.play(fs.createReadStream('./airplane_sound.opus'), {
          type: 'ogg/opus',
        })
    })
  }
});

client.login(config.BOT_TOKEN);