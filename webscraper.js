module.exports = function WebScraper(){
//jquery implementation for nodejs that makes it easy to view dom elements
const cheerio = require('cheerio');
//controlls a headless browser which is needed for scraping dynamic websites
const puppeteer = require('puppeteer');

const randomPageNum = Math.floor(Math.random * 50);
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
    const problems = [];
    $('.truncate.overflow-hidden').each(function () {
        problems.push($(this).find('a').attr('href'));
    });
    console.log(problems.length);
    //get random int 
    let randomNum = Math.floor(Math.random() * problems.length + 1);
    //choose random random problem
    let problemLink = problems[randomNum];
    //combine problem path to create link
    return "https://leetcode.com/".concat(problemLink);
})
.catch(console.error);
};

