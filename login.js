const fs = require('fs').promises;
require('dotenv').config();
const puppeteer = require("puppeteer");


const test = async () => {

    const browser = await puppeteer.launch({
        headless: false, //true
        args: ['--no-sandbox'],
        slowMo: 20,
        defaultViewport: {
            width: 450,
            height: 630
        }
    });
    const twPage = await browser.newPage();
    // Configure the navigation timeout
    await twPage.setDefaultNavigationTimeout(0);

    const url = 'https://www.instagram.com/accounts/login/'
    await twPage.goto(url);

    await twPage.waitForSelector('input', {
        visible: true
    })
    await twPage.type('[name="username"]', 'username')
    await twPage.type('[name="password"]', 'password')
    console.log('Sedang Masuk....')
    await twPage.waitForTimeout(10000) // 10 Detik
    await twPage.click('button[type="submit"]')


    console.log('menunggu Save Info..',)
    await twPage.waitForTimeout(10000) // 2m
    await twPage.click('button[type="button"]')
    console.log('end--------------')
    
    await twPage.waitForTimeout(5000) // 2m
    const[button] = await twPage.$x("//button[contains(., 'Not Now')]");
    if(button){await button.click()};


    const cookies = await twPage.cookies()
    console.log(cookies);
    await fs.writeFile('./cookiesIG.json', JSON.stringify(cookies, null, 2))
    console.log('done------------',)
    
    // await browser.close()
}
test();
