import React from "react";
import { Code } from "../components";
import parse, { type DOMNode, Text, Element } from "html-react-parser";
import "../styles/Blog.css";

function getTextContent(node: DOMNode): string {
  if (node.type === "text") {
    return (node as Text).data || "";
  }
  if (Array.isArray((node as Element).children)) {
    return ((node as Element).children as DOMNode[]).map(getTextContent).join("");
  }
  return "";
}

export default function FormattedHTML({ htmlString }: { htmlString: string }) {
  return parse(htmlString, {
    replace: (domNode) => {
         if (domNode.type === "tag") {
        // Handle <pre><code>
        if (
          domNode.name === "pre" &&
          Array.isArray(domNode.children) &&
          domNode.children[0] &&
          domNode.children[0].type === "tag" &&
          domNode.children[0].name === "code"
        ) {
          const codeEl = domNode.children[0] as Element;
          const langClass = codeEl.attribs?.class || "";
          const lang = langClass.replace("lang-", "");
          const snippet = getTextContent(codeEl).trim();
          return React.createElement(Code, { snippet: snippet.trim(), lang });
        }

        // Handle <img>
        if (domNode.name === "img") {
          const el = domNode as Element;
          return (
            <div className="container text-center">
              <img
                {...el.attribs}
                className={`blog-content-html ${el.attribs?.class || ""}`}
              />
            </div>
          );
        }
      }
    },
  });
}
