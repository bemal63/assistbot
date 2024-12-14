import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import dotenv from "dotenv";

dotenv.config()
const bot = new Telegraf(process.env.BOT_API_KEY);

bot.on(message("voice"), async (ctx) => {
  try {
    const linkVoice = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    console.log(linkVoice.href)
    await ctx.reply(JSON.stringify(linkVoice, null, 1));
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
