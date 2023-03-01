const { SlashCommandBuilder } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('problem')
        .setDescription('Returns a problem of the desired difficulty')
        .addStringOption(option => 
            option.setName('difficulty')
                .setDescription('Specify the difficulty')
                .setRequired(true)
                .addChoices(
                    {name: 'Easy', value: 'Easy'},
                    {name: 'Medium', value: 'Medium'},
                    {name: 'Hard', value: 'Hard'},
                )), 
        

    async execute(interaction) {
        
        //get difficulty choice from list of options above
        const difficulty = interaction.options.getString('difficulty');


        //pull from sqlite db random problem with selected difficulty
        //creae a connection to the database
        let db = new sqlite3.Database('./data/bot_database.db');
        
        //build the query
        let sql = `SELECT problemLink FROM problems WHERE difficulty = '${difficulty}'`;

        //return data from query
        console.log(sql);
        let response; 
        db.all(sql, [], async (err, rows) => {
            if (err) {
              throw err;
            }
            //get random line number for randomization
            const randomIndex = Math.floor(Math.random() * rows.length);
            await interaction.reply(rows[randomIndex].problemLink);
        });
          
        //close the database
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          });
    }
};

        
