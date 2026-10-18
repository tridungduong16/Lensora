"use client";

import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Camera, X } from "lucide-react";
import { tryOnFrames } from "@/lib/try-on-frames";

const TryOnStudio = lazy(() => import("./try-on-studio"));

class TryOnBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <p className="try-on-load-error" role="alert">Chưa tải được tính năng thử kính. Hãy đóng cửa sổ này và tải lại trang để thử lại.</p>
      : this.props.children;
  }
}

function TryOnDialog({ slug, onClose }: { slug: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Removing the dialog closes it. Calling close() in effect cleanup emits a
    // delayed close event during Strict Mode's setup/cleanup replay.
    return () => { document.body.style.overflow = previous; };
  }, []);
  return (
    <dialog ref={dialogRef} className="try-on-dialog" aria-labelledby="try-on-title" aria-describedby="try-on-description" onCancel={onClose} onClose={onClose}>
      <header className="try-on-dialog__header">
        <div>
          <h2 id="try-on-title">Thử kính trên gương mặt bạn</h2>
          <p id="try-on-description">Bật camera, nhìn thẳng và tìm dáng kính bạn thích.</p>
        </div>
        <button type="button" className="try-on-close" aria-label="Đóng thử kính" onClick={onClose} autoFocus><X size={22} aria-hidden="true" /></button>
      </header>
      <TryOnBoundary>
        <Suspense fallback={<p className="try-on-load-error" role="status">Đang chuẩn bị phòng thử kính…</p>}>
          <TryOnStudio initialSlug={slug} />
        </Suspense>
      </TryOnBoundary>
    </dialog>
  );
}

export function VirtualTryOn({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previouslyOpen = useRef(false);
  useEffect(() => {
    if (!open && previouslyOpen.current) triggerRef.current?.focus({ preventScroll: true });
    previouslyOpen.current = open;
  }, [open]);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  if (!tryOnFrames[slug]) return null;
  return (
    <div className="product-try-on">
      <button ref={triggerRef} type="button" className="outline-button" aria-haspopup="dialog" onClick={handleOpen}>
        <Camera size={19} aria-hidden="true" />Thử kính bằng camera
      </button>
      <p>Xem dáng kính trên gương mặt bạn, ngay tại đây.</p>
      {open && <TryOnDialog slug={slug} onClose={handleClose} />}
    </div>
  );
}
