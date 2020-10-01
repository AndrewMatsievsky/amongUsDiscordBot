const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

const prefix = "!";

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "mute") {
    message.channel.send('SHHHHH!')
      const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {
        member.voice.setMute(true);
      }
  }

  if (command === 'unmute') {
    message.channel.send('You can talk now!')
    const channel = message.guild.channels.cache.get(message.member.voice.channel.id);
      for (const [memberID, member] of channel.members) {

        member.voice.setMute(false);
      }
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }
});

client.login(config.BOT_TOKEN);