import React from "react";
import ExplanationSection from "../ExplanationSection.jsx";

const stackCodeSnippets = {
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

const stackDescription = [
  <>
    A <span className="text-white font-semibold">Stack</span> is a linear data
    structure that follows the{" "}
    <span className="text-white font-semibold">LIFO</span> (Last-In, First-Out)
    principle. The last element added is the first one to be removed.
  </>,
  `Stacks are widely used for function call management, undo operations, and parsing expressions.`,
];

const stackApplications = [
  "Backtracking algorithms (DFS, maze solving)",
  "Undo/Redo in text editors",
  "Function call stack in programming",
];

const StackExplanation = () => {
  return (
    <ExplanationSection
      title="🧱 What is a Stack?"
      description={stackDescription}
      applications={stackApplications}
      codeSnippets={stackCodeSnippets}
    />
  );
};

export default StackExplanation;
