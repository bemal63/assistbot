import axios from "axios";
import { createWriteStream } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";

const __dirmane = dirname(fileURLToPath(import.meta.url));

class OggConvertToMp3 {
  constructor() {
    ffmpeg.setFfmpegPath(installer.path);
  }

  toMp3(input, output) {
    try {
      const outputPath = resolve(dirname(input), `${output}.mp3`);
      return new Promise((resolve, reject) => {
        ffmpeg(input)
          .inputOption("-t 30")
          .output(outputPath)
          .on("end", () => resolve(outputPath))
          .on("Error", (err) => reject(err.message))
          .run();
      });
    } catch (e) {
      console.log("its Error mp3", e.message);
    }
  }

  async create(url, filename) {
    try {
      const oggPath = resolve(__dirmane, "../voice", `${filename}.ogg`);
      const response = await axios({
        method: "get",
        url,
        responseType: "stream",
      });
      return new Promise((resolve) => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on("finish", () => resolve(oggPath));
      });
    } catch (e) {
      console.log("its Error ogg", e.message);
    }
  }
}

export const oggConvert = new OggConvertToMp3();
