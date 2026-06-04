"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import Switch from "@/components/shared/input/Switch";
import type { SkeletonState } from "../types";

type Props = { state: SkeletonState; update: <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => void };

export default function MotionSection({ state, update }: Props) {
  return <SectionCard title="Motion" subtitle="Motion controls for native skeleton generation."><Switch label="Motion safe" checked={state.motion} onChange={(value) => update("motion", value)} />
<Select label="Animation" value={state.animation} options={[
  "none",
  "fade",
  "scale",
  "slide",
  "shimmer"
]} onChange={(value) => update("animation", value)} />
<Slider label="Duration" value={state.duration} min={0} max={6000} step={1} onChange={(value) => update("duration", value)} />
<Switch label="Reduced motion" checked={state.reducedMotion} onChange={(value) => update("reducedMotion", value)} /></SectionCard>;
}
