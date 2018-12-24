const puppeteer = require('puppeteer');
const appPort = require('./src/setting.json').PORT_PUPPET;
const io = require('socket.io')(appPort);
let cookie = {};

console.log(`socket listening to ${appPort}`);
console.log('please open program with `yarn start` from another console window');

io.on('connection', (socket) => {
  console.log('a client connected');
  socket.on('createTeam', (teamData) => {
    console.log('team creation requested');
    createTeam();
  })
})

async function createTeam(teamData) {
  console.log('creating team');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1020, height: 700 });
  if (!cookie) {
    await page.goto('https://ezsso.bizmeka.com/loginForm.do');
    await page.waitForFunction(`window.location.pathname.includes("/portal/main/main.do")`, { timeout: 0 });
    await page.waitForFunction(`document.cookie !== "" && document.cookie.length >= 1`, { timeout: 0 });
    cookie = await page.cookies();
    console.log('cookies', JSON.stringify(cookie));
  } else {
    await page.setCookie(cookie)
  }
  await page.goto('https://ezwebmail.bizmeka.com/mail/list.do');
  await page.wait(1000);
  await page.click('a#toggleBtn');
  await page.wait(1000);
  const linkHandlers = await page.$x(`//*[@id="moveForm"]/li/div/ul/li/a[contains(text(), 'help@bigpi.co')]`);
  await linkHandlers.click();
  const searchBox = await page.$x('//*[@id="search_form"]/input[1]');
  searchBox.click();
  
}
