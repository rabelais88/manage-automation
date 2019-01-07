const puppeteer = require('puppeteer');
const appPort = require('./src/setting.json').PORT_PUPPET;
const io = require('socket.io')(appPort);

console.log(`socket listening to ${appPort}`);
console.log('please open program with `yarn start` from another console window');

io.on('connection', (socket) => {
  console.log('a client connected');
  let page = null;
  let cookie = null;
  socket.on('loginRequest', () => {
    puppeteer.launch({ headless: false }).then((browser) => {
      console.log('logging in...');
      login(browser, cookie).then(({newCookie, newPage}) => {
        socket.emit('loggedIn');
        console.log('logged in');
        page = newPage;
        cookie = newCookie;
      });
    })
  });
  socket.on('mailAuth', () => {
    console.log('mail auth requested');
    mailAuth(page).then((isSuccess) => {
      if(!isSuccess) throw Error('mail authentication failed');
      socket.emit('mailAuthenticated');
    });
  })
})

async function login(browser, cookie) {
  let newCookie = cookie;
  console.log('login');
  const page = await browser.newPage();
  await page.setViewport({ width: 1020, height: 1200 });
  if (!cookie) {
    await page.goto('https://ezsso.bizmeka.com/loginForm.do');
    await page.waitForFunction(`window.location.pathname.includes("/portal/main/main.do")`, { timeout: 0 });
    await page.waitForFunction(`document.cookie !== "" && document.cookie.length >= 1`, { timeout: 0 });
    newCookie = await page.cookies();
    console.log('cookies', JSON.stringify(newCookie));
  } else {
    await page.setCookie(cookie)
  }
  await page.goto('https://ezwebmail.bizmeka.com/mail/list.do');
  await page.waitFor(2000);
  return { newPage: page, cookie: newCookie };
}

async function mailAuth(page) {
  await page.goto('https://ezwebmail.bizmeka.com/mail/list.do');
  await page.waitFor('#toggleBtn');
  await page.click('#toggleBtn');
  await page.waitFor(2000);
  // await page.waitForXPath(`//*[@id="moveForm"]/li/div/ul/li/a[contains(text(), 'help@bigpi.co')]`);
  // because the above wouldn't work when there is other element nearby
  // https://stackoverflow.com/questions/3655549/xpath-containstext-some-string-doesnt-work-when-used-with-node-with-more
  // await page.waitForXPath(`//*[@id="moveForm"]/li/div/ul/li/a[text()[contains(., 'help@bigpi.co')]]`);
  // const mails = await page.$x(`//*[@id="moveForm"]/li/div/ul/li/a[text()[contains(., 'help@bigpi.co')]]`);
  // if (mails.length > 0) await mails[0].click();
  await page.$$eval('#moveForm > li > div > ul > li > a', mailings => {
    const helpAddress = mailings.filter(el => el.textContent.includes('help@bigpi.co'));
    if (helpAddress.length === 0) throw Error('help address not found in the mailbox');
    helpAddress[0].click();
  });

  await page.$$eval('#mlist > li > div > p.m_subject', titles => {
    const authMail = titles.filter(el => el.textContent.includes('가입인증'));
    if (authMail.length === 0) throw Error('auth mail not found in the mailbox');
    authMail[0].click();
  });

  await page.$$eval('#viewArea a', titles => {
    const btnAuth = titles.filter(el => el.textContent.includes('이메일 인증'));
    if (btnAuth.length === 0) throw Error('mail address is not proper');
    btnAuth[0].click();
  });
  // const mailings = Array.from(await page.$$('#moveForm > li > div > ul > li > a'));
  // console.log(mailings);
  // const helpAddress = mailings.filter(el => el.textContent.includes('help@bigpi.co'));
  // if (helpAddress.length === 0) throw Error('help address not found in the mailbox');
  // await helpAddress[0].click();

  // const titles = Array.from(await page.$$('#mlist > li > div > p.m_subject'));
  // const authMail = titles.filter(el => el.textContent.includes('가입인증'));
  // if (authMail.length === 0) throw Error('auth mail not found in the mailbox');
  // await authMail[0].click();

  // const mailViews = Array.from(await page.$$('#viewArea a'));
  // const btnAuth = mailViews.filter(el => el.textContent.includes('이메일 인증'));
  // if (btnAuth.length === 0) throw Error('mail address is not proper');
  // await btnAuth[0].click();

  return true;
}