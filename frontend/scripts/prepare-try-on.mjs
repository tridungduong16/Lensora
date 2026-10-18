import { cp, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "node_modules/@mediapipe/tasks-vision");
const { version } = JSON.parse(await readFile(resolve(source, "package.json"), "utf8"));
if (version !== "0.10.32") throw new Error("Revalidate the Face Landmarker runtime before changing its version.");
await mkdir(resolve(root, "public/mediapipe/wasm"), { recursive: true });
await cp(resolve(source, "wasm"), resolve(root, "public/mediapipe/wasm"), { recursive: true });
