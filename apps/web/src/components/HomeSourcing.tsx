import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowIcon, ChevronIcon, ChevronLeftIcon } from "../icons";
import { buildImageUrl } from "../lib/api";

type HomeSourcingProps = {
  title: string;
  body: string;
  cta: string;
  steps: {
    title: string;
    body: string;
    label: string;
  }[];
  gallery: {
    imageUrl: string;
    alt: string;
    caption: string;
  }[];
};

export function HomeSourcing({
  title,
  cta,
  steps,
  gallery,
}: HomeSourcingProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slideDirection, setSlideDirection] = useState<-1 | 1 | null>(null);
  const dragStartX = useRef<number | null>(null);
  const previewStageRef = useRef<HTMLDivElement | null>(null);
  const selectedImage = selectedIndex === null ? null : gallery[selectedIndex];
  const hasMultipleImages = gallery.length > 1;

  const imageCountLabel = useMemo(() => {
    if (selectedIndex === null) return "";
    return `${selectedIndex + 1} / ${gallery.length}`;
  }, [gallery.length, selectedIndex]);

  function closePreview() {
    setSelectedIndex(null);
    setDragOffset(0);
    setIsDragging(false);
    setSlideDirection(null);
    dragStartX.current = null;
  }

  function getAdjacentIndex(direction: -1 | 1) {
    if (selectedIndex === null) return 0;
    return (selectedIndex + direction + gallery.length) % gallery.length;
  }

  function startSlide(direction: -1 | 1) {
    if (!hasMultipleImages || slideDirection !== null) return;
    setIsDragging(false);
    setDragOffset(0);
    setSlideDirection(direction);
  }

  function showAdjacentImage(direction: -1 | 1) {
    startSlide(direction);
  }

  function finishSlide() {
    if (slideDirection === null) return;

    setIsDragging(true);
    setSelectedIndex((current) => {
      if (current === null) return current;
      return (current + slideDirection + gallery.length) % gallery.length;
    });
    setSlideDirection(null);
    setDragOffset(0);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsDragging(false);
      });
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!hasMultipleImages || slideDirection !== null) return;
    dragStartX.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (dragStartX.current === null || slideDirection !== null) return;

    const stageWidth = previewStageRef.current?.clientWidth ?? 1;
    const distance = event.clientX - dragStartX.current;
    const limitedDistance = Math.max(Math.min(distance, stageWidth), -stageWidth);
    setDragOffset(limitedDistance);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
    if (dragStartX.current === null) return;

    const distance = event.clientX - dragStartX.current;
    const stageWidth = previewStageRef.current?.clientWidth ?? 0;
    const threshold = Math.max(42, stageWidth * 0.16);
    dragStartX.current = null;
    setIsDragging(false);

    if (Math.abs(distance) < threshold) {
      setDragOffset(0);
      return;
    }

    startSlide(distance < 0 ? 1 : -1);
  }

  function handleControlPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  function handleControlClick(event: React.MouseEvent<HTMLButtonElement>, direction: -1 | 1) {
    event.stopPropagation();
    showAdjacentImage(direction);
  }

  useEffect(() => {
    if (!selectedImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePreview();
      }

      if (event.key === "ArrowLeft") {
        showAdjacentImage(-1);
      }

      if (event.key === "ArrowRight") {
        showAdjacentImage(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, selectedImage]);

  return (
    <section className="section home-sourcing">
      <div className="shell home-sourcing-shell">
        <div className="home-sourcing-header">
          <div className="section-copy">
            <h2>{title}</h2>
          </div>
        </div>

        <ol className="home-delivery-chain">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{step.label}</small>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="home-delivery-gallery">
          {gallery.map((item, index) => (
            <button
              className="home-gallery-trigger"
              key={item.imageUrl}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View larger image: ${item.caption}`}
            >
              <figure>
                <img src={buildImageUrl(item.imageUrl)} alt={item.alt} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            </button>
          ))}
        </div>

        <Link className="button button-primary home-sourcing-cta" to="/contact">
          {cta}
          <ArrowIcon />
        </Link>
      </div>

      {selectedImage &&
        createPortal(
          <div
            className="modal-backdrop image-preview-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.caption}
            onClick={closePreview}
          >
            <figure
              className="image-preview"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                dragStartX.current = null;
                setIsDragging(false);
                setDragOffset(0);
              }}
            >
              <button
                className="image-preview-close"
                type="button"
                onPointerDown={handleControlPointerDown}
                onClick={closePreview}
                aria-label="Close image preview"
              >
                ×
              </button>

              {hasMultipleImages && (
                <>
                  <button
                    className="image-preview-nav image-preview-prev"
                    type="button"
                    onPointerDown={handleControlPointerDown}
                    onClick={(event) => handleControlClick(event, -1)}
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    className="image-preview-nav image-preview-next"
                    type="button"
                    onPointerDown={handleControlPointerDown}
                    onClick={(event) => handleControlClick(event, 1)}
                    aria-label="Next image"
                  >
                    <ChevronIcon />
                  </button>
                </>
              )}

              <div className="image-preview-stage" ref={previewStageRef}>
                <div
                  className={`image-preview-track ${isDragging ? "dragging" : ""}`}
                  style={{
                    transform: hasMultipleImages
                      ? slideDirection === 1
                        ? "translateX(-200%)"
                        : slideDirection === -1
                          ? "translateX(0)"
                          : `translateX(calc(-100% + ${dragOffset}px))`
                      : "translateX(0)",
                  }}
                  onTransitionEnd={finishSlide}
                >
                  {hasMultipleImages && (
                    <img
                      src={buildImageUrl(gallery[getAdjacentIndex(-1)].imageUrl)}
                      alt={gallery[getAdjacentIndex(-1)].alt}
                    />
                  )}
                  <img src={buildImageUrl(selectedImage.imageUrl)} alt={selectedImage.alt} />
                  {hasMultipleImages && (
                    <img
                      src={buildImageUrl(gallery[getAdjacentIndex(1)].imageUrl)}
                      alt={gallery[getAdjacentIndex(1)].alt}
                    />
                  )}
                </div>
              </div>
              <figcaption>
                <span>{selectedImage.caption}</span>
                {hasMultipleImages && (
                  <div className="image-preview-pagination" aria-label={imageCountLabel}>
                    {gallery.map((item, index) => (
                      <button
                        key={item.imageUrl}
                        className={index === selectedIndex ? "active" : undefined}
                        type="button"
                        onPointerDown={handleControlPointerDown}
                        onClick={() => setSelectedIndex(index)}
                        aria-label={`View image ${index + 1} of ${gallery.length}`}
                        aria-current={index === selectedIndex ? "true" : undefined}
                      />
                    ))}
                  </div>
                )}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </section>
  );
}
