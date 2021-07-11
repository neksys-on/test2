const TelegramBot = require('node-telegram-bot-api');

export default async (req, res) => {
  // replace the value below with the Telegram token you receive from @BotFather
  const token = process.env.TELEGRAM_TOKEN;
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(token, {polling: false}); // заменить на фолс для отправки разовых сообщений

  // Matches "/echo [whatever]"
  // bot.onText(/\/echo (.+)/, (msg, match) => {
  //   // 'msg' is the received Message from Telegram
  //   // 'match' is the result of executing the regexp above on the text content
  //   // of the message
  //
  //   const chatId = msg.chat.id;
  //   const resp = match[1]; // the captured "whatever"
  //
  //   // send back the matched "whatever" to the chat
  //   bot.sendMessage(chatId, resp);
  // });

  // Listen for any kind of message. There are different kinds of
  // messages.
  // bot.on('message', (msg) => {
  //   const chatId = msg.chat.id;
  //   console.log(chatId)
  //   // send a message to the chat acknowledging receipt of their message
  //   bot.sendMessage(chatId, 'Нужные данные получены');
  //   bot.sendMessage(1841398902, chatId); // мой
  //   // 1009392108  Оля
  //   // 929818176  Мама
  // });
  const text = req.body.text

  bot.sendMessage(1009392108, text);
  bot.sendMessage(929818176, text);
  bot.sendMessage(1841398902, text);




  res.status(201)
  res.json({status: 'Complete'})
}
