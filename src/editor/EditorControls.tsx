import Base64Url from "../util/base64url";
import { getLanguage, Language, Languages } from "./Language";

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

export default function EditorControls(
  props: Readonly<{
    language: Language;
    setLanguage: (lang: Language) => void;
    code: string;
    copied: boolean;
    setCopied: (copied: boolean) => void;
  }>
) {
  const { language, setLanguage, code, copied, setCopied } = props;
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
  );
}
