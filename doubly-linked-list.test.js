const LinkedList = require("./doubly-linked-list");

describe("push", function() {
  it("appends node and increments length", function() {
    let lst = new LinkedList();

    lst.push(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.push(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);

    lst.push(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);
  });
});

describe("unshift", function() {
  it("adds node at start and increments length", function() {
    let lst = new LinkedList();

    lst.unshift(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.head.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(15);
    expect(lst.head.next.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("pop", function() {
  it("removes node at end and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.pop()).toBe(10);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
    expect(lst.length).toBe(1);

    expect(lst.pop()).toBe(5);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("shift", function() {
  it("removes node at start and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.shift()).toBe(5);
    expect(lst.tail.val).toBe(10);
    expect(lst.length).toBe(1);

    expect(lst.shift()).toBe(10);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("getAt", function() {
  it("gets val at index", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.getAt(0)).toBe(5);
    expect(lst.getAt(1)).toBe(10);
  });
});

describe("setAt", function() {
  it("sets val at index", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.setAt(0, 1));
    expect(lst.setAt(1, 2));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(2);
  });
});

describe("insertAt", function() {
  it("inserts node and adjusts nearby nodes", function() {
    let lst = new LinkedList([5, 10, 15, 20]);

    lst.insertAt(2, 12);
    expect(lst.length).toBe(5);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(12);
    expect(lst.head.next.next.next.val).toBe(15);
    expect(lst.head.next.next.next.next.val).toBe(20);

    lst.insertAt(5, 25);
    expect(lst.head.next.next.next.next.next.val).toBe(25);
    expect(lst.tail.val).toBe(25);
  });

  it("inserts into empty list", function() {
    let lst = new LinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("removeAt", function() {
  it("removes from 1-item list", function() {
    let lst = new LinkedList(["a"]);

    lst.removeAt(0);
    expect(lst.length).toBe(0);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
  });
});

describe("asArray", function() {
  it("returns array based on list", function() {
    let lst = new LinkedList([1, 2, 3, 4]);

    expect(lst.asArray()).toEqual([1, 2, 3, 4]);
  });
});

describe("reverse", function() {
  it("reverses list in place", function() {
    let lst = new LinkedList([1, 2, 3, 4]);

    lst.reverse();
    expect(lst.head.val).toBe(4);
    expect(lst.tail.val).toBe(1);
    expect(lst.head.next.val).toBe(3);
    expect(lst.head.next.next.val).toBe(2);
    expect(lst.head.next.next.next.val).toBe(1);
    expect(lst.tail.prev.val).toBe(2);
    expect(lst.tail.prev.prev.val).toBe(3);
    expect(lst.tail.prev.prev.prev.val).toBe(4);
  });
});

describe("merge", function() {
  it("merges two sorted lists", function() {
    let lst1 = new LinkedList([1, 3, 4, 6]);
    let lst2 = new LinkedList([0, 1, 2, 5, 6, 8]);

    let lst = LinkedList.merge(lst1, lst2);

    expect(lst.asArray()).toEqual([0, 1, 1, 2, 3, 4, 5, 6, 6, 8]);
  });
});