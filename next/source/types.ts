type LanguageKey = "en" | "es" | "fr" | "de" | "it" | "pt" | "pl" | "ja" | "nl" | "ru" | "uk" | "ar" | "zh"; // Add other languages as needed

type LocalizedInfo = {
  [key in LanguageKey]?: string;
};

export type BaseRestaurant = {
  _id: string;
  title: string;
  info: LocalizedInfo;
  contact: string;
  owner: string;
  limited: boolean;
};

export type RestaurantDocument = BaseRestaurant & {
  address: string;
};

export type MergedRestaurant = BaseRestaurant & {
  totalTips: number;
  rankId: number;
};

export type Rank = {
  id: number;
  name: string;
  identifier: string;
  owner: string;
  totalTips: number;
};
