// app/components/tabs/DesignTab.tsx
"use client";

import type { DesignKey } from "@/shared/design";

type DesignOption = {
  key: DesignKey;
  label: string;
  bgColor?: string;
};

type Props = {
  value: DesignKey;
  designs: DesignOption[];
  onChange: (next: DesignKey) => void;
  variant?: "default" | "swatch";
};

export default function DesignTab({
  value,
  designs,
  onChange,
  variant = "default",
}: Props) {
  const isSwatch = variant === "swatch";

  return (
    <div className="space-y-3 pt-4 text-sm">
      <p>カードの背景デザインを選択してください。</p>

      <div className={isSwatch ? "grid grid-cols-6 gap-2" : "grid gap-2"}>
        {designs.map((d) => {
          if (isSwatch) {
            // 🎨 Canva風：丸い色チップ
            const active = value === d.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => onChange(d.key)}
                className="relative flex h-8 w-8 items-center justify-center"
                aria-label={d.label}
              >
                <span
                  className="h-7 w-7 rounded-full border border-zinc-300"
                  style={{ backgroundColor: d.bgColor ?? "#ffffff" }}
                />
                {active && (
                  <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-pink-500" />
                )}
              </button>
            );
          }

          // 🧱 通常ボタン（イラスト・素材など）
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => onChange(d.key)}
              className={`rounded border px-3 py-2 text-left flex items-center gap-2 ${
                value === d.key
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-zinc-100"
              }`}
            >
              {d.bgColor && (
                <span
                  className="h-4 w-4 rounded border border-zinc-300"
                  style={{ backgroundColor: d.bgColor }}
                />
              )}
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
