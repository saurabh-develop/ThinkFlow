import { useState } from "react";

const codeSnippets = {
  javascript: `// JavaScript Stack Example
let stack = [];

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack);       // [1, 2]`,
  cpp: `// C++ Stack Example
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(1);
    s.push(2);
    s.push(3);

    cout << s.top() << endl; // 3
    s.pop();
    cout << s.top() << endl; // 2
}`,
  java: `// Java Stack Example
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(1);
        stack.push(2);
        stack.push(3);

        System.out.println(stack.pop()); // 3
        System.out.println(stack.peek()); // 2
    }
}`,
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white transition"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const CodeImplementation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4 mt-10">
      <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
        🔧 Stack Code Implementation
      </h3>

      {/* Tabs */}
      <div className="flex space-x-2 text-sm font-semibold">
        {["javascript", "cpp", "java"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded ${
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
      <div className="relative bg-black/30 p-4 rounded-lg text-xs text-purple-200 shadow-inner whitespace-pre-wrap overflow-x-auto">
        <CopyButton text={codeSnippets[lang]} />
        <pre>{codeSnippets[lang]}</pre>
      </div>
    </div>
  );
};

export default CodeImplementation;
