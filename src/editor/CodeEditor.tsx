import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import UrlEncoder from "../util/urlEncoder";
import EditorControls from "./EditorControls";
import { getLanguage, Language, Languages } from "./Language";
import { QueryParams } from "./QueryParams";

const findQueryParam = (param: keyof typeof QueryParams): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const actualKey = QueryParams[param].patterns.find((pattern) => {
    return urlParams.has(pattern);
  });
  return urlParams.get(actualKey ?? "");
};

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>(Languages[0]);

  useEffect(() => {
    setCode(UrlEncoder.decode(findQueryParam("code") ?? ""));
    setLanguage(getLanguage(findQueryParam("lang") ?? ""));
  }, []);

  return (
    <div className="fixed-grid has-1-cols">
      <div className="grid">
        <Editor
          className="cell"
          defaultLanguage={language.value}
          language={language.value}
          defaultValue={code}
          onChange={(value) => setCode(value ?? "")}
          theme="vs-dark"
          width={"100%"}
          height={"70vh"}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
          }}
        />
        <EditorControls
          className="cell"
          language={language}
          setLanguage={setLanguage}
          code={code}
          copied={copied}
          setCopied={setCopied}
        />
      </div>
    </div>
  );
}
