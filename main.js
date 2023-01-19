// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');

// fs is nodes native file system module to read commands directory
const fs = require('node:fs');
//path is nodes native path utility module and helps construct path and automatically detect OS
const path = require('node:path');


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

//commands will be a map
client.commands = new Collection();

//finds directory with commands
const commandsPath = path.join(__dirname, 'commands');
//finds js files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//goes through each file and requires them
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	//ensure that each command has a data and command properties
	if ('data' in command && 'execute' in command) {
		//attaching commands to client.commands
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//each slash command is an interaction
client.on(Events.InteractionCreate, async interaction => {
	//check to make sure only slash commands are handled
	if (!interaction.isChatInputCommand()) return;

	//retrieving command from commands collection using the interaction command name that was inputed
	const command = interaction.client.commands.get(interaction.commandName);
	if(!command){
		console.error(`No command matching ${interaction.commandName} was found.`);
		return; 
	}
	try {
		await command.execute(interaction);

	} catch(error){
		console.log(error);
		await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
	}
	console.log(interaction);
});



