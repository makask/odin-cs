class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 1. append(data) adds a new node containing data to the end of the list
  append(data) {
    let node = new Node(data);
    let current;
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  // 2. prepend(data) adds a new node containing data to start of the list
  prepend(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }

  // 3. size returns the total number of nodes in the list
  size() {
    return this.size;
  }

  // 4. head returns the first node in the list
  head() {
    return this.head;
  }

  // 5. tail returns the last node in the list
  tail() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  // 6. at(index) returns the node at the given index
  at(index) {
    let current = this.head;
    let count = 0;
    while (current) {
      if (index == count) {
        return current;
      }
      current = current.next;
      count++;
    }
  }

  // 7. pop removes the last element form the list
  pop() {
    if (!this.head) {
      return;
    }
    let current = this.at(this.size - 2);
    current.next = null;
    this.size--;
  }

  // 8. contains(value) returns true if the passed in value
  //is in the list and otherwise returns false;
  contains(data) {
    let result;
    if (!this.head) {
      return;
    }
    let current = this.head;
    while (current) {
      if (data === current.data) {
        result = true;
        return result;
      } else {
        result = false;
      }
      current = current.next;
    }
    return result;
  }

  // 9. find(value) returns the index of the
  // node containing value, or null if not found.
  find(data) {
    let result;
    if (!this.head) {
      return;
    }
    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      if (data === current.data) {
        result = i;
        return result;
      } else {
        result = null;
      }
      current = current.next;
    }
    return result;
  }

  // 10. Print nodelist out and preview in the console
  toString() {
    let current = this.head;
    let result = '';
    while (current) {
      result += `(${current.data}) -> `;
      current = current.next;
    }
    console.log(result + 'null');
  }

  // 11. insertAt(value, index), inserts a new node with the provided
  // value at the given index
  insertAt(data, index) {
    // If index is out of range
    if (index > 0 && index > this.size) {
      return;
    }
    // If index is less than 0
    if (index < 0) {
      return;
    }
    // If first index
    if (index === 0) {
      this.prepend(data);
      return;
    }
    const node = new Node(data);
    let current, previous;

    current = this.head;
    let count = 0;

    while (count < index) {
      previous = current; // Node before index
      count++;
      current = current.next; // Node after index
    }
    node.next = current;
    previous.next = node;
    this.size++;
  }

  // 12. removeAt(index), removes the node at the given index.
  removeAt(index) {
    if (index > 0 && index > this.size) {
      return;
    }
    if (index < 0) {
      return;
    }
    let current = this.head;
    let previous;
    let count = 0;

    // Remove first
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
}

const linkedList = new LinkedList();

// test prepend()
linkedList.prepend(100);
linkedList.prepend(200);
linkedList.prepend(300);

// test append()
linkedList.append(400);

// test size()
//console.log(linkedList.size);

// test head()
//console.log(linkedList.head);

// test tail
//console.log(linkedList.tail());

// test at
//console.log(linkedList.at(1));

// test pop
//linkedList.pop();

// test contains
//console.log(linkedList.contains(500));

// test find
//console.log(linkedList.find(200));

// test insertAt
//linkedList.insertAt(333, 2);

// test removeAt(index)
//linkedList.removeAt(2);

linkedList.toString();
