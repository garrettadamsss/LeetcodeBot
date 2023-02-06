
function WebScraper(url){
    //jquery implementation for nodejs that makes it easy to view dom elements
    const cheerio = require('cheerio');
    //controlls a headless browser which is needed for scraping dynamic websites
    const puppeteer = require('puppeteer');
    const fs = require('fs');
    return new Promise ((resolve, rejects) => {
        puppeteer
        .launch({headless: true})
        .then(browser => browser.newPage())
        .then(page => {
            return page.goto(url, {
                waitUntil: 'networkidle0',
            })
            .then(function() {
                console.log(page.url());
                return page.content();
            });
        })
        .then(html => {
            const $ = cheerio.load(html);
            //load all cells containing problem links into array of jquery objects
            $('.truncate.overflow-hidden').each(function () {
                // problemset.push($(this).find('a').attr('href'));
                let problemLink = $(this).find('a').attr('href');
                try {
                    fs.appendFileSync('problems_list.csv', "https://leetcode.com".concat(problemLink) + '\n');
                } catch(err) {
                    console.log(err);
                }
            });

            resolve('success');
            rejects('failed');
            
        })
        .catch(console.error);
    })
   
};


async function questionCollector(){
    for(let i = 1; i <= 50; i++){
        let result = await WebScraper(`https://leetcode.com/problemset/all/?page=${i}`); 
        console.log(result);
    }; 
}
questionCollector();

// get random int 
// let randomNum = Math.floor(Math.random() * problems.length + 1);
//choose random random problem
// let problemLink = problemset[randomNum];
//combine problem path to create link
// callback("https://leetcode.com".concat(problemLink));