// shared/designs.ts
export type DesignCategory = "simple" | "illustration" | "texture";

export type DesignKey =
  | "simpleBeige"
  | "simpleCream"
  | "simpleWhite"
  | "simplePink"
  | "simpleBlue"
  | "simpleGreen"
  | "girl"
  | "kinmokusei"
  | "usaCarrot";

export type CardDesign = {
  category: DesignCategory;
  bgColor: string;
  image?: string;
  mode?: "cover" | "contain";
};

export const CARD_DESIGNS: Record<DesignKey, CardDesign> = {
  // ===== シンプル（単色） =====
  simpleBeige: { category: "simple", bgColor: "#e2c7a3" },
  simpleCream: { category: "simple", bgColor: "#f7efe5" },
  simpleWhite: { category: "simple", bgColor: "#ffffff" },
  simplePink: { category: "simple", bgColor: "#ffe3ec" },
  simpleBlue: { category: "simple", bgColor: "#e0f0ff" },
  simpleGreen: { category: "simple", bgColor: "#e6f4e6" },
  // ===== イラスト =====
  girl: {
    category: "illustration",
    bgColor: "#e9edf5",
    image: "/girl.png",
    mode: "cover",
  },
  usaCarrot: {
    category: "illustration",
    bgColor: "#ffffff",
    image: "/usa-carrot.png",
    mode: "contain",
  },
  // ===== 素材・柄 =====
  kinmokusei: {
    category: "texture",
    bgColor: "#fff5e5",
    image: "/kinmokusei.png",
    mode: "cover",
  },
};
