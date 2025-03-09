import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Base64Url from "../util/base64url";

// generate const types for languages
type Language =
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

const Languages: Language[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
];

const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const getLanguage = (lang: string): Language => {
  return Languages.find((language) => language.value === lang) ?? Languages[0];
};

const generateShareableURL = (
  window: Window,
  code: string,
  language: string
) => {
  const url = new URL(window.location.toString());
  url.searchParams.set("code", Base64Url.encode(code));
  url.searchParams.set("lang", language);
  return url.toString();
};

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>(Languages[0]);

  useEffect(() => {
    setCode(Base64Url.decode(getQueryParam("code") ?? ""));
    setLanguage(getLanguage(getQueryParam("lang") ?? ""));
  }, []);

  const copyURL = async () => {
    const shareableURL = generateShareableURL(window, code, language.value);
    try {
      await navigator.clipboard.writeText(shareableURL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <Editor
        height="400px"
        defaultLanguage={language.value}
        language={language.value}
        defaultValue={code}
        onChange={(value) => setCode(value ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          lineNumbers: "on",
        }}
      />
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="language">言語: </label>
        <select
          id="language"
          value={language.value}
          onChange={(e) => setLanguage(getLanguage(e.target.value))}
        >
          {Languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <button onClick={copyURL} style={{ marginLeft: "10px" }}>
          Copy URL {copied ? "✅" : ""}
        </button>
      </div>
    </div>
  );
}
