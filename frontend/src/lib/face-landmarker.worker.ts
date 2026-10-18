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
      const files = await FilesetResolver.forVisionTasks(`${message.origin}/mediapipe/wasm`);
      tracker = await FaceLandmarker.createFromOptions(files, {
        baseOptions: {
          modelAssetPath: `${message.origin}/mediapipe/face_landmarker.task`,
          delegate: "CPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
        minFaceDetectionConfidence: 0.6,
        minFacePresenceConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });
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
