import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakToggle,
  TweakRadio,
  TweakColor,
} from "./TweaksPanel.jsx";

const TWEAK_DEFAULTS = {
  accent: "#D6FF3D",
  ctaColor: "#FF6A1A",
  ticker: true,
  hud: true,
  badge: true,
  corners: true,
  rail: true,
  cursorGlow: true,
  grid: true,
  imageGlow: 100,
  glitchFrequency: "medium",
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const body = document.body;
    body.dataset.ticker = t.ticker ? "on" : "off";
    body.dataset.hud = t.hud ? "on" : "off";
    body.dataset.badge = t.badge ? "on" : "off";
    body.dataset.corners = t.corners ? "on" : "off";
    body.dataset.rail = t.rail ? "on" : "off";
    body.dataset.cursorGlow = t.cursorGlow ? "on" : "off";
    body.dataset.grid = t.grid ? "on" : "off";

    document.documentElement.style.setProperty("--lime", t.accent);
    document.documentElement.style.setProperty("--orange", t.ctaColor);

    const glow = document.querySelector(".hero-figure .glow");
    if (glow) {
      glow.style.opacity = (t.imageGlow / 100).toFixed(2);
    }

    window.__opusGlitchFreq = t.glitchFrequency;
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakToggle
        label="Corner brackets"
        value={t.corners}
        onChange={(v) => setTweak("corners", v)}
      />
      <TweakRadio
        label="Glitch flashes"
        value={t.glitchFrequency}
        options={["off", "rare", "medium", "often"]}
        onChange={(v) => setTweak("glitchFrequency", v)}
      />

      <TweakSection label="Chrome" />
      <TweakToggle
        label="Top ticker"
        value={t.ticker}
        onChange={(v) => setTweak("ticker", v)}
      />
      <TweakToggle
        label="Stats rail"
        value={t.rail}
        onChange={(v) => setTweak("rail", v)}
      />
      <TweakToggle
        label="Grid backdrop"
        value={t.grid}
        onChange={(v) => setTweak("grid", v)}
      />

      <TweakSection label="Color" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={["#D6FF3D", "#7CFFB2", "#FFD23F", "#9B8CFF"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakColor
        label="CTA"
        value={t.ctaColor}
        options={["#FF6A1A", "#E5484D", "#0BA5EC", "#F4F4F4"]}
        onChange={(v) => setTweak("ctaColor", v)}
      />
    </TweaksPanel>
  );
}

const el = document.getElementById("tweaks-root");
if (el) {
  createRoot(el).render(<TweaksApp />);
}
