"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Select from "@/components/shared/input/Select";
import type { SkeletonState } from "../types";

type Props = { state: SkeletonState; update: <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native skeleton generation."><Select label="Pattern" value={state.pattern} options={[
  "text",
  "card",
  "table",
  "avatar"
]} onChange={(value) => update("pattern", value)} /></SectionCard>;
}
