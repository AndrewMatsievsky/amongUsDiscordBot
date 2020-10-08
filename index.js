const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');

const WEBHOOK_BOT_ID ='760964374654746646'
const WEBHOOK_READY_VOICE_ID = '659088565103493151'

const prefix = "/";

client.on("message", function(message) {
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "mute") {
    message.channel.send('SHHHHHHH!')

    const channel = message.guild.channels.cache.get(message.author.bot && message.author.id === WEBHOOK_BOT_ID ? WEBHOOK_READY_VOICE_ID : message.member.voice.channel.id);

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
    const channel = message.guild.channels.cache.get(message.author.bot && message.author.id === WEBHOOK_BOT_ID ? WEBHOOK_READY_VOICE_ID : message.member.voice.channel.id);

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