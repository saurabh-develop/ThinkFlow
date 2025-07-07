import React from "react";
import ExplanationSection from "../ExplanationSection.jsx"; 

const codeSnippets = {
  javascript: `// JavaScript Queue using Array
let queue = [];
queue.push(1); // enqueue
queue.push(2);
queue.shift(); // dequeue
console.log(queue);`,

  cpp: `// C++ Queue using STL
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(1); // enqueue
    q.push(2);
    q.pop();   // dequeue
    cout << q.front(); // 2
}`,

  java: `// Java Queue using LinkedList
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> q = new LinkedList<>();
        q.add(1); // enqueue
        q.add(2);
        q.remove(); // dequeue
        System.out.println(q.peek()); // 2
    }
}`,
};

const QueueExplanation = () => {
  return (
    <ExplanationSection
      title="📖 What is a Queue?"
      description={[
        "A Queue is a linear data structure that follows the FIFO (First-In, First-Out) principle.",
        "The first element added is the first to be removed. It's commonly used in scheduling, buffering, and queuing systems.",
      ]}
      applications={[
        "Customer service queues",
        "Task scheduling in OS",
        "Print jobs sent to a printer",
      ]}
      codeSnippets={codeSnippets}
    />
  );
};

export default QueueExplanation;
