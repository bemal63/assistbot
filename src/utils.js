import {unlink} from "fs/promises";

export async function removeVoiceFile(path) {
  try {
    await unlink(path)
  } catch (e) {
    console.log("its error remove voice", e.message);
  }
}