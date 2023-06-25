let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// 1.Build a Node class / factory. It should have an attribute for
// the data it stores as well as its left and right children.
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// 2.Build a Tree class / factory which accepts an array when initialized.
// The Tree class should have a root attribute which uses the return value
// of buildTree which you’ll write next.
class Tree {
  constructor(array) {
    this.array = this.sortAndRemoveDuplicates(array);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
    prettyPrint(this.root);
  }
  // 3. Write a buildTree function which takes an array of data
  //(e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
  //and turns it into a balanced binary tree full of Node
  //objects appropriately placed. The buildTree function should
  //return the level-0 root node.
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt(Math.floor(start + end) / 2);
    let node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // Sort inputarray into ascending order and
  // remove duplicates
  sortAndRemoveDuplicates(array) {
    array.sort(function (a, b) {
      return a - b;
    });
    let uniqueNumbers = array.filter((c, index) => {
      return array.indexOf(c) === index;
    });
    return uniqueNumbers;
  }

  // 4. Write an insert and delete functions
  // which accepts a value to insert/delete
  insert(data, root = this.root) {
    if (root === null) {
      root = new Node(data);
      return root;
    }

    if (data < root.data) {
      root.left = this.insert(data, root.left);
    } else if (data > root.data) {
      root.right = this.insert(data, root.right);
    }
    prettyPrint(this.root);
    return root;
  }

  delete(data, root = this.root) {
    if (root === null) {
      return root;
    }
    if (data < root.data) {
      root.left = this.delete(data, root.left);
    } else if (data > root.data) {
      root.right = this.delete(data, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        const minData = function findSmallestRightData(root) {
          let min = root.data;
          let newRoot = root;

          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }
          return min;
        };
        root.data = minData(root.right);
        root.right = this.delete(root.data, root.right);
      }
    }
    prettyPrint(root);
    return root;
  }
  // 5. Write a find function which accepts a value
  // and returns the node with the given value.
  find(data, root = this.root) {
    if (root === null || root.data === data) {
      return root;
    }

    if (root.data < data) {
      return this.find(data, root.right);
    } else {
      return this.find(data, root.left);
    }
  }
  // 6. Write a levelOrder function which accepts
  // another function as a parameter. levelOrder
  // should traverse the tree in breadth-first level
  // order and provide each node as the argument to the provided function.
  printLevelOrder() {
    let h = this.height(this.root);
    let i;
    for (i = 1; i <= h; i++) this.printCurrentLevel(this.root, i);
  }

  // Print nodes at the current level
  printCurrentLevel(root = this.root, level) {
    if (root == null) return;
    if (level == 1) console.log(root.data + ' ');
    else if (level > 1) {
      this.printCurrentLevel(root.left, level - 1);
      this.printCurrentLevel(root.right, level - 1);
    }
  }

  // 7. Write inorder, preorder, and postorder functions
  // that accept a function parameter.
  inorder(result = [], root = this.root) {
    if (root === null) return;
    if (root.left) this.inorder(result, root.left);
    result.push(root.data);
    if (root.right) this.inorder(result, root.right);
    return result;
  }

  preorder(result = [], root = this.root) {
    if (root === null) return;
    result.push(root.data);
    if (root.left) this.preorder(result, root.left);
    if (root.right) this.preorder(result, root.right);
    return result;
  }

  postorder(result = [], root = this.root) {
    if (root === null) return;
    if (root.left) this.postorder(result, root.left);
    if (root.right) this.postorder(result, root.right);
    result.push(root.data);
    return result;
  }

  // 8. Write a height function which accepts a node and returns its height.
  height(root = this.root) {
    if (root === null) {
      return 0;
    } else {
      let lHeight = this.height(root.left);
      let rHeight = this.height(root.right);
      if (lHeight > rHeight) {
        return lHeight + 1;
      } else {
        return rHeight + 1;
      }
    }
  }

  // 9. Write a depth function which accepts a node and returns its depth.
  depth(data, root = this.root) {
    if (root === null) return -1;

    let distance = -1;

    if (
      root.data === data ||
      (distance = this.depth(data, root.left)) >= 0 ||
      (distance = this.depth(data, root.right)) >= 0
    )
      return distance + 1;

    return distance;
  }

  // 10. Write a isBalanced function which checks if the tree is balanced.
  isBalanced(root = this.root) {
    if (root === null) return true;
    let leftHeight = this.treeHeight(root.left);
    let rightHeight = this.treeHeight(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) === true &&
      this.isBalanced(root.right) === true
    )
      return true;
    return false;
  }

  // function to find height of binary tree
  treeHeight(root = this.root) {
    if (root === null) return 0;
    return (
      Math.max(this.treeHeight(root.left), this.treeHeight(root.right)) + 1
    );
  }

  // 11. Write a rebalance function which rebalances an unbalanced tree.
  rebalance(root = this.root) {
    let result = this.levelOrder([], [], root);
    result.sort((a, b) => a - b);
    return (this.root = this.buildTree(result));
  }

  levelOrder(arr = [], queue = [], root = this.root) {
    if (root === null) return;
    // Visit the root
    arr.push(root.data);

    queue.push(root.left);
    queue.push(root.right);

    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(arr, queue, level);
    }

    return arr;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const tree = new Tree(data);

//tree.insert(2);
//tree.insert(4);
//tree.delete(4);
//console.log(tree.find(6345));
//console.log(tree.height());
//tree.printLevelOrder();
//console.log(tree.depth(4));
//tree.deleteNode(6345);
//console.log(tree.inorder());
//console.log(tree.preorder());
//console.log(tree.postorder());
//console.log(tree.treeHeight());
//console.log(tree.isBalanced());
