import { useState, useRef, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";

const Code = ({ snippet, lang }: { snippet: string; lang: string }) => {
  const [btnText, setBtnText] = useState("Copy");
  const codeClass = lang ? `language-${lang} code-snippet` : `code-snippet`;
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Unset the `data-highlighted` attribute if it exists
      codeRef.current.removeAttribute("data-highlighted");
      // Highlight the specific code block
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet, lang]);

  const copytext = (text: string) => {
    if (btnText !== "Copied!") {
      setBtnText("Copied!");
      navigator.clipboard.writeText(text);
      setTimeout(() => {
        setBtnText("Copy");
      }, 3000);
    }
  };

  return (
    <div className="pre-wrapper">
      <pre className="prettyprint">
        <code ref={codeRef} className={codeClass}>{snippet}</code>
      </pre>
      <button className="copy-snippet" onClick={() => copytext(snippet)}>
        {btnText === "Copy" ? <i className="fa fa-clone"></i> : null} {btnText}
      </button>
    </div>
  );
};

export default Code;
