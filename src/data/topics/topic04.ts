import { Topic } from "./types";

export const topic04: Topic = {
  "id": "topic04",
  "slug": "linked-lists",
  "title": "Linked Lists",
  "emoji": "🔗",
  "color": "#f59e0b",
  "gradient": "from-amber-500 to-amber-400",
  "layman": "A linked list is like a treasure hunt — each clue tells you where the next clue is. Unlike an array where items sit in numbered boxes, each node only knows its own value and a pointer to the next.",
  "technical": "Linked lists: O(1) insert/delete given a pointer, O(n) search. Key techniques: dummy head node, fast/slow pointers, in-place reversal.",
  "keyInsights": [
    "Dummy head eliminates edge cases for head deletion",
    "Fast/slow pointer for cycle detection and midpoint finding",
    "Reverse in-place: track prev, cur, next",
    "Draw pointer arrows before coding — prevents bugs"
  ],
  "timeComplexities": [
    {
      "operation": "Access",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    },
    {
      "operation": "Insert/Delete (head)",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(1)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "reverse-linked-list",
      "title": "Reverse Linked List",
      "difficulty": "Easy",
      "description": "Given the head of a singly linked list, reverse the list and return the reversed list.",
      "examples": [
        {
          "input": "head = [1,2,3,4,5]",
          "output": "[5,4,3,2,1]"
        }
      ],
      "constraints": [
        "0 ≤ n ≤ 5000"
      ],
      "starterCode": {
        "js": "function reverseList(head) {\n  let prev= cur=head;\n}",
        "python": "def reverse_list(head):\n    prev, cur = None, head"
      },
      "solution": {
        "js": "function reverseList(head) {\n  let prev=cur=head;\n  while(cur){\n    const next=cur.next;\n    cur.next=prev;\n    prev=cur;\n    cur=next;\n  }\n  return prev;\n}",
        "python": "def reverse_list(head):\n    prev,cur=None,head\n    while cur:\n        nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n    return prev"
      },
      "testCases": [
        {
          "input": "[1,2,3,4,5]",
          "expected": "[5,4,3,2,1]"
        },
        {
          "input": "[1,2]",
          "expected": "[2,1]"
        },
        {
          "input": "[]",
          "expected": "[]",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Three pointers: prev, cur, next.",
        "Draw it out on paper first."
      ],
      "tags": [
        "linked-list",
        "in-place"
      ],
      "walkthrough": [
        {
          "title": "Initial state",
          "explanation": "List: 1→2→3→4→5→null. prev= cur=head(1). We will redirect each .next pointer to point backwards.",
          "phase": "init",
          "visual": {
            "type": "linkedlist",
            "llNodes": [
              {
                "val": 1
              },
              {
                "val": 2
              },
              {
                "val": 3
              },
              {
                "val": 4
              },
              {
                "val": 5
              }
            ],
            "llHighlighted": [
              0
            ]
          },
          "variables": {
            "prev": "null",
            "cur": 1
          }
        },
        {
          "title": "Iteration 1: reverse 1→null",
          "explanation": "Store next=cur.next(2). Set cur.next=prev(null). Move prev=cur(1), cur=next(2).",
          "phase": "update",
          "visual": {
            "type": "linkedlist",
            "llNodes": [
              {
                "val": "null",
                "state": "pointer"
              },
              {
                "val": 1,
                "state": "active"
              },
              {
                "val": 2,
                "state": "comparing"
              },
              {
                "val": 3
              },
              {
                "val": 4
              },
              {
                "val": 5
              }
            ],
            "llHighlighted": [
              1
            ]
          },
          "variables": {
            "prev": 1,
            "cur": 2,
            "next": 2
          }
        },
        {
          "title": "Iteration 2: reverse 2→1",
          "explanation": "next=3. cur(2).next = prev(1). Now 2→1→null. Move prev=2, cur=3.",
          "phase": "update",
          "visual": {
            "type": "linkedlist",
            "llNodes": [
              {
                "val": 2,
                "state": "active"
              },
              {
                "val": 1,
                "state": "visited"
              },
              {
                "val": 3,
                "state": "comparing"
              },
              {
                "val": 4
              },
              {
                "val": 5
              }
            ],
            "llHighlighted": [
              0
            ]
          },
          "variables": {
            "prev": 2,
            "cur": 3
          }
        },
        {
          "title": "Final: reversed list 5→4→3→2→1",
          "explanation": "After all iterations, prev points to the new head (5). Return prev.",
          "phase": "done",
          "visual": {
            "type": "linkedlist",
            "llNodes": [
              {
                "val": 5,
                "state": "found"
              },
              {
                "val": 4,
                "state": "found"
              },
              {
                "val": 3,
                "state": "found"
              },
              {
                "val": 2,
                "state": "found"
              },
              {
                "val": 1,
                "state": "found"
              }
            ]
          },
          "variables": {
            "result": "5→4→3→2→1"
          },
          "complexity": "O(n) time, O(1) space — in-place pointer redirection."
        }
      ]
    },
    {
      "id": "merge-two-sorted-lists",
      "title": "Merge Two Sorted Lists",
      "difficulty": "Easy",
      "description": "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n \nExample 1:\n\n\n<strong>Input:</strong> list1 = [1,2,4], list2 = [1,3,4]\n<strong>Output:</strong> [1,1,2,3,4,4]\n\n\nExample 2:\n\n\n<strong>Input:</strong> list1 = [], list2 = []\n<strong>Output:</strong> []\n\n\nExample 3:\n\n\n<strong>Input:</strong> list1 = [], list2 = [0]\n<strong>Output:</strong> [0]\n\n\n \nConstraints:\n\n\n\tThe number of nodes in both lists is in the range [0, 50].\n\t-100 <= Node.val <= 100\n\tBoth list1 and list2 are sorted in non-decreasing order.",
      "examples": [
        {
          "input": "[1,2,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,3,4]",
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
        "js": "function mergeTwoSortedLists(input) {\n  // Your code here\n}",
        "python": "def merge_two_sorted_lists(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/merge-two-sorted-lists/\n * Time O(N + M) | Space O(N + M)\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function (list1, list2) {\n    const isBaseCase1 = list1 === null;\n    if (isBaseCase1) return list2;\n\n    const isBaseCase2 = list2 === null;\n    if (isBaseCase2) return list1;\n\n    const isL2Greater = list1.val <= list2.val;\n    if (isL2Greater) {\n        list1.next = mergeTwoLists(\n            list1.next,\n            list2,\n        ); /* Time O(N + M) | Space O(N + M) */\n\n        return list1;\n    }\n\n    const isL2Less = list2.val <= list1.val;\n    if (isL2Less) {\n        list2.next = mergeTwoLists(\n            list1,\n            list2.next,\n        ); /* Time O(N + M) | Space O(N + M) */\n\n        return list2;\n    }\n};\n\n/**\n * https://leetcode.com/problems/merge-two-sorted-lists/\n * Time O(N + M) | Space O(N + M)\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function (list1, list2) {\n    let sentinel = (tail = new ListNode());\n\n    while (list1 && list2) {\n        /* Time O(N + M) */\n        const isL2Greater = list1.val <= list2.val;\n\n        if (isL2Greater) {\n            tail.next = list1;\n            list1 = list1.next;\n        } else {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n\n        tail = tail.next;\n    }\n\n    tail.next = list1 || list2;\n\n    return sentinel.next;\n};\n",
        "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\n# Iterative\nclass Solution:\n    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:\n        dummy = node = ListNode()\n\n        while list1 and list2:\n            if list1.val < list2.val:\n                node.next = list1\n                list1 = list1.next\n            else:\n                node.next = list2\n                list2 = list2.next\n            node = node.next\n\n        node.next = list1 or list2\n\n        return dummy.next\n    \n# Recursive\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        if not list1:\n            return list2\n        if not list2:\n            return list1\n        lil, big = (list1, list2) if list1.val < list2.val else (list2, list1)\n        lil.next = self.mergeTwoLists(lil.next, big)\n        return lil\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Merge Two Sorted Lists",
          "explanation": "Merge Two Sorted Lists is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N + M)",
      "spaceComplexity": "O(N + M)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "reorder-list",
      "title": "Reorder List",
      "difficulty": "Medium",
      "description": "You are given the head of a singly linked-list. The list can be represented as:\n\n\nL<sub>0</sub> → L<sub>1</sub> → … → L<sub>n - 1</sub> → L<sub>n</sub>\n\n\nReorder the list to be on the following form:\n\n\nL<sub>0</sub> → L<sub>n</sub> → L<sub>1</sub> → L<sub>n - 1</sub> → L<sub>2</sub> → L<sub>n - 2</sub> → …\n\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.\n\n \nExample 1:\n\n\n<strong>Input:</strong> head = [1,2,3,4]\n<strong>Output:</strong> [1,4,2,3]\n\n\nExample 2:\n\n\n<strong>Input:</strong> head = [1,2,3,4,5]\n<strong>Output:</strong> [1,5,2,4,3]\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the list is in the range [1, 5 * 104].\n\t1 <= Node.val <= 1000",
      "examples": [
        {
          "input": "[1,2,3,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function reorderList(input) {\n  // Your code here\n}",
        "python": "def reorder_list(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/reorder-list/\n * Time O(N) | Space O(1)\n * @param {ListNode} head\n * @return {void} Do not return anything, modify head in-place instead.\n */\nvar reorderList = function (head) {\n    const mid = getMid(head); /* Time O(N) */\n    const reversedFromMid = reverse(mid); /* Time O(N) */\n\n    reorder(head, reversedFromMid); /* Time O(N) */\n};\n\nconst getMid = (head) => {\n    let [slow, fast] = [head, head];\n\n    while (fast && fast.next) {\n        /* Time O(N) */\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n\n    return slow;\n};\n\nconst reverse = (head) => {\n    let [prev, curr, next] = [null, head, null];\n\n    while (curr) {\n        /* Time O(N) */\n        next = curr.next;\n        curr.next = prev;\n\n        prev = curr;\n        curr = next;\n    }\n\n    return prev;\n};\n\nconst reorder = (l1, l2) => {\n    let [first, next, second] = [l1, null, l2];\n\n    while (second.next) {\n        /* Time O(N) */\n        next = first.next;\n        first.next = second;\n        first = next;\n\n        next = second.next;\n        second.next = first;\n        second = next;\n    }\n};\n",
        "python": "class Solution:\n    def reorderList(self, head: ListNode) -> None:\n        # find middle\n        slow, fast = head, head.next\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n\n        # reverse second half\n        second = slow.next\n        prev = slow.next = None\n        while second:\n            tmp = second.next\n            second.next = prev\n            prev = second\n            second = tmp\n\n        # merge two halfs\n        first, second = head, prev\n        while second:\n            tmp1, tmp2 = first.next, second.next\n            first.next = second\n            second.next = tmp1\n            first, second = tmp1, tmp2\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Reorder List",
          "explanation": "Reorder List is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "remove-nth-node-from-end-of-list",
      "title": "Remove Nth Node From End of List",
      "difficulty": "Medium",
      "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\n \nExample 1:\n\n\n<strong>Input:</strong> head = [1,2,3,4,5], n = 2\n<strong>Output:</strong> [1,2,3,5]\n\n\nExample 2:\n\n\n<strong>Input:</strong> head = [1], n = 1\n<strong>Output:</strong> []\n\n\nExample 3:\n\n\n<strong>Input:</strong> head = [1,2], n = 1\n<strong>Output:</strong> [1]\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the list is sz.\n\t1 <= sz <= 30\n\t0 <= Node.val <= 100\n\t1 <= n <= sz\n\n\n \nFollow up: Could you do this in one pass?",
      "examples": [
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
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
        "js": "function removeNthNodeFromEndOfList(input) {\n  // Your code here\n}",
        "python": "def remove_nth_node_from_end_of_list(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/remove-nth-node-from-end-of-list/\n * Time O(N) | Space O(N)\n * @param {ListNode} head\n * @param {number} n\n * @return {ListNode}\n */\nvar removeNthFromEnd = function (head, n) {\n    const sentinel = new ListNode();\n\n    sentinel.next = head;\n\n    const fast = moveFast(sentinel, n); /* Time O(N) */\n    const slow = moveSlow(sentinel, fast); /* Time O(N) */\n\n    slow.next = slow.next.next || null;\n\n    return sentinel.next;\n};\n\nconst moveFast = (fast, n) => {\n    for (let i = 1; i <= n + 1; i++) {\n        /* Time O(N) */\n        fast = fast.next;\n    }\n\n    return fast;\n};\n\nconst moveSlow = (slow, fast) => {\n    while (fast) {\n        /* Time O(N) */\n        slow = slow.next;\n        fast = fast.next;\n    }\n\n    return slow;\n};\n\n/**\n * https://leetcode.com/problems/remove-nth-node-from-end-of-list/\n * Time O(N) | Space O(1)\n * @param {ListNode} head\n * @param {number} n\n * @return {ListNode}\n */\nvar removeNthFromEnd = function (head, n) {\n    const length = getNthFromEnd(head, n); /* Time O(N) */\n\n    const isHead = length < 0;\n    if (isHead) return head.next;\n\n    const curr = moveNode(head, length); /* Time O(N) */\n\n    curr.next = curr.next.next;\n\n    return head;\n};\n\nconst getNthFromEnd = (curr, n, length = 0) => {\n    while (curr) {\n        /* Time O(N) */\n        curr = curr.next;\n        length++;\n    }\n\n    return length - n - 1;\n};\n\nconst moveNode = (curr, length) => {\n    while (length) {\n        /* Time O(N) */\n        curr = curr.next;\n        length--;\n    }\n\n    return curr;\n};\n",
        "python": "class Solution:\n    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:\n        dummy = ListNode(0, head)\n        left = dummy\n        right = head\n\n        while n > 0:\n            right = right.next\n            n -= 1\n\n        while right:\n            left = left.next\n            right = right.next\n\n        # delete\n        left.next = left.next.next\n        return dummy.next\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Remove Nth Node From End of List",
          "explanation": "Remove Nth Node From End of List is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": [
        "Maintain two pointers and update one with a delay of n steps."
      ]
    },
    {
      "id": "copy-list-with-random-pointer",
      "title": "Copy List with Random Pointer",
      "difficulty": "Medium",
      "description": "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.\n\nConstruct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.\n\nFor example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.\n\nReturn the head of the copied linked list.\n\nThe linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:\n\n\n\tval: an integer representing Node.val\n\trandom_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.\n\n\nYour code will only be given the head of the original linked list.\n\n \nExample 1:\n\n\n<strong>Input:</strong> head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\n<strong>Output:</strong> [[7,null],[13,0],[11,4],[10,2],[1,0]]\n\n\nExample 2:\n\n\n<strong>Input:</strong> head = [[1,1],[2,1]]\n<strong>Output:</strong> [[1,1],[2,1]]\n\n\nExample 3:\n\n\n\n\n<strong>Input:</strong> head = [[3,null],[...",
      "examples": [
        {
          "input": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,1],[2,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,null],[3,0],[3,null]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function copyListWithRandomPointer(input) {\n  // Your code here\n}",
        "python": "def copy_list_with_random_pointer(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/copy-list-with-random-pointer/\n * Time O(N) | Space O(N)\n * @param {Node} head\n * @return {Node}\n */\nvar copyRandomList = function (head, map = new Map()) {\n    if (!head) return null;\n    if (map.has(head)) return map.get(head);\n\n    const clone = new Node(head.val);\n\n    map.set(head, clone); /*           | Space O(N) */\n    clone.next = copyRandomList(head.next, map); /* Time O(N) | Space O(N) */\n    clone.random = copyRandomList(\n        head.random,\n        map,\n    ); /* Time O(N) | Space O(N) */\n\n    return clone;\n};\n\n/**\n * https://leetcode.com/problems/copy-list-with-random-pointer/\n * Time O(N) | Space O(1)\n * @param {Node} head\n * @return {Node}\n */\nvar copyRandomList = function (head) {\n    if (!head) return null;\n\n    cloneNode(head); /* Time O(N) */\n    connectRandomNode(head); /* Time O(N) */\n\n    return connectNode(head); /* Time O(N) */\n};\n\nconst cloneNode = (curr) => {\n    while (curr) {\n        /* Time O(N) */\n        const node = new Node(curr.val);\n\n        node.next = curr.next;\n        curr.next = node;\n        curr = node.next;\n    }\n\n    return curr;\n};\n\nconst connectRandomNode = (curr) => {\n    while (curr) {\n        /* Time O(N) */\n        curr.next.random = curr.random?.next || null;\n        curr = curr.next.next;\n    }\n};\n\nconst connectNode = (head) => {\n    let [prev, curr, next] = [head, head.next, head.next];\n\n    while (prev) {\n        /* Time O(N) */\n        prev.next = prev.next.next;\n        curr.next = curr?.next?.next || null;\n        prev = prev.next;\n        curr = curr.next;\n    }\n\n    return next;\n};\n",
        "python": "\"\"\"\n# Definition for a Node.\nclass Node:\n    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):\n        self.val = int(x)\n        self.next = next\n        self.random = random\n\"\"\"\n\n\nclass Solution:\n    def copyRandomList(self, head: \"Node\") -> \"Node\":\n        oldToCopy = {None: None}\n\n        cur = head\n        while cur:\n            copy = Node(cur.val)\n            oldToCopy[cur] = copy\n            cur = cur.next\n        cur = head\n        while cur:\n            copy = oldToCopy[cur]\n            copy.next = oldToCopy[cur.next]\n            copy.random = oldToCopy[cur.random]\n            cur = cur.next\n        return oldToCopy[head]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Copy List with Random Pointer",
          "explanation": "Copy List with Random Pointer is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": [
        "Just iterate the linked list and create copies of the nodes on the go. Since a node can be referenced from multiple nodes due to the random pointers, ensure you are not making multiple copies of the same node.",
        "You may want to use extra space to keep old_node ---> new_node mapping to prevent creating multiple copies of the same node.",
        "We can avoid using extra space for old_node ---> new_node mapping by tweaking the original linked list. Simply interweave the nodes of the old and copied list. For example:\r\nOld List: A --> B --> C --> D\r\nInterWeaved List: A --> A' --> B --> B' --> C --> C' --> D --> D'",
        "The interweaving is done using next</b> pointers and we can make use of interweaved structure to get the correct reference nodes for random</b> pointers."
      ]
    },
    {
      "id": "add-two-numbers",
      "title": "Add Two Numbers",
      "difficulty": "Medium",
      "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n \nExample 1:\n\n\n<strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]\n<strong>Output:</strong> [7,0,8]\n<strong>Explanation:</strong> 342 + 465 = 807.\n\n\nExample 2:\n\n\n<strong>Input:</strong> l1 = [0], l2 = [0]\n<strong>Output:</strong> [0]\n\n\nExample 3:\n\n\n<strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n<strong>Output:</strong> [8,9,9,9,0,0,0,1]\n\n\n \nConstraints:\n\n\n\tThe number of nodes in each linked list is in the range [1, 100].\n\t0 <= Node.val <= 9\n\tIt is guaranteed that the list represents a number that does not have leading zeros.",
      "examples": [
        {
          "input": "[2,4,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[5,6,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function addTwoNumbers(input) {\n  // Your code here\n}",
        "python": "def add_two_numbers(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/add-two-numbers/\n * Time O(MAX(N, M)) | Space O(MAX(N, M))\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function (l1, l2) {\n    let sentinel = (tail = new ListNode());\n\n    return add(\n        l1,\n        l2,\n        tail,\n        sentinel,\n    ); /* Time O(MAX(N, M)) | Space O(MAX(N, M)) */\n};\n\nconst add = (l1, l2, tail, sentinel, carry = 0) => {\n    const isBaseCase = !(l1 || l2 || carry);\n    if (isBaseCase) return sentinel.next;\n\n    return dfs(\n        l1,\n        l2,\n        tail,\n        sentinel,\n        carry,\n    ); /* Time O(MAX(N, M)) | Space O(MAX(N, M)) */\n};\n\nconst dfs = (l1, l2, tail, sentinel, carry) => {\n    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;\n    const val = sum % 10;\n    carry = Math.floor(sum / 10);\n\n    tail.next = new ListNode(val);\n    tail = tail.next;\n\n    l1 = l1?.next || null;\n    l2 = l2?.next || null;\n\n    add(\n        l1,\n        l2,\n        tail,\n        sentinel,\n        carry,\n    ); /* Time O(MAX(N, M)) | Space O(MAX(N, M)) */\n\n    return sentinel.next;\n};\n\n/**\n * https://leetcode.com/problems/add-two-numbers/\n * Time O(MAX(N, M)) | Space O(MAX(N, M))\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function (l1, l2, carry = 0) {\n    let sentinel = (tail = new ListNode());\n\n    while (l1 || l2 || carry) {\n        /* Time O(MAX(N, M)) */\n        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;\n        const val = sum % 10;\n        carry = Math.floor(sum / 10);\n\n        tail.next = new ListNode(val);\n        tail = tail.next;\n\n        l1 = l1?.next || null;\n        l2 = l2?.next || null;\n    }\n\n    return sentinel.next;\n};\n",
        "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        dummy = ListNode()\n        cur = dummy\n\n        carry = 0\n        while l1 or l2 or carry:\n            v1 = l1.val if l1 else 0\n            v2 = l2.val if l2 else 0\n\n            # new digit\n            val = v1 + v2 + carry\n            carry = val // 10\n            val = val % 10\n            cur.next = ListNode(val)\n\n            # update ptrs\n            cur = cur.next\n            l1 = l1.next if l1 else None\n            l2 = l2.next if l2 else None\n\n        return dummy.next\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Add Two Numbers",
          "explanation": "Add Two Numbers is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(MAX(N, M)",
      "spaceComplexity": "O(MAX(N, M)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "linked-list-cycle",
      "title": "Linked List Cycle",
      "difficulty": "Easy",
      "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false.\n\n \nExample 1:\n\n\n<strong>Input:</strong> head = [3,2,0,-4], pos = 1\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n\n\nExample 2:\n\n\n<strong>Input:</strong> head = [1,2], pos = 0\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.\n\n\nExample 3:\n\n\n<strong>Input:</strong> head = [1], pos = -1\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There is no cycle in the linked list.\n\n\n \nConstraints:\n\n\n\tThe number of the nodes in the list is in the range [0, 104].\n\t-105 <= Node.val <= 105\n\tpos is -1 or a valid index in the linked-list.\n\n\n \nFollow up: Can you solve it using O(1) (i.e. constant) memory?",
      "examples": [
        {
          "input": "[3,2,0,-4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "1",
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
        "js": "function linkedListCycle(input) {\n  // Your code here\n}",
        "python": "def linked_list_cycle(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/linked-list-cycle/\n * Time O(N) | Space O(N)\n * @param {ListNode} head\n * @return {boolean}\n */\nvar hasCycle = function (head, seen = new Set()) {\n    while (head) {\n        /* Time O(N) */\n        if (seen.has(head)) return true;\n\n        seen.add(head); /* Space O(N) */\n        head = head.next;\n    }\n\n    return false;\n};\n\n/**\n * https://leetcode.com/problems/linked-list-cycle/\n * Time O(N) | Space O(1)\n * @param {ListNode} head\n * @return {boolean}\n */\nvar hasCycle = function (head) {\n    let [slow, fast] = [head, head];\n\n    while (fast && fast.next) {\n        /* Time O(N) */\n        slow = slow.next;\n        fast = fast.next.next;\n\n        const hasCycle = slow === fast;\n        if (hasCycle) return true;\n    }\n\n    return false;\n};\n",
        "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.next = None\n\n\nclass Solution:\n    def hasCycle(self, head: ListNode) -> bool:\n        slow, fast = head, head\n\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow == fast:\n                return True\n        return False\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Linked List Cycle",
          "explanation": "Linked List Cycle is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "find-the-duplicate-number",
      "title": "Find the Duplicate Number",
      "difficulty": "Medium",
      "description": "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.\n\nThere is only one repeated number in nums, return this repeated number.\n\nYou must solve the problem without modifying the array nums and using only constant extra space.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [1,3,4,2,2]\n<strong>Output:</strong> 2\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [3,1,3,4,2]\n<strong>Output:</strong> 3\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [3,3,3,3,3]\n<strong>Output:</strong> 3\n\n \nConstraints:\n\n\n\t1 <= n <= 105\n\tnums.length == n + 1\n\t1 <= nums[i] <= n\n\tAll the integers in nums appear only once except for precisely one integer which appears two or more times.\n\n\n \nFollow up:\n\n\n\tHow can we prove that at least one duplicate number must exist in nums?\n\tCan you solve the problem in linear runtime complexity?",
      "examples": [
        {
          "input": "[1,3,4,2,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,1,3,4,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,3,3,3,3]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function findTheDuplicateNumber(input) {\n  // Your code here\n}",
        "python": "def find_the_duplicate_number(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N * log(N)) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums) {\n    nums.sort(\n        (a, b) => a - b,\n    ); /* Time O(N * log(N)) | HeapSort Space O(1) | QuickSort Space O(log(N)) */\n\n    for (let i = 1; i < nums.length; i++) {\n        /* Time O(N) */\n        const isPrevDuplicate = nums[i - 1] === nums[i];\n        if (isPrevDuplicate) return nums[i];\n    }\n\n    return -1;\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N * log(N)) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums) {\n    let [left, right, duplicate] = [1, nums.length - 1, -1];\n\n    while (left <= right) {\n        /* Time O(log(N)) */\n        const mid = (left + right) >> 1;\n        const count = getCount(mid, nums); /* Time O(N) */\n\n        const isMidGreater = count <= mid;\n        if (isMidGreater) left = mid + 1;\n\n        const isMidLess = mid < count;\n        if (isMidLess) {\n            duplicate = mid;\n            right = mid - 1;\n        }\n    }\n\n    return duplicate;\n};\n\nconst getCount = (mid, nums, count = 0) => {\n    for (const num of nums) {\n        /* Time O(N) */\n        const isMidGreater = num <= mid;\n        if (isMidGreater) count++;\n    }\n\n    return count;\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N * log(N)) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums, duplicate = 0) {\n    const mostSignificantBit = calcMaxBit(nums); /* Time O(N) */\n\n    for (let bit = 0; bit < mostSignificantBit; bit++) {\n        /* Time O(log(N)) */\n        const [baseCount, numsCount, mask] = count(nums, bit); /* Time O(N) */\n\n        const isMoreFrequentlySet = baseCount < numsCount;\n        if (isMoreFrequentlySet) duplicate |= mask;\n    }\n\n    return duplicate;\n};\n\nconst calcMaxBit = (nums, bits = 0) => {\n    let max = Math.max(0, ...nums); /* Time O(N) */\n\n    while (max) {\n        /* Time O(log(MAX)) */\n        max >>= 1;\n        bits++;\n    }\n\n    return bits;\n};\n\nconst count = (nums, bit) => {\n    let [baseCount, numsCount, mask] = [0, 0, 1 << bit];\n\n    for (let i = 0; i < nums.length; i++) {\n        /* Time O(N) */\n        const isBaseBitSet = 0 < (i & mask);\n        if (isBaseBitSet) baseCount++;\n\n        const isNumBitSet = 0 < (nums[i] & mask);\n        if (isNumBitSet) numsCount++;\n    }\n\n    return [baseCount, numsCount, mask];\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(N)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums, curr = 0) {\n    const isBaseCase = curr === nums[curr];\n    if (isBaseCase) return curr;\n\n    const next = nums[curr];\n\n    nums[curr] = curr;\n\n    return findDuplicate(nums, next); /* Time O(N) | Space O(N) */\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(N)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums, seen = new Set()) {\n    for (const num of nums) {\n        /* Time O(N) */\n        if (seen.has(num)) return num;\n\n        seen.add(num); /* Space O(N) */\n    }\n\n    return -1;\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums) {\n    cyclicSort(nums); /* Time O(N) */\n\n    return search(nums); /* Time O(N) */\n};\n\nconst cyclicSort = (nums, index = 0) => {\n    const swap = (arr, a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]]);\n\n    while (index < nums.length) {\n        /* Time O(N) */\n        const [num, arrayIndex, arrayNum] = [\n            nums[index],\n            nums[index] - 1,\n            nums[nums[index] - 1],\n        ];\n\n        const canSwap = !isSame(num, arrayNum);\n        if (canSwap) {\n            swap(nums, index, arrayIndex);\n\n            continue;\n        }\n\n        index++;\n    }\n};\nconst isSame = (a, b) => a === b;\n\nconst search = (nums) => {\n    for (let index = 0; index < nums.length; index++) {\n        /* Time O(N) */\n        const [num, arrayIndex] = [nums[index], index + 1];\n\n        if (!isSame(num, arrayIndex)) return num;\n    }\n\n    return nums.length;\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums) {\n    const duplicate = negativeMarking(nums); /* Time O(N) */\n\n    restoreToPositiveNumbers(nums); /* Time O(N) */\n\n    return duplicate;\n};\n\nconst negativeMarking = (nums) => {\n    for (let i = 0; i < nums.length; i++) {\n        /* Time O(N) */\n        const curr = Math.abs(nums[i]);\n\n        const isNegative = nums[curr] < 0;\n        if (isNegative) return curr;\n\n        nums[curr] *= -1;\n    }\n\n    return -1;\n};\n\nconst restoreToPositiveNumbers = (nums) => {\n    for (let i = 0; i < nums.length; i++) {\n        /* Time O(N) */\n        nums[i] = Math.abs(nums[i]);\n    }\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums, start = 0) {\n    const swap = (arr, a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]]);\n\n    const isSame = () => nums[start] === nums[nums[start]];\n    while (!isSame()) {\n        /* Time O(N) */\n        swap(nums, start, nums[start]);\n    }\n\n    return nums[start];\n};\n\n/**\n * https://leetcode.com/problems/find-the-duplicate-number/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar findDuplicate = function (nums) {\n    if (!nums.length) return -1;\n\n    let [slow, fast] = moveFast(nums); /* Time O(N) */\n    [slow, fast] = moveSlow(nums, slow, fast); /* Time O(N) */\n\n    return slow;\n};\n\nconst moveFast = (nums, start = 0) => {\n    let [slow, fast] = [nums[start], nums[nums[start]]];\n\n    const isSame = () => slow === fast;\n    while (!isSame()) {\n        /* Time O(N) */\n        slow = nums[slow];\n        fast = nums[nums[fast]];\n    }\n\n    fast = start;\n\n    return [slow, fast];\n};\n\nconst moveSlow = (nums, slow, fast) => {\n    const isSame = () => slow === fast;\n    while (!isSame()) {\n        /* Time O(N) */\n        slow = nums[slow];\n        fast = nums[fast];\n    }\n\n    return [slow, fast];\n};\n",
        "python": "class Solution:\n    def findDuplicate(self, nums: List[int]) -> int:\n        slow, fast = 0, 0\n        while True:\n            slow = nums[slow]\n            fast = nums[nums[fast]]\n            if slow == fast:\n                break\n\n        slow2 = 0\n        while True:\n            slow = nums[slow]\n            slow2 = nums[slow2]\n            if slow == slow2:\n                return slow\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Find the Duplicate Number",
          "explanation": "Find the Duplicate Number is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * log(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "lru-cache",
      "title": "LRU Cache",
      "difficulty": "Medium",
      "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n\n\n\tLRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n\tint get(int key) Return the value of the key if the key exists, otherwise return -1.\n\tvoid put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\n\nThe functions get and put must each run in O(1) average time complexity.\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\n<strong>Output</strong>\n[null, null, null, 1, null, -1, null, -1, 3, 4]\n\n<strong>Explanation</strong>\nLRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)\nlRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}\nlRUCache.get(1);    // return -1 (not found)\nlRUCache.get(3);    // return 3\nlRUCache.get(4);    // return 4\n\n\n \nConstraints:\n\n\n\t1 <= capacity <= 3000\n\t0 <= key <= 104\n\t0 <= value <= 105\n\tAt most 2 * 105 calls will be made to get and put.",
      "examples": [
        {
          "input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function lruCache(input) {\n  // Your code here\n}",
        "python": "def lru_cache(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/lru-cache/\n * Time O(1) | Space O(N)\n * Your LRUCache object will be instantiated and called as such:\n * var obj = new LRUCache(capacity)\n * var param_1 = obj.get(key)\n * obj.put(key,value)\n */\nclass LRUCache {\n    constructor(capacity) {\n        this.capacity = capacity;\n        this.map = new Map();\n\n        this.head = {};\n        this.tail = {};\n\n        this.head.next = this.tail;\n        this.tail.prev = this.head;\n    }\n\n    removeLastUsed() {\n        const [key, next, prev] = [\n            this.head.next.key,\n            this.head.next.next,\n            this.head,\n        ];\n\n        this.map.delete(key);\n        this.head.next = next;\n        this.head.next.prev = prev;\n    }\n\n    put(key, value) {\n        const hasKey = this.get(key) !== -1;\n        const isAtCapacity = this.map.size === this.capacity;\n\n        if (hasKey) return (this.tail.prev.value = value);\n        if (isAtCapacity) this.removeLastUsed();\n\n        const node = { key, value };\n        this.map.set(key, node);\n        this.moveToFront(node);\n    }\n\n    moveToFront(node) {\n        const [prev, next] = [this.tail.prev, this.tail];\n\n        this.tail.prev.next = node;\n        this.connectNode(node, { prev, next });\n        this.tail.prev = node;\n    }\n\n    connectNode(node, top) {\n        node.prev = top.prev;\n        node.next = top.next;\n    }\n\n    get(key) {\n        const hasKey = this.map.has(key);\n        if (!hasKey) return -1;\n\n        const node = this.map.get(key);\n\n        this.disconnectNode(node);\n        this.moveToFront(node);\n\n        return node.value;\n    }\n\n    disconnectNode(node) {\n        node.next.prev = node.prev;\n        node.prev.next = node.next;\n    }\n}\n",
        "python": "class Node:\n    def __init__(self, key, val):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}  # map key to node\n\n        self.left, self.right = Node(0, 0), Node(0, 0)\n        self.left.next, self.right.prev = self.right, self.left\n\n    # remove node from list\n    def remove(self, node):\n        prev, nxt = node.prev, node.next\n        prev.next, nxt.prev = nxt, prev\n\n    # insert node at right\n    def insert(self, node):\n        prev, nxt = self.right.prev, self.right\n        prev.next = nxt.prev = node\n        node.next, node.prev = nxt, prev\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            self.remove(self.cache[key])\n            self.insert(self.cache[key])\n            return self.cache[key].val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.remove(self.cache[key])\n        self.cache[key] = Node(key, value)\n        self.insert(self.cache[key])\n\n        if len(self.cache) > self.cap:\n            # remove from the list and delete the LRU from hashmap\n            lru = self.left.next\n            self.remove(lru)\n            del self.cache[lru.key]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding LRU Cache",
          "explanation": "LRU Cache is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "merge-k-sorted-lists",
      "title": "Merge k Sorted Lists",
      "difficulty": "Hard",
      "description": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n \nExample 1:\n\n\n<strong>Input:</strong> lists = [[1,4,5],[1,3,4],[2,6]]\n<strong>Output:</strong> [1,1,2,3,4,4,5,6]\n<strong>Explanation:</strong> The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted linked list:\n1->1->2->3->4->4->5->6\n\n\nExample 2:\n\n\n<strong>Input:</strong> lists = []\n<strong>Output:</strong> []\n\n\nExample 3:\n\n\n<strong>Input:</strong> lists = [[]]\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\tk == lists.length\n\t0 <= k <= 104\n\t0 <= lists[i].length <= 500\n\t-104 <= lists[i][j] <= 104\n\tlists[i] is sorted in ascending order.\n\tThe sum of lists[i].length will not exceed 104.",
      "examples": [
        {
          "input": "[[1,4,5],[1,3,4],[2,6]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function mergeKSortedLists(input) {\n  // Your code here\n}",
        "python": "def merge_k_sorted_lists(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/merge-k-sorted-lists/\n * Time O(N) | Space O(N)\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function (lists) {\n    let previous = null;\n\n    for (let i = 0; i < lists.length; i++) {\n        previous = mergeTwoLists(previous, lists[i]);\n    }\n\n    return previous;\n};\n\nvar mergeTwoLists = function (list1, list2) {\n    let sentinel = (tail = new ListNode(0));\n\n    while (list1 && list2) {\n        const canAddL1 = list1.val <= list2.val;\n        if (canAddL1) {\n            tail.next = list1;\n            list1 = list1.next;\n        } else {\n            tail.next = list2;\n            list2 = list2.next;\n        }\n\n        tail = tail.next;\n    }\n\n    tail.next = list1 || list2;\n\n    return sentinel.next;\n};\n\n/**\n * https://leetcode.com/problems/merge-k-sorted-lists/\n * Time O(N * log(K)) | Space O(N + K)\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function (lists) {\n    const minHeap = getMinHeap(lists);\n\n    return mergeLists(minHeap);\n};\n\nconst getMinHeap = (lists) => {\n    const heap = new MinPriorityQueue({ priority: ({ val }) => val });\n\n    for (const node of lists) {\n        if (!node) continue;\n\n        heap.enqueue(node);\n    }\n\n    return heap;\n};\n\nconst mergeLists = (minHeap) => {\n    let sentinel = (tail = new ListNode());\n\n    while (!minHeap.isEmpty()) {\n        const node = minHeap.dequeue().element;\n\n        tail.next = node;\n        tail = tail.next;\n\n        if (!node.next) continue;\n\n        minHeap.enqueue(node.next);\n    }\n\n    return sentinel.next;\n};\n",
        "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeKLists(self, lists: List[ListNode]) -> ListNode:\n        if not lists or len(lists) == 0:\n            return None\n\n        while len(lists) > 1:\n            mergedLists = []\n            for i in range(0, len(lists), 2):\n                l1 = lists[i]\n                l2 = lists[i + 1] if (i + 1) < len(lists) else None\n                mergedLists.append(self.mergeList(l1, l2))\n            lists = mergedLists\n        return lists[0]\n\n    def mergeList(self, l1, l2):\n        dummy = ListNode()\n        tail = dummy\n\n        while l1 and l2:\n            if l1.val < l2.val:\n                tail.next = l1\n                l1 = l1.next\n            else:\n                tail.next = l2\n                l2 = l2.next\n            tail = tail.next\n        if l1:\n            tail.next = l1\n        if l2:\n            tail.next = l2\n        return dummy.next\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Merge k Sorted Lists",
          "explanation": "Merge k Sorted Lists is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    },
    {
      "id": "reverse-nodes-in-k-group",
      "title": "Reverse Nodes in k-Group",
      "difficulty": "Hard",
      "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.\n\nk is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.\n\nYou may not alter the values in the list's nodes, only nodes themselves may be changed.\n\n \nExample 1:\n\n\n<strong>Input:</strong> head = [1,2,3,4,5], k = 2\n<strong>Output:</strong> [2,1,4,3,5]\n\n\nExample 2:\n\n\n<strong>Input:</strong> head = [1,2,3,4,5], k = 3\n<strong>Output:</strong> [3,2,1,4,5]\n\n\n \nConstraints:\n\n\n\tThe number of nodes in the list is n.\n\t1 <= k <= n <= 5000\n\t0 <= Node.val <= 1000\n\n\n \nFollow-up: Can you solve the problem in O(1) extra memory space?",
      "examples": [
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function reverseNodesInKGroup(input) {\n  // Your code here\n}",
        "python": "def reverse_nodes_in_k_group(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/reverse-nodes-in-k-group/\n * Time O(N) | Space O(N)\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nvar reverseKGroup = function (head, k) {\n    const sentinel = (tail = new ListNode(0, head));\n\n    while (true) {\n        let [start, last] = moveNode(tail, k);\n        if (!last) break;\n\n        reverse([start, tail.next, start]);\n\n        const next = tail.next;\n        tail.next = last;\n        tail = next;\n    }\n\n    return sentinel.next;\n};\n\nconst moveNode = (curr, k) => {\n    const canMove = () => k && curr;\n    while (canMove()) {\n        curr = curr.next;\n        k--;\n    }\n\n    return [curr?.next || null, curr];\n};\n\nconst reverse = ([prev, curr, start]) => {\n    const isSame = () => curr === start;\n    while (!isSame()) {\n        const next = curr.next;\n        curr.next = prev;\n\n        prev = curr;\n        curr = next;\n    }\n};\n",
        "python": "class Solution:\n    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:\n        dummy = ListNode(0, head)\n        groupPrev = dummy\n\n        while True:\n            kth = self.getKth(groupPrev, k)\n            if not kth:\n                break\n            groupNext = kth.next\n\n            # reverse group\n            prev, curr = kth.next, groupPrev.next\n            while curr != groupNext:\n                tmp = curr.next\n                curr.next = prev\n                prev = curr\n                curr = tmp\n\n            tmp = groupPrev.next\n            groupPrev.next = kth\n            groupPrev = tmp\n        return dummy.next\n\n    def getKth(self, curr, k):\n        while curr and k > 0:\n            curr = curr.next\n            k -= 1\n        return curr\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Reverse Nodes in k-Group",
          "explanation": "Reverse Nodes in k-Group is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Linked List"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Floyd's cycle detection uses slow=1 step, fast=?",
      "options": [
        "2 steps",
        "3 steps",
        "4 steps",
        "n steps"
      ],
      "correct": 0,
      "explanation": "Fast moves 2 steps. If cycle exists, fast will lap slow."
    }
  ],
  "cheatSheet": "# Linked List\n```js\nlet prev=cur=head;\nwhile(cur){const next=cur.next;cur.next=prev;prev=cur;cur=next;}\nreturn prev;\n```",
  "proTips": [
    "Always use a dummy head for complex operations",
    "Draw pointer arrows before coding"
  ],
  "faangQuotes": [
    "\"Reverse Linked List in-place is the first test of pointer manipulation comfort.\" — Facebook"
  ],
  "visualizationType": "linkedlist",
  "usage": "Used when you need frequent insertions and deletions, or when memory allocation needs to be dynamic.",
  "dsInvolved": "Linked List, Pointers",
  "sampleProblems": [
    "Reverse Linked List",
    "Merge Two Sorted Lists",
    "Linked List Cycle"
  ]
};
