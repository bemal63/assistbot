import {Telegraf} from 'telegraf';
import {message} from "telegraf/filters";
import config from 'config';

const bot = new Telegraf(config.get(process.env.BOT_API_KEY));

bot.on(message("voice"), async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message.voice, null, 1))
})

bot.on("text", async ctx => {
    await ctx.reply(JSON.stringify(ctx.message, null, 1))
})

bot.command("start", async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.message, null, 1));
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
