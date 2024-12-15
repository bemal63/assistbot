import OpenAI from "openai";
import { createReadStream } from "fs";
import dotenv from "dotenv";

dotenv.config();

class OpenAi {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("API Key for OpenAI is not defined!");
    }
    this.openai = new OpenAI({
      apiKey,
    });
  }

  chat() {}

  async transcription(filepath) {
    try {
      const response = await this.openai.audio.transcriptions.create({
        model: "whisper-1",
        file: createReadStream(filepath),
      });

      return response.data.text;
    } catch (e) {
      console.log("its Error transcription", e.message);
    }
  }
}

export const openai = new OpenAi(process.env.CHAT_GPT_API_KEY);
