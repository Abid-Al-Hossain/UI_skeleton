"use client";

import type { CSSProperties } from "react";
import type { SkeletonState } from "../types";

function shell(state: SkeletonState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.55 : 1,
  };
}

function blockStyle(state: SkeletonState, width: string, height: number, radius = state.radius / 2): CSSProperties {
  const animated = state.motion && !state.reducedMotion && state.animation !== "none" && state.duration > 0;
  return {
    width,
    height,
    borderRadius: radius,
    background: animated && state.animation === "shimmer"
      ? `linear-gradient(90deg, ${state.muted} 0%, ${state.accent} 45%, ${state.muted} 90%)`
      : state.muted,
    backgroundSize: animated && state.animation === "shimmer" ? "220% 100%" : undefined,
    animation: animated ? `${state.animation === "shimmer" ? "skeleton-shimmer" : "skeleton-pulse"} ${state.duration}ms ease-in-out infinite` : undefined,
  };
}

function Lines({ state }: { state: SkeletonState }) {
  return (
    <div aria-hidden="true" className="grid gap-3">
      {Array.from({ length: state.lineCount }, (_, index) => (
        <span key={index} style={blockStyle(state, index === state.lineCount - 1 ? "58%" : "100%", Math.max(10, state.bodySize))} />
      ))}
    </div>
  );
}

export default function LivePreview({ state }: { state: SkeletonState }) {
  const showCardMedia = state.pattern === "card" && state.showMedia;
  const showAvatar = state.showAvatar || state.pattern === "avatar";
  const isTable = state.pattern === "table";

  return (
    <section
      id={state.id}
      role={state.role}
      aria-label={state.ariaLabel}
      aria-live={state.role === "status" ? "polite" : undefined}
      aria-busy={!state.disabled}
      tabIndex={state.tabIndex}
      style={shell(state)}
      className="grid content-start gap-4"
    >
      <style>{`
        @keyframes skeleton-shimmer { from { background-position: 120% 0; } to { background-position: -120% 0; } }
        @keyframes skeleton-pulse { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 1; transform: scale(.985); } }
        @media (prefers-reduced-motion: reduce) { [data-skeleton-piece="true"] { animation: none !important; } }
      `}</style>
      <span className="sr-only">{state.ariaLabel}</span>
      <div className="grid gap-1">
        <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
        <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      </div>
      <div className="grid gap-4" data-skeleton-pattern={state.pattern}>
        {showCardMedia && <span data-skeleton-piece="true" aria-hidden="true" style={blockStyle(state, "100%", Math.max(96, state.height / 3), state.radius)} />}
        {isTable ? (
          <div className="grid gap-3" aria-hidden="true">
            {Array.from({ length: state.lineCount }, (_, row) => (
              <div key={row} className="grid grid-cols-[1.2fr_.8fr_.6fr] gap-3">
                <span data-skeleton-piece="true" style={blockStyle(state, "100%", 16)} />
                <span data-skeleton-piece="true" style={blockStyle(state, "100%", 16)} />
                <span data-skeleton-piece="true" style={blockStyle(state, "100%", 16)} />
              </div>
            ))}
          </div>
        ) : (
          <div className={showAvatar ? "grid grid-cols-[auto_1fr] items-start gap-4" : "grid gap-3"}>
            {showAvatar && <span data-skeleton-piece="true" aria-hidden="true" style={blockStyle(state, `${Math.max(44, state.titleSize * 2)}px`, Math.max(44, state.titleSize * 2), 999)} />}
            <Lines state={state} />
          </div>
        )}
      </div>
      <p className="text-xs" style={{ color: state.muted }}>{state.helper}</p>
    </section>
  );
}
