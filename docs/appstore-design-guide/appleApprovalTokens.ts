export const appleApproval = {
  minHitTarget: 44,
  minTextSize: 11,
  contrast: {
    normalText: 4.5,
    largeOrBoldText: 3,
    nonText: 3,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  layout: {
    compactHorizontalMargin: 16,
    regularHorizontalMargin: 20,
    primaryButtonMinHeight: 48,
    primaryButtonPreferredHeight: 52,
  },
} as const;

// Bruk allowFontScaling={true} og tilgjengelighetsetiketter.
// Ikke hardkod skjermkoordinater. Respekter SafeAreaView/insets.
