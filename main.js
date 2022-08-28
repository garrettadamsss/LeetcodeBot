// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// //symbol to initiate a command
// const prefix = '!';

// client.on('ready', () => {
//     console.log('LeetcodePractice is online');
// });

// client.on('message', message => {
//     if(!message.content.startsWith(prefix) || message.author.bot){
//         return; 
//     }

//     console.log("here");
//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if(command === 'ping'){
//         message.channel.send('pong!');
//     } else {
//         message.channel.send("wrong syntax");
//     }
    
// });

// //accessing the bot, must be last line in file
// client.login('MTAxMzI0NTAzNzM0NzM0ODQ4MQ.GYQL1I.1xSz_JF0J1849ScsnxfrBau9PdVLGaPxGPko8Y');

const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken('MTAxMzI0NTAzNzM0NzM0ODQ4MQ.GYQL1I.1xSz_JF0J1849ScsnxfrBau9PdVLGaPxGPko8Y');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login('MTAxMzI0NTAzNzM0NzM0ODQ4MQ.GYQL1I.1xSz_JF0J1849ScsnxfrBau9PdVLGaPxGPko8Y');