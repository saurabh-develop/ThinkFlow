import React, { useState } from "react";

const codeSnippets = {
  javascript: `// Singly Linked List in JavaScript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = newNode;
  }

  deleteHead() {
    if (this.head) this.head = this.head.next;
  }

  traverse() {
    let curr = this.head;
    while (curr) {
      console.log(curr.value);
      curr = curr.next;
    }
  }
}`,
  cpp: `// Singly Linked List in C++
#include <iostream>
using namespace std;

struct Node {
  int value;
  Node* next;
  Node(int val) : value(val), next(nullptr) {}
};

class LinkedList {
public:
  Node* head = nullptr;

  void insertAtHead(int val) {
    Node* node = new Node(val);
    node->next = head;
    head = node;
  }

  void insertAtTail(int val) {
    Node* node = new Node(val);
    if (!head) {
      head = node;
      return;
    }
    Node* curr = head;
    while (curr->next) curr = curr->next;
    curr->next = node;
  }

  void deleteHead() {
    if (head) {
      Node* temp = head;
      head = head->next;
      delete temp;
    }
  }

  void traverse() {
    Node* curr = head;
    while (curr) {
      cout << curr->value << " ";
      curr = curr->next;
    }
  }
};`,
  java: `// Singly Linked List in Java
class Node {
  int value;
  Node next;
  Node(int val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  Node head;

  void insertAtHead(int val) {
    Node node = new Node(val);
    node.next = head;
    head = node;
  }

  void insertAtTail(int val) {
    Node node = new Node(val);
    if (head == null) {
      head = node;
      return;
    }
    Node curr = head;
    while (curr.next != null) curr = curr.next;
    curr.next = node;
  }

  void deleteHead() {
    if (head != null) head = head.next;
  }

  void traverse() {
    Node curr = head;
    while (curr != null) {
      System.out.print(curr.value + " ");
      curr = curr.next;
    }
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

const LinkedListExplanation = () => {
  const [lang, setLang] = useState("javascript");

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto space-y-8">
      {/* Explanation */}
      <div className="space-y-4 text-left">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          🌱 What is a Linked List?
        </h2>
        <p className="text-purple-200 text-sm leading-relaxed">
          A <span className="text-white font-semibold">Linked List</span> is a
          linear data structure where elements are stored in nodes, each
          pointing to the next node in sequence. It allows dynamic memory
          allocation and efficient insertions or deletions at the beginning or
          middle.
        </p>
        <p className="text-purple-200 text-sm leading-relaxed">
          Unlike arrays, linked lists do not require contiguous memory and can
          grow or shrink at runtime.
        </p>

        <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow">
          <h3 className="text-white font-semibold mb-2">
            💡 Real-World Applications:
          </h3>
          <ul className="list-disc list-inside text-sm text-purple-200 space-y-1">
            <li>Browser history (forward/backward navigation)</li>
            <li>Undo/redo operations in editors</li>
            <li>Memory management in OS (free lists, allocators)</li>
          </ul>
        </div>
      </div>

      {/* Code Section */}
      <div className="border border-white/10 bg-white/5 backdrop-blur rounded-xl p-4 shadow space-y-4">
        <h3 className="text-white text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          🧠 Linked List Code Implementation
        </h3>

        {/* Language Tabs */}
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
    </div>
  );
};

export default LinkedListExplanation;
