import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Base64Url from "../util/base64url";
import EditorControls from "./EditorControls";
import { getLanguage, Language, Languages } from "./Language";

const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>(Languages[0]);

  useEffect(() => {
    setCode(Base64Url.decode(getQueryParam("code") ?? ""));
    setLanguage(getLanguage(getQueryParam("lang") ?? ""));
  }, []);

  return (
    <div>
      <Editor
        defaultLanguage={language.value}
        language={language.value}
        defaultValue={code}
        onChange={(value) => setCode(value ?? "")}
        theme="vs-dark"
        width={"100%"}
        height={"75vh"}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          lineNumbers: "on",
        }}
      />
      <EditorControls
        language={language}
        setLanguage={setLanguage}
        code={code}
        copied={copied}
        setCopied={setCopied}
      />
    </div>
  );
}
