/** Node: node for a doubly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/** DoublyLinkedList: chained together nodes. */

class DoublyLinkedList {
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
      newNode.prev = this.tail;
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
      this.head.prev = newNode;
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
    }
    else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
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
    }
    else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    return node.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._getNodeAt(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const node = this._getNodeAt(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) this.unshift(val);
    else if (idx === this.length) this.push(val);
    else {
      const node = this._getNodeAt(idx);
      this.length++;

      const prev = node.prev;
      node.prev = new Node(val);
      node.prev.next = node;
      prev.next = node.prev;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length <= 1) return this.pop();
    else {
      const node = this._getNodeAt(idx);
      this.length--;

      const prev = node.prev;
      prev.next = node.next;
      node.next.prev = prev;

      return node.val;
    }
  }

  /** reverse(): reverse list in place */
  
  reverse() {
    if (this.length <= 1) return;

    let curr = this.head;
    while (curr) {
      [curr.next, curr.prev] = [curr.prev, curr.next];
      curr = curr.prev;
    }
    [this.head, this.tail] = [this.tail, this.head];
  }

  /** asArray(): return an array with values from list */
  
  asArray() {
    let arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    return arr;
  }

  /** _getNodeAt(idx): Helper method, get node at idx */

  _getNodeAt(idx) {
    let curr = this.head;
    let currIdx = 0;
    do {
      if (currIdx === idx) break;
      curr = curr.next;
      currIdx++;
    } while (curr);

    if (!curr) throw new Error("out of range");
    return curr;
  }

  static merge(l1, l2) {
    const newList = new DoublyLinkedList();
    let curr1 = l1.head;
    let curr2 = l2.head;
    while (curr1 || curr2) {
      if (!curr1 || curr1.val > curr2.val) {
        newList.push(curr2.val);
        curr2 = curr2.next;
      }
      else {
        newList.push(curr1.val);
        curr1 = curr1.next;
      }
    }
    return newList;
  }
}

module.exports = DoublyLinkedList;
