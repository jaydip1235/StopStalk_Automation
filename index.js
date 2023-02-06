const puppeteer = require('puppeteer');
const json2csv = require('json2csv').parse;
const fs = require('fs');

(async function () {
    try{
    const browser = await puppeteer.launch({
        headless: false,
        visible : true,
      });
  const page = await browser.newPage();

  await page.goto('https://www.stopstalk.com/leaderboard');

    
    async function checkSelectorExistence(page, selector) {
  const element = await page.$(selector);
  return !!element;
}


    let fnc = async(r)=>{
        let cl1;
        let cl2;
        let cl3;
        let cl4;
        let cl5;
        let innerText2=""
        await page.waitForSelector(`#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(1)`,{visible: true})
        cl1 = `#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(1)`
         const innerText1 = await page.evaluate((cl1) => {
            console.log(cl1);
            return document.querySelector(cl1).innerText;
    }, cl1);
    

   
      const selectorExists = await checkSelectorExistence(page, `#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(2) > a`);
    //  await page.waitForSelector(`#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(2) > a`,{timeout:50000})
     
      if (selectorExists){
        cl2 = `#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(2) > a`
      
        
         innerText2 = await page.evaluate((cl2) => {
           // console.log(cl2);
            return document.querySelector(cl2).getAttribute("title");
    }, cl2);
}


  

    await page.waitForSelector(`#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(3)`,{visible: true})
        cl3 = `#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(3)`
         const innerText3 = await page.evaluate((cl3) => {
            console.log(cl3);
            return document.querySelector(cl3).innerText;
    }, cl3);



    await page.waitForSelector(`#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(4) > a`,{visible: true})
        cl4 = `#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(4) > a`
         const innerText4 = await page.evaluate((cl4) => {
            console.log(cl4);
            return document.querySelector(cl4).innerText;
    }, cl4);

        
    await page.waitForSelector(`#leaderboard-table > tbody > tr:nth-child(${r}) > td:nth-child(5) > a`,{visible: true})
        cl5 = `#leaderboard-table > tbody > tr:nth-child(${r}) >  td:nth-child(5) > a`
         const innerText5 = await page.evaluate((cl5) => {
            console.log(cl5);
            return document.querySelector(cl5).innerText;
    }, cl5);



if(r%5==0){
      await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
}
    
        return [innerText1,innerText2,innerText3,innerText4,innerText5]
    }

   let all=[]
   for(let i=1;i<=10000;i++){
        let inn = await fnc(i);
        console.log(inn);
        all.push(inn);
   }
        
   const csv = json2csv(all);
  fs.writeFileSync('output.csv', csv);

  browser.close();
}catch(e){console.log(e.message);
    browser.close();
}
  
})();