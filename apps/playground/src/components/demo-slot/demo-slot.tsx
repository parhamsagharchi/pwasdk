import { isDemoVisible } from "../playground-hero/playground-hero.utils";
import type { IDemoSlotProps } from "./demo-slot.types";

function DemoSlot({
  category,
  label,
  query,
  activeCategory,
  span,
  children,
}: IDemoSlotProps) {
  if (!isDemoVisible(activeCategory, category, query, label)) return null;

  const className = span ? `bento-card ${span}` : "bento-card";
  return <article className={className}>{children}</article>;
}

export default DemoSlot;
