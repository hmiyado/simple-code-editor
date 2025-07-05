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
    }
  | {
      label: "Java";
      value: "java";
    };

export const Languages: Language[] = [
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "javascript" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Python", value: "python" },
  { label: "Swift", value: "swift" },
  { label: "TypeScript", value: "typescript" },
];

export const getLanguage = (lang: string): Language => {
  return Languages.find((language) => language.value === lang) ?? Languages[0];
};
