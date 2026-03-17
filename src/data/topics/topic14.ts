import { Topic } from "./types";

export const topic14: Topic = {
  "id": "topic14",
  "slug": "dynamic-programming",
  "title": "Dynamic Programming",
  "emoji": "🧮",
  "color": "#a78bfa",
  "gradient": "from-violet-600 to-indigo-400",
  "layman": "DP is organized recursion with memory. Fibonacci: instead of computing fib(4) 100 times, write it down. DP turns exponential brute force into polynomial solutions.",
  "technical": "DP applies when: overlapping subproblems + optimal substructure. Top-down (memoization) or bottom-up (tabulation). Patterns: 1D, 2D, knapsack, LCS, bitmask.",
  "keyInsights": [
    "Define dp[i] clearly: what does it represent?",
    "Base cases must be correct",
    "Space optimization: reduce 2D DP to 1D"
  ],
  "timeComplexities": [
    {
      "operation": "1D DP",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1) optimized"
    },
    {
      "operation": "2D DP (LCS)",
      "best": "O(mn)",
      "avg": "O(mn)",
      "worst": "O(mn)",
      "space": "O(mn)"
    }
  ],
  "questions": [
    {
      "id": "house-robber",
      "title": "House Robber",
      "difficulty": "Medium",
      "description": "Rob houses along a street — can't rob two adjacent houses. Maximize total loot.",
      "examples": [
        {
          "input": "nums=[1,2,3,1]",
          "output": "4",
          "explanation": "Rob house 0 (1) + house 2 (3) = 4."
        }
      ],
      "constraints": [
        "1≤nums.length≤100",
        "0≤nums[i]≤400"
      ],
      "starterCode": {
        "js": "function rob(nums){\n  // dp[i] = max loot up to house i\n}",
        "python": "def rob(nums):\n    pass"
      },
      "solution": {
        "js": "function rob(nums){\n  let prev2=0,prev1=0;\n  for(const n of nums){\n    const cur=Math.max(prev1,prev2+n);\n    prev2=prev1;\n    prev1=cur;\n  }\n  return prev1;\n}",
        "python": "def rob(nums):\n    prev2=prev1=0\n    for n in nums:\n        prev2,prev1=prev1,max(prev1,prev2+n)\n    return prev1"
      },
      "testCases": [
        {
          "input": "[1,2,3,1]",
          "expected": "4"
        },
        {
          "input": "[2,7,9,3,1]",
          "expected": "12"
        },
        {
          "input": "[1,3,1,3,100]",
          "expected": "103",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "At each house: rob it (prev_prev + cur) OR skip it (prev)."
      ],
      "tags": [
        "dp",
        "1d-dp"
      ],
      "walkthrough": [
        {
          "title": "Define the recurrence",
          "explanation": "dp[i] = max money robbing houses 0..i. Choice at each house: rob it (dp[i-2]+nums[i]) or skip it (dp[i-1]). dp[i] = max of both.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "labels": [
              "house 0",
              "house 1",
              "house 2",
              "house 3"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "insight": "We only need the previous two values, not the full DP table. Space O(1)!"
        },
        {
          "title": "House 0: dp[0]=1",
          "explanation": "Only one house available. Rob it: dp[0]=1.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "states": [
              "active",
              "default",
              "default",
              "default"
            ]
          },
          "variables": {
            "prev2": 0,
            "prev1": 1
          }
        },
        {
          "title": "House 1: max(rob=0+2=2, skip=1)=2",
          "explanation": "dp[1] = max(dp[-1]+2, dp[0]) = max(0+2, 1) = max(2,1) = 2. Skip house 0, rob house 1.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "states": [
              "comparing",
              "active",
              "default",
              "default"
            ]
          },
          "variables": {
            "prev2": 1,
            "prev1": 2
          }
        },
        {
          "title": "House 2: max(rob=1+3=4, skip=2)=4",
          "explanation": "dp[2] = max(dp[0]+3, dp[1]) = max(1+3, 2) = max(4,2) = 4. Rob house 0 + house 2.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "states": [
              "found",
              "eliminated",
              "active",
              "default"
            ]
          },
          "variables": {
            "prev2": 2,
            "prev1": 4
          }
        },
        {
          "title": "House 3: max(rob=2+1=3, skip=4)=4",
          "explanation": "dp[3]=max(dp[1]+1, dp[2])=max(2+1,4)=max(3,4)=4. Skipping house 3 is optimal.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "states": [
              "result",
              "eliminated",
              "result",
              "eliminated"
            ]
          },
          "variables": {
            "answer": 4
          },
          "complexity": "O(n) time, O(1) space — only two variables needed."
        }
      ]
    },
    {
      "id": "longest-common-subsequence",
      "title": "Longest Common Subsequence",
      "difficulty": "Medium",
      "description": "Return the length of the longest common subsequence of text1 and text2.",
      "examples": [
        {
          "input": "text1=\"abcde\", text2=\"ace\"",
          "output": "3",
          "explanation": "LCS is \"ace\"."
        }
      ],
      "constraints": [
        "1≤text1.length,text2.length≤1000"
      ],
      "starterCode": {
        "js": "function longestCommonSubsequence(text1,text2){\n  const m=text1.length,n=text2.length;\n  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));\n}",
        "python": "def longest_common_subsequence(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]"
      },
      "solution": {
        "js": "function longestCommonSubsequence(text1,text2){\n  const m=text1.length,n=text2.length;\n  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));\n  for(let i=1;i<=m;i++)\n    for(let j=1;j<=n;j++)\n      dp[i][j]=text1[i-1]===text2[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);\n  return dp[m][n];\n}",
        "python": "def longest_common_subsequence(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n    return dp[m][n]"
      },
      "testCases": [
        {
          "input": "\"abcde\"\n\"ace\"",
          "expected": "3"
        },
        {
          "input": "\"abc\"\n\"abc\"",
          "expected": "3"
        },
        {
          "input": "\"abc\"\n\"def\"",
          "expected": "0",
          "hidden": true
        }
      ],
      "timeComplexity": "O(m×n)",
      "spaceComplexity": "O(m×n)",
      "hints": [
        "dp[i][j] = LCS of text1[0..i] and text2[0..j].",
        "Match: dp[i-1][j-1]+1. Mismatch: max(skip one of either)."
      ],
      "tags": [
        "dp",
        "2d-dp",
        "string"
      ],
      "walkthrough": [
        {
          "title": "dp[i][j] definition",
          "explanation": "dp[i][j] = length of LCS of text1[0..i-1] and text2[0..j-1]. Answer is dp[m][n].",
          "phase": "init",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "",
                "",
                "a",
                "c",
                "e"
              ],
              [
                "",
                "0",
                "0",
                "0",
                "0"
              ],
              [
                "a",
                "0",
                "1",
                "1",
                "1"
              ],
              [
                "b",
                "0",
                "1",
                "1",
                "1"
              ],
              [
                "c",
                "0",
                "1",
                "2",
                "2"
              ],
              [
                "d",
                "0",
                "1",
                "2",
                "2"
              ],
              [
                "e",
                "0",
                "1",
                "2",
                "3"
              ]
            ],
            "colHeaders": [
              "",
              "",
              "a",
              "c",
              "e"
            ],
            "rowHeaders": [
              "",
              "",
              "a",
              "b",
              "c",
              "d",
              "e"
            ],
            "gridHighlighted": [
              [
                6,
                4
              ]
            ]
          }
        },
        {
          "title": "When characters match: diagonal+1",
          "explanation": "text1[i-1]==text2[j-1] → dp[i][j]=dp[i-1][j-1]+1. E.g., text1[0]='a'==text2[0]='a' → dp[1][1]=dp[0][0]+1=1.",
          "phase": "update",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "",
                "a",
                "c",
                "e"
              ],
              [
                "a",
                "1",
                "1",
                "1"
              ],
              [
                "b",
                "1",
                "1",
                "1"
              ],
              [
                "c",
                "1",
                "2",
                "2"
              ],
              [
                "d",
                "1",
                "2",
                "2"
              ],
              [
                "e",
                "1",
                "2",
                "3"
              ]
            ],
            "gridHighlighted": [
              [
                0,
                0
              ],
              [
                3,
                1
              ],
              [
                5,
                2
              ]
            ]
          },
          "insight": "Diagonal means both characters contributed to the LCS — they matched!"
        },
        {
          "title": "When mismatch: take max of skipping either",
          "explanation": "text1[i-1]≠text2[j-1] → dp[i][j]=max(dp[i-1][j], dp[i][j-1]). Take the best LCS ignoring the current char from either string.",
          "phase": "update",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "",
                "a",
                "c",
                "e"
              ],
              [
                "a",
                "1",
                "1",
                "1"
              ],
              [
                "b",
                "1",
                "1",
                "1"
              ],
              [
                "c",
                "1",
                "2",
                "2"
              ],
              [
                "d",
                "1",
                "2",
                "2"
              ],
              [
                "e",
                "1",
                "2",
                "3"
              ]
            ],
            "gridHighlighted": [
              [
                1,
                1
              ],
              [
                1,
                2
              ]
            ]
          },
          "code": "dp[i][j] = text1[i-1]===text2[j-1]\n  ? dp[i-1][j-1]+1          // match\n  : Math.max(dp[i-1][j],    // skip text1[i]\n             dp[i][j-1]);   // skip text2[j]",
          "codeHighlight": [
            1,
            2,
            3,
            4
          ]
        },
        {
          "title": "Answer: dp[5][3]=3",
          "explanation": "dp[5][3]=3 — LCS length is 3 (\"ace\"). The table encodes all subproblem answers.",
          "phase": "done",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "",
                "a",
                "c",
                "e"
              ],
              [
                "a",
                "1",
                "1",
                "1"
              ],
              [
                "b",
                "1",
                "1",
                "1"
              ],
              [
                "c",
                "1",
                "2",
                "2"
              ],
              [
                "d",
                "1",
                "2",
                "2"
              ],
              [
                "e",
                "1",
                "2",
                "3"
              ]
            ],
            "gridHighlighted": [
              [
                5,
                3
              ]
            ]
          },
          "variables": {
            "answer": 3,
            "LCS": "\"ace\""
          },
          "complexity": "O(m×n) time and space."
        }
      ]
    },
    {
      "id": "climbing-stairs",
      "title": "Climbing Stairs",
      "difficulty": "Easy",
      "description": "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n \nExample 1:\n\n\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\n\nExample 2:\n\n\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\n\n \nConstraints:\n\n\n\t1 <= n <= 45",
      "examples": [
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function climbingStairs(input) {\n  // Your code here\n}",
        "python": "def climbing_stairs(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^N) | Space O(N)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n, index = 0) => {\n    const isBaseCase1 = n < index;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = index === n;\n    if (isBaseCase2) return 1;\n\n    const [next, nextNext] = [index + 1, index + 2];\n    const left = climbStairs(n, next); /* Time O(2^N) | Space O(N) */\n    const right = climbStairs(n, nextNext); /* Time O(2^N) | Space O(N) */\n\n    return left + right;\n};\n\n/**\n * DP - Top Down\n * Array - Memoization\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n, index = 0, memo = Array(n + 1).fill(0)) => {\n    const isBaseCase1 = n < index;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = index === n;\n    if (isBaseCase2) return 1;\n\n    const hasSeen = memo[index] !== 0;\n    if (hasSeen) return memo[index];\n\n    const [next, nextNext] = [index + 1, index + 2];\n    const left = climbStairs(n, next, memo); /* Time O(N) | Space O(N) */\n    const right = climbStairs(n, nextNext, memo); /* Time O(N) | Space O(N) */\n\n    memo[index] = left + right; /*           | Space O(N) */\n    return memo[index];\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n) => {\n    const isBaseCase = n === 1;\n    if (isBaseCase) return 1;\n\n    const tabu = initTabu(n); /* Space O(N) */\n\n    search(n, tabu);\n\n    return tabu[n];\n};\n\nvar initTabu = (n) => {\n    const tabu = new Array(n + 1).fill(0);\n\n    tabu[1] = 1;\n    tabu[2] = 2;\n\n    return tabu;\n};\n\nvar search = (n, tabu) => {\n    for (let index = 3; index <= n; index++) {\n        /* Time O(N) */\n        const [prev, prevPrev] = [index - 1, index - 2];\n\n        tabu[index] = tabu[prev] + tabu[prevPrev]; /* Space O(N) */\n    }\n};\n\n/**\n * DP - Fibonacci Number\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n) => {\n    const isBaseCase = n === 1;\n    if (isBaseCase) return 1;\n\n    let [next, nextNext] = [1, 2];\n\n    for (let index = 3; index <= n; index++) {\n        /* Time O(N) */\n        const temp = next + nextNext;\n\n        next = nextNext;\n        nextNext = temp;\n    }\n\n    return nextNext;\n};\n\n/**\n * Matrix - Bitnets Method\n * Time O(log(N)) | Space O(1)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n) => {\n    const prev = [\n        [1, 1],\n        [1, 0],\n    ];\n    const next = power(n, prev); /* Time O(log(N)) */\n\n    return next[0][0];\n};\n\nconst power = (n, prev) => {\n    let next = [\n        [1, 0],\n        [0, 1],\n    ];\n\n    const isEmpty = () => n === 0;\n    while (!isEmpty()) {\n        /* Time O(log(N)) */\n        const isBit = (n & 1) === 1;\n        if (isBit) next = multiply(next, prev); /* Time O(1) | Space O(1) */\n\n        n >>= 1;\n        prev = multiply(prev, prev); /* Time O(1) | Space O(1) */\n    }\n\n    return next;\n};\n\nconst multiply = (prev, next) => {\n    const [rows, cols] = [2, 2];\n    const matrix = new Array(rows).fill().map(() => new Array(cols).fill(0));\n\n    for (let row = 0; row < rows; row++) {\n        for (let col = 0; col < cols; col++) {\n            const left = prev[row][0] * next[0][col];\n            const right = prev[row][1] * next[1][col];\n\n            matrix[row][col] = left + right;\n        }\n    }\n\n    return matrix;\n};\n\n/**\n * Math - Fibonacci Formula\n * Time O(log(N)) | Space O(1)\n * https://leetcode.com/problems/climbing-stairs/\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = (n, sqrt5 = Math.sqrt(5)) => {\n    const phi = (sqrt5 + 1) / 2;\n    const psi = (sqrt5 - 1) / 2;\n\n    const phiPow = Math.pow(phi, n + 1);\n    const psiPow = Math.pow(psi, n + 1);\n\n    return (phiPow - psiPow) / sqrt5;\n};\n",
        "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 3:\n            return n\n        n1, n2 = 2, 3\n\n        for i in range(4, n + 1):\n            temp = n1 + n2\n            n1 = n2\n            n2 = temp\n        return n2\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Climbing Stairs",
          "explanation": "Climbing Stairs is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": [
        "To reach nth step, what could have been your previous steps? (Think about the step sizes)"
      ]
    },
    {
      "id": "min-cost-climbing-stairs",
      "title": "Min Cost Climbing Stairs",
      "difficulty": "Easy",
      "description": "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index 0, or the step with index 1.\n\nReturn the minimum cost to reach the top of the floor.\n\n \nExample 1:\n\n\n<strong>Input:</strong> cost = [10,<u>15</u>,20]\n<strong>Output:</strong> 15\n<strong>Explanation:</strong> You will start at index 1.\n- Pay 15 and climb two steps to reach the top.\nThe total cost is 15.\n\n\nExample 2:\n\n\n<strong>Input:</strong> cost = [<u>1</u>,100,<u>1</u>,1,<u>1</u>,100,<u>1</u>,<u>1</u>,100,<u>1</u>]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> You will start at index 0.\n- Pay 1 and climb two steps to reach index 2.\n- Pay 1 and climb two steps to reach index 4.\n- Pay 1 and climb two steps to reach index 6.\n- Pay 1 and climb one step to reach index 7.\n- Pay 1 and climb two steps to reach index 9.\n- Pay 1 and climb one step to reach the top.\nThe total cost is 6.\n\n\n \nConstraints:\n\n\n\t2 <= cost.length <= 1000\n\t0 <= cost[i] <= 999",
      "examples": [
        {
          "input": "[10,15,20]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,100,1,1,1,100,1,1,100,1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function minCostClimbingStairs(input) {\n  // Your code here\n}",
        "python": "def min_cost_climbing_stairs(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Min Cost Climbing Stairs",
          "explanation": "Min Cost Climbing Stairs is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "1-D DP"
      ],
      "hints": [
        "Build an array dp where dp[i] is the minimum cost to climb to the top starting from the ith staircase.",
        "Assuming we have n staircase labeled from 0 to n - 1 and assuming the top is n, then dp[n] = 0, marking that if you are at the top, the cost is 0.",
        "Now, looping from n - 1 to 0, the dp[i] = cost[i] + min(dp[i + 1], dp[i + 2]). The answer will be the minimum of dp[0] and dp[1]"
      ]
    },
    {
      "id": "house-robber-ii",
      "title": "House Robber II",
      "difficulty": "Medium",
      "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [2,3,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [1,2,3,1]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [1,2,3]\n<strong>Output:</strong> 3\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 100\n\t0 <= nums[i] <= 1000",
      "examples": [
        {
          "input": "[2,3,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function houseRobberIi(input) {\n  // Your code here\n}",
        "python": "def house_robber_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Greedy - Max\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/house-robber-ii/\n * @param {number[]} nums\n * @return {number}\n */\nvar rob = (nums) => {\n    const isBaseCase1 = nums.length === 0;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = nums.length === 1;\n    if (isBaseCase2) return nums[0];\n\n    const left = search(nums, 0, nums.length - 2); /* Time O(N) */\n    const right = search(nums, 1, nums.length - 1); /* Time O(N) */\n\n    return Math.max(left, right);\n};\n\nconst search = (nums, start, end) => {\n    let [left, mid] = [0, 0];\n\n    for (let i = start; i <= end; i++) {\n        /* Time O(N) */\n        const temp = mid;\n        const right = nums[i];\n        const house = left + right;\n\n        mid = Math.max(mid, house);\n        left = temp;\n    }\n\n    return mid;\n};\n",
        "python": "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        return max(nums[0], self.helper(nums[1:]), self.helper(nums[:-1]))\n\n    def helper(self, nums):\n        rob1, rob2 = 0, 0\n\n        for n in nums:\n            newRob = max(rob1 + n, rob2)\n            rob1 = rob2\n            rob2 = newRob\n        return rob2\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding House Robber II",
          "explanation": "House Robber II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "1-D DP"
      ],
      "hints": [
        "Since House[1] and House[n] are adjacent, they cannot be robbed together. Therefore, the problem becomes to rob either House[1]-House[n-1] or House[2]-House[n], depending on which choice offers more money. Now the problem has degenerated to the <a href =\"https://leetcode.com/problems/house-robber/description/\">House Robber</a>, which is already been solved."
      ]
    },
    {
      "id": "longest-palindromic-substring",
      "title": "Longest Palindromic Substring",
      "difficulty": "Medium",
      "description": "Given a string s, return the longest palindromic substring in s.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"babad\"\n<strong>Output:</strong> \"bab\"\n<strong>Explanation:</strong> \"aba\" is also a valid answer.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"cbbd\"\n<strong>Output:</strong> \"bb\"\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 1000\n\ts consist of only digits and English letters.",
      "examples": [
        {
          "input": "\"babad\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"cbbd\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestPalindromicSubstring(input) {\n  // Your code here\n}",
        "python": "def longest_palindromic_substring(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Expand Around Center\n * Time O(N^2) | Space O(1)\n * https://leetcode.com/problems/longest-palindromic-substring/\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = (s) => {\n    const isEmpty = s.length === 0;\n    if (isEmpty) return '';\n\n    const [left, right] = search(s); /* Time O(N * N) */\n\n    return s.slice(\n        left,\n        right + 1,\n    ); /* Time O(N * N) | Ignore Auxillary Space (N) */\n};\n\nconst search = (s, left = 0, right = 0) => {\n    for (let index = 0; index < s.length; index++) {\n        /* Time O(N) */\n        const len1 = getLength(s, index, index); /* Time O(N) */\n        const len2 = getLength(s, index, index + 1); /* Time O(N) */\n        const [length, window] = [Math.max(len1, len2), right - left];\n\n        const canSkip = length <= window;\n        if (canSkip) continue;\n\n        left = index - ((length - 1) >> 1);\n        right = index + (length >> 1);\n    }\n\n    return [left, right];\n};\n\nconst getLength = (s, left, right) => {\n    const canExpand = () => 0 <= left && right < s.length;\n    const isSame = () => s[left] === s[right];\n\n    const isPalindrome = () => canExpand() && isSame();\n    while (isPalindrome()) {\n        left--;\n        right++;\n    } /* Time O(N) */\n\n    const window = right - left - 1;\n\n    return window;\n};\n",
        "python": "\nclass Solution:\n    def longestPalindrome(self, s: str) -> str:\n        self.res = \"\"\n        self.lenres = 0\n        for i in range(len(s)):\n            s1 = self.helper(s, i, i)\n            s2 = self.helper(s, i, i + 1)\n        return s2\n        \n    def helper(self, s, left, right):\n            while left >= 0 and right < len(s) and s[left] == s[right]:\n                if (right - left + 1) > self.lenres:\n                    self.res = s[left:right+1]\n                    self.lenres = right - left + 1\n                left -= 1\n                right += 1\n            return self.res\n\n\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Palindromic Substring",
          "explanation": "Longest Palindromic Substring is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "tags": [
        "1-D DP"
      ],
      "hints": [
        "How can we reuse a previously computed palindrome to compute a larger palindrome?",
        "If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?",
        "Complexity based hint:</br>\r\nIf we use brute-force and check whether for every start and end position a substring is a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation."
      ]
    },
    {
      "id": "palindromic-substrings",
      "title": "Palindromic Substrings",
      "difficulty": "Medium",
      "description": "Given a string s, return the number of palindromic substrings in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"abc\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> Three palindromic strings: \"a\", \"b\", \"c\".\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"aaa\"\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> Six palindromic strings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\".\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 1000\n\ts consists of lowercase English letters.",
      "examples": [
        {
          "input": "\"abc\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"aaa\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function palindromicSubstrings(input) {\n  // Your code here\n}",
        "python": "def palindromic_substrings(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brut Force - Check All Substrings\n * Time O(N^3) | Space O(1)\n * https://leetcode.com/problems/palindromic-substrings/\n * @param {string} s\n * @return {number}\n */\nvar countSubstrings = (s, count = 0) => {\n    for (let left = 0; left < s.length; left++) {\n        /* Time O(N) */\n        for (let right = left; right < s.length; right++) {\n            /* Time O(N) */\n            count += Number(isPalindrome(s, left, right)); /* Time O(N) */\n        }\n    }\n\n    return count;\n};\n\nconst isPalindrome = (s, left, right) => {\n    while (left < right) {\n        /* Time O(N) */\n        const isEqual = s[left] === s[right];\n        if (!isEqual) return false;\n\n        left++;\n        right--;\n    }\n\n    return true;\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * 2 Pointer - Slide Window\n * Time O(N^2) | Space O(N^2)\n * https://leetcode.com/problems/palindromic-substrings/\n * @param {string} s\n * @return {number}\n */\nvar countSubstrings = (s, count = 0) => {\n    const tabu = initTabu(s); /* Time O(N * N)  | Space O(N *  N) */\n\n    count += singleLetters(s, tabu); /* Time O(N)      | Space O(N *  N) */\n    count += doubleLetters(s, tabu); /* Time O(N)      | Space O(N *  N) */\n    count += multiLetters(s, tabu); /* Time O(N *  N) | Space O(N *  N) */\n\n    return count;\n};\n\nconst initTabu = (s) =>\n    new Array(s.length)\n        .fill() /* Space O(N) */\n        .map(() => new Array(s.length).fill(false)); /* Space O(N) */\n\nconst singleLetters = (s, tabu, count = 0) => {\n    for (let index = 0; index < s.length; index++) {\n        /* Time O(N) */\n        tabu[index][index] = true; /* Space O(N * N) */\n\n        count += Number(tabu[index][index]);\n    }\n\n    return count;\n};\n\nconst doubleLetters = (s, tabu, count = 0) => {\n    for (let curr = 0; curr < s.length - 1; curr++) {\n        /* Time O(N) */\n        const next = curr + 1;\n        const isEqual = s[curr] === s[next];\n\n        tabu[curr][next] = isEqual; /* Space O(N * N) */\n        count += Number(tabu[curr][next]);\n    }\n\n    return count;\n};\n\nconst multiLetters = (s, tabu, count = 0) => {\n    for (let window = 3; window <= s.length; window++) {\n        /* Time O(N) */\n        count += slideWindow(s, tabu, window); /* Time O(N) | Space O(N * N) */\n    }\n\n    return count;\n};\n\nconst slideWindow = (s, tabu, window, count = 0) => {\n    let [left, right] = [0, window - 1];\n\n    while (right < s.length) {\n        /* Time O(N) */\n        const isTrue = tabu[left + 1][right - 1];\n        const isEqual = s[left] === s[right];\n\n        tabu[left][right] = isTrue && isEqual; /* Space O(N * N) */\n        count += Number(tabu[left][right]);\n\n        left++;\n        right++;\n    }\n\n    return count;\n};\n\n/**\n * 2 Pointer - Expand Around Center\n * Time O(N^2) | Space O(1)\n * https://leetcode.com/problems/palindromic-substrings/\n * @param {string} s\n * @return {number}\n */\nvar countSubstrings = (s, count = 0) => {\n    for (let i = 0; i < s.length; i++) {\n        /* Time O(N) */\n        const [odd, even] = [i, i + 1];\n        /* odd-length: single character center */\n        count += isPalindromeFromCenter(s, i, odd); /* Time O(N) */\n        /* even-length: consecutive characters center */\n        count += isPalindromeFromCenter(s, i, even); /* Time O(N) */\n    }\n\n    return count;\n};\n\nconst isPalindromeFromCenter = (s, left, right, count = 0) => {\n    const isInBounds = () => 0 <= left && right < s.length;\n    while (isInBounds()) {\n        /* Time O(N) */\n        const isEqual = s[left] === s[right];\n        if (!isEqual) break;\n\n        count++;\n\n        left--;\n        right++;\n    }\n\n    return count;\n};\n",
        "python": "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        res = 0\n\n        for i in range(len(s)):\n            res += self.countPali(s, i, i)\n            res += self.countPali(s, i, i + 1)\n        return res\n\n    def countPali(self, s, l, r):\n        res = 0\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            res += 1\n            l -= 1\n            r += 1\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Palindromic Substrings",
          "explanation": "Palindromic Substrings is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^3)",
      "spaceComplexity": "O(1)",
      "tags": [
        "1-D DP"
      ],
      "hints": [
        "How can we reuse a previously computed palindrome to compute a larger palindrome?",
        "If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?",
        "Complexity based hint:</br>\r\nIf we use brute force and check whether for every start and end position a substring is a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation?"
      ]
    },
    {
      "id": "decode-ways",
      "title": "Decode Ways",
      "difficulty": "Medium",
      "description": "You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:\n\n\"1\" -> 'A'\n\n\"2\" -> 'B'\n\n...\n\n\"25\" -> 'Y'\n\n\"26\" -> 'Z'\n\nHowever, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes (\"2\" and \"5\" vs \"25\").\n\nFor example, \"11106\" can be decoded into:\n\n\n\t\"AAJF\" with the grouping (1, 1, 10, 6)\n\t\"KJF\" with the grouping (11, 10, 6)\n\tThe grouping (1, 11, 06) is invalid because \"06\" is not a valid code (only \"6\" is valid).\n\n\nNote: there may be strings that are impossible to decode.\n\n\n\nGiven a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.\n\nThe test cases are generated so that the answer fits in a 32-bit integer.\n\n \nExample 1:\n\n\nInput: s = \"12\"\n\nOutput: 2\n\nExplanation:\n\n\"12\" could be decoded as \"AB\" (1 2) or \"L\" (12).\n\n\nExample 2:\n\n\nInput: s = \"226\"\n\nOutput: 3\n\nExplanation:\n\n\"226\" could be decoded as \"BZ\" (2 26), \"VF\" (22 6), or \"BBF\" (2 2 6).\n\n\nExample 3:\n\n\nInput: s = \"06\"\n\nOutput: 0\n\nExplanation:\n\n\"06\" cannot be mapped to \"F\" because of the leading zero (\"6\" is different from \"06\"). In this case, the string is not a valid encoding, so return 0.\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 100\n\ts contains only digits and may contain leading zero(s).",
      "examples": [
        {
          "input": "\"12\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"226\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"06\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function decodeWays(input) {\n  // Your code here\n}",
        "python": "def decode_ways(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * DP - Top Down\n * Hash Map - Memoization\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/decode-ways/\n * @param {string} s\n * @return {number}\n */\nvar numDecodings = (str, index = 0, memo = new Map()) => {\n    const isBaseCase1 = !str.length || str[index] === '0';\n    if (isBaseCase1) return 0;\n\n    const isisBaseCase2 = index === str.length;\n    if (isisBaseCase2) return 1;\n\n    if (memo.has(index)) return memo.get(index);\n\n    return dfs(str, index, memo);\n};\n\nconst dfs = (str, index, memo) => {\n    let count = numDecodings(str, index + 1, memo);\n\n    if (isTwoDigit(str, index)) {\n        count += numDecodings(str, index + 2, memo);\n    }\n\n    memo.set(index, count);\n\n    return count;\n};\n\nvar isTwoDigit = (str, index) => {\n    const twoDigit = Number(str.slice(index, index + 2));\n\n    return 10 <= twoDigit && twoDigit <= 26;\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/decode-ways/\n * @param {string} s\n * @return {number}\n */\nvar numDecodings = (s) => {\n    const isBaseCase = !s.length || s[0] === '0';\n    if (isBaseCase) return 0;\n\n    const tabu = getTabu(s);\n\n    decode(s, tabu);\n\n    return tabu[s.length];\n};\n\nconst getTabu = (s) => {\n    const tabu = new Array(s.length + 1).fill(0);\n\n    tabu[0] = 1;\n    tabu[1] = s[1] === '0' ? 0 : 1;\n\n    return tabu;\n};\n\nvar decode = (s, tabu) => {\n    for (let curr = 2; curr < tabu.length; curr++) {\n        const [prev, prevPrev] = [curr - 1, curr - 2];\n        const isEqual = s[prev] === '0';\n        if (!isEqual) tabu[curr] += tabu[prev];\n\n        if (isTwoDigit(s, curr)) tabu[curr] += tabu[prevPrev];\n    }\n};\n\nvar isTwoDigit = (s, index) => {\n    const twoDigit = Number(s.slice(index - 2, index));\n\n    return 10 <= twoDigit && twoDigit <= 26;\n};\n\n/**\n * 2 Pointer - previous + previousPrevious\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/decode-ways/\n * @param {string} s\n * @return {number}\n */\nvar numDecodings = (s) => {\n    const isBaseCase = !s.length || s[0] === '0';\n    if (isBaseCase) return 0;\n\n    return decode(s);\n};\n\nvar decode = (s) => {\n    let [prev, prevPrev] = [1, 1];\n\n    for (let curr = 1; curr < s.length; curr++) {\n        const temp = prev;\n\n        const isEqual = s[curr] === '0';\n        if (isEqual) prev = 0;\n\n        if (isTwoDigit(s, curr)) prev += prevPrev;\n\n        prevPrev = temp;\n    }\n\n    return prev;\n};\n\nvar isTwoDigit = (s, i) => {\n    const [prevChar, curChar] = [s[i - 1], s[i]];\n    const is10 = prevChar === '1';\n    const is20 = prevChar === '2' && curChar <= '6';\n\n    return is10 || is20;\n};\n",
        "python": "class Solution:\n    def numDecodings(self, s: str) -> int:\n        # Memoization\n        dp = {len(s): 1}\n\n        def dfs(i):\n            if i in dp:\n                return dp[i]\n            if s[i] == \"0\":\n                return 0\n\n            res = dfs(i + 1)\n            if i + 1 < len(s) and (\n                s[i] == \"1\" or s[i] == \"2\" and s[i + 1] in \"0123456\"\n            ):\n                res += dfs(i + 2)\n            dp[i] = res\n            return res\n\n        return dfs(0)\n\n        # Dynamic Programming\n        dp = {len(s): 1}\n        for i in range(len(s) - 1, -1, -1):\n            if s[i] == \"0\":\n                dp[i] = 0\n            else:\n                dp[i] = dp[i + 1]\n\n            if i + 1 < len(s) and (\n                s[i] == \"1\" or s[i] == \"2\" and s[i + 1] in \"0123456\"\n            ):\n                dp[i] += dp[i + 2]\n        return dp[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Decode Ways",
          "explanation": "Decode Ways is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "coin-change",
      "title": "Coin Change",
      "difficulty": "Medium",
      "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n \nExample 1:\n\n\n<strong>Input:</strong> coins = [1,2,5], amount = 11\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> 11 = 5 + 5 + 1\n\n\nExample 2:\n\n\n<strong>Input:</strong> coins = [2], amount = 3\n<strong>Output:</strong> -1\n\n\nExample 3:\n\n\n<strong>Input:</strong> coins = [1], amount = 0\n<strong>Output:</strong> 0\n\n\n \nConstraints:\n\n\n\t1 <= coins.length <= 12\n\t1 <= coins[i] <= 231 - 1\n\t0 <= amount <= 104",
      "examples": [
        {
          "input": "[1,2,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "11",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function coinChange(input) {\n  // Your code here\n}",
        "python": "def coin_change(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(S^N) | Space O(N)\n * https://leetcode.com/problems/coin-change/\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = (coins, amount, coin = 0) => {\n    const isBaseCase1 = amount === 0;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = !(coin < coins.length && 0 < amount);\n    if (isBaseCase2) return -1;\n\n    return dfs(coins, amount, coin); /* Time O(S^N) | Space O(N) */\n};\n\nvar dfs = (coins, amount, coin) => {\n    let [max, minCost] = [amount / coins[coin], Infinity];\n\n    for (let num = 0; num <= max; num++) {\n        /* Time O(N) */\n        const caUpdate = num * coins[coin] <= amount;\n        if (!caUpdate) continue;\n\n        const product = num * coins[coin];\n        const difference = amount - product;\n        const min = coinChange(\n            coins,\n            difference,\n            coin + 1,\n        ); /* Time O(S^N) | Space O(N) */\n        const cost = min + num;\n\n        const isSentinel = min === -1;\n        if (isSentinel) continue;\n\n        minCost = Math.min(minCost, cost);\n    }\n\n    return minCost !== Infinity ? minCost : -1;\n};\n\n/**\n * DP - Top Down\n * Array - Memoization\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/coin-change/\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = (coins, amount, memo = initMemo(amount)) => {\n    const isBaseCase1 = amount < 0;\n    if (isBaseCase1) return -1;\n\n    const isBaseCase2 = amount < 1;\n    if (isBaseCase2) return 0;\n\n    const isBaseCase3 = memo[amount - 1] !== 0;\n    if (isBaseCase3) return memo[amount - 1];\n\n    return dfs(coins, amount, memo); /* Time O(N) | Space O(N) */\n};\n\nconst initMemo = (amount) => Array(amount).fill(0);\n\nvar dfs = (coins, amount, memo, min = Infinity) => {\n    for (const coin of coins) {\n        /* Time O(N) */\n        const cost = coinChange(\n            coins,\n            amount - coin,\n            memo,\n        ); /* Time O(N) | Space O(N) */\n\n        const canUpdate = 0 <= cost && cost < min;\n        if (!canUpdate) continue;\n\n        min = cost + 1;\n    }\n\n    memo[amount - 1] = min !== Infinity ? min : -1;\n\n    return memo[amount - 1];\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/coin-change/\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = (coins, amount) => {\n    const tabu = initTabu(amount);\n\n    for (let _amount = 1; _amount <= amount; _amount++) {\n        /* Time O(N) */\n        for (let coin = 0; coin < coins.length; coin++) {\n            /* Time O(N) */\n            const canUpdate = coins[coin] <= _amount;\n            if (!canUpdate) continue;\n\n            const difference = _amount - coins[coin];\n            const min = tabu[difference] + 1;\n\n            tabu[_amount] = Math.min(tabu[_amount], min); /* Space O(N) */\n        }\n    }\n\n    return tabu[amount] <= amount ? tabu[amount] : -1;\n};\n\nconst initTabu = (amount) => {\n    const tabu = Array(amount + 1).fill(amount + 1);\n\n    tabu[0] = 0;\n\n    return tabu;\n};\n",
        "python": "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        dp = [amount + 1] * (amount + 1)\n        dp[0] = 0\n\n        for a in range(1, amount + 1):\n            for c in coins:\n                if a - c >= 0:\n                    dp[a] = min(dp[a], 1 + dp[a - c])\n        return dp[amount] if dp[amount] != amount + 1 else -1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Coin Change",
          "explanation": "Coin Change is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(S^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "maximum-product-subarray",
      "title": "Maximum Product Subarray",
      "difficulty": "Medium",
      "description": "Given an integer array nums, find a subarray that has the largest product, and return the product.\n\nThe test cases are generated so that the answer will fit in a 32-bit integer.\n\nNote that the product of an array with a single element is the value of that element.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [2,3,-2,4]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> [2,3] has the largest product 6.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [-2,0,-1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The result cannot be 2, because [-2,-1] is not a subarray.\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 2 * 104\n\t-10 <= nums[i] <= 10\n\tThe product of any subarray of nums is guaranteed to fit in a 32-bit integer.",
      "examples": [
        {
          "input": "[2,3,-2,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[-2,0,-1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function maximumProductSubarray(input) {\n  // Your code here\n}",
        "python": "def maximum_product_subarray(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - Linear Search\n * Time O(N^2) | Space O(1)\n * https://leetcode.com/problems/maximum-product-subarray/\n * @param {number[]} nums\n * @return {number}\n */\nvar maxProduct = (nums) => {\n    const isEmpty = nums.length === 0;\n    if (isEmpty) return 0;\n\n    return linearSearch(nums); /* Time O(N * N) */\n};\n\nconst linearSearch = (nums, max = nums[0]) => {\n    for (let index = 0; index < nums.length; index++) {\n        /* Time O(N) */\n        max = getMax(nums, index, max); /* Time O(N) */\n    }\n\n    return max;\n};\n\nconst getMax = (nums, index, max, product = 1) => {\n    for (let num = index; num < nums.length; num++) {\n        /* Time O(N) */\n        product *= nums[num];\n        max = Math.max(max, product);\n    }\n\n    return max;\n};\n\n/**\n * Greedy - product\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/maximum-product-subarray/\n * @param {number[]} nums\n * @return {number}\n */\nvar maxProduct = (nums) => {\n    const isEmpty = nums.length === 0;\n    if (isEmpty) return 0;\n\n    return greedySearch(nums); /* Time O(N) */\n};\n\nconst greedySearch = (nums) => {\n    let min = (max = product = nums[0]);\n\n    for (let num = 1; num < nums.length; num++) {\n        /* Time O(N) */\n        const [minProduct, maxProduct] = [min * nums[num], max * nums[num]];\n\n        min = Math.min(maxProduct, minProduct, nums[num]);\n        max = Math.max(maxProduct, minProduct, nums[num]);\n\n        product = Math.max(product, max);\n    }\n\n    return product;\n};\n",
        "python": "class Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        # O(n)/O(1) : Time/Memory\n        res = nums[0]\n        curMin, curMax = 1, 1\n\n        for n in nums:\n\n            tmp = curMax * n\n            curMax = max(n * curMax, n * curMin, n)\n            curMin = min(tmp, n * curMin, n)\n            res = max(res, curMax)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Maximum Product Subarray",
          "explanation": "Maximum Product Subarray is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "word-break",
      "title": "Word Break",
      "difficulty": "Medium",
      "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"leetcode\", wordDict = [\"leet\",\"code\"]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Return true because \"leetcode\" can be segmented as \"leet code\".\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Return true because \"applepenapple\" can be segmented as \"apple pen apple\".\nNote that you are allowed to reuse a dictionary word.\n\n\nExample 3:\n\n\n<strong>Input:</strong> s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 300\n\t1 <= wordDict.length <= 1000\n\t1 <= wordDict[i].length <= 20\n\ts and wordDict[i] consist of only lowercase English letters.\n\tAll the strings of wordDict are unique.",
      "examples": [
        {
          "input": "\"leetcode\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"leet\",\"code\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"applepenapple\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function wordBreak(input) {\n  // Your code here\n}",
        "python": "def word_break(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Hash Set - Distinct Keys\n * Time O(2^N) | Space O(N)\n * https://leetcode.com/problems/word-break/\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = (s, wordDict) => {\n    const wordSet = new Set(wordDict); /* Time O(N)   | Space O(N) */\n\n    return canBreak(s, wordSet); /* Time O(2^N) | Space O(N) */\n};\n\nvar canBreak = (s, wordSet, start = 0) => {\n    const isBaseCase = start === s.length;\n    if (isBaseCase) return true;\n\n    return dfs(s, wordSet, start); /* Time O(2^N) | Space O(N) */\n};\n\nvar dfs = (s, wordSet, start) => {\n    for (let end = start + 1; end <= s.length; end++) {\n        /* Time O(N) */\n        const word = s.slice(start, end); /* Time O(N)   | Space O(N) */\n\n        const _canBreak =\n            wordSet.has(word) &&\n            canBreak(s, wordSet, end); /* Time O(2^N) | Space O(N) */\n        if (_canBreak) return true;\n    }\n\n    return false;\n};\n\n/**\n * DP - Top Down\n * Array - Memoization\n * Hash Set - Distinct Keys\n * Time O(N^3) | Space O(N)\n * https://leetcode.com/problems/word-break/\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = (s, wordDict) => {\n    const wordSet = new Set(wordDict); /* Time O(N)         | Space O(N) */\n    const memo = new Array(s.length).fill(\n        null,\n    ); /*                   | Space O(N) */\n    const start = 0;\n\n    return canBreak(\n        s,\n        wordSet,\n        start,\n        memo,\n    ); /* Time O(N * N * N) | Space O(N) */\n};\n\nvar canBreak = (s, wordSet, start, memo) => {\n    const isBaseCase1 = s.length === start;\n    if (isBaseCase1) return true;\n\n    const hasSeen = memo[start] !== null;\n    if (hasSeen) return memo[start];\n\n    return dfs(s, wordSet, start, memo); /* Time O(N * N * N) | Space O(N) */\n};\n\nvar dfs = (s, wordSet, start, memo) => {\n    for (let end = start + 1; end <= s.length; end++) {\n        /* Time O(N) */\n        const word = s.slice(start, end); /* Time O(N) | Space O(N) */\n\n        const _canBreak =\n            wordSet.has(word) &&\n            canBreak(s, wordSet, end, memo); /* Time O(N * N) */\n        if (_canBreak) {\n            memo[start] = true;\n            return true;\n        }\n    }\n\n    memo[start] = false;\n    return false;\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Hash Set - Distinct Keys\n * Time O(N^3) | Space O(N)\n * https://leetcode.com/problems/word-break/\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = (s, wordDict) => {\n    const wordSet = new Set(wordDict); /* Time O(N)         | Space O(N) */\n    const tabu = initTabu(s); /*                   | Space O(N) */\n\n    canBreak(s, wordSet, tabu); /* Time O(N * N * N) | Space O(N) */\n\n    return tabu[s.length];\n};\n\nconst initTabu = (s) => {\n    const tabu = new Array(s.length + 1).fill(false); /* Space O(N) */\n\n    tabu[0] = true;\n\n    return tabu;\n};\n\nvar canBreak = (s, wordSet, tabu) => {\n    for (let end = 1; end <= s.length; end++) {\n        /* Time O(N) */\n        checkWord(s, wordSet, end, tabu); /* Time O(N * N) | Space O(N) */\n    }\n};\n\nvar checkWord = (s, wordSet, end, tabu) => {\n    for (let start = 0; start < end; start++) {\n        /* Time O(N) */\n        const word = s.slice(start, end); /* Time O(N) | Space O(N) */\n\n        const canBreak = tabu[start] && wordSet.has(word);\n        if (!canBreak) continue;\n\n        tabu[end] = true;\n\n        return;\n    }\n};\n\n/**\n * Tree Traversal - BFS\n * Queue - Level Order Space O(WIDTH)\n * Hash Set - Distinct Keys\n * Array - Seen\n * Time O(N^3) | Space O(N)\n * https://leetcode.com/problems/word-break/\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = function (s, wordDict) {\n    const wordSet = new Set(wordDict); /* Time O(N)         | Space O(N) */\n    const queue = new Queue([0]); /*                   | Space O(N) */\n    const seen = new Array(s.length).fill(\n        false,\n    ); /*                   | Space O(N) */\n\n    return bfs(\n        queue,\n        s,\n        wordSet,\n        seen,\n    ); /* Time O(N * N * N) | Space O(N + WIDTH) */\n};\n\nconst bfs = (queue, s, wordSet, seen) => {\n    while (!queue.isEmpty()) {\n        for (let level = queue.size() - 1; 0 <= level; level--) {\n            /* Time O(N) */\n            if (canWordBreak(queue, s, wordSet, seen))\n                return true; /* Time O(N * N) | Space O(N + WIDTH) */\n        }\n    }\n\n    return false;\n};\n\nvar canWordBreak = (queue, s, wordSet, seen) => {\n    const start = queue.dequeue();\n\n    const hasSeen = seen[start];\n    if (hasSeen) return false;\n\n    if (canBreak(queue, s, start, wordSet))\n        return true; /* Time O(N * N) | Space O(N + WIDTH) */\n\n    seen[start] = true; /*               | Space O(N) */\n    return false;\n};\n\nvar canBreak = (queue, s, start, wordSet) => {\n    for (let end = start + 1; end <= s.length; end++) {\n        /* Time O(N) */\n        const word = s.slice(start, end); /* Time O(N) | Space O(N) */\n\n        if (!wordSet.has(word)) continue;\n\n        queue.enqueue(end); /*           | Space O(WIDTH) */\n\n        const _canBreak = end === s.length;\n        if (_canBreak) return true;\n    }\n\n    return false;\n};\n",
        "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n\n        dp = [False] * (len(s) + 1)\n        dp[len(s)] = True\n\n        for i in range(len(s) - 1, -1, -1):\n            for w in wordDict:\n                if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:\n                    dp[i] = dp[i + len(w)]\n                if dp[i]:\n                    break\n\n        return dp[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Word Break",
          "explanation": "Word Break is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "longest-increasing-subsequence",
      "title": "Longest Increasing Subsequence",
      "difficulty": "Medium",
      "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [10,9,2,5,3,7,101,18]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [0,1,0,3,2,3]\n<strong>Output:</strong> 4\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [7,7,7,7,7,7,7]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 2500\n\t-104 <= nums[i] <= 104\n\n\n \nFollow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?",
      "examples": [
        {
          "input": "[10,9,2,5,3,7,101,18]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,1,0,3,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[7,7,7,7,7,7,7]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestIncreasingSubsequence(input) {\n  // Your code here\n}",
        "python": "def longest_increasing_subsequence(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N^2) | Space O(N)\n * https://leetcode.com/problems/longest-increasing-subsequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = (nums) => {\n    const tabu = initTabu(nums); /*               | Space O(N) */\n\n    linearSearch(nums, tabu); /* Time O(N * N) | Space O(N)*/\n\n    return Math.max(...tabu); /* Time O(N) */\n};\n\nconst initTabu = (nums) => new Array(nums.length).fill(1);\n\nvar linearSearch = (nums, tabu) => {\n    for (let right = 1; right < nums.length; right++) {\n        /* Time O(N) */\n        for (let left = 0; left < right; left++) {\n            /* Time O(N) */\n            const canUpdate = nums[left] < nums[right];\n            if (!canUpdate) continue;\n\n            const [_left, _right] = [tabu[left] + 1, tabu[right]];\n            tabu[right] = Math.max(_right, _left); /* Space O(N) */\n        }\n    }\n};\n\n/**\n * Array - Subsequence\n * Time O(N^2) | Space O(N)\n * https://leetcode.com/problems/longest-increasing-subsequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = (nums) => {\n    const subsequence = linearSort(nums); /* Time O(N * N) | Space O(N) */\n\n    return subsequence.length;\n};\n\nvar linearSort = (nums, subsequence = []) => {\n    for (const num of nums) {\n        /* Time O(N) */\n        const max = subsequence[subsequence.length - 1];\n\n        const canAdd = max < num;\n        if (canAdd) {\n            subsequence.push(num);\n            continue;\n        } /* Space O(N) */\n\n        const index = getMax(subsequence, num); /* Time O(N) */\n\n        subsequence[index] = num;\n    }\n\n    return subsequence;\n};\n\nconst getMax = (subsequence, num, index = 0) => {\n    const isLess = () => subsequence[index] < num;\n    while (isLess()) index++; /* Time O(N) */\n\n    return index;\n};\n\n/**\n * Array - Subsequence\n * Time O(N * log(N)) | Space O(N)\n * https://leetcode.com/problems/longest-increasing-subsequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = (nums) => {\n    const subsequence = logarithmicSort(nums); /* Time O(N * log(N) */\n\n    return subsequence.length;\n};\n\nvar logarithmicSort = (nums, subsequence = []) => {\n    for (const num of nums) {\n        /* Time O(N) */\n        const max = subsequence[subsequence.length - 1];\n\n        const canAdd = max < num;\n        if (canAdd) {\n            subsequence.push(num);\n            continue;\n        } /* Space O(N) */\n\n        const index = binarySearch(num, subsequence); /* Time O(log(N)) */\n\n        subsequence[index] = num;\n    }\n\n    return subsequence;\n};\n\nconst binarySearch = (num, subsequence) => {\n    let [left, right] = [0, subsequence.length - 1];\n\n    while (left < right) {\n        /* Time O(log(N)) */\n        const mid = (left + right) >> 1;\n        const guess = subsequence[mid];\n\n        const isNumTarget = num === guess;\n        if (isNumTarget) return mid;\n\n        const isNumGreater = guess < num;\n        if (isNumGreater) left = mid + 1;\n\n        const isNumLess = num < guess;\n        if (isNumLess) right = mid;\n    }\n\n    return left;\n};\n",
        "python": "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        LIS = [1] * len(nums)\n\n        for i in range(len(nums) - 1, -1, -1):\n            for j in range(i + 1, len(nums)):\n                if nums[i] < nums[j]:\n                    LIS[i] = max(LIS[i], 1 + LIS[j])\n        return max(LIS)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Increasing Subsequence",
          "explanation": "Longest Increasing Subsequence is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "partition-equal-subset-sum",
      "title": "Partition Equal Subset Sum",
      "difficulty": "Medium",
      "description": "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [1,5,11,5]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> The array can be partitioned as [1, 5, 5] and [11].\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [1,2,3,5]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> The array cannot be partitioned into equal sum subsets.\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 200\n\t1 <= nums[i] <= 100",
      "examples": [
        {
          "input": "[1,5,11,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,3,5]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function partitionEqualSubsetSum(input) {\n  // Your code here\n}",
        "python": "def partition_equal_subset_sum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(N^2) | Space O(N)\n * https://leetcode.com/problems/partition-equal-subset-sum/\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canPartition = (nums) => {\n    const sum = getSum(nums); /* Time O(N) */\n    const subSetSum = sum / 2;\n\n    const isEven = sum % 2 === 0;\n    if (!isEven) return false;\n\n    const index = nums.length - 1;\n\n    return dfs(nums, index, subSetSum);\n};\n\nvar getSum = (nums, sum = 0) => {\n    for (const num of nums) sum += num; /* Time O(N) */\n\n    return sum;\n};\n\nvar dfs = (nums, index, subSetSum) => {\n    const isBaseCase1 = subSetSum === 0;\n    if (isBaseCase1) return true;\n\n    const isBaseCase2 = index === 0 || subSetSum < 0;\n    if (isBaseCase2) return false;\n\n    const difference = subSetSum - nums[index - 1];\n\n    const left = dfs(nums, index - 1, difference);\n    const right = dfs(nums, index - 1, subSetSum);\n\n    return left || right;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memo\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/partition-equal-subset-sum/\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canPartition = (nums) => {\n    const isEmpty = nums.length === 0;\n    if (isEmpty) return false;\n\n    const sum = getSum(nums); /* Time O(N) */\n\n    const isEven = sum % 2 === 0;\n    if (!isEven) return false;\n\n    const subSetSum = sum >> 1;\n    const memo = initMemo(nums, subSetSum); /*               | Space O(N * M) */\n    const index = nums.length - 1;\n\n    return dfs(\n        nums,\n        index,\n        subSetSum,\n        memo,\n    ); /* Time O(N * M) | Space O(N * M) */\n};\n\nvar initMemo = (nums, subSetSum) =>\n    new Array(nums.length + 1)\n        .fill() /* Space O(N) */\n        .map(() => new Array(subSetSum + 1).fill(null)); /* Space O(M) */\n\nvar dfs = (nums, index, subSetSum, memo) => {\n    const isBaseCase1 = subSetSum === 0;\n    if (isBaseCase1) return true;\n\n    const isBaseCase2 = index === 0 || subSetSum < 0;\n    if (isBaseCase2) return false;\n\n    const hasSeen = memo[index][subSetSum] !== null;\n    if (hasSeen) return memo[index][subSetSum];\n\n    const difference = subSetSum - nums[index - 1];\n\n    const left = dfs(nums, index - 1, difference, memo);\n    const right = dfs(nums, index - 1, subSetSum, memo);\n\n    memo[index][subSetSum] = left || right;\n    return memo[index][subSetSum];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/partition-equal-subset-sum/\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canPartition = (nums) => {\n    const isEmpty = nums.length === 0;\n    if (isEmpty) return false;\n\n    const sum = getSum(nums); /* Time O(N) */\n\n    const isEven = sum % 2 === 0;\n    if (!isEven) return false;\n\n    const subSetSum = sum >> 1;\n    const tabu = initTabu(nums, subSetSum); /*            | Space O(N * M) */\n\n    search(nums, subSetSum, tabu);\n\n    return tabu[nums.length][subSetSum];\n};\n\nvar getSum = (nums, sum = 0) => {\n    for (const num of nums) {\n        sum += num;\n    } /* Time O(N) */\n\n    return sum;\n};\n\nvar initTabu = (nums, subSetSum) => {\n    const tabu = new Array(nums.length + 1)\n        .fill() /* Space O(N) */\n        .map(() => new Array(subSetSum + 1).fill(false)); /* Space O(M) */\n\n    tabu[0][0] = true; /* Space O(N * M) */\n\n    return tabu;\n};\n\nvar search = (nums, subSetSum, tabu) => {\n    for (let numIndex = 1; numIndex <= nums.length; numIndex++) {\n        /* Time O(N) */\n        update(\n            nums,\n            numIndex,\n            subSetSum,\n            tabu,\n        ); /* Time O(N) | Space O(N * M) */\n    }\n};\n\nvar update = (nums, numIndex, subSetSum, tabu) => {\n    const num = numIndex - 1;\n    const prevNum = nums[num];\n\n    for (let subSet = 0; subSet <= subSetSum; subSet++) {\n        /* Time O(M) */\n        const isNumGreater = subSet < prevNum;\n\n        tabu[numIndex][subSet] = isNumGreater /* Space O(N * M) */\n            ? tabu[num][subSet]\n            : tabu[num][subSet] || tabu[num][subSet - prevNum];\n    }\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N * M) | Space O(M)\n * https://leetcode.com/problems/partition-equal-subset-sum/\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canPartition = (nums) => {\n    const isEmpty = nums.length === 0;\n    if (isEmpty) return false;\n\n    const sum = getSum(nums); /* Time O(N) */\n\n    const isEven = sum % 2 === 0;\n    if (!isEven) return false;\n\n    const subSetSum = sum >> 1;\n    const tabu = initTabu(subSetSum); /*               | Space O(M) */\n\n    search(nums, subSetSum, tabu); /* Time O(N * M) | Space O(M) */\n\n    return tabu[subSetSum];\n};\n\nvar getSum = (nums, sum = 0) => {\n    for (const num of nums) {\n        sum += num;\n    } /* Time O(N) */\n\n    return sum;\n};\n\nvar initTabu = (subSetSum) => {\n    const tabu = new Array(subSetSum + 1).fill(false); /* Space O(M) */\n\n    tabu[0] = true; /* Space O(M) */\n\n    return tabu;\n};\n\nvar search = (nums, subSetSum, tabu) => {\n    for (const num of nums) {\n        /* Time O(N) */\n        update(num, subSetSum, tabu); /* Time O(M) | Space O(M) */\n    }\n};\n\nvar update = (num, subSetSum, tabu) => {\n    for (let subSet = subSetSum; num <= subSet; subSet--) {\n        /* Time O(M) */\n        const difference = subSet - num;\n\n        tabu[subSet] |= tabu[difference]; /* Space O(M) */\n    }\n};\n",
        "python": "class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        if sum(nums) % 2:\n            return False\n\n        dp = set()\n        dp.add(0)\n        target = sum(nums) // 2\n\n        for i in range(len(nums) - 1, -1, -1):\n            nextDP = set()\n            for t in dp:\n                if (t + nums[i]) == target:\n                    return True\n                nextDP.add(t + nums[i])\n                nextDP.add(t)\n            dp = nextDP\n        return False\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Partition Equal Subset Sum",
          "explanation": "Partition Equal Subset Sum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "tags": [
        "1-D DP"
      ],
      "hints": []
    },
    {
      "id": "unique-paths",
      "title": "Unique Paths",
      "difficulty": "Medium",
      "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\nThe test cases are generated so that the answer will be less than or equal to 2 * 109.\n\n \nExample 1:\n\n\n<strong>Input:</strong> m = 3, n = 7\n<strong>Output:</strong> 28\n\n\nExample 2:\n\n\n<strong>Input:</strong> m = 3, n = 2\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down\n\n\n \nConstraints:\n\n\n\t1 <= m, n <= 100",
      "examples": [
        {
          "input": "3",
          "output": "See problem description for expected output."
        },
        {
          "input": "7",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function uniquePaths(input) {\n  // Your code here\n}",
        "python": "def unique_paths(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^N) | Space O(HEIGHT)\n * https://leetcode.com/problems/unique-paths/\n * @param {number} m\n * @param {number} n\n * @return {number}\n */\nvar uniquePaths = (row, col) => {\n    const isBaseCase = row == 1 || col == 1;\n    if (isBaseCase) return 1;\n\n    return dfs(row, col); /* Time O(2^N) | Space O(HEIGHT) */\n};\n\nvar dfs = (row, col) => {\n    const left = uniquePaths(row - 1, col); /* Time O(2^N) | Space O(HEIGHT) */\n    const right = uniquePaths(row, col - 1); /* Time O(2^N) | Space O(HEIGHT) */\n\n    return left + right;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * https://leetcode.com/problems/unique-paths/\n * @param {number} m\n * @param {number} n\n * @return {number}\n */\nvar uniquePaths = (row, col, memo = getMemo(row, col)) => {\n    const isBaseCase = row === 1 || col === 1;\n    if (isBaseCase) return 1;\n\n    const hasSeen = memo[row][col] !== 0;\n    if (hasSeen) return memo[row][col];\n\n    return dfs(\n        row,\n        col,\n        memo,\n    ); /* Time O(ROWS * COLS) | Space O((ROWS * COLS) + HEIGHT) */\n};\n\nvar getMemo = (row, col) =>\n    new Array(row + 1)\n        .fill() /* Time O(ROWS)| Space O(ROWS) */\n        .map(() =>\n            new Array(col + 1).fill(0),\n        ); /* Time O(COLS)| Space O(COLS) */\n\nvar dfs = (row, col, memo) => {\n    const left = uniquePaths(\n        row - 1,\n        col,\n        memo,\n    ); /* Time O(ROWS * COLS) | Space O(HEIGHT) */\n    const right = uniquePaths(\n        row,\n        col - 1,\n        memo,\n    ); /* Time O(ROWS * COLS) | Space O(HEIGHT) */\n\n    memo[row][col] =\n        left + right; /*                     | Space O(ROWS * COLS) */\n    return memo[row][col];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * https://leetcode.com/problems/unique-paths/\n * @param {number} row\n * @param {number} col\n * @return {number}\n */\nvar uniquePaths = (row, col) => {\n    const tabu = initTabu(\n        row,\n        col,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    search(row, col, tabu); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    return tabu[row - 1][col - 1];\n};\n\nvar search = (row, col, tabu) => {\n    for (let _row = 1; _row < row; _row++) {\n        /* Time O(ROWS)*/\n        for (let _col = 1; _col < col; _col++) {\n            /* Time O(COLS)*/\n            const left = tabu[_row - 1][_col];\n            const right = tabu[_row][_col - 1];\n\n            tabu[_row][_col] = left + right; /* Space O(ROWS * COLS) */\n        }\n    }\n};\n\nvar initTabu = (row, col) => {\n    const tabu = new Array(row)\n        .fill() /* Time O(ROWS)     | Space O(ROWS) */\n        .map(() => new Array(col).fill(0)); /* Time O(COLS) | Space O(COLS) */\n\n    for (let _row = 0; _row < row; _row++) {\n        /* Time O(ROWS) */\n        tabu[_row][0] = 1; /*              | Space O(ROWS * COLS) */\n    }\n\n    for (let _col = 0; _col < col; _col++) {\n        /* Time O(COLS) */\n        tabu[0][_col] = 1; /*              | Space O(ROWS * COLS) */\n    }\n\n    return tabu;\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(ROWS * COLS) | Space O(COLS)\n * https://leetcode.com/problems/unique-paths/\n * @param {number} m\n * @param {number} n\n * @return {number}\n */\nvar uniquePaths = (row, col) => {\n    const tabu = initTabu(col); /* Time O(COLS)        | Space O(COLS) */\n\n    search(row, col, tabu); /* Time O(ROWS * COLS) | Space O(COLS) */\n\n    return tabu[col - 1];\n};\n\nvar initTabu = (col) =>\n    new Array(col).fill(1); /* Time O(COLS) | Space O(COLS) */\n\nvar search = (row, col, tabu) => {\n    for (let _row = 1; _row < row; _row++) {\n        /* Time O(ROWS) */\n        for (let _col = 1; _col < col; _col++) {\n            /* Time O(COLS) */\n            const prev = tabu[_col - 1];\n\n            tabu[_col] += prev; /* Space O(COLS) */\n        }\n    }\n};\n",
        "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        row = [1] * n\n\n        for i in range(m - 1):\n            newRow = [1] * n\n            for j in range(n - 2, -1, -1):\n                newRow[j] = newRow[j + 1] + row[j]\n            row = newRow\n        return row[0]\n\n        # O(n * m) O(n)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Unique Paths",
          "explanation": "Unique Paths is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(HEIGHT)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "best-time-to-buy-and-sell-stock-with-cooldown",
      "title": "Best Time to Buy and Sell Stock with Cooldown",
      "difficulty": "Medium",
      "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n\n\n\tAfter you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n\n\nNote: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).\n\n \nExample 1:\n\n\n<strong>Input:</strong> prices = [1,2,3,0,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> transactions = [buy, sell, cooldown, buy, sell]\n\n\nExample 2:\n\n\n<strong>Input:</strong> prices = [1]\n<strong>Output:</strong> 0\n\n\n \nConstraints:\n\n\n\t1 <= prices.length <= 5000\n\t0 <= prices[i] <= 1000",
      "examples": [
        {
          "input": "[1,2,3,0,2]",
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
        "js": "function bestTimeToBuyAndSellStockWithCooldown(input) {\n  // Your code here\n}",
        "python": "def best_time_to_buy_and_sell_stock_with_cooldown(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Greedy - State Machine\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = (prices) => {\n    let [sold, held, reset] = [-Infinity, -Infinity, 0];\n\n    [sold, reset] = search(prices, sold, held, reset); /* Time O(N) */\n\n    return Math.max(sold, reset);\n};\n\nvar search = (prices, sold, held, reset) => {\n    for (const price of prices) {\n        /* Time O(N) */\n        const preSold = sold;\n\n        sold = held + price;\n        held = Math.max(held, reset - price);\n        reset = Math.max(reset, preSold);\n    }\n\n    return [sold, reset];\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N^2) | Space O(N)\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = (prices) => {\n    const tabu = initTabu(prices); /* Space O(N) */\n\n    search(prices, tabu); /* Time O(N * N) */\n\n    return tabu[0];\n};\n\nvar initTabu = (prices) => new Array(prices.length + 2).fill(0);\n\nvar search = (prices, tabu) => {\n    for (let i = prices.length - 1; 0 <= i; i--) {\n        /* Time O(N) */\n        const prev = buyAndSell(prices, i, tabu); /* Time O(N) */\n        const next = tabu[i + 1];\n\n        tabu[i] = Math.max(prev, next); /* Space O(N) */\n    }\n};\n\nconst buyAndSell = (prices, i, tabu, max = 0) => {\n    for (let sell = i + 1; sell < prices.length; sell++) {\n        /* Time O(N) */\n        const profit = prices[sell] - prices[i] + tabu[sell + 2];\n\n        max = Math.max(max, profit);\n    }\n\n    return max;\n};\n",
        "python": "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        # State: Buying or Selling?\n        # If Buy -> i + 1\n        # If Sell -> i + 2\n\n        dp = {}  # key=(i, buying) val=max_profit\n\n        def dfs(i, buying):\n            if i >= len(prices):\n                return 0\n            if (i, buying) in dp:\n                return dp[(i, buying)]\n\n            cooldown = dfs(i + 1, buying)\n            if buying:\n                buy = dfs(i + 1, not buying) - prices[i]\n                dp[(i, buying)] = max(buy, cooldown)\n            else:\n                sell = dfs(i + 2, not buying) + prices[i]\n                dp[(i, buying)] = max(sell, cooldown)\n            return dp[(i, buying)]\n\n        return dfs(0, True)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Best Time to Buy and Sell Stock with Cooldown",
          "explanation": "Best Time to Buy and Sell Stock with Cooldown is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "coin-change-ii",
      "title": "Coin Change II",
      "difficulty": "Medium",
      "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nThe answer is guaranteed to fit into a signed 32-bit integer.\n\n \nExample 1:\n\n\n<strong>Input:</strong> amount = 5, coins = [1,2,5]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> there are four ways to make up the amount:\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n\n\nExample 2:\n\n\n<strong>Input:</strong> amount = 3, coins = [2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> the amount of 3 cannot be made up just with coins of 2.\n\n\nExample 3:\n\n\n<strong>Input:</strong> amount = 10, coins = [10]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\t1 <= coins.length <= 300\n\t1 <= coins[i] <= 5000\n\tAll the values of coins are unique.\n\t0 <= amount <= 5000",
      "examples": [
        {
          "input": "5",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function coinChangeIi(input) {\n  // Your code here\n}",
        "python": "def coin_change_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^N) | Space O(N)\n * @param {number} amount\n * @param {number[]} coins\n * @return {number}\n */\nvar change = (amount, coins, n = coins.length) => {\n    const isBaseCase1 = amount === 0;\n    if (isBaseCase1) return 1;\n\n    const isBaseCase2 = n === 0;\n    if (isBaseCase2) return 0;\n\n    return dfs(amount, coins, n); /* Time O(2^N) | Space O(N) */\n};\n\nvar dfs = (amount, coins, n) => {\n    const isLess = amount < coins[n - 1];\n    if (isLess)\n        return change(amount, coins, n - 1); /* Time O(2^N) | Space O(N) */\n\n    const left = change(\n        amount - coins[n - 1],\n        coins,\n        n,\n    ); /* Time O(2^N) | Space O(N) */\n    const right = change(amount, coins, n - 1); /* Time O(2^N) | Space O(N) */\n\n    return left + right;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * AMOUNT) | Space O(N * AMOUNT)\n * https://leetcode.com/problems/coin-change-ii/\n * @param {number} amount\n * @param {number[]} coins\n * @return {number}\n */\nvar change = (\n    amount,\n    coins,\n    n = coins.length,\n    memo = initMemo(coins, amount),\n) => {\n    const isBaseCase1 = n === 0;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = amount === 0;\n    if (isBaseCase2) return 1;\n\n    const hasSeen = memo[n][amount] !== null;\n    if (hasSeen) return memo[n][amount];\n\n    return dfs(\n        amount,\n        coins,\n        n,\n        memo,\n    ); /* Time O(N * AMOUNT) | Space O((N * AMOUNT) + HEIGHT) */\n};\n\nvar initMemo = (coins, amount) =>\n    new Array(coins.length + 2)\n        .fill()\n        .map(() => new Array(amount + 2).fill(null));\n\nvar dfs = (amount, coins, n, memo) => {\n    const isLess = amount < coins[n - 1];\n    if (isLess) {\n        memo[n][amount] = change(\n            amount,\n            coins,\n            n - 1,\n            memo,\n        ); /* Time O(N * AMOUNT) | Space O(HEIGHT) */\n        return memo[n][amount];\n    }\n\n    const left = change(\n        amount - coins[n - 1],\n        coins,\n        n,\n        memo,\n    ); /* Time O(N * AMOUNT) | Space O(HEIGHT) */\n    const right = change(\n        amount,\n        coins,\n        n - 1,\n        memo,\n    ); /* Time O(N * AMOUNT) | Space O(HEIGHT) */\n\n    memo[n][amount] =\n        left + right; /*                    | Space O(N * AMOUNT) */\n    return memo[n][amount];\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N * AMOUNT) | Space O(N * AMOUNT)\n * https://leetcode.com/problems/coin-change-ii/\n */\nvar change = (amount, coins) => {\n    const tabu = initTabu(\n        amount,\n        coins,\n    ); /* Time O(N * AMOUNT) | Space O(N * AMOUNT) */\n\n    search(amount, coins, tabu); /* Time O(N * AMOUNT) | Space O(N * AMOUNT) */\n\n    return tabu[coins.length][amount];\n};\n\nvar initTabu = (amount, coins) => {\n    const tabu = new Array(coins.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(amount + 1).fill(0),\n        ); /* Time O(AMOUNT) | Space O(AMOUNT) */\n\n    tabu[0][0] = 1; /*          | Space O(N * AMOUNT) */\n\n    return tabu;\n};\n\nvar search = (amount, coins, tabu) => {\n    for (let coin = 1; coin <= coins.length; coin++) {\n        /* Time O(N)*/\n        tabu[coin][0] = 1; /* Space O(N * AMOUNT) */\n\n        for (let _amount = 1; _amount <= amount; _amount++) {\n            /* Time O(AMOUNT) */\n            tabu[coin][_amount] = tabu[coin - 1][_amount];\n\n            const canUpdate = 0 <= _amount - coins[coin - 1];\n            if (!canUpdate) continue;\n\n            const val = tabu[coin][_amount - coins[coin - 1]];\n            tabu[coin][_amount] += val; /* Space O(N * AMOUNT) */\n        }\n    }\n};\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N * AMOUNT) | Space O(AMOUNT)\n * https://leetcode.com/problems/coin-change-ii/\n * @param {number} amount\n * @param {number[]} coins\n * @return {number}\n */\nvar change = (amount, coins) => {\n    const tabu = initTabu(amount);\n\n    search(amount, coins, tabu);\n\n    return tabu[amount];\n};\n\nvar initTabu = (amount) => {\n    var tabu = new Array(amount + 1).fill(0);\n\n    tabu[0] = 1;\n\n    return tabu;\n};\n\nvar search = (amount, coins, tabu) => {\n    for (const coin of coins) {\n        for (let _amount = 0; _amount < amount + 1; _amount++) {\n            const canUpdate = coin <= _amount;\n            if (!canUpdate) continue;\n\n            tabu[_amount] += tabu[_amount - coin];\n        }\n    }\n};\n",
        "python": "class Solution:\n    def change(self, amount: int, coins: List[int]) -> int:\n        # MEMOIZATION\n        # Time: O(n*m)\n        # Memory: O(n*m)\n        cache = {}\n\n        def dfs(i, a):\n            if a == amount:\n                return 1\n            if a > amount:\n                return 0\n            if i == len(coins):\n                return 0\n            if (i, a) in cache:\n                return cache[(i, a)]\n\n            cache[(i, a)] = dfs(i, a + coins[i]) + dfs(i + 1, a)\n            return cache[(i, a)]\n\n        return dfs(0, 0)\n\n        # DYNAMIC PROGRAMMING\n        # Time: O(n*m)\n        # Memory: O(n*m)\n        dp = [[0] * (len(coins) + 1) for i in range(amount + 1)]\n        dp[0] = [1] * (len(coins) + 1)\n        for a in range(1, amount + 1):\n            for i in range(len(coins) - 1, -1, -1):\n                dp[a][i] = dp[a][i + 1]\n                if a - coins[i] >= 0:\n                    dp[a][i] += dp[a - coins[i]][i]\n        return dp[amount][0]\n\n        # DYNAMIC PROGRAMMING\n        # Time: O(n*m)\n        # Memory: O(n) where n = amount\n        dp = [0] * (amount + 1)\n        dp[0] = 1\n        for i in range(len(coins) - 1, -1, -1):\n            nextDP = [0] * (amount + 1)\n            nextDP[0] = 1\n\n            for a in range(1, amount + 1):\n                nextDP[a] = dp[a]\n                if a - coins[i] >= 0:\n                    nextDP[a] += nextDP[a - coins[i]]\n            dp = nextDP\n        return dp[amount]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Coin Change II",
          "explanation": "Coin Change II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "target-sum",
      "title": "Target Sum",
      "difficulty": "Medium",
      "description": "You are given an integer array nums and an integer target.\n\nYou want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.\n\n\n\tFor example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression \"+2-1\".\n\n\nReturn the number of different expressions that you can build, which evaluates to target.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [1,1,1,1,1], target = 3\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> There are 5 ways to assign symbols to make the sum of nums be target 3.\n-1 + 1 + 1 + 1 + 1 = 3\n+1 - 1 + 1 + 1 + 1 = 3\n+1 + 1 - 1 + 1 + 1 = 3\n+1 + 1 + 1 - 1 + 1 = 3\n+1 + 1 + 1 + 1 - 1 = 3\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [1], target = 1\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 20\n\t0 <= nums[i] <= 1000\n\t0 <= sum(nums[i]) <= 1000\n\t-1000 <= target <= 1000",
      "examples": [
        {
          "input": "[1,1,1,1,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
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
        "js": "function targetSum(input) {\n  // Your code here\n}",
        "python": "def target_sum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^N) | Space O(N)\n * https://leetcode.com/problems/target-sum/\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findTargetSumWays = (nums, target, index = 0, sum = 0) => {\n    const isBaseCase = index === nums.length;\n    if (isBaseCase) {\n        const isTarget = sum === target;\n        if (isTarget) return 1;\n\n        return 0;\n    }\n\n    return dfs(nums, target, index, sum); /* Time O(2^N) | Space O(HEIGHT) */\n};\n\nvar dfs = (nums, target, index, sum) => {\n    const left = findTargetSumWays(\n        nums,\n        target,\n        index + 1,\n        sum + nums[index],\n    ); /* Time O(2^N) | Space O(HEIGHT) */\n    const right = findTargetSumWays(\n        nums,\n        target,\n        index + 1,\n        sum - nums[index],\n    ); /* Time O(2^N) | Space O(HEIGHT) */\n\n    return left + right;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/target-sum/\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findTargetSumWays = (nums, target) => {\n    const total = nums.reduce((sum, num) => sum + num, 0); /* Time O(N) */\n\n    return calculate(\n        nums,\n        target,\n        total,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar initMemo = (nums, total) =>\n    new Array(nums.length)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array((total + 1) << 1).fill(null),\n        ); /* Time O(M) | Space O(M) */\n\nconst calculate = (\n    nums,\n    target,\n    total,\n    index = 0,\n    sum = 0,\n    memo = initMemo(nums, total),\n) => {\n    const isBaseCase = index === nums.length;\n    if (isBaseCase) {\n        const isTarget = sum === target;\n        if (isTarget) return 1;\n\n        return 0;\n    }\n\n    const hasSeen = memo[index][sum + total] != null;\n    if (hasSeen) return memo[index][sum + total];\n\n    return dfs(\n        nums,\n        target,\n        total,\n        index,\n        sum,\n        memo,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar dfs = (nums, target, total, index, sum, memo) => {\n    const left = calculate(\n        nums,\n        target,\n        total,\n        index + 1,\n        sum + nums[index],\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n    const right = calculate(\n        nums,\n        target,\n        total,\n        index + 1,\n        sum - nums[index],\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n\n    memo[index][sum + total] =\n        left + right; /*               | Space O(N * M) */\n    return memo[index][sum + total];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/target-sum/\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findTargetSumWays = (nums, target) => {\n    const total = nums.reduce((sum, num) => sum + num, 0); /* Time O(N) */\n    const tabu = initTabu(nums, total); /* Time O(N * M) | Space O(N * M) */\n\n    search(nums, total, tabu); /* Time O(N * M) | Space O(N * M) */\n\n    return Math.abs(target) <= total\n        ? tabu[nums.length - 1][target + total]\n        : 0;\n};\n\nvar initTabu = (nums, total) => {\n    const tabu = new Array(nums.length)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array((total + 1) << 1).fill(0),\n        ); /* Time O(M) | Space O(M) */\n    const [left, right] = [total + nums[0], total - nums[0]];\n\n    tabu[0][left] = 1; /*          | Space O(N * M) */\n    tabu[0][right] += 1; /*          | Space O(N * M) */\n\n    return tabu;\n};\n\nvar search = (nums, total, tabu) => {\n    for (let i = 1; i < nums.length; i++) {\n        /* Time O(N) */\n        for (let sum = -total; sum <= total; sum++) {\n            /* Time O(M) */\n            const isInvalid = tabu[i - 1][sum + total] <= 0;\n            if (isInvalid) continue;\n\n            const dpSum = tabu[i - 1][sum + total];\n            const left = sum + nums[i] + total;\n            const right = sum - nums[i] + total;\n\n            tabu[i][left] += dpSum; /* Space O(N * M) */\n            tabu[i][right] += dpSum; /* Space O(N * M) */\n        }\n    }\n};\n\n/**\n * DP - Top Down\n * Array - Tabulation\n * Time O(N * M) | Space O(M)\n * https://leetcode.com/problems/target-sum/\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar findTargetSumWays = (nums, target) => {\n    const total = nums.reduce((sum, num) => sum + num, 0); /* Time O(N) */\n    let tabu = getTabu(nums, total); /* Time O(M)     | Space O(M) */\n\n    tabu = search(nums, total, tabu); /* Time O(N * M) | Space O(M) */\n\n    return Math.abs(target) <= total ? tabu[target + total] : 0;\n};\n\nvar initTabu = (total) =>\n    new Array((total + 1) << 1).fill(0); /* Time O(M) | Space O(M) */\n\nvar getTabu = (nums, total) => {\n    const tabu = initTabu(total); /* Time O(M) | Space O(M) */\n    const [left, right] = [total + nums[0], total - nums[0]];\n\n    tabu[left] = 1; /*           | Space O(M) */\n    tabu[right] += 1; /*           | Space O(M) */\n\n    return tabu;\n};\n\nvar search = (nums, total, tabu) => {\n    for (let i = 1; i < nums.length; i++) {\n        /* Time O(N) */\n        const num = nums[i];\n        const temp = initTabu(total); /* Time O(M) | Space O(M) */\n\n        tabu = update(num, total, tabu, temp); /* Time O(M) | Space O(M) */\n    }\n\n    return tabu;\n};\n\nvar update = (num, total, tabu, temp) => {\n    for (let sum = -total; sum <= total; sum++) {\n        /* Time O(M) */\n        const isInvalid = tabu[sum + total] <= 0;\n        if (isInvalid) continue;\n\n        const dpSum = tabu[sum + total];\n        const left = sum + num + total;\n        const right = sum - num + total;\n\n        temp[left] += dpSum; /* Space O(M) */\n        temp[right] += dpSum; /* Space O(M) */\n    }\n\n    return temp;\n};\n",
        "python": "class Solution:\n    def findTargetSumWays(self, nums: List[int], target: int) -> int:\n        dp = {}  # (index, total) -> # of ways\n\n        def backtrack(i, total):\n            if i == len(nums):\n                return 1 if total == target else 0\n            if (i, total) in dp:\n                return dp[(i, total)]\n\n            dp[(i, total)] = backtrack(i + 1, total + nums[i]) + backtrack(\n                i + 1, total - nums[i]\n            )\n            return dp[(i, total)]\n\n        return backtrack(0, 0)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Target Sum",
          "explanation": "Target Sum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "interleaving-string",
      "title": "Interleaving String",
      "difficulty": "Medium",
      "description": "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.\n\nAn interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:\n\n\n\ts = s1 + s2 + ... + sn\n\tt = t1 + t2 + ... + tm\n\t|n - m| <= 1\n\tThe interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...\n\n\nNote: a + b is the concatenation of strings a and b.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> One way to obtain s3 is:\nSplit s1 into s1 = \"aa\" + \"bc\" + \"c\", and s2 into s2 = \"dbbc\" + \"a\".\nInterleaving the two splits, we get \"aa\" + \"dbbc\" + \"bc\" + \"a\" + \"c\" = \"aadbbcbcac\".\nSince s3 can be obtained by interleaving s1 and s2, we return true.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Notice how it is impossible to interleave s2 with any other string to obtain s3.\n\n\nExample 3:\n\n\n<strong>Input:</strong> s1 = \"\", s2 = \"\", s3 = \"\"\n<strong>Output:</strong> true\n\n\n \nConstraints:\n\n\n\t0 <= s1.length, s2.length <= 100\n\t0 <= s3.length <= 200\n\ts1, s2, and s3 consist of lowercase English letters.\n\n\n \nFollow up: Could you solve it using only O(s2.length) additional memory space?",
      "examples": [
        {
          "input": "\"aabcc\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"dbbca\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"aadbbcbcac\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function interleavingString(input) {\n  // Your code here\n}",
        "python": "def interleaving_string(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^(N + M)) | Space O(N + M)\n * https://leetcode.com/problems/interleaving-string/\n * @param {string} s1\n * @param {string} s2\n * @param {string} s3\n * @return {boolean}\n */\nvar isInterleave = (s1, s2, s3, i = 0, j = 0, res = '') => {\n    const isBaseCase1 = s3.length !== s1.length + s2.length;\n    if (isBaseCase1) return false;\n\n    const isBaseCase2 = res === s3 && i == s1.length && j == s2.length;\n    if (isBaseCase2) return true;\n\n    return dfs(s1, s2, s3, i, j, res); /* Time O(2^(N + M)) | Space O(N + M) */\n};\n\nvar dfs = (s1, s2, s3, i, j, res, ans = false) => {\n    const hasLeft = i < s1.length;\n    if (hasLeft)\n        ans |= isInterleave(\n            s1,\n            s2,\n            s3,\n            i + 1,\n            j,\n            `${res}${s1[i]}`,\n        ); /* Time O(2^(N + M)) | Space O(N) */\n\n    const hasRight = j < s2.length;\n    if (hasRight)\n        ans |= isInterleave(\n            s1,\n            s2,\n            s3,\n            i,\n            j + 1,\n            `${res}${s2[j]}`,\n        ); /* Time O(2^(N + M)) | Space O(M) */\n\n    return ans;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/interleaving-string/\n * @param {string} s1\n * @param {string} s2\n * @param {string} s3\n * @return {boolean}\n */\nvar isInterleave = (\n    s1,\n    s2,\n    s3,\n    i = 0,\n    j = 0,\n    k = 0,\n    memo = initMemo(s1, s2),\n) => {\n    const isBaseCase1 = s3.length !== s1.length + s2.length;\n    if (isBaseCase1) return false;\n\n    const isBaseCase2 = i === s1.length;\n    if (isBaseCase2)\n        return s2.slice(j) === s3.slice(k); /* Time O(M + K) | Space O(M + K) */\n\n    const isBaseCase3 = j === s2.length;\n    if (isBaseCase3)\n        return s1.slice(i) === s3.slice(k); /* Time O(N + K) | Space O(N + K) */\n\n    const hasSeen = memo[i][j] !== null;\n    if (hasSeen) return memo[i][j];\n\n    return dfs(\n        s1,\n        s2,\n        s3,\n        i,\n        j,\n        k,\n        memo,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar initMemo = (s1, s2) =>\n    new Array(s1.length)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(s2.length).fill(null),\n        ); /* Time O(M) | Space O(M) */\n\nvar dfs = (s1, s2, s3, i, j, k, memo) => {\n    const left =\n        s3[k] === s1[i] &&\n        isInterleave(\n            s1,\n            s2,\n            s3,\n            i + 1,\n            j,\n            k + 1,\n            memo,\n        ); /* Time O(N) | Space O(HEIGHT) */\n    const right =\n        s3[k] === s2[j] &&\n        isInterleave(\n            s1,\n            s2,\n            s3,\n            i,\n            j + 1,\n            k + 1,\n            memo,\n        ); /* Time O(M) | Space O(HEIGHT) */\n\n    memo[i][j] = left || right; /*           | Space O(N * M) */\n    return memo[i][j];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/interleaving-string/\n * @param {string} s1\n * @param {string} s2\n * @param {string} s3\n * @return {boolean}\n */\nvar isInterleave = (s1, s2, s3) => {\n    const isBaseCase = s3.length !== s1.length + s2.length;\n    if (isBaseCase) return false;\n\n    const tabu = initTabu(s1, s2); /* Time O(N * M) | Space O(N * M) */\n\n    search(s1, s2, s3, tabu); /* Time O(N * M) | Space O(N * M) */\n\n    return tabu[s1.length][s2.length];\n};\n\nvar initTabu = (s1, s2) =>\n    new Array(s1.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(s2.length + 1).fill(null),\n        ); /* Time O(M) | Space O(M) */\n\nvar search = (s1, s2, s3, tabu) => {\n    const [rows, cols] = [s1.length, s2.length];\n\n    for (let row = 0; row <= rows; row++) {\n        /* Time O(N) */\n        for (let col = 0; col <= cols; col++) {\n            /* Time O(M) */\n            tabu[row][col] =\n                /* Space O(N * M) */\n                hasMatch(s1, s2, s3, row, col, tabu);\n        }\n    }\n};\n\nvar hasMatch = (s1, s2, s3, i, j, tabu) => {\n    const isBaseCase1 = i === 0 && j === 0;\n    if (isBaseCase1) return true;\n\n    const isBaseCase2 = i === 0;\n    if (isBaseCase2) return getRight(i, j, s2, s3, tabu);\n\n    const isBaseCase3 = j === 0;\n    if (isBaseCase3) return getLeft(i, j, s1, s3, tabu);\n\n    const left = getLeft(i, j, s1, s3, tabu);\n    const right = getRight(i, j, s2, s3, tabu);\n\n    return left || right;\n};\n\nvar getLeft = (i, j, s1, s3, tabu) =>\n    (tabu[i - 1][j] && s1[i - 1]) === s3[i + j - 1];\n\nvar getRight = (i, j, s2, s3, tabu) =>\n    (tabu[i][j - 1] && s2[j - 1]) === s3[i + j - 1];\n\n/**\n * DP - Bottom Up\n * Array - Tabulation\n * Time O(N * M) | Space O(M)\n * https://leetcode.com/problems/interleaving-string/\n * @param {string} s1\n * @param {string} s2\n * @param {string} s3\n * @return {boolean}\n */\nvar isInterleave = (s1, s2, s3) => {\n    const isBaseCase = s3.length !== s1.length + s2.length;\n    if (isBaseCase) return false;\n\n    const tabu = initTabu(s2); /* Time O(M)     | Space O(M) */\n\n    search(s1, s2, s3, tabu); /* Time O(N * M) | Space O(M) */\n\n    return tabu[s2.length];\n};\n\nvar initTabu = (s2) =>\n    new Array(s2.length + 1).fill(false); /* Time O(M) | Space O(M) */\n\nvar search = (s1, s2, s3, tabu) => {\n    const [rows, cols] = [s1.length, s2.length];\n\n    for (let row = 0; row <= rows; row++) {\n        /* Time O(N)*/\n        for (let col = 0; col <= cols; col++) {\n            /* Time O(M)*/\n            tabu[col] = /* Space O(M)*/ hasMatch(s1, s2, s3, row, col, tabu);\n        }\n    }\n};\n\nvar hasMatch = (s1, s2, s3, i, j, tabu) => {\n    const isBaseCase1 = i === 0 && j === 0;\n    if (isBaseCase1) return true;\n\n    const isBaseCase2 = i === 0;\n    if (isBaseCase2) return getRight(i, j, s2, s3, tabu);\n\n    const isBaseCase3 = j === 0;\n    if (isBaseCase3) return getLeft(i, j, s1, s3, tabu);\n\n    return getLeft(i, j, s1, s3, tabu) || getRight(i, j, s2, s3, tabu);\n};\n\nvar getLeft = (i, j, s1, s3, tabu) => tabu[j] && s1[i - 1] === s3[i + j - 1];\n\nvar getRight = (i, j, s2, s3, tabu) =>\n    tabu[j - 1] && s2[j - 1] === s3[i + j - 1];\n",
        "python": "class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        if len(s1) + len(s2) != len(s3):\n            return False\n\n        dp = [[False] * (len(s2) + 1) for i in range(len(s1) + 1)]\n        dp[len(s1)][len(s2)] = True\n\n        for i in range(len(s1), -1, -1):\n            for j in range(len(s2), -1, -1):\n                if i < len(s1) and s1[i] == s3[i + j] and dp[i + 1][j]:\n                    dp[i][j] = True\n                if j < len(s2) and s2[j] == s3[i + j] and dp[i][j + 1]:\n                    dp[i][j] = True\n        return dp[0][0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Interleaving String",
          "explanation": "Interleaving String is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^(N + M)",
      "spaceComplexity": "O(N + M)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "longest-increasing-path-in-a-matrix",
      "title": "Longest Increasing Path in a Matrix",
      "difficulty": "Hard",
      "description": "Given an m x n integers matrix, return the length of the longest increasing path in matrix.\n\nFrom each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).\n\n \nExample 1:\n\n\n<strong>Input:</strong> matrix = [[9,9,4],[6,6,8],[2,1,1]]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest increasing path is <code>[1, 2, 6, 9]</code>.\n\n\nExample 2:\n\n\n<strong>Input:</strong> matrix = [[3,4,5],[3,2,6],[2,2,1]]\n<strong>Output:</strong> 4\n<strong>Explanation: </strong>The longest increasing path is <code>[3, 4, 5, 6]</code>. Moving diagonally is not allowed.\n\n\nExample 3:\n\n\n<strong>Input:</strong> matrix = [[1]]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\tm == matrix.length\n\tn == matrix[i].length\n\t1 <= m, n <= 200\n\t0 <= matrix[i][j] <= 231 - 1",
      "examples": [
        {
          "input": "[[9,9,4],[6,6,8],[2,1,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,4,5],[3,2,6],[2,2,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestIncreasingPathInAMatrix(input) {\n  // Your code here\n}",
        "python": "def longest_increasing_path_in_a_matrix(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^(N + M)) | Space O(N * M)\n * https://leetcode.com/problems/longest-increasing-path-in-a-matrix/\n * @param {number[][]} matrix\n * @return {number}\n */\nvar longestIncreasingPath = (matrix, maxPath = 0) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(N) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(M) */\n            const path = dfs(\n                matrix,\n                row,\n                rows,\n                col,\n                cols,\n            ); /* Time O(2^(N + M)) | Space O(HEIGHT) */\n\n            maxPath = Math.max(maxPath, path);\n        }\n    }\n\n    return maxPath;\n};\n\nvar dfs = (matrix, row, rows, col, cols, ans = 0) => {\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        /* Time O(4) */\n        const path = dfs(\n            matrix,\n            _row,\n            rows,\n            _col,\n            cols,\n        ); /* Time O(2^(N + M)) | Space O(HEIGHT) */\n\n        ans = Math.max(ans, path);\n    }\n\n    ans += 1;\n    return ans;\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/longest-increasing-path-in-a-matrix/\n * @param {number[][]} matrix\n * @return {number}\n */\nvar longestIncreasingPath = (matrix, maxPath = 0, memo = initMemo(matrix)) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(N) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(M) */\n            const path =\n                /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n                search(matrix, row, rows, col, cols, memo);\n\n            maxPath = Math.max(maxPath, path);\n        }\n    }\n\n    return maxPath;\n};\n\nvar initMemo = (matrix) =>\n    new Array(matrix.length)\n        .fill() /* Time O(N) | Space O(N)*/\n        .map(() =>\n            new Array(matrix[0].length).fill(0),\n        ); /* Time O(M) | Space O(M)*/\n\nconst search = (matrix, row, rows, col, cols, memo) => {\n    const hasSeen = memo[row][col] !== 0;\n    if (hasSeen) return memo[row][col];\n\n    return dfs(\n        matrix,\n        row,\n        rows,\n        col,\n        cols,\n        memo,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar dfs = (matrix, row, rows, col, cols, memo) => {\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        /* Time O(4) */\n        const [parent, node] = [matrix[row][col], matrix[_row][_col]];\n\n        const isLess = node <= parent;\n        if (isLess) continue;\n\n        const path = search(\n            matrix,\n            _row,\n            rows,\n            _col,\n            cols,\n            memo,\n        ); /* Time O(N * M) | Space O(HEIGHT) */\n\n        memo[row][col] = Math.max(memo[row][col], path);\n    }\n\n    memo[row][col] += 1; /*               | Space O(N * M) */\n    return memo[row][col];\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\n/**\n * Topological Sort\n * Matrix - Graph\n * Matrix - In-Degree\n * Queue - BFS\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/longest-increasing-path-in-a-matrix/\n * @param {number[][]} matrix\n * @return {number}\n */\nvar longestIncreasingPath = (matrix) => {\n    const { graph, indegree, sources } =\n        /* Time O(N * M) | Space O(N * M) */\n        buildGraph(matrix);\n\n    findSources(graph, indegree, sources); /* Time O(N * M) | Space O(N * M) */\n\n    return bfs(\n        graph,\n        indegree,\n        sources,\n    ); /* Time O((N * M) + WIDTH) | Space O((N * M) + WIDTH) */\n};\n\nconst initGraph = (rows, cols) => ({\n    graph: new Array(rows + 2)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() => new Array(cols + 2).fill(0)) /* Time O(M) | Space O(M) */,\n    indegree: new Array(rows + 2)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() => new Array(cols + 2).fill(0)) /* Time O(M) | Space O(M) */,\n    sources: new Queue(),\n});\n\nvar buildGraph = (matrix) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n    const { graph, indegree, sources } =\n        /* Time O(N * M) | Space O(N * M) */\n        initGraph(rows, cols);\n\n    for (let row = 1; row < rows + 1; row++) {\n        /* Time O(N) */\n        graph[row] = [\n            0,\n            ...matrix[row - 1],\n            0,\n        ]; /*           | Space O(N * M) */\n    }\n\n    for (let row = 1; row <= rows; row++) {\n        /* Time O(N) */\n        for (let col = 1; col <= cols; col++) {\n            /* Time O(M) */\n            for (const [_row, _col] of getNeighbors(row, col)) {\n                /* Time O(4) */\n                const isSink = graph[row][col] < graph[_row][_col];\n                if (isSink)\n                    indegree[row][col] += 1; /*       | Space O(N * M) */\n            }\n        }\n    }\n\n    return { graph, indegree, sources };\n};\n\nvar getNeighbors = (row, col) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ].map(([_row, _col]) => [row + _row, col + _col]);\n\nvar findSources = (graph, indegree, sources) => {\n    const [rows, cols] = [graph.length, graph[0].length];\n\n    for (let row = 1; row < rows - 1; ++row) {\n        /* Time O(N) */\n        for (let col = 1; col < cols - 1; ++col) {\n            /* Time O(M) */\n            const isSource = indegree[row][col] === 0;\n            if (isSource) sources.enqueue([row, col]); /* Space O(N * M) */\n        }\n    }\n};\n\nconst bfs = (graph, indegree, sources, path = 0) => {\n    while (!sources.isEmpty()) {\n        /* Time(N * M) */\n        for (let level = sources.size() - 1; 0 <= level; level--) {\n            /* Time(WIDTH) */\n            checkNeighbors(\n                graph,\n                indegree,\n                sources,\n            ); /* Space((N * M) + WIDTH) */\n        }\n\n        path += 1;\n    }\n\n    return path;\n};\n\nconst checkNeighbors = (graph, indegree, sources) => {\n    const [row, col] = sources.dequeue();\n\n    for (const [_row, _col] of getNeighbors(row, col)) {\n        const canDisconnect = graph[_row][_col] < graph[row][col];\n        if (!canDisconnect) continue;\n\n        indegree[_row][_col] -= 1; /* Space O(N * M) */\n\n        const isSource = indegree[_row][_col] === 0;\n        if (isSource) sources.enqueue([_row, _col]); /* Space O(WIDTH) */\n    }\n};\n",
        "python": "class Solution:\n    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:\n        ROWS, COLS = len(matrix), len(matrix[0])\n        dp = {}  # (r, c) -> LIP\n\n        def dfs(r, c, prevVal):\n            if r < 0 or r == ROWS or c < 0 or c == COLS or matrix[r][c] <= prevVal:\n                return 0\n            if (r, c) in dp:\n                return dp[(r, c)]\n\n            res = 1\n            res = max(res, 1 + dfs(r + 1, c, matrix[r][c]))\n            res = max(res, 1 + dfs(r - 1, c, matrix[r][c]))\n            res = max(res, 1 + dfs(r, c + 1, matrix[r][c]))\n            res = max(res, 1 + dfs(r, c - 1, matrix[r][c]))\n            dp[(r, c)] = res\n            return res\n\n        for r in range(ROWS):\n            for c in range(COLS):\n                dfs(r, c, -1)\n        return max(dp.values())\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Increasing Path in a Matrix",
          "explanation": "Longest Increasing Path in a Matrix is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^(N + M)",
      "spaceComplexity": "O(N * M)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "distinct-subsequences",
      "title": "Distinct Subsequences",
      "difficulty": "Hard",
      "description": "Given two strings s and t, return the number of distinct subsequences of s which equals t.\n\nThe test cases are generated so that the answer fits on a 32-bit signed integer.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"rabbbit\", t = \"rabbit\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nAs shown below, there are 3 ways you can generate \"rabbit\" from s.\n<code><strong><u>rabb</u></strong>b<strong><u>it</u></strong></code>\n<code><strong><u>ra</u></strong>b<strong><u>bbit</u></strong></code>\n<code><strong><u>rab</u></strong>b<strong><u>bit</u></strong></code>\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"babgbag\", t = \"bag\"\n<strong>Output:</strong> 5\n<strong>Explanation:</strong>\nAs shown below, there are 5 ways you can generate \"bag\" from s.\n<code><strong><u>ba</u></strong>b<u><strong>g</strong></u>bag</code>\n<code><strong><u>ba</u></strong>bgba<strong><u>g</u></strong></code>\n<code><u><strong>b</strong></u>abgb<strong><u>ag</u></strong></code>\n<code>ba<u><strong>b</strong></u>gb<u><strong>ag</strong></u></code>\n<code>babg<strong><u>bag</u></strong></code>\n\n \nConstraints:\n\n\n\t1 <= s.length, t.length <= 1000\n\ts and t consist of English letters.",
      "examples": [
        {
          "input": "\"rabbbit\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"rabbit\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"babgbag\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function distinctSubsequences(input) {\n  // Your code here\n}",
        "python": "def distinct_subsequences(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space (N * M)\n * https://leetcode.com/problems/distinct-subsequences/\n * @param {string} s\n * @param {string} t\n * @return {number}\n */\nvar numDistinct = (s, t, i = 0, j = 0, memo = initMemo(s, t)) => {\n    const isBaseCase1 = s.length < t.length;\n    if (isBaseCase1) return 0;\n\n    const isBaseCase2 = j === t.length;\n    if (isBaseCase2) return 1;\n\n    const isBaseCase3 = i === s.length;\n    if (isBaseCase3) return 0;\n\n    const hasSeen = memo[i][j] !== null;\n    if (hasSeen) return memo[i][j];\n\n    return dfs(\n        s,\n        t,\n        i,\n        j,\n        memo,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar initMemo = (s, t) =>\n    new Array(s.length).fill().map(() => new Array(t.length).fill(null));\n\nvar dfs = (s, t, i, j, memo) => {\n    const left = numDistinct(\n        s,\n        t,\n        i + 1,\n        j,\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n\n    const isEqual = s[i] === t[j];\n\n    const right = isEqual\n        ? numDistinct(\n              s,\n              t,\n              i + 1,\n              j + 1,\n              memo,\n          ) /* Time O(N * M) | Space O(HEIGHT) */\n        : 0;\n\n    memo[i][j] = left + right; /*               | Space O(N * M) */\n    return memo[i][j];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space (N * M)\n * https://leetcode.com/problems/distinct-subsequences/\n * @param {string} s\n * @param {string} t\n * @return {number}\n */\nvar numDistinct = (s, t) => {\n    const tabu = initTabu(s, t); /* Time O(N * M) | Space O(N * M) */\n\n    search(s, t, tabu); /* Time O(N * M) | Space O(N * M) */\n\n    return tabu[0][0];\n};\n\nvar initTabu = (s, t) => {\n    const tabu = new Array(s.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() => new Array(t.length + 1)); /* Time O(M) | Space O(M) */\n\n    tabu[s.length].fill(0); /*           | Space O(N * M) */\n\n    for (let r = 0; r <= s.length; ++r) {\n        /* Time O(N) */\n        tabu[r][t.length] = 1; /*       | Space O(N * M) */\n    }\n\n    return tabu;\n};\n\nvar search = (s, t, tabu) => {\n    for (let r = s.length - 1; 0 <= r; r--) {\n        /* Time O(N) */\n        for (let c = t.length - 1; 0 <= c; c--) {\n            /* Time O(M) */\n            const left = tabu[r + 1][c];\n\n            const isEqual = s[r] === t[c];\n\n            const right = isEqual ? tabu[r + 1][c + 1] : 0;\n\n            tabu[r][c] = left + right; /* Space O(N * M) */\n        }\n    }\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(M)\n * https://leetcode.com/problems/distinct-subsequences/\n * @param {string} s\n * @param {string} t\n * @return {number}\n */\nvar numDistinct = (s, t) => {\n    const tabu = initTabu(t); /* Time O(M) | Space O(M) */\n\n    search(s, t, tabu); /* Time O(N * M) | Space O(M) */\n\n    return tabu[0];\n};\n\nvar initTabu = (t) => new Array(t.length).fill(0); /* Time O(M) | Space O(M) */\n\nvar search = (s, t, tabu) => {\n    for (let row = s.length - 1; 0 <= row; row--) {\n        /* Time O(N) */\n        let prev = 1;\n\n        for (let col = t.length - 1; 0 <= col; col--) {\n            /* Time O(M) */\n            const curr = tabu[col];\n\n            const isEqual = s[row] === t[col];\n            if (isEqual) tabu[col] += prev; /* Space O(M) */\n\n            prev = curr;\n        }\n    }\n};\n",
        "python": "class Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        cache = {}\n\n        for i in range(len(s) + 1):\n            cache[(i, len(t))] = 1\n        for j in range(len(t)):\n            cache[(len(s), j)] = 0\n\n        for i in range(len(s) - 1, -1, -1):\n            for j in range(len(t) - 1, -1, -1):\n                if s[i] == t[j]:\n                    cache[(i, j)] = cache[(i + 1, j + 1)] + cache[(i + 1, j)]\n                else:\n                    cache[(i, j)] = cache[(i + 1, j)]\n        return cache[(0, 0)]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Distinct Subsequences",
          "explanation": "Distinct Subsequences is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * M)",
      "spaceComplexity": "O((N * M)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "edit-distance",
      "title": "Edit Distance",
      "difficulty": "Medium",
      "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n\n\n\tInsert a character\n\tDelete a character\n\tReplace a character\n\n\n \nExample 1:\n\n\n<strong>Input:</strong> word1 = \"horse\", word2 = \"ros\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> \nhorse -> rorse (replace 'h' with 'r')\nrorse -> rose (remove 'r')\nrose -> ros (remove 'e')\n\n\nExample 2:\n\n\n<strong>Input:</strong> word1 = \"intention\", word2 = \"execution\"\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> \nintention -> inention (remove 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')\n\n\n \nConstraints:\n\n\n\t0 <= word1.length, word2.length <= 500\n\tword1 and word2 consist of lowercase English letters.",
      "examples": [
        {
          "input": "\"horse\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"ros\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"intention\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function editDistance(input) {\n  // Your code here\n}",
        "python": "def edit_distance(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O(2^(N + M)) | Space O(N * M)\n * https://leetcode.com/problems/edit-distance/\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = (word1, word2, i = 0, j = 0) => {\n    const isBaseCase1 = word1.length * word2.length === 0;\n    if (isBaseCase1) return word1.length + word2.length;\n\n    const isBaseCase2 = word1.length === i;\n    if (isBaseCase2) return word2.length - j;\n\n    const isBaseCase3 = word2.length === j;\n    if (isBaseCase3) return word1.length - i;\n\n    return dfs(\n        word1,\n        word2,\n        i,\n        j,\n    ); /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */\n};\n\nvar dfs = (word1, word2, i, j) => {\n    const isEqual = word1[i] === word2[j];\n    if (isEqual)\n        return minDistance(\n            word1,\n            word2,\n            i + 1,\n            j + 1,\n        ); /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */\n\n    const insert = minDistance(\n        word1,\n        word2,\n        i,\n        j + 1,\n    ); /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */\n    const _delete = minDistance(\n        word1,\n        word2,\n        i + 1,\n        j,\n    ); /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */\n    const replace = minDistance(\n        word1,\n        word2,\n        i + 1,\n        j + 1,\n    ); /* Time O(2^(N + M)) | Space O((N * M) + HEIGHT) */\n\n    return Math.min(insert, _delete, replace) + 1;\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/edit-distance/\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = (\n    word1,\n    word2,\n    i = 0,\n    j = 0,\n    memo = initMemo(word1, word2),\n) => {\n    const isBaseCase1 = word1.length * word2.length === 0;\n    if (isBaseCase1) return word1.length + word2.length;\n\n    const isBaseCase2 = word1.length === i;\n    if (isBaseCase2) return word2.length - j;\n\n    const isBaseCase3 = word2.length === j;\n    if (isBaseCase3) return word1.length - i;\n\n    const hasSeen = memo[i][j] !== -1;\n    if (hasSeen) return memo[i][j];\n\n    return dfs(\n        word1,\n        word2,\n        i,\n        j,\n        memo,\n    ); /* Time O(N * M) | Space O((N * M) + HEIGHT) */\n};\n\nvar initMemo = (word1, word2) =>\n    new Array(word1.length)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(word2.length).fill(-1),\n        ); /* Time O(N) | Space O(N) */\n\nvar dfs = (word1, word2, i, j, memo) => {\n    const isEqual = word1[i] === word2[j];\n    if (isEqual) {\n        memo[i][j] = minDistance(\n            word1,\n            word2,\n            i + 1,\n            j + 1,\n            memo,\n        ); /* Time O(N * M) | Space O(HEIGHT) */\n        return memo[i][j];\n    }\n\n    const insert = minDistance(\n        word1,\n        word2,\n        i,\n        j + 1,\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n    const _delete = minDistance(\n        word1,\n        word2,\n        i + 1,\n        j,\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n    const replace = minDistance(\n        word1,\n        word2,\n        i + 1,\n        j + 1,\n        memo,\n    ); /* Time O(N * M) | Space O(HEIGHT) */\n\n    memo[i][j] =\n        Math.min(insert, _delete, replace) +\n        1; /*               | Space O(N * M) */\n    return memo[i][j];\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/edit-distance/\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = (word1, word2) => {\n    const isEmpty = word1.length * word2.length === 0;\n    if (isEmpty) return word1.length + word2.length;\n\n    const tabu = initTabu(word1, word2); /* Time O(N * M) | Space O(N * M) */\n\n    search(word1, word2, tabu); /* Time O(N * M) | Space O(N * M) */\n\n    return tabu[word1.length][word2.length];\n};\n\nvar initTabu = (word1, word2) => {\n    const tabu = new Array(word1.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(word2.length + 1).fill(0),\n        ); /* Time O(M) | Space O(M) */\n\n    for (let i = 0; i < word1.length + 1; i++) {\n        /* Time O(N) */\n        tabu[i][0] = i; /*        | Space O(N * M) */\n    }\n\n    for (let j = 0; j < word2.length + 1; j++) {\n        /* Time O(M) */\n        tabu[0][j] = j; /*        | Space O(N * M) */\n    }\n\n    return tabu;\n};\n\nvar search = (word1, word2, tabu) => {\n    for (let i = 1; i < word1.length + 1; i++) {\n        /* Time O(N) */\n        for (let j = 1; j < word2.length + 1; j++) {\n            /* Time O(M) */\n            const left = tabu[i - 1][j] + 1;\n            const down = tabu[i][j - 1] + 1;\n\n            const isEqual = word1[i - 1] === word2[j - 1];\n            const leftDown = tabu[i - 1][j - 1] + Number(!isEqual);\n\n            tabu[i][j] = Math.min(left, down, leftDown); /* Space O(N * M) */\n        }\n    }\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N * M) | Space O(M)\n * https://leetcode.com/problems/edit-distance/\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = (word1, word2) => {\n    const tabu = initTabu(word2); /* Time O(M) | Space O(M) */\n\n    search(word1, word2, tabu); /* Time O(N * M) | Space O(M) */\n\n    return tabu[word2.length];\n};\n\nvar initTabu = (word2) => {\n    const tabu = new Array(word2.length + 1).fill(\n        0,\n    ); /* Time O(M) | Space O(M) */\n\n    for (let j = 1; j <= word2.length; j++) {\n        /* Time O(M) */\n        tabu[j] = j; /*           | Space O(M) */\n    }\n\n    return tabu;\n};\n\nvar search = (word1, word2, tabu) => {\n    for (let i = 1; i <= word1.length; i++) {\n        /* Time O(N) */\n        tabu[word2.length] = update(\n            word1,\n            word2,\n            i,\n            tabu,\n        ); /* Time O(M) | Space (M) */\n    }\n};\n\nconst update = (word1, word2, i, tabu) => {\n    let temp = i;\n\n    for (let j = 1; j <= word2.length; ++j) {\n        /* Time O(M  */\n        const isEqual = word1[i - 1] === word2[j - 1];\n        const cur = isEqual\n            ? tabu[j - 1]\n            : Math.min(tabu[j - 1], tabu[j], temp) + 1;\n\n        tabu[j - 1] = temp; /* Space (M) */\n        temp = cur;\n    }\n\n    return temp;\n};\n",
        "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        dp = [[float(\"inf\")] * (len(word2) + 1) for i in range(len(word1) + 1)]\n\n        for j in range(len(word2) + 1):\n            dp[len(word1)][j] = len(word2) - j\n        for i in range(len(word1) + 1):\n            dp[i][len(word2)] = len(word1) - i\n\n        for i in range(len(word1) - 1, -1, -1):\n            for j in range(len(word2) - 1, -1, -1):\n                if word1[i] == word2[j]:\n                    dp[i][j] = dp[i + 1][j + 1]\n                else:\n                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])\n        return dp[0][0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Edit Distance",
          "explanation": "Edit Distance is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(2^(N + M)",
      "spaceComplexity": "O(N * M)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "burst-balloons",
      "title": "Burst Balloons",
      "difficulty": "Hard",
      "description": "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.\n\nIf you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [3,1,5,8]\n<strong>Output:</strong> 167\n<strong>Explanation:</strong>\nnums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []\ncoins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [1,5]\n<strong>Output:</strong> 10\n\n\n \nConstraints:\n\n\n\tn == nums.length\n\t1 <= n <= 300\n\t0 <= nums[i] <= 100",
      "examples": [
        {
          "input": "[3,1,5,8]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,5]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function burstBalloons(input) {\n  // Your code here\n}",
        "python": "def burst_balloons(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N^3) | Space O(N^2)\n * https://leetcode.com/problems/burst-balloons/\n * @param {number[]} nums\n * @return {number}\n */\nvar maxCoins = (nums) => {\n    const _nums = [1, ...nums, 1]; /* Time O(N)         | Space O(N) */\n\n    return search(_nums); /* Time O(N * N * N) | Space O((N * N) + HEIGHT) */\n};\n\nvar search = (\n    nums,\n    left = 1,\n    right = nums.length - 2,\n    memo = initMemo(nums),\n) => {\n    const isBaseCase = right - left < 0;\n    if (isBaseCase) return 0;\n\n    const hasSeen = memo[left][right] !== -1;\n    if (hasSeen) return memo[left][right];\n\n    return dfs(\n        nums,\n        left,\n        right,\n        memo,\n    ); /* Time O(N * N * N) | Space O((N * N) + HEIGHT) */\n};\n\nvar initMemo = (nums) =>\n    new Array(nums.length)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(nums.length).fill(-1),\n        ); /* Time O(N) | Space O(N) */\n\nvar dfs = (nums, left, right, memo, result = 0) => {\n    for (let i = left; i <= right; i++) {\n        /* Time O(N) */\n        const gain = nums[left - 1] * nums[i] * nums[right + 1];\n        const _left = search(\n            nums,\n            left,\n            i - 1,\n            memo,\n        ); /* Time O(N * N) | Space O(HEIGHT) */\n        const _right = search(\n            nums,\n            i + 1,\n            right,\n            memo,\n        ); /* Time O(N * N) | Space O(HEIGHT) */\n        const remaining = _left + _right;\n\n        result = Math.max(result, remaining + gain);\n    }\n\n    memo[left][right] =\n        result; /*                               | Space O(N * N) */\n    return result;\n};\n\n/**\n * DP - Bottom Up\n * Matrix - Tabulation\n * Time O(N^3) | Space O(N^2)\n * https://leetcode.com/problems/burst-balloons/\n * @param {number[]} nums\n * @return {number}\n */\nvar maxCoins = (nums) => {\n    const tabu = initTabu(nums); /* Time O(N * N)     | Space O(N * N) */\n\n    search(nums, tabu); /* Time O(N * N * N) | Space O(N * N) */\n\n    return tabu[1][nums.length];\n};\n\nvar initTabu = (nums) =>\n    new Array(nums.length + 2)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(nums.length + 2).fill(0),\n        ); /* Time O(N) | Space O(N) */\n\nvar search = (nums, tabu) => {\n    const _nums = [1, ...nums, 1]; /* Time O(N) | Space O(N) */\n\n    for (let left = nums.length; 1 <= left; left--) {\n        /* Time O(N) */\n        for (let right = left; right <= nums.length; right++) {\n            /* Time O(N) */\n            for (let i = left; i <= right; i++) {\n                const gain = _nums[left - 1] * _nums[i] * _nums[right + 1];\n                const remaining = tabu[left][i - 1] + tabu[i + 1][right];\n\n                tabu[left][right] =\n                    /*   | Space O(N * N) */\n                    Math.max(remaining + gain, tabu[left][right]);\n            }\n        }\n    }\n};\n",
        "python": "class Solution:\n    def maxCoins(self, nums: List[int]) -> int:\n        cache = {}\n        nums = [1] + nums + [1]\n\n        for offset in range(2, len(nums)):\n            for left in range(len(nums) - offset):\n                right = left + offset\n                for pivot in range(left + 1, right):\n                    coins = nums[left] * nums[pivot] * nums[right]\n                    coins += cache.get((left, pivot), 0) + cache.get((pivot, right), 0)\n                    cache[(left, right)] = max(coins, cache.get((left, right), 0))\n        return cache.get((0, len(nums) - 1), 0)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Burst Balloons",
          "explanation": "Burst Balloons is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^3)",
      "spaceComplexity": "O(N^2)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    },
    {
      "id": "regular-expression-matching",
      "title": "Regular Expression Matching",
      "difficulty": "Hard",
      "description": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n\n\t'.' Matches any single character.​​​​\n\t'*' Matches zero or more of the preceding element.\n\n\nReturn a boolean indicating whether the matching covers the entire input string (not partial).\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"aa\", p = \"a\"\n<strong>Output:</strong> false\n<strong>Explanation:</strong> \"a\" does not match the entire string \"aa\".\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"aa\", p = \"a*\"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\".\n\n\nExample 3:\n\n\n<strong>Input:</strong> s = \"ab\", p = \".*\"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> \".*\" means \"zero or more (*) of any character (.)\".\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 20\n\t1 <= p.length <= 20\n\ts contains only lowercase English letters.\n\tp contains only lowercase English letters, '.', and '*'.\n\tIt is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
      "examples": [
        {
          "input": "\"aa\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"a\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"aa\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function regularExpressionMatching(input) {\n  // Your code here\n}",
        "python": "def regular_expression_matching(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force - DFS\n * Time O((N + M) * 2^(N + (M / 2))) | Space O(N^2 + M^2)\n * https://leetcode.com/problems/regular-expression-matching/\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = (text, pattern) => {\n    const isBaseCase = pattern.length === 0;\n    if (isBaseCase) return text.length === 0;\n\n    const isTextAndPatternEqual = pattern[0] === text[0],\n        isPatternPeriod = pattern[0] === '.',\n        isFirstMatch = text && (isTextAndPatternEqual || isPatternPeriod),\n        isNextPatternWildCard = pattern.length >= 2 && pattern[1] === '*';\n\n    return isNextPatternWildCard /* Time O((N + M) * 2^(N + (M / 2))) | Space O(N^2 + M^2) */\n        ? isMatch(text, pattern.slice(2)) ||\n              (isFirstMatch && isMatch(text.slice(1), pattern))\n        : isFirstMatch && isMatch(text.slice(1), pattern.slice(1));\n};\n\n/**\n * DP - Top Down\n * Matrix - Memoization\n * Time O(N * M) | Space O(N * M)\n * https://leetcode.com/problems/regular-expression-matching/\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = (\n    text,\n    pattern,\n    row = 0,\n    col = 0,\n    memo = initMemo(text, pattern),\n) => {\n    const hasSeen = memo[row][col];\n    if (hasSeen) return memo[row][col];\n\n    const isEqual = col === pattern.length;\n    const ans = isEqual\n        ? row === text.length\n        : check(\n              text,\n              pattern,\n              row,\n              col,\n              memo,\n          ); /* Time O(N * M) | Space O(N * M) */\n\n    memo[row][col] = ans;\n    return ans;\n};\n\nvar initMemo = (text, pattern) =>\n    new Array(text.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(pattern.length + 1).fill(false),\n        ); /* Time O(M) | Space O(M) */\n\nvar check = (text, pattern, row, col, memo) => {\n    const isTextDefined = row < text.length,\n        isTextAndPatternEqual = pattern[col] === text[row],\n        isPatternPeriod = pattern[col] === '.',\n        isFirstMatch =\n            isTextDefined && (isTextAndPatternEqual || isPatternPeriod),\n        isNextPatternWildCard =\n            col + 1 < pattern.length && pattern[col + 1] === '*';\n\n    return isNextPatternWildCard /* Time O(N * M) | Space O(N * M) */\n        ? isMatch(text, pattern, row, col + 2, memo) ||\n              (isFirstMatch && isMatch(text, pattern, row + 1, col, memo))\n        : isFirstMatch && isMatch(text, pattern, row + 1, col + 1, memo);\n};\n\n/**\n * Time O(N * M) | Space O(N * M)\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = (text, pattern) => {\n    const tabu = initTabu(text, pattern); /* Time O(N * M) | Space O(N * M) */\n\n    search(text, pattern, tabu); /* Time O(N * M) | Space O(N * M) */\n\n    return tabu[0][0];\n};\n\nvar initTabu = (text, pattern) => {\n    const tabu = new Array(text.length + 1)\n        .fill() /* Time O(N) | Space O(N) */\n        .map(() =>\n            new Array(pattern.length + 1).fill(false),\n        ); /* Time O(M) | Space O(M) */\n\n    tabu[text.length][pattern.length] = true; /*           | Space O(N * M) */\n\n    return tabu;\n};\n\nvar search = (text, pattern, tabu) => {\n    for (let row = text.length; 0 <= row; row--) {\n        /* Time O(N) */\n        for (let col = pattern.length - 1; 0 <= col; col--) {\n            /* Time O(M) */\n            const isTextDefined = row < text.length,\n                isTextAndPatternEqual = pattern[col] === text[row],\n                isPatternPeriod = pattern[col] === '.',\n                isFirstMatch =\n                    isTextDefined && (isTextAndPatternEqual || isPatternPeriod),\n                isNextPatternWildCard =\n                    col + 1 < pattern.length && pattern[col + 1] === '*';\n\n            tabu[row][col] = isNextPatternWildCard /* Space O(N * M) */\n                ? tabu[row][col + 2] || (isFirstMatch && tabu[row + 1][col])\n                : isFirstMatch && tabu[row + 1][col + 1];\n        }\n    }\n};\n",
        "python": "# BOTTOM-UP Dynamic Programming\nclass Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        cache = [[False] * (len(p) + 1) for i in range(len(s) + 1)]\n        cache[len(s)][len(p)] = True\n\n        for i in range(len(s), -1, -1):\n            for j in range(len(p) - 1, -1, -1):\n                match = i < len(s) and (s[i] == p[j] or p[j] == \".\")\n\n                if (j + 1) < len(p) and p[j + 1] == \"*\":\n                    cache[i][j] = cache[i][j + 2]\n                    if match:\n                        cache[i][j] = cache[i + 1][j] or cache[i][j]\n                elif match:\n                    cache[i][j] = cache[i + 1][j + 1]\n\n        return cache[0][0]\n\n\n# TOP DOWN MEMOIZATION\nclass Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        cache = {}\n\n        def dfs(i, j):\n            if (i, j) in cache:\n                return cache[(i, j)]\n            if i >= len(s) and j >= len(p):\n                return True\n            if j >= len(p):\n                return False\n\n            match = i < len(s) and (s[i] == p[j] or p[j] == \".\")\n            if (j + 1) < len(p) and p[j + 1] == \"*\":\n                cache[(i, j)] = dfs(i, j + 2) or (  # dont use *\n                    match and dfs(i + 1, j)\n                )  # use *\n                return cache[(i, j)]\n            if match:\n                cache[(i, j)] = dfs(i + 1, j + 1)\n                return cache[(i, j)]\n            cache[(i, j)] = False\n            return False\n\n        return dfs(0, 0)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Regular Expression Matching",
          "explanation": "Regular Expression Matching is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O((N + M)",
      "spaceComplexity": "O(N^2 + M^2)",
      "tags": [
        "2-D DP"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "DP requires two properties:",
      "options": [
        "Greedy choice+subproblems",
        "Overlapping subproblems+optimal substructure",
        "Sorted input+recursion",
        "Memoization+tabulation"
      ],
      "correct": 1,
      "explanation": "DP: (1) subproblems overlap, (2) optimal solution contains optimal subproblem solutions."
    }
  ],
  "cheatSheet": "# DP Patterns\n| Pattern | Recurrence |\n|---------|------------|\n| 1D | dp[i]=max(dp[i-1],dp[i-2]+arr[i]) |\n| LCS | dp[i][j]=match?dp[i-1][j-1]+1:max(...) |\n| Knapsack | dp[w]=max(dp[w],dp[w-wt]+val) |",
  "proTips": [
    "Define dp[i] semantically first",
    "Draw the DP table for 2D problems"
  ],
  "faangQuotes": [
    "\"Edit Distance — if you solve it in 10 min you're hired.\" — Meta"
  ],
  "visualizationType": "dp",
  "usage": "Used to solve optimization problems by breaking them down into simpler overlapping subproblems and caching results.",
  "dsInvolved": "Array, Matrix, Hash Map",
  "sampleProblems": [
    "Climbing Stairs",
    "House Robber",
    "Longest Common Subsequence"
  ]
};
