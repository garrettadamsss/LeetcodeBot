
const fs = require('fs');
//jquery implementation for nodejs that makes it easy to view dom elements
const cheerio = require('cheerio');
//controlls a headless browser which is needed for scraping dynamic websites
const puppeteer = require('puppeteer');


async function WebScraper(url){
    
    console.log(url);
    return new Promise (async (resolve, reject) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('error', error => {
            console.log('error');
            reject(new Error(error));
        });
        
       
        await page.goto(url, {
            waitUntil: 'networkidle0',
            // waitUntil: 'load',
        });
        
        const html = await page.content();
 
        resolve(cheerio.load(html)); 
        
        page.removeAllListeners('error');
        await page.close();
        await browser.close();
    });
};

//collect all free roblems from leetcode by going through each problem page and save problem link to csv including the difficulty
async function questionCollector(){
    for(let i = 1; i <= 52; i++){
        const $ = await WebScraper(`https://leetcode.com/problemset/all/?page=${i}`);

        $('[role=rowgroup] [role=row]').each( async function () {
            let problemLink = await $(this).find('a').attr('href');
            let difficulty = await $(this).find('span').eq(1).text(); 
            //svgcount determines whether the problem is premium or not
            let svgcount = await $(this).find('svg').length;
            if(svgcount <= 2){
                try {
                    fs.appendFileSync('./data/free_problems_list.csv', "https://leetcode.com".concat(problemLink) + ',' + difficulty + '\n');
                } catch(err){
                    console.log(err);
                }
            }
        });
    }; 
}



questionCollector();