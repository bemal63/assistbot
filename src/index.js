import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";
import {oggConvert} from "./oggConvert.js"

dotenv.config()
const bot = new Telegraf(process.env.BOT_API_KEY);

bot.on(message("voice"), async (ctx) => {
  try {
    const linkVoice = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const userId = String(ctx.message.from.id)
    const oggPath = await oggConvert.create(linkVoice.href, userId)
    const mp3Path = await oggConvert.toMp3(oggPath, userId);
    console.log(linkVoice.href)
    await ctx.reply(mp3Path);
  } catch (e) {
    console.log(`Its error`, e.message);
  }
});

bot.on("text", async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.message, null, 1));
});

bot.command("start", async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.message, null, 1));
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
