import { Topic } from "./types";

export const topic12: Topic = {
  "id": "topic12",
  "slug": "greedy",
  "title": "Greedy Algorithms",
  "emoji": "🏃",
  "color": "#fbbf24",
  "gradient": "from-amber-400 to-yellow-300",
  "layman": "Greedy means always making the locally best choice. Booking meeting rooms: always book the room finishing earliest. Greedy works when local optimum = global optimum.",
  "technical": "Greedy algorithms build solutions incrementally. Proof: exchange argument. Works when greedy choice property holds.",
  "keyInsights": [
    "Exchange argument proves greedy correctness",
    "Sort by end time for interval problems",
    "Greedy fails when future depends on current in complex ways"
  ],
  "timeComplexities": [
    {
      "operation": "Activity Selection",
      "best": "O(n log n)",
      "avg": "O(n log n)",
      "worst": "O(n log n)",
      "space": "O(1)"
    },
    {
      "operation": "Jump Game",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "jump-game",
      "title": "Jump Game",
      "difficulty": "Medium",
      "description": "Given array nums where nums[i] = max jump length at i, can you reach the last index?",
      "examples": [
        {
          "input": "nums=[2,3,1,1,4]",
          "output": "true"
        },
        {
          "input": "nums=[3,2,1,0,4]",
          "output": "false"
        }
      ],
      "constraints": [
        "1≤nums.length≤10⁴"
      ],
      "starterCode": {
        "js": "function canJump(nums){\n  let maxReach=0;\n}",
        "python": "def can_jump(nums):\n    max_reach=0"
      },
      "solution": {
        "js": "function canJump(nums){\n  let maxReach=0;\n  for(let i=0;i<nums.length;i++){\n    if(i>maxReach)return false;\n    maxReach=Math.max(maxReach,i+nums[i]);\n  }\n  return true;\n}",
        "python": "def can_jump(nums):\n    max_reach=0\n    for i,jump in enumerate(nums):\n        if i>max_reach: return False\n        max_reach=max(max_reach,i+jump)\n    return True"
      },
      "testCases": [
        {
          "input": "[2,3,1,1,4]",
          "expected": "true"
        },
        {
          "input": "[3,2,1,0,4]",
          "expected": "false"
        },
        {
          "input": "[0]",
          "expected": "true",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Track the furthest index reachable from positions 0..i."
      ],
      "tags": [
        "greedy",
        "array"
      ],
      "walkthrough": [
        {
          "title": "Track max reachable index",
          "explanation": "maxReach = furthest index we can ever reach from positions we have visited. At each step, update maxReach = max(maxReach, i+nums[i]).",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              2,
              3,
              1,
              1,
              4
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4"
            ],
            "states": [
              "active",
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "variables": {
            "maxReach": 0
          }
        },
        {
          "title": "i=0: nums[0]=2, maxReach=max(0,0+2)=2",
          "explanation": "From index 0, we can reach up to index 2. maxReach=2.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              2,
              3,
              1,
              1,
              4
            ],
            "states": [
              "found",
              "comparing",
              "comparing",
              "default",
              "default"
            ],
            "pointers": {
              "0": "i",
              "2": "maxReach"
            }
          },
          "variables": {
            "i": 0,
            "maxReach": 2
          }
        },
        {
          "title": "i=1: nums[1]=3, maxReach=max(2,1+3)=4",
          "explanation": "i=1≤maxReach=2 ✓. From 1, can jump 3, reaching index 4 (the end!). maxReach=4.",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              2,
              3,
              1,
              1,
              4
            ],
            "states": [
              "found",
              "found",
              "default",
              "default",
              "found"
            ],
            "pointers": {
              "1": "i",
              "4": "maxReach"
            }
          },
          "variables": {
            "i": 1,
            "maxReach": 4
          }
        },
        {
          "title": "Return true — end is reachable",
          "explanation": "We never hit a position where i>maxReach. We can reach the last index.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              2,
              3,
              1,
              1,
              4
            ],
            "states": [
              "found",
              "found",
              "found",
              "found",
              "result"
            ]
          },
          "variables": {
            "answer": "true"
          },
          "complexity": "O(n) — single pass. O(1) space."
        }
      ]
    },
    {
      "id": "jump-game-ii",
      "title": "Jump Game II",
      "difficulty": "Medium",
      "description": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.\n\nEach element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:\n\n\n\t0 <= j <= nums[i] and\n\ti + j < n\n\n\nReturn the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [2,3,1,1,4]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [2,3,0,1,4]\n<strong>Output:</strong> 2\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 104\n\t0 <= nums[i] <= 1000\n\tIt's guaranteed that you can reach nums[n - 1].",
      "examples": [
        {
          "input": "[2,3,1,1,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,3,0,1,4]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function jumpGameIi(input) {\n  // Your code here\n}",
        "python": "def jump_game_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/jump-game-ii/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar jump = function (nums) {\n    let [left, right, jumps] = [0, 0, 0];\n\n    while (right < nums.length - 1) {\n        const maxReach = getMaxReach(nums, left, right);\n\n        left = right + 1;\n        right = maxReach;\n        jumps += 1;\n    }\n\n    return jumps;\n};\n\nconst getMaxReach = (nums, left, right, maxReach = 0) => {\n    for (let i = left; i < right + 1; i++) {\n        const reach = nums[i] + i;\n        maxReach = Math.max(maxReach, reach);\n    }\n\n    return maxReach;\n};\n\n/**\n * https://leetcode.com/problems/jump-game-ii/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar jump = function (nums) {\n    let [jumps, currentJumpEnd, farthest] = [0, 0, 0];\n\n    for (let i = 0; i < nums.length - 1; i++) {\n        farthest = Math.max(farthest, i + nums[i]);\n\n        const canJump = i === currentJumpEnd;\n        if (canJump) {\n            jumps++;\n            currentJumpEnd = farthest;\n        }\n    }\n\n    return jumps;\n};\n",
        "python": "class Solution:\n    def jump(self, nums: List[int]) -> int:\n        l, r = 0, 0\n        res = 0\n        while r < (len(nums) - 1):\n            maxJump = 0\n            for i in range(l, r + 1):\n                maxJump = max(maxJump, i + nums[i])\n            l = r + 1\n            r = maxJump\n            res += 1\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Jump Game II",
          "explanation": "Jump Game II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Greedy"
      ],
      "hints": []
    },
    {
      "id": "gas-station",
      "title": "Gas Station",
      "difficulty": "Medium",
      "description": "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.\n\n \nExample 1:\n\n\n<strong>Input:</strong> gas = [1,2,3,4,5], cost = [3,4,5,1,2]\n<strong>Output:</strong> 3\n<strong>Explanation:</strong>\nStart at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4\nTravel to station 4. Your tank = 4 - 1 + 5 = 8\nTravel to station 0. Your tank = 8 - 2 + 1 = 7\nTravel to station 1. Your tank = 7 - 3 + 2 = 6\nTravel to station 2. Your tank = 6 - 4 + 3 = 5\nTravel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.\nTherefore, return 3 as the starting index.\n\n\nExample 2:\n\n\n<strong>Input:</strong> gas = [2,3,4], cost = [3,4,3]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong>\nYou can't start at station 0 or 1, as there is not enough gas to travel to the next station.\nLet's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4\nTravel to station 0. Your tank = 4 - 3 + 2 = 3\nTravel to station 1. Your tank = 3 - 3 + 3 = 3\nYou cannot travel back to station ...",
      "examples": [
        {
          "input": "[1,2,3,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,4,5,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,3,4]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function gasStation(input) {\n  // Your code here\n}",
        "python": "def gas_station(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/gas-station/\n * Time: O(n)\n * @param {number[]} gas\n * @param {number[]} cost\n * @return {number}\n */\nvar canCompleteCircuit = function (gas, cost) {\n    let netDistance = 0;\n    let res = 0;\n\n    //Checks if theres enough gas to complete a cycle\n    if (gas.reduce((a, b) => a + b) - cost.reduce((a, b) => a + b) < 0)\n        return -1;\n\n    // Finds the first appearence of a positive netDistance, if the cycle can't\n    // be completed (netDistance < 0), starts cycle again @ the next positive netDistance value.\n    for (let i = 0; i < gas.length; i++) {\n        netDistance += gas[i] - cost[i];\n\n        if (netDistance < 0) {\n            netDistance = 0;\n            res = i + 1;\n        }\n    }\n\n    return res;\n};\n\n/**\n * @param {number[]} gas\n * @param {number[]} cost\n * @return {number}\n */\nvar canCompleteCircuit = function (gas, cost) {\n    let [totalTank, currTank, startingStation] = [0, 0, 0];\n\n    for (let i = 0; i < gas.length; i++) {\n        totalTank += gas[i] - cost[i];\n        currTank += gas[i] - cost[i];\n\n        const isEmpty = currTank < 0;\n        if (isEmpty) {\n            startingStation = i + 1;\n            currTank = 0;\n        }\n    }\n\n    return 0 <= totalTank ? startingStation : -1;\n};\n",
        "python": "class Solution:\n    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:\n        start, end = len(gas) - 1, 0\n        total = gas[start] - cost[start]\n\n        while start >= end:\n            while total < 0 and start >= end:\n                start -= 1\n                total += gas[start] - cost[start]\n            if start == end:\n                return start\n            total += gas[end] - cost[end]\n            end += 1\n        return -1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Gas Station",
          "explanation": "Gas Station is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Greedy"
      ],
      "hints": []
    },
    {
      "id": "hand-of-straights",
      "title": "Hand of Straights",
      "difficulty": "Medium",
      "description": "Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.\n\nGiven an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.\n\n \nExample 1:\n\n\n<strong>Input:</strong> hand = [1,2,3,6,2,3,4,7,8], groupSize = 3\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]\n\n\nExample 2:\n\n\n<strong>Input:</strong> hand = [1,2,3,4,5], groupSize = 4\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Alice's hand can not be rearranged into groups of 4.\n\n\n\n \nConstraints:\n\n\n\t1 <= hand.length <= 104\n\t0 <= hand[i] <= 109\n\t1 <= groupSize <= hand.length\n\n\n \nNote: This question is the same as 1296: https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/",
      "examples": [
        {
          "input": "[1,2,3,6,2,3,4,7,8]",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
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
        "js": "function handOfStraights(input) {\n  // Your code here\n}",
        "python": "def hand_of_straights(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Hand of Straights",
          "explanation": "Hand of Straights is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Greedy"
      ],
      "hints": []
    },
    {
      "id": "merge-triplets-to-form-target-triplet",
      "title": "Merge Triplets to Form Target Triplet",
      "difficulty": "Medium",
      "description": "A triplet is an array of three integers. You are given a 2D integer array triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.\n\nTo obtain target, you may apply the following operation on triplets any number of times (possibly zero):\n\n\n\tChoose two indices (0-indexed) i and j (i != j) and update triplets[j] to become [max(ai, aj), max(bi, bj), max(ci, cj)].\n\n\t\n\t\tFor example, if triplets[i] = [2, 5, 3] and triplets[j] = [1, 7, 5], triplets[j] will be updated to [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5].\n\t\n\t\n\n\nReturn true if it is possible to obtain the target triplet [x, y, z] as an element of triplets, or false otherwise.\n\n \nExample 1:\n\n\n<strong>Input:</strong> triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> Perform the following operations:\n- Choose the first and last triplets [<u>[2,5,3]</u>,[1,8,4],<u>[1,7,5]</u>]. Update the last triplet to be [max(2,1), max(5,7), max(3,5)] = [2,7,5]. triplets = [[2,5,3],[1,8,4],<u>[2,7,5]</u>]\nThe target triplet [2,7,5] is now an element of triplets.\n\n\nExample 2:\n\n\n<strong>Input:</strong> triplets = [[3,4,5],[4,5,6]], target = [3,2,5]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> It is impossible to have [3,2,5] as an element because there is no 2 in any of the triplets.\n\n\nExample 3:\n\n\n<strong>Input:</strong> triplets = [[2,5,3],[2,3,4],[...",
      "examples": [
        {
          "input": "[[2,5,3],[1,8,4],[1,7,5]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,7,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,4,5],[4,5,6]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function mergeTripletsToFormTargetTriplet(input) {\n  // Your code here\n}",
        "python": "def merge_triplets_to_form_target_triplet(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Merge Triplets to Form Target Triplet",
          "explanation": "Merge Triplets to Form Target Triplet is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Greedy"
      ],
      "hints": [
        "Which triplets do you actually care about?",
        "What property of max can you use to solve the problem?"
      ]
    },
    {
      "id": "partition-labels",
      "title": "Partition Labels",
      "difficulty": "Medium",
      "description": "You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string \"ababcc\" can be partitioned into [\"abab\", \"cc\"], but partitions such as [\"aba\", \"bcc\"] or [\"ab\", \"ab\", \"cc\"] are invalid.\n\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be s.\n\nReturn a list of integers representing the size of these parts.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"ababcbacadefegdehijhklij\"\n<strong>Output:</strong> [9,7,8]\n<strong>Explanation:</strong>\nThe partition is \"ababcbaca\", \"defegde\", \"hijhklij\".\nThis is a partition so that each letter appears in at most one part.\nA partition like \"ababcbacadefegde\", \"hijhklij\" is incorrect, because it splits s into less parts.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"eccbbbbdec\"\n<strong>Output:</strong> [10]\n\n\n \nConstraints:\n\n\n\t1 <= s.length <= 500\n\ts consists of lowercase English letters.",
      "examples": [
        {
          "input": "\"ababcbacadefegdehijhklij\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"eccbbbbdec\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function partitionLabels(input) {\n  // Your code here\n}",
        "python": "def partition_labels(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Partition Labels",
          "explanation": "Partition Labels is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Greedy"
      ],
      "hints": [
        "Try to greedily choose the smallest partition that includes the first letter.  If you have something like \"abaccbdeffed\", then you might need to add b.  You can use an map like \"last['b'] = 5\" to help you expand the width of your partition."
      ]
    },
    {
      "id": "valid-parenthesis-string",
      "title": "Valid Parenthesis String",
      "difficulty": "Medium",
      "description": "Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.\n\nThe following rules define a valid string:\n\n\n\tAny left parenthesis '(' must have a corresponding right parenthesis ')'.\n\tAny right parenthesis ')' must have a corresponding left parenthesis '('.\n\tLeft parenthesis '(' must go before the corresponding right parenthesis ')'.\n\t'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string \"\".\n\n\n \nExample 1:\n<strong>Input:</strong> s = \"()\"\n<strong>Output:</strong> true\nExample 2:\n<strong>Input:</strong> s = \"(*)\"\n<strong>Output:</strong> true\nExample 3:\n<strong>Input:</strong> s = \"(*))\"\n<strong>Output:</strong> true\n\n \nConstraints:\n\n\n\t1 <= s.length <= 100\n\ts[i] is '(', ')' or '*'.",
      "examples": [
        {
          "input": "\"()\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"(*)\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"(*))\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function validParenthesisString(input) {\n  // Your code here\n}",
        "python": "def valid_parenthesis_string(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar checkValidString = function (s) {\n    var leftMin = 0;\n    var leftMax = 0;\n\n    for (var c of s) {\n        if (c === '(') {\n            leftMin++;\n            leftMax++;\n        } else if (c === ')') {\n            leftMin--;\n            leftMax--;\n        } else {\n            leftMin--;\n            leftMax++;\n        }\n\n        if (leftMax < 0) {\n            return false;\n        }\n\n        if (leftMin < 0) {\n            leftMin = 0;\n        }\n    }\n\n    return leftMin === 0;\n};\n\n/**\n * https://leetcode.com/problems/valid-parenthesis-string/\n * Time O(N^3) | Space O(N^2)\n * @param {string} s\n * @return {boolean}\n */\nvar checkValidString = function (s) {\n    const isBaseCase = s.length === 0;\n    if (isBaseCase) return true;\n\n    const dp = new Array(s.length)\n        .fill()\n        .map(() => new Array(s.length).fill(false));\n\n    for (let i = 0; i < s.length; i++) {\n        /* Time O(N) */\n        if (isStar(s[i])) dp[i][i] = true;\n\n        const isInBound = i < s.length - 1;\n        const isOpenedOrStar = isOpened(s[i]) || isStar(s[i]);\n        const isClosedOrStar = isClosed(s[i + 1]) || isStar(s[i + 1]);\n\n        const isValid = isInBound && isOpenedOrStar && isClosedOrStar;\n        if (isValid) dp[i][i + 1] = true; /* Space O(N^2) */\n    }\n\n    for (let size = 2; size < s.length; size++) {\n        /* Time O() */\n        for (let i = 0; i + size < s.length; i++) {\n            /* Time O(N) */\n            const isStarOrDP = isStar(s[i]) && isDP(dp, i + 1, i + size);\n            if (isStarOrDP) {\n                dp[i][i + size] = true;\n                continue;\n            }\n\n            const isOpenedOrStar = isOpened(s[i]) || isStar(s[i]);\n            if (isOpenedOrStar) check(dp, size, i); /* Time O(N) */\n        }\n    }\n\n    return dp[0][s.length - 1];\n};\n\nconst check = (dp, size, i) => {\n    for (let k = i + 1; k <= i + size; k++) {\n        /* Time O(N) */\n        const isClosedOrStar = isClosed(s[k]) || isStar(s[k]);\n        const isKOrDP = isKEqual(k, i, 1) || isDP(dp, i + 1, k - 1);\n        const isKOrDPSize = isKEqual(k, i, size) || isDP(dp, k + 1, i + size);\n\n        const isValid = isClosedOrStar && isKOrDP && isKOrDPSize;\n        if (isValid) dp[i][i + size] = true; /* Space O(N^2) */\n    }\n};\n\nvar isStar = (char) => char === '*';\nvar isOpened = (char) => char === '(';\nvar isClosed = (char) => char === ')';\nconst isKEqual = (k, i, size) => k === i + size;\nconst isDP = (dp, i, k) => dp[i][k];\n\n/**\n * Time O(N) | Space O(1)\n * @param {string} s\n * @return {boolean}\n */\nvar checkValidString = function (s) {\n    let [left, right] = [0, 0];\n\n    for (const char of s) {\n        /* Time O(N) */\n        left += isOpened(char) ? 1 : -1;\n        right += !isClosed(char) ? 1 : -1;\n\n        const isNegative = right < 0;\n        if (isNegative) break;\n\n        left = Math.max(left, 0);\n    }\n\n    return left === 0;\n};\n\nvar isOpened = (char) => char === '(';\nvar isClosed = (char) => char === ')';\n",
        "python": "# Dynamic Programming: O(n^2)\nclass Solution:\n    def checkValidString(self, s: str) -> bool:\n        dp = {(len(s), 0): True}  # key=(i, leftCount) -> isValid\n\n        def dfs(i, left):\n            if i == len(s) or left < 0:\n                return left == 0\n            if (i, left) in dp:\n                return dp[(i, left)]\n\n            if s[i] == \"(\":\n                dp[(i, left)] = dfs(i + 1, left + 1)\n            elif s[i] == \")\":\n                dp[(i, left)] = dfs(i + 1, left - 1)\n            else:\n                dp[(i, left)] = (\n                    dfs(i + 1, left + 1) or dfs(i + 1, left - 1) or dfs(i + 1, left)\n                )\n            return dp[(i, left)]\n\n        return dfs(0, 0)\n\n\n# Greedy: O(n)\nclass Solution:\n    def checkValidString(self, s: str) -> bool:\n        leftMin, leftMax = 0, 0\n\n        for c in s:\n            if c == \"(\":\n                leftMin, leftMax = leftMin + 1, leftMax + 1\n            elif c == \")\":\n                leftMin, leftMax = leftMin - 1, leftMax - 1\n            else:\n                leftMin, leftMax = leftMin - 1, leftMax + 1\n            if leftMax < 0:\n                return False\n            if leftMin < 0:  # required because -> s = ( * ) (\n                leftMin = 0\n        return leftMin == 0\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Valid Parenthesis String",
          "explanation": "Valid Parenthesis String is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^3)",
      "spaceComplexity": "O(N^2)",
      "tags": [
        "Greedy"
      ],
      "hints": [
        "Use backtracking to explore all possible combinations of treating '*' as either '(', ')', or an empty string. If any combination leads to a valid string, return true.",
        "DP[i][j] represents whether the substring s[i:j] is valid.",
        "Keep track of the count of open parentheses encountered so far. If you encounter a close parenthesis, it should balance with an open parenthesis. Utilize a stack to handle this effectively.",
        "How about using 2 stacks instead of 1? Think about it."
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Greedy algorithms are correct when:",
      "options": [
        "Optimal substructure only",
        "Greedy choice property",
        "Both hold",
        "Always"
      ],
      "correct": 2,
      "explanation": "Greedy requires both: greedy choice property AND optimal substructure."
    }
  ],
  "cheatSheet": "# Greedy Strategies\n- Intervals: sort by end time\n- Activity selection: pick earliest ending\n- Fractional knapsack: sort by value/weight ratio",
  "proTips": [
    "Prove via exchange argument",
    "When greedy fails, try DP"
  ],
  "faangQuotes": [
    "\"Jump Game II requires proving why the greedy choice is safe.\" — Airbnb"
  ],
  "visualizationType": "array",
  "usage": "Used for optimization problems where making the locally optimal choice leads to a global optimum.",
  "dsInvolved": "Array",
  "sampleProblems": [
    "Jump Game",
    "Task Scheduler",
    "Gas Station"
  ]
};
