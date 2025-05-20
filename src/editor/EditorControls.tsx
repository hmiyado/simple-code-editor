import UrlEncoder from "../util/urlEncoder";
import { getLanguage, Language, Languages } from "./Language";
import { QueryParams } from "./QueryParams";
import Timer from "../timer/Timer";

const generateShareableURL = (
  urlString: string,
  code: string,
  language: string,
) => {
  const url = new URL(urlString);
  url.searchParams.set(QueryParams.code.patterns[0], UrlEncoder.encode(code));
  url.searchParams.set(QueryParams.lang.patterns[0], language);
  return url.toString();
};

export default function EditorControls(
  props: Readonly<{
    className: string | undefined;
    language: Language;
    setLanguage: (lang: Language) => void;
    code: string;
    copied: boolean;
    setCopied: (copied: boolean) => void;
  }>,
) {
  const { className, language, setLanguage, code, copied, setCopied } = props;
  const copyURL = async () => {
    const shareableURL = generateShareableURL(
      window.location.toString(),
      code,
      language.value,
    );
    try {
      setCopied(false);
      // await 100 ms to suppress flickering
      await new Promise((resolve) => setTimeout(resolve, 100));
      await navigator.clipboard.writeText(shareableURL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={className}>
      <div className="is-flex is-justify-content-space-between">
        <div>
          <select
            id="language"
            className="select is-small"
            value={language.value}
            onChange={(e) => setLanguage(getLanguage(e.target.value))}
          >
            {Languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <button
            className="button is-small"
            onClick={copyURL}
            style={{ marginLeft: "10px" }}
          >
            Copy URL {copied ? "✅" : ""}
          </button>
        </div>
        <Timer />
      </div>
    </div>
  );
}
