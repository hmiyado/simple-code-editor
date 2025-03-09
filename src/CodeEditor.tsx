import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-swift";

const getQueryParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) ?? "";
};

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    setCode(getQueryParam("code"));
    setLanguage(getQueryParam("lang") || "javascript");
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div>
      <pre>
        <code
          className={`language-${language}`}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setCode(e.currentTarget.innerText)}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
