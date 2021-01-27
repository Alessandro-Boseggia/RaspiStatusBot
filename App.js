const { Telegraf } = require('telegraf');
require('dotenv').config();
const cron = require('node-cron');
const status = require('./statusOfService.js');

const bot = new Telegraf(process.env.TOKEN);
const userID = process.env.USERID;

bot.use(async (ctx, next) => {
    if (userID != ctx.from.id) 
        return;
    await next();
  })

bot.start(async (ctx) => {
    if (userID != ctx.from.id) 
        return;
    ctx.reply('Starting BOT');
})

bot.command('piholestatus', async (ctx) => ctx.reply(await status.piHoleStatus()))

cron.schedule('0 6 * * *', async () => {
    bot.telegram.sendMessage(userID, await status.piHoleStatus());
});
  
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
bot.launch();