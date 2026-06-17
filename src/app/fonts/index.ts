import localFont from "next/font/local";

// Stack Sans — variable fonts (wght axis), OFL license (see StackSans-OFL.txt).
// Notch: brand (app name) + large titles. Headline: body text and UI.

export const stackHeadline = localFont({
  src: "./StackSansHeadline-VariableFont_wght.ttf",
  variable: "--ff-stack-headline",
  display: "swap",
  weight: "200 700",
});

export const stackNotch = localFont({
  src: "./StackSansNotch-VariableFont_wght.ttf",
  variable: "--ff-stack-notch",
  display: "swap",
  weight: "200 700",
});
