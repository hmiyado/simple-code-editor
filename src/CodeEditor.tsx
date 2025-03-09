import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setCode(getQueryParam("code") ?? "");
    setLanguage(getQueryParam("lang") ?? "javascript");
  }, []);

  return (
    <Editor
      height="400px"
      defaultLanguage={language}
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
  );
}
