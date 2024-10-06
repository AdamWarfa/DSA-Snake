export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(data) {
    const newNode = { next: null, data: data };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;

    const removedNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return removedNode.data;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  size() {
    let count = 0;
    let currentNode = this.head;

    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }

    return count;
  }

  get(index) {
    const node = this.nodeAt(index);
    return node ? node.data : null;
  }

  nodeAt(index) {
    let count = 0;
    let currentNode = this.head;

    while (currentNode) {
      if (count === index) {
        return currentNode;
      }

      count++;
      currentNode = currentNode.next;
    }

    return null;
  }

  dumpList() {
    let node = this.head;
    console.log(`
        
        Queue
        ============
          head: ${this.head ? this.head.data : "null"}
          tail: ${this.tail ? this.tail.data : "null"}
        ============
    `);

    while (node) {
      console.log(`

        Node: ${node.data}
        ----------------
          next: ${node.next ? node.next.data : "null"}
        `);
      node = node.next;
    }
  }
}
