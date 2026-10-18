import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import type { FacePoint } from "./try-on-geometry";

export type TrackerRequest =
  | { type: "init"; origin: string }
  | { type: "frame"; bitmap: ImageBitmap; timestamp: number };
export type TrackerResponse =
  | { type: "ready" }
  | { type: "result"; landmarks: FacePoint[] }
  | { type: "error" };

let tracker: FaceLandmarker | undefined;
const reply = (message: TrackerResponse) => self.postMessage(message);

self.onmessage = async (event: MessageEvent<TrackerRequest>) => {
  const message = event.data;
  try {
    if (message.type === "init") {
      // Keep binary downloads off the storefront's limited outbound connection.
      // These are pinned public assets; camera frames never leave this worker.
      const sources = [
        {
          wasm: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm",
          model: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        {
          wasm: `${message.origin}/mediapipe/wasm`,
          model: `${message.origin}/mediapipe/face_landmarker.task`,
        },
      ];
      for (const source of sources) {
        try {
          const files = await FilesetResolver.forVisionTasks(source.wasm);
          tracker = await FaceLandmarker.createFromOptions(files, {
            baseOptions: { modelAssetPath: source.model, delegate: "CPU" },
            runningMode: "VIDEO",
            numFaces: 1,
            minFaceDetectionConfidence: 0.6,
            minFacePresenceConfidence: 0.6,
            minTrackingConfidence: 0.6,
          });
          break;
        } catch {
          // Retry from the website if a browser or network blocks the CDN.
          tracker?.close();
          tracker = undefined;
        }
      }
      if (!tracker) throw new Error("Face tracking assets unavailable");
      reply({ type: "ready" });
    } else {
      try {
        if (!tracker) throw new Error("Tracker not ready");
        const result = tracker.detectForVideo(message.bitmap, message.timestamp);
        reply({ type: "result", landmarks: result.faceLandmarks[0] ?? [] });
      } finally {
        message.bitmap.close();
      }
    }
  } catch {
    tracker?.close();
    tracker = undefined;
    reply({ type: "error" });
  }
};
