// app/components/panels/BraillePanel.tsx
"use client";

import { useState } from "react";
import type { Block } from "@/shared/blocks";
import PanelSection from "@/app/components/panels/PanelSection";
import { toBraille } from "@/shared/braille";

type Props = {
  blocks: Block[];
  onChangeText: (id: string, value: string) => void;
  onCommitText: (id: string, value: string) => void;
  onAddBrailleBlock: () => void;
};

export default function BraillePanel({
  blocks,
  onChangeText,
  onCommitText,
  onAddBrailleBlock,
}: Props) {
  // ✅ 点字ブロックだけ抽出（isBraille === true）
  const brailleBlocks = blocks.filter((b) => b.isBraille);

  // ✅ ブロックごとの「かな入力」を管理
  const [kanaById, setKanaById] = useState<Record<string, string>>({});

  const handleChangeBraille = (id: string, value: string) => {
    setKanaById((prev) => ({ ...prev, [id]: value }));

    const converted = toBraille(value);
    onChangeText(id, converted);
  };

  const handleCommitBraille = (id: string) => {
    const kana = kanaById[id] ?? "";
    const converted = toBraille(kana);
    onCommitText(id, converted);
  };

  return (
    <div className="space-y-4">
      <PanelSection
        title="点字テキスト"
        desc="かなで入力すると、キャンバス上には点字として反映されます。"
      >
        <div className="space-y-3">
          {brailleBlocks.length === 0 && (
            <>
              <button
                type="button"
                onClick={onAddBrailleBlock}
                className="w-full rounded-lg bg-pink-500 py-2 text-sm font-medium text-white hover:bg-pink-600"
              >
                ＋ 点字ブロックを追加
              </button>
            </>
          )}

          {brailleBlocks.map((block) => (
            <div
              key={block.id}
              className="space-y-2 rounded-lg border border-zinc-200 bg-white p-2"
            >
              <textarea
                className="w-full rounded-md border border-zinc-200 bg-white p-2 text-sm"
                rows={2}
                value={kanaById[block.id] ?? ""} // ⬅ entry なければ "" でOK
                onChange={(e) => handleChangeBraille(block.id, e.target.value)}
                placeholder="例: やまだ たろう / でざいなー"
              />

              <button
                type="button"
                onClick={() => handleCommitBraille(block.id)}
                className="w-full rounded-lg bg-zinc-900 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
              >
                この行の点字を確定
              </button>
            </div>
          ))}
        </div>
      </PanelSection>
    </div>
  );
}
