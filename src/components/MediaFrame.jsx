import { MEDIA_SLOTS, ratioLabel } from "../mediaSlots.js";

export function MediaFrame({
  slot = "caseStudy",
  ratio,
  src,
  alt = "",
  label,
  meta,
  className = "",
  children,
  matchHeight = false,
}) {
  const spec = MEDIA_SLOTS[slot] || {};
  const ar = ratio || spec.ratio || "16/9";
  const fallbackLabel = label ?? `${ratioLabel(ar)} · add image`;

  return (
    <div
      className={["media-frame", matchHeight && "media-frame--match-height", className].filter(Boolean).join(" ")}
      style={matchHeight ? undefined : { aspectRatio: ar }}
      data-slot={slot}
      data-ratio={ar}
    >
      {src ? (
        <>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          {children}
        </>
      ) : (
        <>
          <div className="media-frame-fallback" aria-hidden="true" />
          {children}
          <span className="media-frame-label">{fallbackLabel}</span>
          {meta ? <span className="media-frame-meta">{meta}</span> : null}
        </>
      )}
    </div>
  );
}
