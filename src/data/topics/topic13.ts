import { Topic } from "./types";

export const topic13: Topic = {
  "id": "topic13",
  "slug": "backtracking",
  "title": "Backtracking",
  "emoji": "♟️",
  "color": "#f43f5e",
  "gradient": "from-rose-600 to-rose-400",
  "layman": "Backtracking is like solving a maze by trying every path, backing up when you hit a dead end. N-Queens: place a queen, try next row, if stuck remove and try elsewhere.",
  "technical": "Backtracking explores solution space via DFS, pruning invalid branches. Template: choose, recurse, unchoose. Time: O(b^d).",
  "keyInsights": [
    "Template: choose, recurse, undo",
    "Pruning is what makes backtracking practical",
    "Subsets: 2^n, Permutations: n!"
  ],
  "timeComplexities": [
    {
      "operation": "Subsets",
      "best": "O(2^n)",
      "avg": "O(2^n)",
      "worst": "O(2^n)",
      "space": "O(n)"
    },
    {
      "operation": "Permutations",
      "best": "O(n!)",
      "avg": "O(n!)",
      "worst": "O(n!)",
      "space": "O(n)"
    }
  ],
  "questions": [
    {
      "id": "subsets",
      "title": "Subsets",
      "difficulty": "Medium",
      "description": "Given unique elements, return all possible subsets (power set).",
      "examples": [
        {
          "input": "nums=[1,2,3]",
          "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
        }
      ],
      "constraints": [
        "1≤nums.length≤10",
        "All unique"
      ],
      "starterCode": {
        "js": "function subsets(nums){\n  const res=[];\n  function bt(start,curr){\n    res.push([...curr]);\n    for(let i=start;i<nums.length;i++){\n      // choose, recurse, unchoose\n    }\n  }\n  bt(0,[]);\n  return res;\n}",
        "python": "def subsets(nums):\n    res=[]\n    def bt(start,curr):\n        res.append(curr[:])\n    bt(0,[]); return res"
      },
      "solution": {
        "js": "function subsets(nums){\n  const res=[];\n  function bt(start,curr){\n    res.push([...curr]);\n    for(let i=start;i<nums.length;i++){\n      curr.push(nums[i]);\n      bt(i+1,curr);\n      curr.pop();\n    }\n  }\n  bt(0,[]);\n  return res;\n}",
        "python": "def subsets(nums):\n    res=[]\n    def bt(start,curr):\n        res.append(curr[:])\n        for i in range(start,len(nums)):\n            curr.append(nums[i])\n            bt(i+1,curr)\n            curr.pop()\n    bt(0,[]); return res"
      },
      "testCases": [
        {
          "input": "[1,2,3]",
          "expected": "8 subsets"
        },
        {
          "input": "[0]",
          "expected": "[[],[0]]",
          "hidden": true
        }
      ],
      "timeComplexity": "O(2^n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "At each step: include or exclude current element."
      ],
      "tags": [
        "backtracking",
        "recursion"
      ],
      "walkthrough": [
        {
          "title": "Decision tree: include or exclude each element",
          "explanation": "For nums=[1,2,3], at each position we make a binary choice: include this number or skip it. 3 decisions × 2 choices = 2³=8 subsets.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3
            ],
            "labels": [
              "choice 1",
              "choice 2",
              "choice 3"
            ],
            "states": [
              "comparing",
              "comparing",
              "comparing"
            ]
          },
          "insight": "The recursive tree has depth n. At each level, we branch: add the element (go deeper) or skip (advance start pointer)."
        },
        {
          "title": "Build subset starting from []",
          "explanation": "Start: curr=[]. Add nums[0]=1 → curr=[1]. Then add nums[1]=2 → [1,2]. Then add nums[2]=3 → [1,2,3]. Record each state.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              "[]",
              "[1]",
              "[1,2]",
              "[1,2,3]",
              "[1,3]",
              "[2]",
              "[2,3]",
              "[3]"
            ],
            "states": [
              "found",
              "found",
              "found",
              "found",
              "found",
              "found",
              "found",
              "found"
            ]
          },
          "variables": {
            "recorded": 8
          }
        },
        {
          "title": "Backtrack: undo and explore siblings",
          "explanation": "After [1,2,3]: pop 3 → [1,2]. Pop 2 → [1]. Try 3 → [1,3]. Pop 3 → [1]. Pop 1 → []. Then try starting from 2...",
          "phase": "backtrack",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3
            ],
            "states": [
              "visited",
              "visited",
              "active"
            ],
            "pointers": {
              "2": "backtrack"
            }
          },
          "code": "curr.push(nums[i]);  // choose\nbt(i + 1, curr);     // explore\ncurr.pop();          // UNDO (backtrack)",
          "codeHighlight": [
            1,
            2,
            3
          ]
        },
        {
          "title": "All 8 subsets collected",
          "explanation": "The recursion tree explores all 2^3=8 subsets. Each leaf or intermediate node is a valid subset.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              "[]",
              "[1]",
              "[2]",
              "[3]",
              "[1,2]",
              "[1,3]",
              "[2,3]",
              "[1,2,3]"
            ],
            "states": [
              "result",
              "result",
              "result",
              "result",
              "result",
              "result",
              "result",
              "result"
            ]
          },
          "variables": {
            "total": 8
          },
          "complexity": "O(2^n) subsets × O(n) to copy each = O(n·2^n)."
        }
      ]
    },
    {
      "id": "combination-sum",
      "title": "Combination Sum",
      "difficulty": "Medium",
      "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.\n\nThe test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.\n\n \nExample 1:\n\n\n<strong>Input:</strong> candidates = [2,3,6,7], target = 7\n<strong>Output:</strong> [[2,2,3],[7]]\n<strong>Explanation:</strong>\n2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.\n7 is a candidate, and 7 = 7.\nThese are the only two combinations.\n\n\nExample 2:\n\n\n<strong>Input:</strong> candidates = [2,3,5], target = 8\n<strong>Output:</strong> [[2,2,2,2],[2,3,3],[3,5]]\n\n\nExample 3:\n\n\n<strong>Input:</strong> candidates = [2], target = 1\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\t1 <= candidates.length <= 30\n\t2 <= candidates[i] <= 40\n\tAll elements of candidates are distinct.\n\t1 <= target <= 40",
      "examples": [
        {
          "input": "[2,3,6,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "7",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,3,5]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function combinationSum(input) {\n  // Your code here\n}",
        "python": "def combination_sum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/combination-sum/\n * Time O(N * ((Target/MIN) + 1)) | Space O(N * (Target/Min))\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum = function (\n    candidates,\n    target,\n    index = 0,\n    combination = [],\n    combinations = [],\n) {\n    const isBaseCase = target < 0;\n    if (isBaseCase) return combinations;\n\n    const isTarget = target === 0;\n    if (isTarget) return combinations.push(combination.slice());\n\n    for (let i = index; i < candidates.length; i++) {\n        backTrack(candidates, target, i, combination, combinations);\n    }\n\n    return combinations;\n};\n\nconst backTrack = (candidates, target, i, combination, combinations) => {\n    combination.push(candidates[i]);\n    combinationSum(\n        candidates,\n        target - candidates[i],\n        i,\n        combination,\n        combinations,\n    );\n    combination.pop();\n};\n",
        "python": "class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        res = []\n\n        def dfs(i, cur, total):\n            if total == target:\n                res.append(cur.copy())\n                return\n            if i >= len(candidates) or total > target:\n                return\n\n            cur.append(candidates[i])\n            dfs(i, cur, total + candidates[i])\n            cur.pop()\n            dfs(i + 1, cur, total)\n\n        dfs(0, [], 0)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Combination Sum",
          "explanation": "Combination Sum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * ((Target/MIN)",
      "spaceComplexity": "O(N * (Target/Min)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "permutations",
      "title": "Permutations",
      "difficulty": "Medium",
      "description": "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.\n\n \nExample 1:\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\nExample 2:\n<strong>Input:</strong> nums = [0,1]\n<strong>Output:</strong> [[0,1],[1,0]]\nExample 3:\n<strong>Input:</strong> nums = [1]\n<strong>Output:</strong> [[1]]\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 6\n\t-10 <= nums[i] <= 10\n\tAll the integers of nums are unique.",
      "examples": [
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,1]",
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
        "js": "function permutations(input) {\n  // Your code here\n}",
        "python": "def permutations(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/permutations/solution/\n * Time O(N!) | Space(N!)\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function (nums) {\n    return dfs(nums);\n};\n\nvar dfs = function (nums, permutation = [], permutations = []) {\n    const isBaseCase = nums.length === permutation.length;\n    if (isBaseCase) return permutations.push(permutation.slice());\n\n    for (let i = 0; i < nums.length; i++) {\n        if (permutation.includes(nums[i])) continue;\n\n        backTrack(nums, i, permutation, permutations);\n    }\n\n    return permutations;\n};\n\nconst backTrack = (nums, i, permutation, permutations) => {\n    permutation.push(nums[i]);\n    dfs(nums, permutation, permutations);\n    permutation.pop();\n};\n\n/**\n * https://leetcode.com/problems/permutations/solution/\n * Time O(N!) | Space(N!)\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function (nums) {\n    return bfs(nums);\n};\n\nconst bfs = (nums, levels = [[]], permutations = []) => {\n    for (const num of nums) {\n        for (let i = levels.length - 1; 0 <= i; i--) {\n            const previousLevel = levels.shift();\n\n            for (let index = 0; index < previousLevel.length + 1; index++) {\n                const level = reArrangeSet(previousLevel, num, index);\n\n                const isBaseCase = level.length === nums.length;\n                if (isBaseCase) {\n                    permutations.push(level);\n                    continue;\n                }\n\n                levels.push(level);\n            }\n        }\n    }\n\n    return permutations;\n};\n\nconst reArrangeSet = (previousLevel, num, index) => {\n    const [before, after] = [\n        previousLevel.slice(0, index),\n        previousLevel.slice(index),\n    ];\n\n    return [...before, num, ...after];\n};\n",
        "python": "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        res = []\n\n        # base case\n        if len(nums) == 1:\n            return [nums[:]]  # nums[:] is a deep copy\n\n        for i in range(len(nums)):\n            n = nums.pop(0)\n            perms = self.permute(nums)\n\n            for perm in perms:\n                perm.append(n)\n            res.extend(perms)\n            nums.append(n)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Permutations",
          "explanation": "Permutations is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N!)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "subsets-ii",
      "title": "Subsets II",
      "difficulty": "Medium",
      "description": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.\n\n \nExample 1:\n<strong>Input:</strong> nums = [1,2,2]\n<strong>Output:</strong> [[],[1],[1,2],[1,2,2],[2],[2,2]]\nExample 2:\n<strong>Input:</strong> nums = [0]\n<strong>Output:</strong> [[],[0]]\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 10\n\t-10 <= nums[i] <= 10",
      "examples": [
        {
          "input": "[1,2,2]",
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
        "js": "function subsetsIi(input) {\n  // Your code here\n}",
        "python": "def subsets_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/subsets-ii/\n * Time O(N * 2^N) | Space O(N)\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar subsetsWithDup = function (nums) {\n    nums.sort((a, b) => a - b);\n\n    return dfs(nums);\n};\n\nconst dfs = (nums, index = 0, set = [], subset = []) => {\n    subset.push(set.slice());\n\n    for (let i = index; i < nums.length; i++) {\n        const isDuplicate = index < i && nums[i - 1] === nums[i];\n        if (isDuplicate) continue;\n\n        backTrack(nums, i, set, subset);\n    }\n\n    return subset;\n};\n\nconst backTrack = (nums, i, set, subset) => {\n    set.push(nums[i]);\n    dfs(nums, i + 1, set, subset);\n    set.pop();\n};\n\n/**\n * https://leetcode.com/problems/subsets-ii/\n * Time O(N * 2^N) | Space O(N * 2^N)\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar subsetsWithDup = (nums) => {\n    nums.sort((a, b) => a - b);\n\n    return bfs(nums);\n};\n\nconst bfs = (nums, subsets = [[]]) => {\n    let levels = subsets.length - 1;\n\n    for (let i = 0; i < nums.length; i++) {\n        const isPrevDuplicate = 0 < i && nums[i - 1] === nums[i];\n        const start = isPrevDuplicate ? levels + 1 : 0;\n\n        levels = subsets.length - 1;\n\n        for (let level = start; level < levels + 1; level++) {\n            const nextLevel = [...subsets[level], nums[i]];\n\n            subsets.push(nextLevel);\n        }\n    }\n\n    return subsets;\n};\n",
        "python": "class Solution:\n    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        nums.sort()\n\n        def backtrack(i, subset):\n            if i == len(nums):\n                res.append(subset[::])\n                return\n\n            # All subsets that include nums[i]\n            subset.append(nums[i])\n            backtrack(i + 1, subset)\n            subset.pop()\n            # All subsets that don't include nums[i]\n            while i + 1 < len(nums) and nums[i] == nums[i + 1]:\n                i += 1\n            backtrack(i + 1, subset)\n\n        backtrack(0, [])\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Subsets II",
          "explanation": "Subsets II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "combination-sum-ii",
      "title": "Combination Sum II",
      "difficulty": "Medium",
      "description": "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.\n\nEach number in candidates may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.\n\n \nExample 1:\n\n\n<strong>Input:</strong> candidates = [10,1,2,7,6,1,5], target = 8\n<strong>Output:</strong> \n[\n[1,1,6],\n[1,2,5],\n[1,7],\n[2,6]\n]\n\n\nExample 2:\n\n\n<strong>Input:</strong> candidates = [2,5,2,1,2], target = 5\n<strong>Output:</strong> \n[\n[1,2,2],\n[5]\n]\n\n\n \nConstraints:\n\n\n\t1 <= candidates.length <= 100\n\t1 <= candidates[i] <= 50\n\t1 <= target <= 30",
      "examples": [
        {
          "input": "[10,1,2,7,6,1,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "8",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,5,2,1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function combinationSumIi(input) {\n  // Your code here\n}",
        "python": "def combination_sum_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/combination-sum-ii/\n * Time O(2^N) | Space O(N)\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum2 = function (candidates, target) {\n    candidates.sort((a, b) => a - b);\n\n    return dfs(candidates, target);\n};\n\nconst dfs = (\n    candidates,\n    target,\n    index = 0,\n    combination = [],\n    combinations = [],\n) => {\n    const isBaseCase = target < 0;\n    if (isBaseCase) return combinations;\n\n    const isTarget = target === 0;\n    if (isTarget) {\n        if (combination.length) combinations.push(combination.slice());\n\n        return combinations;\n    }\n\n    for (let i = index; i < candidates.length; i++) {\n        const isDuplicate = index < i && candidates[i - 1] === candidates[i];\n        if (isDuplicate) continue;\n\n        backTrack(candidates, target, i, combination, combinations);\n    }\n\n    return combinations;\n};\n\nconst backTrack = (candidates, target, i, combination, combinations) => {\n    combination.push(candidates[i]);\n    dfs(candidates, target - candidates[i], i + 1, combination, combinations);\n    combination.pop();\n};\n",
        "python": "class Solution:\n    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:\n        candidates.sort()\n\n        res = []\n\n        def backtrack(cur, pos, target):\n            if target == 0:\n                res.append(cur.copy())\n                return\n            if target <= 0:\n                return\n\n            prev = -1\n            for i in range(pos, len(candidates)):\n                if candidates[i] == prev:\n                    continue\n                cur.append(candidates[i])\n                backtrack(cur, i + 1, target - candidates[i])\n                cur.pop()\n                prev = candidates[i]\n\n        backtrack([], 0, target)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Combination Sum II",
          "explanation": "Combination Sum II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "word-search",
      "title": "Word Search",
      "difficulty": "Medium",
      "description": "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.\n\n \nExample 1:\n\n\n<strong>Input:</strong> board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"\n<strong>Output:</strong> true\n\n\nExample 3:\n\n\n<strong>Input:</strong> board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\tm == board.length\n\tn = board[i].length\n\t1 <= m, n <= 6\n\t1 <= word.length <= 15\n\tboard and word consists of only lowercase and uppercase English letters.\n\n\n \nFollow up: Could you use search pruning to make your solution faster with a larger board?",
      "examples": [
        {
          "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"ABCCED\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function wordSearch(input) {\n  // Your code here\n}",
        "python": "def word_search(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/word-search/\n * Time O(N * 3^L) | Space O(L)\n * @param {character[][]} board\n * @param {string} word\n * @return {boolean}\n */\nvar exist = function (board, word) {\n    for (let row = 0; row < board.length; row++) {\n        for (let col = 0; col < board[0].length; col++) {\n            if (dfs(board, row, col, word, 0)) return true;\n        }\n    }\n\n    return false;\n};\n\nconst dfs = (board, row, col, word, index) => {\n    if (index === word.length) return true;\n    if (isOutOfBound(board, row, col)) return false;\n    if (board[row][col] !== word[index]) return false;\n\n    board[row][col] = '*';\n\n    const hasWord = Object.values(directions(row, col)).filter(([r, c]) =>\n        dfs(board, r, c, word, index + 1),\n    ).length;\n\n    board[row][col] = word[index];\n    return hasWord;\n};\n\nconst isOutOfBound = (board, row, col) => {\n    const isRowOutOfBound = row < 0 || board.length - 1 < row;\n    const isColOutOfBound = col < 0 || board[0].length - 1 < col;\n    return isRowOutOfBound || isColOutOfBound;\n};\n\nconst directions = (row, col) => ({\n    up: [row - 1, col],\n    down: [row + 1, col],\n    left: [row, col - 1],\n    right: [row, col + 1],\n});\n",
        "python": "class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        ROWS, COLS = len(board), len(board[0])\n        path = set()\n\n        def dfs(r, c, i):\n            if i == len(word):\n                return True\n            if (\n                min(r, c) < 0\n                or r >= ROWS\n                or c >= COLS\n                or word[i] != board[r][c]\n                or (r, c) in path\n            ):\n                return False\n            path.add((r, c))\n            res = (\n                dfs(r + 1, c, i + 1)\n                or dfs(r - 1, c, i + 1)\n                or dfs(r, c + 1, i + 1)\n                or dfs(r, c - 1, i + 1)\n            )\n            path.remove((r, c))\n            return res\n\n        # To prevent TLE,reverse the word if frequency of the first letter is more than the last letter's\n        count = sum(map(Counter, board), Counter())\n        if count[word[0]] > count[word[-1]]:\n            word = word[::-1]\n            \n        for r in range(ROWS):\n            for c in range(COLS):\n                if dfs(r, c, 0):\n                    return True\n        return False\n\n    # O(n * m * 4^n)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Word Search",
          "explanation": "Word Search is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * 3^L)",
      "spaceComplexity": "O(L)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "palindrome-partitioning",
      "title": "Palindrome Partitioning",
      "difficulty": "Medium",
      "description": "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.\n\n \nExample 1:\n<strong>Input:</strong> s = \"aab\"\n<strong>Output:</strong> [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]\nExample 2:\n<strong>Input:</strong> s = \"a\"\n<strong>Output:</strong> [[\"a\"]]\n\n \nConstraints:\n\n\n\t1 <= s.length <= 16\n\ts contains only lowercase English letters.",
      "examples": [
        {
          "input": "\"aab\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"a\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function palindromePartitioning(input) {\n  // Your code here\n}",
        "python": "def palindrome_partitioning(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/palindrome-partitioning/\n * Time O(N * 2^N) | Space O(N^2)\n * @param {string} s\n * @return {string[][]}\n */\nfunction partition(s, left = 0, _partition = [], partitions = []) {\n    const isBaseCase = s.length <= left;\n    if (isBaseCase) {\n        if (_partition.length) partitions.push(_partition.slice());\n\n        return partitions;\n    }\n\n    for (let right = left; right < s.length; right++) {\n        if (!isPalindrome(s, left, right)) continue;\n\n        backTrack(s, left, right, _partition, partitions);\n    }\n\n    return partitions;\n}\n\nconst backTrack = (s, left, right, _partition, partitions) => {\n    _partition.push(s.slice(left, right + 1));\n    partition(s, right + 1, _partition, partitions);\n    _partition.pop();\n};\n\nconst isPalindrome = (str, left, right) => {\n    while (left < right) {\n        const isSame = str[left] === str[right];\n        if (!isSame) return false;\n\n        left++;\n        right--;\n    }\n\n    return true;\n};\n",
        "python": "class Solution:\n    def partition(self, s: str) -> List[List[str]]:\n        res, part = [], []\n\n        def dfs(i):\n            if i >= len(s):\n                res.append(part.copy())\n                return\n            for j in range(i, len(s)):\n                if self.isPali(s, i, j):\n                    part.append(s[i : j + 1])\n                    dfs(j + 1)\n                    part.pop()\n\n        dfs(0)\n        return res\n\n    def isPali(self, s, l, r):\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l, r = l + 1, r - 1\n        return True\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Palindrome Partitioning",
          "explanation": "Palindrome Partitioning is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * 2^N)",
      "spaceComplexity": "O(N^2)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "letter-combinations-of-a-phone-number",
      "title": "Letter Combinations of a Phone Number",
      "difficulty": "Medium",
      "description": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.\n\n \nExample 1:\n\n\n<strong>Input:</strong> digits = \"23\"\n<strong>Output:</strong> [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n\n\nExample 2:\n\n\n<strong>Input:</strong> digits = \"2\"\n<strong>Output:</strong> [\"a\",\"b\",\"c\"]\n\n\n \nConstraints:\n\n\n\t1 <= digits.length <= 4\n\tdigits[i] is a digit in the range ['2', '9'].",
      "examples": [
        {
          "input": "\"23\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"2\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function letterCombinationsOfAPhoneNumber(input) {\n  // Your code here\n}",
        "python": "def letter_combinations_of_a_phone_number(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/letter-combinations-of-a-phone-number/\n * Time O(N * 4^N) | Space O(N)\n * @param {string} digits\n * @return {string[]}\n */\nvar letterCombinations = function (\n    digits,\n    combination = [],\n    combinations = [],\n) {\n    const isBaseCase = !digits;\n    if (isBaseCase) {\n        if (combination.length) combinations.push(combination.join(''));\n\n        return combinations;\n    }\n\n    const letters = phoneButtons[digits[0]];\n\n    for (const char of letters) {\n        backTrack(digits, char, combination, combinations);\n    }\n\n    return combinations;\n};\n\nconst backTrack = (digits, char, combination, combinations) => {\n    combination.push(char);\n    letterCombinations(digits.slice(1), combination, combinations);\n    combination.pop();\n};\n\nconst phoneButtons = {\n    2: ['a', 'b', 'c'],\n    3: ['d', 'e', 'f'],\n    4: ['g', 'h', 'i'],\n    5: ['j', 'k', 'l'],\n    6: ['m', 'n', 'o'],\n    7: ['p', 'q', 'r', 's'],\n    8: ['t', 'u', 'v'],\n    9: ['w', 'x', 'y', 'z'],\n};\n",
        "python": "class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        res = []\n        digitToChar = {\n            \"2\": \"abc\",\n            \"3\": \"def\",\n            \"4\": \"ghi\",\n            \"5\": \"jkl\",\n            \"6\": \"mno\",\n            \"7\": \"qprs\",\n            \"8\": \"tuv\",\n            \"9\": \"wxyz\",\n        }\n\n        def backtrack(i, curStr):\n            if len(curStr) == len(digits):\n                res.append(curStr)\n                return\n            for c in digitToChar[digits[i]]:\n                backtrack(i + 1, curStr + c)\n\n        if digits:\n            backtrack(0, \"\")\n\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Letter Combinations of a Phone Number",
          "explanation": "Letter Combinations of a Phone Number is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * 4^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    },
    {
      "id": "n-queens",
      "title": "N-Queens",
      "difficulty": "Hard",
      "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.\n\n \nExample 1:\n\n\n<strong>Input:</strong> n = 4\n<strong>Output:</strong> [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n<strong>Explanation:</strong> There exist two distinct solutions to the 4-queens puzzle as shown above\n\n\nExample 2:\n\n\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [[\"Q\"]]\n\n\n \nConstraints:\n\n\n\t1 <= n <= 9",
      "examples": [
        {
          "input": "4",
          "output": "See problem description for expected output."
        },
        {
          "input": "1",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function nQueens(input) {\n  // Your code here\n}",
        "python": "def n_queens(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/n-queens/\n * Time O(N!) | Space O(N^2)\n * @param {number} n\n * @return {string[][]}\n */\nfunction solveNQueens(\n    n,\n    colSet = new Set(),\n    posDiagSet = new Set(),\n    negDiagSet = new Set(),\n) {\n    const board = new Array(n).fill().map(() => new Array(n).fill('.'));\n\n    return dfs(board, n, colSet, posDiagSet, negDiagSet);\n}\n\nconst dfs = (board, n, colSet, posDiagSet, negDiagSet, row = 0, moves = []) => {\n    const isBaseCase = row === n;\n    if (isBaseCase) {\n        const rows = board.map((_row) => _row.join(''));\n\n        moves.push(rows);\n\n        return moves;\n    }\n\n    for (let col = 0; col < n; col++) {\n        const hasQueen =\n            colSet.has(col) ||\n            posDiagSet.has(row + col) ||\n            negDiagSet.has(row - col);\n        if (hasQueen) continue;\n\n        backTrack(board, n, row, col, colSet, posDiagSet, negDiagSet, moves);\n    }\n\n    return moves;\n};\n\nconst backTrack = (\n    board,\n    n,\n    row,\n    col,\n    colSet,\n    posDiagSet,\n    negDiagSet,\n    moves,\n) => {\n    colSet.add(col);\n    posDiagSet.add(row + col);\n    negDiagSet.add(row - col);\n    board[row][col] = 'Q';\n\n    dfs(board, n, colSet, posDiagSet, negDiagSet, row + 1, moves);\n\n    colSet.delete(col);\n    posDiagSet.delete(row + col);\n    negDiagSet.delete(row - col);\n    board[row][col] = '.';\n};\n",
        "python": "class Solution:\n    def solveNQueens(self, n: int) -> List[List[str]]:\n        col = set()\n        posDiag = set()  # (r + c)\n        negDiag = set()  # (r - c)\n\n        res = []\n        board = [[\".\"] * n for i in range(n)]\n\n        def backtrack(r):\n            if r == n:\n                copy = [\"\".join(row) for row in board]\n                res.append(copy)\n                return\n\n            for c in range(n):\n                if c in col or (r + c) in posDiag or (r - c) in negDiag:\n                    continue\n\n                col.add(c)\n                posDiag.add(r + c)\n                negDiag.add(r - c)\n                board[r][c] = \"Q\"\n\n                backtrack(r + 1)\n\n                col.remove(c)\n                posDiag.remove(r + c)\n                negDiag.remove(r - c)\n                board[r][c] = \".\"\n\n        backtrack(0)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding N-Queens",
          "explanation": "N-Queens is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N!)",
      "spaceComplexity": "O(N^2)",
      "tags": [
        "Backtracking"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Number of subsets of n-element set:",
      "options": [
        "n!",
        "2^n",
        "n^2",
        "n log n"
      ],
      "correct": 1,
      "explanation": "Each element is in or out: 2 choices per element = 2^n subsets."
    }
  ],
  "cheatSheet": "# Backtracking Template\n```js\nfunction bt(state){\n  if(done(state)){results.push(clone(state));return;}\n  for(const choice of choices){\n    make(choice); bt(state); undo(choice);\n  }\n}\n```",
  "proTips": [
    "Prune early: check constraints before recursing",
    "Sort input to skip duplicates easily"
  ],
  "faangQuotes": [
    "\"N-Queens is our favorite backtracking — spatial reasoning test.\" — Google"
  ],
  "visualizationType": "array",
  "usage": "Used to explore all potential combinations or permutations, backtracking when a path fails.",
  "dsInvolved": "Recursion, Array, String",
  "sampleProblems": [
    "Subsets",
    "Permutations",
    "Combination Sum"
  ]
};
