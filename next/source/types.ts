type LanguageKey = "en" | "es" | "fr" | "de" | "it" | "pt" | "pl" | "ja" | "nl" | "ru" | "uk" | "ar" | "zh"; // Add other languages as needed
type LocalizedInfo = {
  [key in LanguageKey]?: string;
};

export type RestaurantItem = {
  _id: string;
  title: string;
  info: LocalizedInfo;
  contact: string;
  owner: string;
  limited: boolean;
  totalTips?: Number;
  rankId?: number;
};

export type Document = {
  _id: string;
  title: string;
  address: string;
  info: LocalizedInfo;
  contact: string;
  owner: string;
  limited: boolean;
  totalTips?: Number;
  rankId?: number;
};

export type Rank = {
  id: number;
  name: string;
  identifier: string;
  owner: string;
  totalTips: number;
};
