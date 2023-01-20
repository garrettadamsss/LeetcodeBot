const { SlashCommandBuilder } = require("discord.js");

async function WebScraper(){
    //jquery implementation for nodejs that makes it easy to view dom elements
    const cheerio = require('cheerio');
    //controlls a headless browser which is needed for scraping dynamic websites
    const puppeteer = require('puppeteer');

    const randomPageNum = Math.floor(Math.random * 5);
    const url = `https://leetcode.com/problemset/all/?page=${randomPageNum}`;

    puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
        return page.goto(url)
        .then(function() {
            return page.content();
        });
    })
    .then(html => {
    const $ = cheerio.load(html);
    //load all cells containing problem links into array of jquery objects
    const problems = $('div[role = rowgroup] a'); 
    //get random int 
    let randomNum = Math.floor(Math.random() * problems.length + 1);

    let problem = problems[randomNum].attribs.href;

    const randomProblemLink = "https://leetcode.com".concat(problem);
    console.log(`link: ${randomProblemLink}`);
    return randomProblemLink; 
    })
    .catch(console.error);
};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('problem')
        .setDescription('Returns random problem'),
    async execute(interaction) {
        let problemLink = WebScraper();
        await interaction.reply(problemLink);
        console.log(`link from main: ${randomProblemLink}`);
    },
};
