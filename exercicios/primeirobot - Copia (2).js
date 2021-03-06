const env = require('../.env')
console.log(env.token)
const Telegraf = require('telegraf')
const express = require('express');
const expressApp = express();

const API_TOKEN = env.token;
console.log('tk:' + env.token)
const PORT = 3000;
const URL = 'https://rmpcursobot.herokuapp.com/';

const bot = new Telegraf(API_TOKEN)
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`O requinte motel esta com uma super promoção ,${from.first_name}!`)
})

bot.on('text',(ctx,next) => {
    //ctx.reply('Mid 1')
    //next()
    const suite = ctx.update.message.text
    if(suite.toUpperCase() == 'HIDRO')
    {
        ctx.replyWithPhoto('http://requintemotel.com.br/wp-content/uploads/2015/05/405_big_2047_3-650x385.jpg')
    }
    else
    {
        if(suite.toUpperCase() == 'TRIPLEX')
        {
            ctx.replyWithPhoto('http://requintemotel.com.br/wp-content/uploads/2015/05/405_big_6903_8-650x385.jpg')
        }
        else
        {   
            if(suite.toUpperCase() == 'LOCAL')
            {
                ctx.replyWithLocation(-22.936716,-46.973998)
            }
            else
            { 
                ctx.reply(`Suite não disponível. Digite hidro ou triplex ou local!`)
            }
        }

    }


})

bot.on('text',(ctx,next) => {
    ctx.reply('Mid 2 😎')
    next()
})

bot.on('location',(ctx,next) => {
    const from = ctx.update.message.from
    const l = ctx.update.message.location 
    ctx.reply( `${from.first_name} , sua latitude = ${l.latitude} e longitude ${l.longitude}` )
    next()
})


bot.startPolling()

// and at the end just start server on PORT
expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});