/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.head) throw new Error("out of range");

    this.length--;

    const node = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node.val;
    }

    let curr = this.head;
    while (curr.next !== node) {
      curr = curr.next;
    }
    curr.next = null;
    this.tail = curr;
    return node.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) throw new Error("out of range");

    this.length--;
    const node = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node.val;
    }

    this.head = this.head.next;
    return node.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let curr = this.head;
    let currIdx = 0;
    do {
      if (currIdx === idx) break;
      curr = curr.next;
      currIdx++;
    } while (curr);

    if (!curr) throw new Error("out of range");
    return curr.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let curr = this.head;
    let currIdx = 0;
    do {
      if (currIdx === idx) break;
      curr = curr.next;
      currIdx++;
    } while (curr);

    if (!curr) throw new Error("out of range");
    curr.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) this.unshift(val);
    else if (idx === this.length) this.push(val);
    else {
      let curr = this.head;
      let currIdx = 0;
      do {
        if (currIdx + 1 === idx) break;
        curr = curr.next;
        currIdx++;
      } while (curr);

      if (!curr) throw new Error("out of range");
      
      this.length++;
      const oldNext = curr.next;
      curr.next = new Node(val);
      curr.next.next = oldNext;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length <= 1) return this.pop();
    
    let curr = this.head;
    let currIdx = 0;
    do {
      if (currIdx + 1 >= idx) break;
      curr = curr.next;
      currIdx++;
    } while (curr);

    if (!curr || !curr.next) throw new Error("out of range");
    this.length--;

    const node = curr.next;
    curr.next = curr.next.next;
    return node.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let sum = 0;
    let count = 0;
    let curr = this.head;
    while (curr) {
      sum += curr.val;
      count++;
      curr = curr.next;
    }
    if (count === 0) return 0;
    return sum / count;
  }
}

module.exports = LinkedList;
