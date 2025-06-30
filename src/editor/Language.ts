export type Language =
  | {
      // The label is the name of the language, and the value is the identifier for Monaco editor.
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
    }
  | {
      label: "C++";
      value: "cpp";
    };

export const Languages: Language[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
  { label: "C++", value: "cpp" },
];

export const getLanguage = (lang: string): Language => {
  return Languages.find((language) => language.value === lang) ?? Languages[0];
};
