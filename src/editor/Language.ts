export const Languages = [
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Python", value: "python" },
  { label: "Swift", value: "swift" },
  { label: "TypeScript", value: "typescript" },
] as const;

export type Language = (typeof Languages)[number];

export const getLanguage = (lang: string): Language => {
  return Languages.find((language) => language.value === lang) ?? Languages[0];
};
