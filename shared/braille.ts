// shared/braille.ts

// 清音・記号などの基本テーブル
export const KANA_TO_BRAILLE: Record<string, string> = {
  // あ行
  あ: "⠁",
  い: "⠃",
  う: "⠉",
  え: "⠋",
  お: "⠊",

  // か行
  か: "⠡",
  き: "⠣",
  く: "⠩",
  け: "⠫",
  こ: "⠪",

  // さ行
  さ: "⠱",
  し: "⠳",
  す: "⠹",
  せ: "⠻",
  そ: "⠺",

  // た行
  た: "⠕",
  ち: "⠗",
  つ: "⠝",
  て: "⠟",
  と: "⠞",

  // な行
  な: "⠅",
  に: "⠇",
  ぬ: "⠍",
  ね: "⠏",
  の: "⠎",

  // は行
  は: "⠥",
  ひ: "⠧",
  ふ: "⠭",
  へ: "⠯",
  ほ: "⠮",

  // ま行
  ま: "⠵",
  み: "⠷",
  む: "⠽",
  め: "⠿",
  も: "⠾",

  // や行
  や: "⠌",
  ゆ: "⠬",
  よ: "⠜",

  // ら行
  ら: "⠑",
  り: "⠓",
  る: "⠙",
  れ: "⠛",
  ろ: "⠚",

  // わ行
  わ: "⠄",
  を: "⠔",
  ん: "⠴",

  // 促音・長音
  っ: "⠂", // 促音符
  ー: "⠒",
};

// 濁音・半濁音の記号
export const DAKUTEN_MARK = "⠐";    // 濁音符
export const HANDAKUTEN_MARK = "⠠"; // 半濁音符

// 「が」→「か」みたいに、濁音かな → 清音かな への対応表
const DAKUTEN_BASE: Record<string, string> = {
  が: "か",
  ぎ: "き",
  ぐ: "く",
  げ: "け",
  ご: "こ",

  ざ: "さ",
  じ: "し",
  ず: "す",
  ぜ: "せ",
  ぞ: "そ",

  だ: "た",
  ぢ: "ち",
  づ: "つ",
  で: "て",
  ど: "と",

  ば: "は",
  び: "ひ",
  ぶ: "ふ",
  べ: "へ",
  ぼ: "ほ",
};

// 半濁音かな → 清音かな
const HANDAKUTEN_BASE: Record<string, string> = {
  ぱ: "は",
  ぴ: "ひ",
  ぷ: "ふ",
  ぺ: "へ",
  ぽ: "ほ",
};

// ⬇️ これだけをエクスポートして使う
export function toBraille(input: string): string {
  const chars = [...input];
  const out: string[] = [];

  for (const ch of chars) {
    // 1) 濁音かな（が, じ, だ, ば…）
    if (DAKUTEN_BASE[ch]) {
      const baseKana = DAKUTEN_BASE[ch];
      const baseBraille = KANA_TO_BRAILLE[baseKana];
      if (baseBraille) {
        // 濁音符 + 清音の点字（2マス）
        out.push(DAKUTEN_MARK + baseBraille);
        continue;
      }
    }

    // 2) 半濁音かな（ぱ行）
    if (HANDAKUTEN_BASE[ch]) {
      const baseKana = HANDAKUTEN_BASE[ch];
      const baseBraille = KANA_TO_BRAILLE[baseKana];
      if (baseBraille) {
        // 半濁音符 + 清音の点字（2マス）
        out.push(HANDAKUTEN_MARK + baseBraille);
        continue;
      }
    }

    // 3) 単独の濁点 / 半濁点（念のため）
    if (ch === "゛") {
      out.push(DAKUTEN_MARK);
      continue;
    }
    if (ch === "゜") {
      out.push(HANDAKUTEN_MARK);
      continue;
    }

    // 4) それ以外は通常マップ
    const mapped = KANA_TO_BRAILLE[ch];
    out.push(mapped ?? ch);
  }

  return out.join("");
}
