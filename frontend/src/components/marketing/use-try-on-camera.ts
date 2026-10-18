"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cameraErrorMessage, getGlassesPose, smoothPose, type GlassesPose } from "@/lib/try-on-geometry";
import type { TrackerRequest, TrackerResponse } from "@/lib/face-landmarker.worker";

export type CameraStatus = "idle" | "loading" | "active" | "paused" | "error";
export type TryOnSettings = { frame: HTMLCanvasElement | null; eyeLine: number; scale: number; offset: number };

export function useTryOnCamera(settings: TryOnSettings) {
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [error, setError] = useState("");
  const [aligned, setAligned] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  const session = useRef(0);
  const resources = useRef<{
    stream?: MediaStream;
    worker?: Worker;
    animation?: number;
    timeout?: ReturnType<typeof setTimeout>;
  }>({});

  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const release = useCallback(() => {
    session.current += 1;
    const { stream, worker, animation, timeout } = resources.current;
    resources.current = {};
    if (animation !== undefined) cancelAnimationFrame(animation);
    if (timeout !== undefined) clearTimeout(timeout);
    stream?.getTracks().forEach((track) => track.stop());
    worker?.terminate();
    if (videoRef.current) videoRef.current.srcObject = null;
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const stop = useCallback(() => {
    release();
    setAligned(false);
    setStatus("paused");
  }, [release]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && resources.current.stream) stop();
    };
    const onPageHide = () => stop();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      release();
    };
  }, [release, stop]);

  const start = useCallback(async () => {
    release();
    const id = session.current;
    setAligned(false);
    setError("");
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setError("Camera cần kết nối HTTPS hoặc localhost. Hãy mở địa chỉ HTTPS của cửa hàng bằng trình duyệt để thử kính.");
      setStatus("error");
      return;
    }
    if (typeof Worker === "undefined" || typeof createImageBitmap === "undefined") {
      setError("Trình duyệt này chưa hỗ trợ thử kính. Hãy mở trang bằng Chrome, Edge hoặc Safari phiên bản mới.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    const fail = (message: string) => {
      if (id !== session.current) return;
      release();
      setAligned(false);
      setError(message);
      setStatus("error");
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 }, frameRate: { ideal: 24, max: 30 } },
      });
      // Permission may resolve after closing the dialog or cancelling a start.
      if (id !== session.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      resources.current.stream = stream;
      if (document.hidden) { stop(); return; }
      resources.current.timeout = setTimeout(() => fail("Khởi động camera mất quá lâu. Kiểm tra camera và kết nối mạng rồi thử lại."), 120000);
      stream.getVideoTracks().forEach((track) => track.addEventListener("ended", () => {
        fail("Camera đã ngắt kết nối. Kiểm tra camera rồi bấm bật lại.");
      }, { once: true }));
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) throw new Error("Camera surface unavailable");
      video.srcObject = stream;
      await video.play();
      if (id !== session.current) return;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      const worker = new Worker(new URL("../../lib/face-landmarker.worker.ts", import.meta.url));
      resources.current.worker = worker;
      let ready = false;
      let busy = false;
      let lastSent = 0;
      let lastVideoTime = -1;
      let lastResult = 0;
      let pose: GlassesPose | null = null;
      const send = (message: TrackerRequest, transfer: Transferable[] = []) => worker.postMessage(message, transfer);
      worker.onerror = () => fail(cameraErrorMessage(new Error("Face tracking unavailable")));
      worker.onmessage = (event: MessageEvent<TrackerResponse>) => {
        if (id !== session.current) return;
        if (event.data.type === "error") {
          fail(cameraErrorMessage(new Error("Face tracking unavailable")));
        } else if (event.data.type === "ready") {
          clearTimeout(resources.current.timeout);
          ready = true;
          setStatus("active");
        } else {
          busy = false;
          const next = getGlassesPose(event.data.landmarks, canvas.width, canvas.height);
          pose = next ? smoothPose(pose, next) : null;
          lastResult = performance.now();
          setAligned(!!pose);
        }
      };
      send({ type: "init", origin: window.location.origin });
      const render = (now: number) => {
        if (id !== session.current) return;
        if (video.readyState >= 2 && video.videoWidth) {
          const width = Math.min(video.videoWidth, 960);
          const height = Math.round(width * video.videoHeight / video.videoWidth);
          if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
          context.clearRect(0, 0, width, height);
          context.save();
          context.translate(width, 0);
          context.scale(-1, 1);
          context.drawImage(video, 0, 0, width, height);
          context.restore();
          const { frame, eyeLine, scale, offset } = settingsRef.current;
          if (pose && now - lastResult < 500 && frame) {
            const frameWidth = pose.width * scale;
            const frameHeight = frameWidth * frame.height / frame.width;
            context.save();
            context.translate(width - pose.x, pose.y);
            context.rotate(-pose.angle);
            context.drawImage(frame, -frameWidth / 2, -frameHeight * eyeLine + frameHeight * offset, frameWidth, frameHeight);
            context.restore();
          } else if (pose && now - lastResult >= 500) {
            pose = null;
            setAligned(false);
          }
          // One frame in flight, capped at 15 inferences/s; ML never blocks the UI.
          if (busy && now - lastSent > 8000) {
            fail("Nhận diện khuôn mặt đã bị gián đoạn. Bật lại camera để thử tiếp.");
            return;
          }
          if (ready && !busy && now - lastSent >= 66 && video.currentTime !== lastVideoTime) {
            busy = true;
            lastSent = now;
            lastVideoTime = video.currentTime;
            createImageBitmap(video, { resizeWidth: 640, resizeHeight: Math.round(640 * video.videoHeight / video.videoWidth) })
              .then((bitmap) => {
                if (id !== session.current) { bitmap.close(); return; }
                send({ type: "frame", bitmap, timestamp: now }, [bitmap]);
              })
              .catch(() => fail(cameraErrorMessage(new Error("Camera frame unavailable"))));
          }
        }
        resources.current.animation = requestAnimationFrame(render);
      };
      resources.current.animation = requestAnimationFrame(render);
    } catch (cause) {
      fail(cameraErrorMessage(cause));
    }
  }, [release, stop]);

  return { videoRef, canvasRef, status, error, aligned, start, stop };
}
