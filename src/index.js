const api = require("node-telegram-bot-api")

const bot = new api(process.env.TOKEN, {polling: false})

// using private channel id
bot.sendMessage(-1001154780191, "hello world")
