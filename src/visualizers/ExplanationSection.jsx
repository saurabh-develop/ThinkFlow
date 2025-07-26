import React, { useState } from "react";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const ExplanationSection = ({
  title,
  description,
  applications,
  codeSnippets,
}) => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8 px-4">
      {/* Title & Description */}
      <div className="space-y-4 text-left">
        <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          {title}
        </h2>

        {description.map((line, idx) => (
          <p key={idx} className="text-purple-200 text-sm leading-relaxed">
            {line}
          </p>
        ))}

        {/* Real-world Applications */}
        {applications && (
          <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
            <h3 className="text-white font-semibold mb-2">
              💡 Real-World Applications:
            </h3>
            <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
              {applications.map((app, idx) => (
                <li key={idx}>{app}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Code Section */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          🔧 Code Implementation
        </h3>

        {/* Language Tabs */}
        <div
          className="flex flex-wrap gap-2 text-sm font-semibold"
          role="tablist"
        >
          {Object.keys(codeSnippets).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              role="tab"
              aria-selected={lang === l}
              className={`px-3 py-1 rounded transition ${
                lang === l
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300 hover:bg-white/20"
              }`}
            >
              {l === "javascript" ? "JavaScript" : l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="relative bg-black/30 p-4 rounded-lg text-xs sm:text-sm text-purple-200 shadow-inner whitespace-pre-wrap overflow-x-auto font-mono">
          <CopyButton text={codeSnippets[lang]} />
          <pre>{codeSnippets[lang]}</pre>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;
