import { act, render, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { useTryOnCamera } from "./use-try-on-camera";

const settings = { frame: null, eyeLine: 0.43, scale: 1, offset: 0 };

beforeEach(() => {
  vi.stubGlobal("isSecureContext", true);
  vi.stubGlobal("createImageBitmap", vi.fn());
  vi.stubGlobal("Worker", class { terminate = vi.fn(); postMessage = vi.fn(); });
  Object.defineProperty(navigator, "mediaDevices", { configurable: true, value: { getUserMedia: vi.fn() } });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({ clearRect: vi.fn() } as unknown as CanvasRenderingContext2D);
});

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

test("asks for camera permission only after an explicit start and requests no microphone", async () => {
  const getUserMedia = vi.mocked(navigator.mediaDevices.getUserMedia).mockRejectedValue(new DOMException("denied", "NotAllowedError"));
  const { result } = renderHook(() => useTryOnCamera(settings));
  expect(getUserMedia).not.toHaveBeenCalled();
  await act(() => result.current.start());
  expect(getUserMedia).toHaveBeenCalledWith(expect.objectContaining({ audio: false, video: expect.objectContaining({ facingMode: "user" }) }));
  expect(result.current.status).toBe("error");
  expect(result.current.error).toMatch(/quyền camera/);
});

test("stops a stream whose permission resolves after the dialog has unmounted", async () => {
  let grant!: (stream: MediaStream) => void;
  vi.mocked(navigator.mediaDevices.getUserMedia).mockImplementation(() => new Promise((resolve) => { grant = resolve; }));
  const stop = vi.fn();
  const { result, unmount } = renderHook(() => useTryOnCamera(settings));
  let pending!: Promise<void>;
  act(() => { pending = result.current.start(); });
  unmount();
  await act(async () => {
    grant({ getTracks: () => [{ stop }] } as unknown as MediaStream);
    await pending;
  });
  expect(stop).toHaveBeenCalledOnce();
});

test("releases a granted camera immediately when stopped while playback is pending", async () => {
  const stop = vi.fn();
  const track = { stop, addEventListener: vi.fn() };
  const stream = { getTracks: () => [track], getVideoTracks: () => [track] } as unknown as MediaStream;
  vi.mocked(navigator.mediaDevices.getUserMedia).mockResolvedValue(stream);
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => new Promise(() => {}));
  let camera!: ReturnType<typeof useTryOnCamera>;
  function Harness() {
    camera = useTryOnCamera(settings);
    return <><video ref={camera.videoRef} /><canvas ref={camera.canvasRef} /></>;
  }
  render(<Harness />);
  act(() => { void camera.start(); });
  await waitFor(() => expect(camera.videoRef.current?.srcObject).toBe(stream));
  act(() => camera.stop());
  expect(stop).toHaveBeenCalledOnce();
  expect(camera.videoRef.current?.srcObject).toBeNull();
  expect(camera.status).toBe("paused");
});

test("explains insecure origins without trying to request permission", async () => {
  vi.stubGlobal("isSecureContext", false);
  const { result } = renderHook(() => useTryOnCamera(settings));
  await act(() => result.current.start());
  expect(navigator.mediaDevices.getUserMedia).not.toHaveBeenCalled();
  expect(result.current.error).toMatch(/HTTPS/);
});
