export type Language =
  | {
      label: "JavaScript";
      value: "javascript";
    }
  | {
      label: "TypeScript";
      value: "typescript";
    }
  | {
      label: "Python";
      value: "python";
    }
  | {
      label: "Kotlin";
      value: "kotlin";
    }
  | {
      label: "Swift";
      value: "swift";
    };

export const Languages: Language[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
];

export const getLanguage = (lang: string): Language => {
  return Languages.find((language) => language.value === lang) ?? Languages[0];
};
