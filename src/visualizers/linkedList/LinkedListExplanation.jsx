import React from "react";
import ExplanationSection from "../ExplanationSection.jsx";

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

const LinkedListExplanation = () => {
  return (
    <ExplanationSection
      title="🌱 What is a Linked List?"
      description={[
        "A Linked List is a linear data structure where elements are stored in nodes, each pointing to the next node in sequence.",
        "It allows dynamic memory allocation and efficient insertions or deletions at the beginning or middle. Unlike arrays, it does not require contiguous memory.",
      ]}
      applications={[
        "Browser history (forward/backward navigation)",
        "Undo/redo operations in editors",
        "Memory management in OS (free lists, allocators)",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default LinkedListExplanation;
