import { useEffect, useState } from "react";
import { buildImageUrl, buildMediaUrl } from "../lib/api";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
};

export function VideoModal({ open, onClose, errorMessage }: VideoModalProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setHasError(false);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Company video">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close video">
        ×
      </button>
      {hasError ? (
        <div className="video-fallback">
          <img src={buildImageUrl("/images/about-poster.webp")} alt="" />
          <p>{errorMessage}</p>
        </div>
      ) : (
        <video
          controls
          autoPlay
          poster={buildImageUrl("/images/about-poster.webp")}
          onError={() => setHasError(true)}
        >
          <source src={buildMediaUrl("about-video.mp4")} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
