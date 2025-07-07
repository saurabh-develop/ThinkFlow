class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
  }

  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    this.tail = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  delete(value) {
    if (!this.head) return;

    // Delete head
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      return;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current) {
      if (current.value === value) {
        prev.next = current.next;
        if (current === this.tail) this.tail = prev;
        return;
      }
      prev = current;
      current = current.next;
    }
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    if (this.head) this.head.prev = newNode;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
  }

  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  reverse() {
    let current = this.head;
    let temp = null;
    this.tail = this.head;
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    if (temp) this.head = temp.prev;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  delete(value) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      return;
    }

    let current = this.head.next;
    while (current) {
      if (current.value === value) {
        current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        return;
      }
      current = current.next;
    }
  }
}

export class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtHead(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.head = newNode;
    }
  }

  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  reverse() {
    if (!this.head || this.head === this.tail) return;
    let prev = this.tail;
    let current = this.head;
    do {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    } while (current !== this.head);
    this.tail = this.head;
    this.head = prev;
  }

  toArray() {
    const result = [];
    if (!this.head) return result;
    let current = this.head;
    do {
      result.push(current.value);
      current = current.next;
    } while (current !== this.head);
    return result;
  }

  delete(value) {
    if (!this.head) return;

    let current = this.head;
    let prev = this.tail;
    do {
      if (current.value === value) {
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = prev;

        prev.next = current.next;

        if (current === current.next) {
          this.head = this.tail = null;
        }
        return;
      }

      prev = current;
      current = current.next;
    } while (current !== this.head);
  }
}
