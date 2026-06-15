"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { SkeletonState } from "../types";

type Props = { state: SkeletonState; update: <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Animation" subtitle="Loading animation style and timing.">
        <Select label="Animation" value={state.animation} options={["shimmer", "fade", "scale", "slide", "none"]} onChange={(value) => update("animation", value)} />
        <Slider label="Duration (ms)" value={state.duration} min={500} max={3000} step={100} onChange={(value) => update("duration", value)} />
        <Switch label="Reduced motion" checked={state.reducedMotion} onChange={(value) => update("reducedMotion", value)} />
      </SectionCard>
      <SectionCard title="Content Slots" subtitle="Show avatar and media placeholder slots.">
        <Switch label="Show avatar" checked={state.showAvatar} onChange={(value) => update("showAvatar", value)} />
        <Switch label="Show media" checked={state.showMedia} onChange={(value) => update("showMedia", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
