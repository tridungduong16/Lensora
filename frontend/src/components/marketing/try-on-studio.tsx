"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Download, RotateCcw, ShieldCheck } from "lucide-react";
import { prepareFrame, tryOnFrames, tryOnProducts } from "@/lib/try-on-frames";
import { useTryOnCamera } from "./use-try-on-camera";

export default function TryOnStudio({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [frame, setFrame] = useState<HTMLCanvasElement | null>(null);
  const [assetError, setAssetError] = useState(false);
  const [assetAttempt, setAssetAttempt] = useState(0);
  const [scale, setScale] = useState(100);
  const [offset, setOffset] = useState(0);
  const [saveMessage, setSaveMessage] = useState("");
  const framePreviewRef = useRef<HTMLCanvasElement>(null);
  const product = tryOnProducts.find((item) => item.slug === slug)!;
  const settings = { frame, eyeLine: tryOnFrames[slug].eyeLine, scale: scale / 100, offset: offset / 100 };
  const { videoRef, canvasRef, status, error, aligned, start, stop } = useTryOnCamera(settings);
  const live = status === "active" || status === "loading";

  useEffect(() => {
    let cancelled = false;
    setFrame(null);
    setAssetError(false);
    setSaveMessage("");
    setScale(100);
    setOffset(0);
    prepareFrame(slug).then((asset) => {
      if (!cancelled) setFrame(asset);
    }).catch(() => { if (!cancelled) setAssetError(true); });
    return () => { cancelled = true; };
  }, [slug, assetAttempt]);

  useEffect(() => {
    const canvas = framePreviewRef.current;
    if (!canvas || !frame) return;
    canvas.width = frame.width;
    canvas.height = frame.height;
    canvas.getContext("2d")?.drawImage(frame, 0, 0);
  }, [frame]);

  const reset = useCallback(() => { setScale(100); setOffset(0); }, []);
  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !aligned || status !== "active" || !frame) return;
    try {
      canvas.toBlob((blob) => {
        if (!blob) { setSaveMessage("Chưa lưu được ảnh. Hãy thử lại."); return; }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `anh-thi-thu-kinh-${slug}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setSaveMessage("Đã tạo ảnh thử kính để lưu vào thiết bị.");
      }, "image/png");
    } catch { setSaveMessage("Trình duyệt chưa lưu được ảnh. Hãy thử lại bằng Chrome hoặc Safari."); }
  }, [aligned, canvasRef, frame, slug, status]);

  const trackingMessage = status === "loading"
    ? "Đang mở camera và chuẩn bị nhận diện…"
    : aligned ? "Kính đã căn theo gương mặt" : "Nhìn thẳng, đưa mặt vào giữa và giữ đủ sáng";

  return (
    <div className="try-on-studio">
      <div className="try-on-stage" data-live={live}>
        <video ref={videoRef} muted playsInline aria-hidden="true" className="try-on-video" />
        <canvas ref={canvasRef} className="try-on-canvas" role="img" aria-label={`Hình thử kính ${product.name} qua camera`} hidden={!live} />
        {!live && (
          <div className="try-on-stage__intro">
            <Camera size={34} strokeWidth={1.5} aria-hidden="true" />
            <h3>{status === "error" ? "Chưa mở được camera" : status === "paused" ? "Camera đã tắt" : "Chiếc gương nhỏ của bạn"}</h3>
            <p role={error ? "alert" : undefined}>{error || (status === "paused" ? "Bật lại camera khi bạn sẵn sàng thử tiếp." : "Cho phép dùng camera trước. Kính sẽ tự căn theo gương mặt khi bạn nhìn thẳng.")}</p>
            <button type="button" className="primary-button" onClick={start} disabled={!frame || assetError}>
              <Camera size={18} aria-hidden="true" />{status === "idle" ? "Bật camera để thử" : "Bật lại camera"}
            </button>
          </div>
        )}
        {live && <p className="try-on-tracking" role="status">{trackingMessage}</p>}
        {live && <button type="button" className="try-on-stop" onClick={stop}><CameraOff size={17} aria-hidden="true" />Tắt camera</button>}
      </div>
      <div className="try-on-controls">
        <div className="try-on-current">
          <canvas ref={framePreviewRef} role="img" aria-label={`Mặt trước ${product.name}`} />
          <label htmlFor="try-on-product">Mẫu kính đang thử</label>
          <select id="try-on-product" value={slug} onChange={(event) => setSlug(event.target.value)}>
            {tryOnProducts.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
          </select>
          <p>{product.shape} · {product.material}</p>
        </div>
        {assetError ? <p className="try-on-error" role="alert">Chưa tải được ảnh kính. <button type="button" className="text-button" onClick={() => setAssetAttempt((value) => value + 1)}>Tải lại ảnh</button></p> : !frame && <p className="try-on-note" role="status">Đang chuẩn bị ảnh kính…</p>}
        <fieldset className="try-on-adjustments" disabled={!frame}>
          <legend>Căn chỉnh theo ý bạn</legend>
          <label htmlFor="try-on-scale">Độ lớn <output>{scale}%</output></label>
          <input id="try-on-scale" type="range" min="80" max="120" value={scale} onChange={(event) => setScale(Number(event.target.value))} />
          <label htmlFor="try-on-offset">Vị trí cao / thấp <output>{offset > 0 ? "+" : ""}{offset}</output></label>
          <input id="try-on-offset" type="range" min="-25" max="25" value={offset} onChange={(event) => setOffset(Number(event.target.value))} />
          <button type="button" className="text-button" onClick={reset}><RotateCcw size={15} aria-hidden="true" />Đặt lại căn chỉnh</button>
        </fieldset>
        <button type="button" className="outline-button try-on-save" disabled={status !== "active" || !aligned || !frame} onClick={handleSave}>
          <Download size={17} aria-hidden="true" />Lưu ảnh thử kính
        </button>
        <p className="try-on-note" role="status">{saveMessage || "Nhìn thẳng vào camera để căn kính và lưu ảnh."}</p>
        <p className="try-on-privacy"><ShieldCheck size={18} aria-hidden="true" /><span>Hình ảnh được xử lý trên thiết bị, không gửi lên máy chủ. Camera tự tắt khi đóng hoặc rời cửa sổ này.</span></p>
        <p className="try-on-disclaimer">Mô phỏng 2D từ ảnh sản phẩm, giúp tham khảo kiểu dáng. Màu sắc và kích thước thực tế cần được kiểm tra khi thử tại cửa hàng.</p>
      </div>
    </div>
  );
}
