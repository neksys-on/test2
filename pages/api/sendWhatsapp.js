const qrcode = require('qrcode-terminal');
const puppeteer = require("puppeteer");
const fs = require('fs');



const SESSION_FILE_PATH = './whatsappSession.json';
const status_connect = 'connected'
const status_msg_send = 'msg send'
let sessionData;
const number = "+79086752252"
const chatId = number.substring(1) + "@c.us";
const { Client } = require('whatsapp-web.js');

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH));
}


const client = new Client({
    session: sessionData
});



//
async function sendtoWhatsupp(text) {
  try {
    await client.sendMessage(chatId, text)
  }
  catch {
    await client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });

    await client.on('ready', () => {
        console.log('Client is ready!');
    });


    await client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
            }
        });
    });

    await client.initialize();
    await client.sendMessage(chatId, text)
  }
  }


export default function (req, res) {
  const doing = req.body.do
  const text = req.body.text
  if (doing === 'connect') {
    // sendtoWhatsupp(text)
    // res.json({status_connect})
  }

  if (doing === 'send') {
    // client.sendMessage(chatId, text)
    // res.json({status_msg_send})
  }

  sendtoWhatsupp(text)
  res.status(201)
  res.json({})






}
