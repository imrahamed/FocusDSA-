import { Topic } from "./types";

export const topic06: Topic = {
  "id": "topic06",
  "slug": "binary-trees",
  "title": "Binary Trees & BST",
  "emoji": "🌳",
  "color": "#22c55e",
  "gradient": "from-jade-600 to-jade-400",
  "layman": "A binary tree is like a family tree where each person has at most 2 children. A BST adds a rule: left child always smaller, right always larger.",
  "technical": "Every tree problem has recursive structure: solve left, solve right, combine. Master DFS (pre/in/post-order) and BFS (level-order).",
  "keyInsights": [
    "Inorder BST traversal yields sorted output",
    "Height = max(leftHeight,rightHeight)+1",
    "Diameter = leftHeight+rightHeight at each node"
  ],
  "timeComplexities": [
    {
      "operation": "BST Search/Insert",
      "best": "O(log n)",
      "avg": "O(log n)",
      "worst": "O(n)",
      "space": "O(h)"
    },
    {
      "operation": "Tree Traversal",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(h)"
    }
  ],
  "questions": [
    {
      "id": "max-depth",
      "title": "Maximum Depth of Binary Tree",
      "difficulty": "Easy",
      "description": "Given the root of a binary tree, return its maximum depth.",
      "examples": [
        {
          "input": "root = [3,9,20,15,7]",
          "output": "3"
        }
      ],
      "constraints": [
        "0 ≤ n ≤ 10⁴"
      ],
      "starterCode": {
        "js": "function maxDepth(root) {\n  \n}",
        "python": "def max_depth(root):\n    pass"
      },
      "solution": {
        "js": "function maxDepth(root){\n  if(!root)return 0;\n  return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\n}",
        "python": "def max_depth(root):\n    if not root: return 0\n    return 1+max(max_depth(root.left),max_depth(root.right))"
      },
      "testCases": [
        {
          "input": "[3,9,20,15,7]",
          "expected": "3"
        },
        {
          "input": "[1,2]",
          "expected": "2",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(h)",
      "hints": [
        "Answer = 1 + max depth of two subtrees."
      ],
      "tags": [
        "tree",
        "recursion",
        "dfs"
      ],
      "walkthrough": [
        {
          "title": "Base case: null node",
          "explanation": "If node is  depth is 0. This is the base case that stops recursion.",
          "phase": "init",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "r",
                "label": "3",
                "x": 250,
                "y": 40
              },
              {
                "id": "l",
                "label": "9",
                "x": 130,
                "y": 110
              },
              {
                "id": "ri",
                "label": "20",
                "x": 370,
                "y": 110
              },
              {
                "id": "rl",
                "label": "15",
                "x": 310,
                "y": 180
              },
              {
                "id": "rr",
                "label": "7",
                "x": 430,
                "y": 180
              }
            ],
            "treeEdges": [
              [
                "r",
                "l"
              ],
              [
                "r",
                "ri"
              ],
              [
                "ri",
                "rl"
              ],
              [
                "ri",
                "rr"
              ]
            ]
          }
        },
        {
          "title": "Recurse on leaves",
          "explanation": "maxDepth(9)=1 (no children). maxDepth(15)=1. maxDepth(7)=1.",
          "phase": "scan",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "r",
                "label": "3",
                "x": 250,
                "y": 40
              },
              {
                "id": "l",
                "label": "9",
                "x": 130,
                "y": 110,
                "state": "found"
              },
              {
                "id": "ri",
                "label": "20",
                "x": 370,
                "y": 110
              },
              {
                "id": "rl",
                "label": "15",
                "x": 310,
                "y": 180,
                "state": "found"
              },
              {
                "id": "rr",
                "label": "7",
                "x": 430,
                "y": 180,
                "state": "found"
              }
            ],
            "treeEdges": [
              [
                "r",
                "l"
              ],
              [
                "r",
                "ri"
              ],
              [
                "ri",
                "rl"
              ],
              [
                "ri",
                "rr"
              ]
            ]
          }
        },
        {
          "title": "Combine at node 20",
          "explanation": "maxDepth(20) = 1 + max(maxDepth(15), maxDepth(7)) = 1+max(1,1) = 2.",
          "phase": "update",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "r",
                "label": "3",
                "x": 250,
                "y": 40
              },
              {
                "id": "l",
                "label": "9",
                "x": 130,
                "y": 110,
                "state": "found"
              },
              {
                "id": "ri",
                "label": "20",
                "x": 370,
                "y": 110,
                "state": "active"
              },
              {
                "id": "rl",
                "label": "15",
                "x": 310,
                "y": 180,
                "state": "found"
              },
              {
                "id": "rr",
                "label": "7",
                "x": 430,
                "y": 180,
                "state": "found"
              }
            ],
            "treeEdges": [
              [
                "r",
                "l"
              ],
              [
                "r",
                "ri"
              ],
              [
                "ri",
                "rl"
              ],
              [
                "ri",
                "rr"
              ]
            ]
          },
          "variables": {
            "maxDepth(20)": 2
          }
        },
        {
          "title": "Combine at root",
          "explanation": "maxDepth(3) = 1+max(maxDepth(9),maxDepth(20)) = 1+max(1,2) = 3.",
          "phase": "done",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "r",
                "label": "3",
                "x": 250,
                "y": 40,
                "state": "result"
              },
              {
                "id": "l",
                "label": "9",
                "x": 130,
                "y": 110,
                "state": "found"
              },
              {
                "id": "ri",
                "label": "20",
                "x": 370,
                "y": 110,
                "state": "found"
              },
              {
                "id": "rl",
                "label": "15",
                "x": 310,
                "y": 180,
                "state": "found"
              },
              {
                "id": "rr",
                "label": "7",
                "x": 430,
                "y": 180,
                "state": "found"
              }
            ],
            "treeEdges": [
              [
                "r",
                "l"
              ],
              [
                "r",
                "ri"
              ],
              [
                "ri",
                "rl"
              ],
              [
                "ri",
                "rr"
              ]
            ]
          },
          "variables": {
            "answer": 3
          },
          "complexity": "O(n) — visit every node once. O(h) space for recursion stack."
        }
      ]
    },
    {
      "id": "invert-binary-tree",
      "title": "Invert Binary Tree",
      "difficulty": "Easy",
      "description": "Given the root of a binary tree, invert the tree, and return its root.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [4,2,7,1,3,6,9]\n<strong>Output:</strong> [4,7,2,9,6,3,1]\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> [2,3,1]\n\n\nExample 3:\n\n\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 100].\n\t-100 <= Node.val <= 100",
      "examples": [
        {
          "input": "[4,2,7,1,3,6,9]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,1,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function invertBinaryTree(input) {\n  // Your code here\n}",
        "python": "def invert_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/invert-binary-tree/\n * TIme O(N) | Space O(N)\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = (root) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return root;\n\n    return dfs(root);\n};\n\nconst dfs = (root) => {\n    const left = invertTree(root.left);\n    const right = invertTree(root.right);\n\n    root.left = right;\n    root.right = left;\n\n    return root;\n};\n\n/**\n * https://leetcode.com/problems/invert-binary-tree/\n * TIme O(N) | Space O(W)\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = (root) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return root;\n\n    bfs([root]);\n\n    return root;\n};\n\nconst bfs = (queue) => {\n    while (queue.length) {\n        for (let i = queue.length - 1; 0 <= i; i--) {\n            const node = queue.shift();\n            const left = node.right;\n            const right = node.left;\n\n            node.left = left;\n            node.right = right;\n\n            if (node.left) queue.push(node.left);\n            if (node.right) queue.push(node.right);\n        }\n    }\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root:\n            return None\n        \n        # swap the children\n        root.left, root.right = root.right, root.left\n        \n        # make 2 recursive calls\n        self.invertTree(root.left)\n        self.invertTree(root.right)\n        return root\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Invert Binary Tree",
          "explanation": "Invert Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "maximum-depth-of-binary-tree",
      "title": "Maximum Depth of Binary Tree",
      "difficulty": "Easy",
      "description": "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> 3\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [1,null,2]\n<strong>Output:</strong> 2\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 104].\n\t-100 <= Node.val <= 100",
      "examples": [
        {
          "input": "[3,9,20,null,null,15,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,null,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function maximumDepthOfBinaryTree(input) {\n  // Your code here\n}",
        "python": "def maximum_depth_of_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/maximum-depth-of-binary-tree/\n * Time O(N) | Space O(N)\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return dfs(root);\n};\n\nconst dfs = (root) => {\n    const left = maxDepth(root.left);\n    const right = maxDepth(root.right);\n\n    const height = Math.max(left, right);\n\n    return height + 1;\n};\n\n/**\n * https://leetcode.com/problems/maximum-depth-of-binary-tree/\n * Time O(N) | Space O(N)\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return iterativeDfs([[root, 1]]);\n};\n\nconst iterativeDfs = (stack, height = 0) => {\n    while (stack.length) {\n        const [root, depth] = stack.pop();\n\n        height = Math.max(height, depth);\n\n        if (root.right) stack.push([root.right, depth + 1]);\n        if (root.left) stack.push([root.left, depth + 1]);\n    }\n\n    return height;\n};\n\n/**\n * https://leetcode.com/problems/maximum-depth-of-binary-tree/\n * Time O(N) | Space O(N)\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return bfs([[root, 0]]);\n};\n\nconst bfs = (queue, height = 0) => {\n    while (queue.length) {\n        for (let i = queue.length - 1; 0 <= i; i--) {\n            const [root, depth] = queue.shift();\n\n            height = Math.max(height, depth + 1);\n\n            if (root.left) queue.push([root.left, depth + 1]);\n            if (root.right) queue.push([root.right, depth + 1]);\n        }\n    }\n\n    return height;\n};\n",
        "python": "# RECURSIVE DFS\nclass Solution:\n    def maxDepth(self, root: TreeNode) -> int:\n        if not root:\n            return 0\n\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))\n\n\n# ITERATIVE DFS\nclass Solution:\n    def maxDepth(self, root: TreeNode) -> int:\n        stack = [[root, 1]]\n        res = 0\n\n        while stack:\n            node, depth = stack.pop()\n\n            if node:\n                res = max(res, depth)\n                stack.append([node.left, depth + 1])\n                stack.append([node.right, depth + 1])\n        return res\n\n\n# BFS\nclass Solution:\n    def maxDepth(self, root: TreeNode) -> int:\n        q = deque()\n        if root:\n            q.append(root)\n\n        level = 0\n\n        while q:\n\n            for i in range(len(q)):\n                node = q.popleft()\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            level += 1\n        return level\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Maximum Depth of Binary Tree",
          "explanation": "Maximum Depth of Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "diameter-of-binary-tree",
      "title": "Diameter of Binary Tree",
      "difficulty": "Easy",
      "description": "Given the root of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\nThe length of a path between two nodes is represented by the number of edges between them.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [1,2,3,4,5]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 3 is the length of the path [4,2,1,3] or [5,2,1,3].\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [1,2]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [1, 104].\n\t-100 <= Node.val <= 100",
      "examples": [
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function diameterOfBinaryTree(input) {\n  // Your code here\n}",
        "python": "def diameter_of_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/diameter-of-binary-tree/\n * TIme O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {number}\n */\nvar diameterOfBinaryTree = function (root, max = [0]) {\n    diameterOfTree(root, max);\n\n    return max[0];\n};\n\nconst diameterOfTree = (root, max) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return dfs(root, max);\n};\n\nconst dfs = (root, max) => {\n    const left = diameterOfTree(root.left, max);\n    const right = diameterOfTree(root.right, max);\n\n    const diameter = left + right;\n    max[0] = Math.max(max[0], diameter);\n\n    const height = Math.max(left, right);\n\n    return height + 1;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        res = 0\n\n        def dfs(root):\n            nonlocal res\n\n            if not root:\n                return 0\n            left = dfs(root.left)\n            right = dfs(root.right)\n            res = max(res, left + right)\n\n            return 1 + max(left, right)\n\n        dfs(root)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Diameter of Binary Tree",
          "explanation": "Diameter of Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "balanced-binary-tree",
      "title": "Balanced Binary Tree",
      "difficulty": "Easy",
      "description": "Given a binary tree, determine if it is height-balanced.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [1,2,2,3,3,null,null,4,4]\n<strong>Output:</strong> false\n\n\nExample 3:\n\n\n<strong>Input:</strong> root = []\n<strong>Output:</strong> true\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 5000].\n\t-104 <= Node.val <= 104",
      "examples": [
        {
          "input": "[3,9,20,null,null,15,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,2,3,3,null,null,4,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function balancedBinaryTree(input) {\n  // Your code here\n}",
        "python": "def balanced_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/balanced-binary-tree/\n * TIme O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isBalanced = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return true;\n    if (!isAcceptableHeight(root)) return false;\n    if (!isChildBalanced(root)) return false;\n\n    return true;\n};\n\nconst isChildBalanced = (root) => {\n    const left = isBalanced(root.left);\n    const right = isBalanced(root.right);\n\n    return left && right;\n};\n\nconst isAcceptableHeight = (root) => {\n    const left = getHeight(root.left);\n    const right = getHeight(root.right);\n\n    const difference = Math.abs(left - right);\n\n    return difference <= 1;\n};\n\nconst getHeight = (root) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return dfs(root);\n};\n\nvar dfs = (root) => {\n    const left = getHeight(root.left);\n    const right = getHeight(root.right);\n\n    const height = Math.max(left, right);\n\n    return height + 1;\n};\n\n/**\n * https://leetcode.com/problems/balanced-binary-tree/\n * TIme O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isBalanced = function (root) {\n    const [_height, _isBalanced] = isRootBalanced(root);\n\n    return _isBalanced;\n};\n\nvar isRootBalanced = (root) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return [-1, true];\n\n    return dfs(root);\n};\n\nvar dfs = (root) => {\n    const [left, isLeftBalanced] = isRootBalanced(root.left);\n    const [right, isRightBalanced] = isRootBalanced(root.right);\n    const [height, difference] = [\n        Math.max(left, right),\n        Math.abs(left - right),\n    ];\n\n    const isAcceptableHeight = difference <= 1;\n    const _isBalanced = isLeftBalanced && isRightBalanced;\n\n    const _isRootBalanced = _isBalanced && isAcceptableHeight;\n\n    return [height + 1, _isRootBalanced];\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        def dfs(root):\n            if not root:\n                return [True, 0]\n\n            left, right = dfs(root.left), dfs(root.right)\n            balanced = left[0] and right[0] and abs(left[1] - right[1]) <= 1\n            return [balanced, 1 + max(left[1], right[1])]\n\n        return dfs(root)[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Balanced Binary Tree",
          "explanation": "Balanced Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "same-tree",
      "title": "Same Tree",
      "difficulty": "Easy",
      "description": "Given the roots of two binary trees p and q, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.\n\n \nExample 1:\n\n\n<strong>Input:</strong> p = [1,2,3], q = [1,2,3]\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> p = [1,2], q = [1,null,2]\n<strong>Output:</strong> false\n\n\nExample 3:\n\n\n<strong>Input:</strong> p = [1,2,1], q = [1,1,2]\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\tThe number of nodes in both trees is in the range [0, 100].\n\t-104 <= Node.val <= 104",
      "examples": [
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function sameTree(input) {\n  // Your code here\n}",
        "python": "def same_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Check if both nodes are null (end of a branch in both trees)\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {boolean}\n */\nvar isSameTree = function (p, q) {\n    // Check if both nodes are null (end of a branch in both trees)\n    const areBothNodesNull = p == null && q == null;\n    if (areBothNodesNull) return true;\n\n    // Check if only one node is null (mismatch in tree structure)\n    const isOnlyOneNodeNull = p == null || q == null;\n    if (isOnlyOneNodeNull) return false;\n\n    // Check if node values are equal (mismatch in node values)\n    const doNodesHaveEqualValue = p.val == q.val;\n    if (!doNodesHaveEqualValue) return false;\n\n    // Recursively check left and right subtrees\n    return dfs(p, q);\n};\n\n/**\n * * https://leetcode.com/problems/same-tree/\n * * Time complexity is O(N), where N is the total number of nodes in the tree.\n   * This is because in the worst-case scenario, we need to visit every node once.\n\n * * Space complexity is O(H), where H is the height of the tree.\n   * This is because in the worst-case scenario (a skewed tree), the maximum\n   * amount of space is consumed by the recursive stack. \n * @param {*} p \n * @param {*} q \n * @returns \n */\nconst dfs = (p, q) => {\n    const left = isSameTree(p.left, q.left);\n    const right = isSameTree(p.right, q.right);\n\n    return left && right;\n};\n\n/**\n * https://leetcode.com/problems/same-tree/\n * TIme O(N) | Space O(W)\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {boolean}\n */\nvar isSameTree = function (p, q) {\n    if (isSameNode(p, q)) return true;\n\n    return bfs([[p, q]]);\n};\n\nconst bfs = (queue) => {\n    while (queue.length) {\n        for (let i = queue.length - 1; 0 <= i; i--) {\n            const [p, q] = queue.shift();\n\n            if (!isSame(p, q)) return false;\n\n            if (p.left) queue.push([p.left, q.left]);\n            if (p.right) queue.push([p.right, q.right]);\n        }\n    }\n\n    return true;\n};\n\nconst isSameNode = (p, q) => {\n    const isBaseCase = !(p || q);\n    if (isBaseCase) return true;\n\n    const isBalanced = p && q;\n    if (!isBalanced) return false;\n\n    const isSame = p.val === q.val;\n    if (!isSame) return false;\n\n    return true;\n};\n\nconst isSame = (p, q) =>\n    isSameNode(p, q) &&\n    isSameNode(p.left, q.left) &&\n    isSameNode(p.right, q.right);\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\n\nclass Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q:\n            return True\n        if p and q and p.val == q.val:\n            return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\n        else:\n            return False\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Same Tree",
          "explanation": "Same Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "subtree-of-another-tree",
      "title": "Subtree of Another Tree",
      "difficulty": "Easy",
      "description": "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.\n\nA subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [3,4,5,1,2], subRoot = [4,1,2]\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the root tree is in the range [1, 2000].\n\tThe number of nodes in the subRoot tree is in the range [1, 1000].\n\t-104 <= root.val <= 104\n\t-104 <= subRoot.val <= 104",
      "examples": [
        {
          "input": "[3,4,5,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[4,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,4,5,1,2,null,null,null,null,0]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function subtreeOfAnotherTree(input) {\n  // Your code here\n}",
        "python": "def subtree_of_another_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/subtree-of-another-tree/\n * @param {TreeNode} root\n * @param {TreeNode} subRoot\n * @return {boolean}\n */\nvar isSubtree = function (root, subRoot) {\n    if (!root) return false;\n\n    if (isSame(root, subRoot)) return true;\n\n    const hasLeftTree = isSubtree(root.left, subRoot);\n    const hasRightTree = isSubtree(root.right, subRoot);\n\n    return hasLeftTree || hasRightTree;\n};\n\nconst isSame = (root, subRoot) => {\n    const hasReachedEnd = !(root && subRoot);\n    if (hasReachedEnd) return root === subRoot;\n\n    const isMismatch = root.val !== subRoot.val;\n    if (isMismatch) return false;\n\n    const isLeftSame = isSame(root.left, subRoot.left);\n    const isRightSame = isSame(root.right, subRoot.right);\n\n    return isLeftSame && isRightSame;\n};\n\nconst hash = (val) =>\n    require('crypto').createHash('md5').update(val).digest('hex');\n\nconst merkle = (root) => {\n    if (!root) return '#';\n\n    const { left, val, right } = root;\n\n    const leftMerkle = merkle(left);\n    const rightMerkle = merkle(right);\n\n    const merkleVal = [leftMerkle, val, rightMerkle].join('');\n    const merkleHash = hash(merkleVal);\n\n    root.merkle = merkleHash;\n\n    return root.merkle;\n};\n\nconst search = (root, subRoot) => {\n    if (!root) return false;\n\n    const hasSamePath = root.merkle === subRoot.merkle;\n    if (hasSamePath) return true;\n\n    const left = search(root.left, subRoot);\n    const right = search(root.right, subRoot);\n\n    return left || right;\n};\n\nvar isSubtree = function (root, subRoot) {\n    [root, subRoot].forEach(merkle);\n\n    return search(root, subRoot);\n};\n\nconst hashify = (root, hash, postOrderKey) => {\n    if (!root) return '#';\n\n    const left = hashify(root.left, hash, postOrderKey);\n    const right = hashify(root.right, hash, postOrderKey);\n\n    const key = [left, root.val, right].join('');\n\n    if (!hash.has(key)) {\n        hash.set(key, postOrderKey[0]);\n        postOrderKey[0]++;\n    }\n\n    return hash.get(key);\n};\n\nvar isSubtree = function (root, subRoot, hash = new Map(), postOrderKey = [0]) {\n    hashify(root, hash, postOrderKey);\n\n    const hashKey = [\n        hashify(subRoot.left, hash, postOrderKey),\n        subRoot.val,\n        hashify(subRoot.right, hash, postOrderKey),\n    ].join('');\n\n    return hash.has(hashKey);\n};\n\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * https://leetcode.com/problems/subtree-of-another-tree/\n * @param {TreeNode} root\n * @param {TreeNode} subRoot\n * @return {boolean}\n */\nvar isSubtree = function (root, subRoot) {\n    if (!subRoot) {\n        return true;\n    } else if (!root) {\n        return false;\n    } else if (isSameTree(root, subRoot)) {\n        return true;\n    }\n\n    const leftResult = isSubtree(root.left, subRoot);\n    const rightResult = isSubtree(root.right, subRoot);\n\n    return leftResult || rightResult;\n};\n\nfunction isSameTree(root, subRoot) {\n    if (!root && !subRoot) {\n        return true;\n    } else if (!root || !subRoot) {\n        return false;\n    } else if (root.val !== subRoot.val) {\n        return false;\n    }\n\n    const leftRes = isSameTree(root.left, subRoot.left);\n    const rightRes = isSameTree(root.right, subRoot.right);\n\n    return leftRes && rightRes;\n}\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        if not subRoot:\n            return True\n        if not root:\n            return False\n\n        if self.isSameTree(root, subRoot):\n            return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)\n\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q:\n            return True\n        if p and q and p.val == q.val:\n            return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)\n        else:\n            return False\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Subtree of Another Tree",
          "explanation": "Subtree of Another Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Trees"
      ],
      "hints": [
        "Which approach is better here- recursive or iterative?",
        "If recursive approach is better, can you write recursive function with its parameters?",
        "Two trees <b>s</b> and <b>t</b> are said to be identical if their root values are same and their left and right subtrees are identical. Can you write this in form of recursive formulae?",
        "Recursive formulae can be: \r\nisIdentical(s,t)= s.val==t.val AND isIdentical(s.left,t.left) AND isIdentical(s.right,t.right)"
      ]
    },
    {
      "id": "lowest-common-ancestor-of-a-binary-search-tree",
      "title": "Lowest Common Ancestor of a Binary Search Tree",
      "difficulty": "Medium",
      "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The LCA of nodes 2 and 8 is 6.\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.\n\n\nExample 3:\n\n\n<strong>Input:</strong> root = [2,1], p = 2, q = 1\n<strong>Output:</strong> 2\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [2, 105].\n\t-109 <= Node.val <= 109\n\tAll Node.val are unique.\n\tp != q\n\tp and q will exist in the BST.",
      "examples": [
        {
          "input": "[6,2,8,0,4,7,9,null,null,3,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "8",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function lowestCommonAncestorOfABinarySearchTree(input) {\n  // Your code here\n}",
        "python": "def lowest_common_ancestor_of_a_binary_search_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/\n * Time O(H) | Space O(H)\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nvar lowestCommonAncestor = function (root, p, q) {\n    const isGreater = p.val < root.val && q.val < root.val;\n    if (isGreater) return lowestCommonAncestor(root.left, p, q);\n\n    const isLess = root.val < p.val && root.val < q.val;\n    if (isLess) return lowestCommonAncestor(root.right, p, q);\n\n    return root;\n};\n\n/**\n * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/\n * Time O(H) | Space O(1)\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nvar lowestCommonAncestor = function (root, p, q) {\n    while (root !== null) {\n        const isGreater = root.val < p.val && root.val < q.val;\n        if (isGreater) {\n            root = root.right;\n            continue;\n        }\n\n        const isLess = p.val < root.val && q.val < root.val;\n        if (isLess) {\n            root = root.left;\n            continue;\n        }\n\n        break;\n    }\n\n    return root;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\n\nclass Solution:\n    def lowestCommonAncestor(\n        self, root: \"TreeNode\", p: \"TreeNode\", q: \"TreeNode\"\n    ) -> \"TreeNode\":\n        while True:\n            if root.val < p.val and root.val < q.val:\n                root = root.right\n            elif root.val > p.val and root.val > q.val:\n                root = root.left\n            else:\n                return root\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Lowest Common Ancestor of a Binary Search Tree",
          "explanation": "Lowest Common Ancestor of a Binary Search Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(H)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "binary-tree-level-order-traversal",
      "title": "Binary Tree Level Order Traversal",
      "difficulty": "Medium",
      "description": "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [3,9,20,null,null,15,7]\n<strong>Output:</strong> [[3],[9,20],[15,7]]\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [1]\n<strong>Output:</strong> [[1]]\n\n\nExample 3:\n\n\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 2000].\n\t-1000 <= Node.val <= 1000",
      "examples": [
        {
          "input": "[3,9,20,null,null,15,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function binaryTreeLevelOrderTraversal(input) {\n  // Your code here\n}",
        "python": "def binary_tree_level_order_traversal(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/binary-tree-level-order-traversal/\n * Time O(N) | Space O(W)\n * Note that the time complexity is actually O(N^2) if we consider the fact that we use an array as a queue. Calling Array.shift() takes O(N).\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return [];\n\n    return bfs([root]);\n};\n\nconst bfs = (queue /* Space O(W) */, levels = []) => {\n    while (queue.length) {\n        // Time O(N)\n        const level = [];\n\n        for (let i = queue.length - 1; 0 <= i; i--) {\n            const node = queue.shift(); // Time O(N) ... This can be O(1) if we use an actual queue data structure\n\n            if (node.left) queue.push(node.left);\n            if (node.right) queue.push(node.right);\n\n            level.push(node.val);\n        }\n\n        levels.push(level.slice());\n    }\n\n    return levels;\n};\n\n/**\n * https://leetcode.com/problems/binary-tree-level-order-traversal/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar levelOrder = function (root, level = 0, levels = []) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return levels;\n\n    const isLastNode = level === levels.length;\n    if (isLastNode) levels.push([]);\n\n    levels[level].push(root.val);\n\n    return dfs(root, level, levels); // Time O(N) | Space O(H)\n};\n\nconst dfs = (root, level, levels) => {\n    if (root.left) levelOrder(root.left, level + 1, levels);\n    if (root.right) levelOrder(root.right, level + 1, levels);\n\n    return levels;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\n\nclass Solution:\n    def levelOrder(self, root: TreeNode) -> List[List[int]]:\n        res = []\n        q = collections.deque()\n        if root:\n            q.append(root)\n\n        while q:\n            val = []\n\n            for i in range(len(q)):\n                node = q.popleft()\n                val.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(val)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Binary Tree Level Order Traversal",
          "explanation": "Binary Tree Level Order Traversal is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(W)",
      "tags": [
        "Trees"
      ],
      "hints": [
        "Use a queue to perform BFS."
      ]
    },
    {
      "id": "binary-tree-right-side-view",
      "title": "Binary Tree Right Side View",
      "difficulty": "Medium",
      "description": "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.\n\n \nExample 1:\n\n\nInput: root = [1,2,3,null,5,null,4]\n\nOutput: [1,3,4]\n\nExplanation:\n\n\n\n\nExample 2:\n\n\nInput: root = [1,2,3,4,null,null,null,5]\n\nOutput: [1,3,4,5]\n\nExplanation:\n\n\n\n\nExample 3:\n\n\nInput: root = [1,null,3]\n\nOutput: [1,3]\n\n\nExample 4:\n\n\nInput: root = []\n\nOutput: []\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 100].\n\t-100 <= Node.val <= 100",
      "examples": [
        {
          "input": "[1,2,3,null,5,null,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3,4,null,null,null,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,null,3]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function binaryTreeRightSideView(input) {\n  // Your code here\n}",
        "python": "def binary_tree_right_side_view(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/binary-tree-right-side-view/\n * Time O(N) | Space O(W)\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar rightSideView = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return [];\n\n    return bfs([root]);\n};\n\nconst bfs = (queue, rightSide = []) => {\n    while (queue.length) {\n        let prev = null;\n\n        for (let i = queue.length - 1; 0 <= i; i--) {\n            const node = queue.shift();\n\n            prev = node;\n\n            if (node.left) queue.push(node.left);\n            if (node.right) queue.push(node.right);\n        }\n\n        rightSide.push(prev.val);\n    }\n\n    return rightSide;\n};\n\n/**\n * https://leetcode.com/problems/binary-tree-right-side-view/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar rightSideView = function (root, level = 0, rightSide = []) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return rightSide;\n\n    const isLastNode = level === rightSide.length;\n    if (isLastNode) rightSide.push(root.val);\n\n    return dfs(root, level, rightSide);\n};\n\nconst dfs = (root, level, rightSide) => {\n    if (root.right) rightSideView(root.right, level + 1, rightSide);\n    if (root.left) rightSideView(root.left, level + 1, rightSide);\n\n    return rightSide;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def rightSideView(self, root: TreeNode) -> List[int]:\n        res = []\n        q = collections.deque([root])\n\n        while q:\n            rightSide = None\n            qLen = len(q)\n\n            for i in range(qLen):\n                node = q.popleft()\n                if node:\n                    rightSide = node\n                    q.append(node.left)\n                    q.append(node.right)\n            if rightSide:\n                res.append(rightSide.val)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Binary Tree Right Side View",
          "explanation": "Binary Tree Right Side View is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(W)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "count-good-nodes-in-binary-tree",
      "title": "Count Good Nodes in Binary Tree",
      "difficulty": "Medium",
      "description": "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.\r\n\r\nReturn the number of good nodes in the binary tree.\r\n\r\n \r\nExample 1:\r\n\r\n\r\n\r\n\r\n<strong>Input:</strong> root = [3,1,4,3,null,1,5]\r\n<strong>Output:</strong> 4\r\n<strong>Explanation:</strong> Nodes in blue are <strong>good</strong>.\r\nRoot Node (3) is always a good node.\r\nNode 4 -> (3,4) is the maximum value in the path starting from the root.\r\nNode 5 -> (3,4,5) is the maximum value in the path\r\nNode 3 -> (3,1,3) is the maximum value in the path.\r\n\r\nExample 2:\r\n\r\n\r\n\r\n\r\n<strong>Input:</strong> root = [3,3,null,4,2]\r\n<strong>Output:</strong> 3\r\n<strong>Explanation:</strong> Node 2 -> (3, 3, 2) is not good, because \"3\" is higher than it.\r\n\r\nExample 3:\r\n\r\n\r\n<strong>Input:</strong> root = [1]\r\n<strong>Output:</strong> 1\r\n<strong>Explanation:</strong> Root is considered as <strong>good</strong>.\r\n\r\n \r\nConstraints:\r\n\r\n\r\n\tThe number of nodes in the binary tree is in the range [1, 10^5].\r\n\tEach node's value is between [-10^4, 10^4].",
      "examples": [
        {
          "input": "[3,1,4,3,null,1,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,3,null,4,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function countGoodNodesInBinaryTree(input) {\n  // Your code here\n}",
        "python": "def count_good_nodes_in_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Count Good Nodes in Binary Tree",
          "explanation": "Count Good Nodes in Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Trees"
      ],
      "hints": [
        "Use DFS (Depth First Search) to traverse the tree, and constantly keep track of the current path maximum."
      ]
    },
    {
      "id": "validate-binary-search-tree",
      "title": "Validate Binary Search Tree",
      "difficulty": "Medium",
      "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n\n\n\tThe left subtree of a node contains only nodes with keys strictly less than the node's key.\n\tThe right subtree of a node contains only nodes with keys strictly greater than the node's key.\n\tBoth the left and right subtrees must also be binary search trees.\n\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [2,1,3]\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [5,1,4,null,null,3,6]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The root node's value is 5 but its right child's value is 4.\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [1, 104].\n\t-231 <= Node.val <= 231 - 1",
      "examples": [
        {
          "input": "[2,1,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[5,1,4,null,null,3,6]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function validateBinarySearchTree(input) {\n  // Your code here\n}",
        "python": "def validate_binary_search_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/validate-binary-search-tree/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isValidBST = function (root, min = -Infinity, max = Infinity) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return true;\n\n    const isInvalid = root.val <= min || max <= root.val;\n    if (isInvalid) return false;\n\n    return dfs(root, min, max);\n};\n\nconst dfs = (root, min, max) => {\n    const left = isValidBST(root.left, min, root.val);\n    const right = isValidBST(root.right, root.val, max);\n\n    return left && right;\n};\n// TODO\n/**\n * https://leetcode.com/problems/validate-binary-search-tree/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isValidBST = function (root, prev = [null]) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return true;\n\n    if (!isValidBST(root.left, prev)) return false;\n\n    const isInvalid = prev[0] !== null && root.val <= prev[0];\n    if (isInvalid) return false;\n\n    prev[0] = root.val;\n\n    return isValidBST(root.right, prev);\n};\n\n/**\n * https://leetcode.com/problems/validate-binary-search-tree/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isValidBST = function (root, stack = []) {\n    let prev = null;\n\n    while (stack.length || root) {\n        moveLeft(stack, root);\n        root = stack.pop();\n\n        const isInvalid = prev && root.val <= prev.val;\n        if (isInvalid) return false;\n\n        prev = root;\n        root = root.right;\n    }\n\n    return true;\n};\n\nconst moveLeft = (stack, root) => {\n    while (root) {\n        stack.push(root);\n        root = root.left;\n    }\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def isValidBST(self, root: TreeNode) -> bool:\n        def valid(node, left, right):\n            if not node:\n                return True\n            if not (left < node.val < right):\n                return False\n\n            return valid(node.left, left, node.val) and valid(\n                node.right, node.val, right\n            )\n\n        return valid(root, float(\"-inf\"), float(\"inf\"))\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Validate Binary Search Tree",
          "explanation": "Validate Binary Search Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "kth-smallest-element-in-a-bst",
      "title": "Kth Smallest Element in a BST",
      "difficulty": "Medium",
      "description": "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [3,1,4,null,2], k = 1\n<strong>Output:</strong> 1\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [5,3,6,2,4,null,null,1], k = 3\n<strong>Output:</strong> 3\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is n.\n\t1 <= k <= n <= 104\n\t0 <= Node.val <= 104\n\n\n \nFollow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?",
      "examples": [
        {
          "input": "[3,1,4,null,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "1",
          "output": "See problem description for expected output."
        },
        {
          "input": "[5,3,6,2,4,null,null,1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function kthSmallestElementInABst(input) {\n  // Your code here\n}",
        "python": "def kth_smallest_element_in_a_bst(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/kth-smallest-element-in-a-bst/\n * Time O(N + K) | Space O(H)\n * @param {TreeNode} root\n * @param {number} k\n * @return {number}\n */\nvar kthSmallest = function (root, k, inOrder = []) {\n    if (!root) return inOrder;\n\n    return dfs(root, k, inOrder);\n};\n\nconst dfs = (root, k, inOrder) => {\n    if (root.left) kthSmallest(root.left, k, inOrder);\n\n    inOrder.push(root.val);\n\n    if (root.right) kthSmallest(root.right, k, inOrder);\n\n    return inOrder[k - 1];\n};\n\n/**\n * https://leetcode.com/problems/kth-smallest-element-in-a-bst/\n * Time O(N + K) | Space O(H)\n * @param {TreeNode} root\n * @param {number} k\n * @return {number}\n */\nvar kthSmallest = function (root, k, stack = []) {\n    while (k--) {\n        root = moveLeft(root, stack);\n\n        const isSmallest = k === 0;\n        if (isSmallest) return root.val;\n\n        root = root.right;\n    }\n};\n\nconst moveLeft = (root, stack) => {\n    while (root !== null) {\n        stack.push(root);\n        root = root.left;\n    }\n\n    return stack.pop();\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\n\nclass Solution:\n    def kthSmallest(self, root: TreeNode, k: int) -> int:\n        stack = []\n        curr = root\n\n        while stack or curr:\n            while curr:\n                stack.append(curr)\n                curr = curr.left\n            curr = stack.pop()\n            k -= 1\n            if k == 0:\n                return curr.val\n            curr = curr.right\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Kth Smallest Element in a BST",
          "explanation": "Kth Smallest Element in a BST is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N + K)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": [
        "Try to utilize the property of a BST.",
        "Try in-order traversal. (Credits to @chan13)",
        "What if you could modify the BST node's structure?",
        "The optimal runtime complexity is O(height of BST)."
      ]
    },
    {
      "id": "construct-binary-tree-from-preorder-and-inorder-traversal",
      "title": "Construct Binary Tree from Preorder and Inorder Traversal",
      "difficulty": "Medium",
      "description": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.\n\n \nExample 1:\n\n\n<strong>Input:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\n<strong>Output:</strong> [3,9,20,null,null,15,7]\n\n\nExample 2:\n\n\n<strong>Input:</strong> preorder = [-1], inorder = [-1]\n<strong>Output:</strong> [-1]\n\n\n \nConstraints:\n\n\n\t1 <= preorder.length <= 3000\n\tinorder.length == preorder.length\n\t-3000 <= preorder[i], inorder[i] <= 3000\n\tpreorder and inorder consist of unique values.\n\tEach value of inorder also appears in preorder.\n\tpreorder is guaranteed to be the preorder traversal of the tree.\n\tinorder is guaranteed to be the inorder traversal of the tree.",
      "examples": [
        {
          "input": "[3,9,20,15,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[9,3,15,20,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[-1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function constructBinaryTreeFromPreorderAndInorderTraversal(input) {\n  // Your code here\n}",
        "python": "def construct_binary_tree_from_preorder_and_inorder_traversal(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/\n * Time O(N^2) | Space(H)\n * @param {number[]} preorder\n * @param {number[]} inorder\n * @return {TreeNode}\n */\nvar buildTree = function (preorder, inorder) {\n    const isBaseCase = !preorder.length || !inorder.length;\n    if (isBaseCase) return null;\n\n    return dfs(preorder, inorder);\n};\n\nvar dfs = (preorder, inorder) => {\n    const { leftInorder, mid, rightInorder } = getPointers(preorder, inorder);\n    const root = new TreeNode(inorder[mid]);\n\n    root.left = buildTree(preorder, leftInorder);\n    root.right = buildTree(preorder, rightInorder);\n\n    return root;\n};\n\nconst getPointers = (preorder, inorder) => {\n    const next = preorder.shift();\n    const mid = inorder.indexOf(next);\n    const leftInorder = inorder.slice(0, mid);\n    const rightInorder = inorder.slice(mid + 1);\n\n    return { leftInorder, mid, rightInorder };\n};\n\n/**\n * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/\n * Time O(N) | Space(H)\n * @param {number[]} preorder\n * @param {number[]} inorder\n * @return {TreeNode}\n */\nvar buildTree = function (\n    preorder,\n    inorder,\n    max = -Infinity,\n    indices = { preorder: 0, inorder: 0 },\n) {\n    const isBaseCase = preorder.length <= indices.inorder;\n    if (isBaseCase) return null;\n\n    const isAtEnd = inorder[indices.inorder] === max;\n    if (isAtEnd) {\n        indices.inorder++;\n        return null;\n    }\n\n    return dfs(preorder, inorder, max, indices);\n};\n\nvar dfs = (preorder, inorder, max, indices) => {\n    const val = preorder[indices.preorder++];\n    const root = new TreeNode(val);\n\n    root.left = buildTree(preorder, inorder, root.val, indices);\n    root.right = buildTree(preorder, inorder, max, indices);\n\n    return root;\n};\n",
        "python": "class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        if not preorder or not inorder:\n            return None\n\n        root = TreeNode(preorder[0])\n        mid = inorder.index(preorder[0])\n        root.left = self.buildTree(preorder[1 : mid + 1], inorder[:mid])\n        root.right = self.buildTree(preorder[mid + 1 :], inorder[mid + 1 :])\n        return root\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Construct Binary Tree from Preorder and Inorder Traversal",
          "explanation": "Construct Binary Tree from Preorder and Inorder Traversal is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "binary-tree-maximum-path-sum",
      "title": "Binary Tree Maximum Path Sum",
      "difficulty": "Hard",
      "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\n\nThe path sum of a path is the sum of the node's values in the path.\n\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [1,2,3]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = [-10,9,20,null,null,15,7]\n<strong>Output:</strong> 42\n<strong>Explanation:</strong> The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [1, 3 * 104].\n\t-1000 <= Node.val <= 1000",
      "examples": [
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[-10,9,20,null,null,15,7]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function binaryTreeMaximumPathSum(input) {\n  // Your code here\n}",
        "python": "def binary_tree_maximum_path_sum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/binary-tree-maximum-path-sum/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxPathSum = function (root, maxValue = [-Infinity]) {\n    pathSum(root, maxValue);\n\n    return maxValue[0];\n};\n\nconst pathSum = (root, maxValue) => {\n    const isBaseCase = root === null;\n    if (isBaseCase) return 0;\n\n    return dfs(root, maxValue);\n};\n\nconst dfs = (node, maxValue) => {\n    const left = Math.max(0, pathSum(node.left, maxValue));\n    const right = Math.max(0, pathSum(node.right, maxValue));\n    const sum = left + right + node.val;\n\n    maxValue[0] = Math.max(maxValue[0], sum);\n\n    return Math.max(left, right) + node.val;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def maxPathSum(self, root: TreeNode) -> int:\n        res = [root.val]\n\n        # return max path sum without split\n        def dfs(root):\n            if not root:\n                return 0\n\n            leftMax = dfs(root.left)\n            rightMax = dfs(root.right)\n            leftMax = max(leftMax, 0)\n            rightMax = max(rightMax, 0)\n\n            # compute max path sum WITH split\n            res[0] = max(res[0], root.val + leftMax + rightMax)\n            return root.val + max(leftMax, rightMax)\n\n        dfs(root)\n        return res[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Binary Tree Maximum Path Sum",
          "explanation": "Binary Tree Maximum Path Sum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    },
    {
      "id": "serialize-and-deserialize-binary-tree",
      "title": "Serialize and Deserialize Binary Tree",
      "difficulty": "Hard",
      "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\nClarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.\n\n \nExample 1:\n\n\n<strong>Input:</strong> root = [1,2,3,null,null,4,5]\n<strong>Output:</strong> [1,2,3,null,null,4,5]\n\n\nExample 2:\n\n\n<strong>Input:</strong> root = []\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the tree is in the range [0, 104].\n\t-1000 <= Node.val <= 1000",
      "examples": [
        {
          "input": "[1,2,3,null,null,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function serializeAndDeserializeBinaryTree(input) {\n  // Your code here\n}",
        "python": "def serialize_and_deserialize_binary_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Encodes a tree to a single string.\n * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function (root, result = []) {\n    serial(root, result);\n\n    return result;\n};\n\nconst serial = (root, result) => {\n    const isBase = root === null;\n    if (isBase) return result.push(null);\n\n    dfsSerialize(root, result);\n};\n\nconst dfsSerialize = (node, result) => {\n    result.push(node.val);\n    serial(node.left, result);\n    serial(node.right, result);\n};\n\n/**\n * Encodes a tree to a single string.\n * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/\n * Time O(N) | Space O(H)\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function (root) {\n    const isBaseCase = root === null;\n    if (isBaseCase) return [null];\n\n    return dfsSerializeIterative([root]);\n};\n\nconst dfsSerializeIterative = (stack, result = []) => {\n    while (stack.length) {\n        const curr = stack.pop();\n\n        const isNull = curr === null;\n        if (isNull) {\n            result.push(null);\n            continue;\n        }\n\n        result.push(curr.val);\n        stack.push(curr.right);\n        stack.push(curr.left);\n    }\n\n    return result;\n};\n\n/**\n * Decodes your encoded data to tree.\n * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/\n * Time O(N) | Space O(H)\n * @param {string} data\n * @return {TreeNode}\n */\nvar deserialize = function (data) {\n    const isBaseCase = !data.length;\n    if (isBaseCase) return null;\n\n    const val = data.shift();\n\n    const isNull = val === null;\n    if (isNull) return null;\n\n    return dfsDeserialize(val, data);\n};\n\nconst dfsDeserialize = (val, data) => {\n    const node = new TreeNode(val);\n\n    node.left = deserialize(data);\n    node.right = deserialize(data);\n\n    return node;\n};\n",
        "python": "# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\n\nclass Codec:\n    def serialize(self, root):\n        res = []\n\n        def dfs(node):\n            if not node:\n                res.append(\"N\")\n                return\n            res.append(str(node.val))\n            dfs(node.left)\n            dfs(node.right)\n\n        dfs(root)\n        return \",\".join(res)\n\n    def deserialize(self, data):\n        vals = data.split(\",\")\n\n        def dfs():\n            val = vals.pop(0)\n            if val == \"N\":\n                return None\n            node = TreeNode(val=int(val))\n            node.left = dfs()\n            node.right = dfs()\n            return node\n\n        return dfs()\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Serialize and Deserialize Binary Tree",
          "explanation": "Serialize and Deserialize Binary Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H)",
      "tags": [
        "Trees"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Inorder traversal of a BST produces:",
      "options": [
        "Random order",
        "Sorted ascending",
        "Level-by-level",
        "Reverse sorted"
      ],
      "correct": 1,
      "explanation": "BST: left<node<right. Inorder (L→N→R) = sorted output."
    }
  ],
  "cheatSheet": "# Tree DFS\n```js\nfunction dfs(node){\n  if(!node)return;\n  // preorder here\n  dfs(node.left);\n  // inorder here\n  dfs(node.right);\n  // postorder here\n}\n```",
  "proTips": [
    "Always handle null base case first",
    "Diameter/path sum: return depth from helper, update global max"
  ],
  "faangQuotes": [
    "\"Serialize/Deserialize Binary Tree is our favorite system design + coding hybrid.\" — Amazon"
  ],
  "visualizationType": "tree",
  "usage": "Used to model hierarchical data, enable fast lookups (BST), and perform recursive depth/breadth first traversals.",
  "dsInvolved": "Binary Tree, Binary Search Tree, Recursion",
  "sampleProblems": [
    "Maximum Depth of Binary Tree",
    "Invert Binary Tree",
    "Lowest Common Ancestor"
  ]
};
