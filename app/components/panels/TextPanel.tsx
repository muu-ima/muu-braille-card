"use client";

import { useState } from "react";
import type { Block } from "@/shared/blocks";
import type { FontSizeDelta } from "@/shared/fonts";
import TextTab from "@/app/components/tabs/TextTab";
import PanelSection from "@/app/components/panels/PanelSection";
import { toBraille } from "@/shared/braille";

type Side = "front" | "back";

function SideToggle({
  side,
  onChangeSide,
}: {
  side: Side;
  onChangeSide: (s: Side) => void;
}) {
  return (
    <div
      className="inline-flex rounded-xl bg-white/60 backdrop-blur p-1
      shadow-[0_1px_0_rgba(0,0,0,0.08)]"
    >
      <button
        type="button"
        onClick={() => onChangeSide("front")}
        className={[
          "px-3 py-1.5 text-sm rounded-lg transition",
          side === "front"
            ? "bg-pink-500/15 text-pink-700"
            : "text-zinc-600 hover:bg-zinc-900/5",
        ].join(" ")}
      >
        表面
      </button>
      <button
        type="button"
        onClick={() => onChangeSide("back")}
        className={[
          "px-3 py-1.5 text-sm rounded-lg transition",
          side === "back"
            ? "bg-pink-500/15 text-pink-700"
            : "text-zinc-600 hover:bg-zinc-900/5",
        ].join(" ")}
      >
        裏面
      </button>
    </div>
  );
}

export default function TextPanel({
  side,
  onChangeSide,
  blocks,
  onAddBlock,
  isPreview,
  onChangeText,
  onCommitText,
  onBumpFontSize,
}: {
  side: Side;
  onChangeSide: (s: Side) => void;
  blocks: Block[];
  onAddBlock: () => void;
  isPreview: boolean;
  onChangeText: (id: string, value: string) => void;
  onCommitText: (id: string, value: string) => void;
  onBumpFontSize?: (id: string, delta: FontSizeDelta) => void;
}) {
  // 点字を流し込む対象ブロック（さっき作った braille-main）
  const brailleBlock = blocks.find((b) => b.id === "braille-main") ?? blocks[0];

  // テキストエリアに表示する「かな」の生テキスト
  const [rawBraille, setRawBraille] = useState("");

  const handleChangeBraille = (value: string) => {
    setRawBraille(value);
    if (!brailleBlock) return;

    const converted = toBraille(value);
    // キャンバス側のブロックには点字を流し込む
    onChangeText(brailleBlock.id, converted);
  };

  const handleCommitBraille = () => {
    if (!brailleBlock) return;

    const converted = toBraille(rawBraille);
    onCommitText(brailleBlock.id, converted);
  };
  return (
    <div className="space-y-4">
      <PanelSection title="編集する面" desc="表面 / 裏面 を切り替えます。">
        <SideToggle side={side} onChangeSide={onChangeSide} />
      </PanelSection>

      <PanelSection
        title="テキスト編集"
        desc="内容を入力してプレビューで確認できます。"
      >
        <TextTab
          blocks={blocks}
          isPreview={isPreview}
          onAddBlock={onAddBlock}
          onChangeText={onChangeText}
          onCommitText={onCommitText}
          onBumpFontSize={onBumpFontSize}
        />
      </PanelSection>

      {/* 👇 ここから新規追加：点字入力用セクション */}
      <PanelSection
        title="点字テキスト"
        desc="かなで入力すると、キャンバス上には点字として反映されます。"
      >
        <div className="space-y-2">
          <textarea
            className="w-full rounded-lg border border-zinc-200 bg-white p-2 text-sm"
            rows={3}
            value={rawBraille}
            onChange={(e) => handleChangeBraille(e.target.value)}
            placeholder="例: やまだ たろう / でざいなー"
          />

          <button
            type="button"
            onClick={handleCommitBraille}
            className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            この内容で点字を確定
          </button>
        </div>
      </PanelSection>
    </div>
  );
}
