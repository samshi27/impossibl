export const CARD_VARIANTS = ['red', 'green', 'blue', 'teal', 'magenta'] as const;

export type CardVariant = (typeof CARD_VARIANTS)[number];
