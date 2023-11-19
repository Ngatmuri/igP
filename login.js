const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config()



async function main(){
 const browser = await puppeteer.launch({headless:false});
 const page = await browser.newPage();
 const kuki = 'cookiesIG.json';
 const ceksesi = fs.existsSync(kuki);
      if(ceksesi){
        const bacakuki = fs.readFileSync(kuki);
        const parsekuki = JSON.parse(bacakuki);
        if(bacakuki.length !== 0){
            for(cookie of parsekuki){
                await page.setCookie(cookie);
            }
            console.log("Berhasil membaca cookie")
        }
    }else{
        console.log("cookie enggak ada");
    }
      // desable gambar.
      await page.setRequestInterception(true);
      page.on('request',(request)=>{
        if(request.resourceType()==='image') request.abort();
        else request.continue();
      })
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://instagram.com/');
      await page.waitForSelector('input', {
        visible: true
    })

     if(await page.$('input[type=password]') !== null){

        await page.type('[name=username]', process.env.username);
        await page.type('[name=password]', process.env.password);
        await page.click('button[type=submit]');
      }
      await page.waitForTimeout(6000);

    const cookieOB = await page.cookies();
    fs.writeFile(kuki, JSON.stringify(cookieOB),function(err){
             if(err){
                console.log("Gagal Membuat Cookie");
             } else{
                console.log("Cookie Berhasil Dibuat");
             }
    })
      await browser.close();
}
main();
