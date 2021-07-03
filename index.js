const { MessageEmbed, Client, Discord, Collection } = require('discord.js');
const config = require('./config.json');
const client = new Client();
const fs = require('fs');
const Enmap = require('enmap');






client.on("ready", function() {
  console.log(`${client.user.username} Is Now Awake`);
  const channelID = "815501610653843487";
  const message = "Server CPU Limit Reached!";
 //client.channels.cache.get(channelID).send(message)
  client.user.setPresence({
    status: "dnd",
    //online,idle...
    activity: {
      name: "Nex™#4922", //the status
      type: "LISTENING" //type
    }
  })
});




client.on("message", async message => {
  if (message.author.bot) return; //so other bots will not use the bot + make the bot faster
  if (!message.content.startsWith(config.prefix)) return; //make bot faster

  let command = message.content.split(" ")[0].replace(config.prefix, "")


  const cmd = client.commands.get(command)
  if (!cmd) return;

  const args = message.content.split(" ").slice(1)


  cmd.run(client, message, args, config)
})

client.on("message", async message => {
  if (message.author.bot) return;
  message.channel.send('@everyone')
})

client.on('message', message => {
	if (message.content === '@everyone') {
		message.delete();
	}
});



fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Running: '${cmdName}'`);
     client.commands.set(cmdName, props);
  });
});

require('./server')();
client.login('ODU2NDgzMDA5MTgzODc1MDcz.YNBr9g.cyyRSyj5rkD8MD1KYEQy8_PpjwQ');
