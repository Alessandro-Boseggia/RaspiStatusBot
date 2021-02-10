const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const cron = require('node-cron');
const status = require('./StatusOfServices/statusOfService.js')
const serviceDB = require('./LocalDatabase/serviceDB.js');

console.log(serviceDB.initDataBase());

const bot = new Telegraf(process.env.TOKEN);
const userID = process.env.USERID;
const mainMenu = {'message': "<b>Menu principale</b> \n Seleziona un opzione",'keyboard': Markup.inlineKeyboard([
    [ Markup.button.callback('Aggiungi servizio', 'addService'), Markup.button.callback('Lista servizi', 'showService') ], 
    [ Markup.button.callback('Imposta servizi temporizzati', 'temporizedService') ], 
])
}

bot.use(async (ctx, next) => {
    if (userID != ctx.from.id) 
        return;
    await next();
  })

bot.start(async (ctx) => {
    if (userID != ctx.from.id) 
        return;
    ctx.replyWithHTML(mainMenu.message, mainMenu.keyboard);
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
bot.launch();