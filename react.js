const fs = require('fs').promises;
const puppeteer = require("puppeteer");

const test = async () => {
    const browser = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox'],
        userDataDir: './cache', 
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });
    const twPage = await browser.newPage();
    await twPage.setRequestInterception(true);
          twPage.on('request',(request)=>{
      if(request.resourceType()==='GIF') request.abort();
      else request.continue();
    })
    await twPage.setDefaultNavigationTimeout(0);
    await twPage.setRequestInterception(true);

    // Load cookie
    const cookieStr = await fs.readFile('./cookiesIG.json')
    const cookies = JSON.parse(cookieStr)
    // console.log(cookie)

    // SET COOKIES
    await twPage.setCookie(...cookies);
    // Open WEB

    const url = 'https://www.instagram.com/'
    await twPage.goto(url);
    const[button] = await twPage.$x("//button[contains(., 'Not Now')]");
    if(button){await button.click()}; //mengeklik Tombol ' Not Now '
  while (true) {
   try {
    console.log('Beranda terbuka....',)
    
    await twPage.waitForTimeout(2000)

        console.log('Membuka Story...',)
    await twPage.click('button[role="menuitem"]')
   
    await twPage.waitForTimeout(3000)
                                                      console.log('Memberikan  💖',)
    await twPage.waitForTimeout(1000)
    await twPage.click('svg[aria-label="Like"]')
                                                      console.log('Berhasil memberi 💖!',)
    await twPage.waitForTimeout(1000)
                                                      console.log('Selesai.....',)
}
 catch(err) {
                                                      console.log('Sudah Pernah Di 💖 ..',)
    await twPage.waitForTimeout(1000)
}
                                                      console.log('Kembali..',)
    await twPage.goBack();
    await twPage.waitForTimeout(1000)
                                                      console.log('Resfresh ',)
    await twPage.reload()
    await twPage.waitForTimeout(1000)
  //  await browser.close();
}
}
test();
