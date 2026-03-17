import { Topic } from "./types";

export const topic03: Topic = {
  "id": "topic03",
  "slug": "sliding-window",
  "title": "Sliding Window",
  "emoji": "🪟",
  "color": "#a78bfa",
  "gradient": "from-violet-500 to-violet-400",
  "layman": "Imagine looking through a window sliding along a street. Instead of re-examining every house from scratch, you add the house entering and remove the one leaving.",
  "technical": "Sliding window maintains a contiguous subarray satisfying some constraint, expanding or contracting as needed. Avoids redundant recomputation by incrementally updating window state.",
  "keyInsights": [
    "Expand right to grow window, shrink left to maintain constraint",
    "Variable-length for optimization; fixed-length for exact k-size",
    "HashMap for character frequency tracking in string windows"
  ],
  "timeComplexities": [
    {
      "operation": "Fixed Window",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    },
    {
      "operation": "Variable Window",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(k)"
    }
  ],
  "questions": [
    {
      "id": "max-subarray",
      "title": "Maximum Subarray (Kadane's)",
      "difficulty": "Easy",
      "description": "Find the subarray with the largest sum and return its sum.",
      "examples": [
        {
          "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          "output": "6",
          "explanation": "Subarray [4,-1,2,1] has sum 6."
        }
      ],
      "constraints": [
        "1 ≤ nums.length ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function maxSubArray(nums) {\n  \n}",
        "python": "def max_sub_array(nums):\n    pass"
      },
      "solution": {
        "js": "function maxSubArray(nums) {\n  let maxSum=nums[0],curSum=nums[0];\n  for(let i=1;i<nums.length;i++){\n    curSum=Math.max(nums[i],curSum+nums[i]);\n    maxSum=Math.max(maxSum,curSum);\n  }\n  return maxSum;\n}",
        "python": "def max_sub_array(nums):\n    max_sum=cur_sum=nums[0]\n    for n in nums[1:]:\n        cur_sum=max(n,cur_sum+n)\n        max_sum=max(max_sum,cur_sum)\n    return max_sum"
      },
      "testCases": [
        {
          "input": "[-2,1,-3,4,-1,2,1,-5,4]",
          "expected": "6"
        },
        {
          "input": "[1]",
          "expected": "1"
        },
        {
          "input": "[-1]",
          "expected": "-1",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "At each position: extend current subarray OR start fresh?"
      ],
      "tags": [
        "dp",
        "sliding-window",
        "greedy"
      ],
      "walkthrough": [
        {
          "title": "Kadane's key decision",
          "explanation": "At each element, ask: is it better to extend my current subarray, or start a fresh subarray here? curSum = max(nums[i], curSum + nums[i]).",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              -2,
              1,
              -3,
              4,
              -1,
              2,
              1,
              -5,
              4
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8"
            ],
            "states": [
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "insight": "If curSum + nums[i] < nums[i], the accumulated sum is negative — better to drop it and restart."
        },
        {
          "title": "i=1: Start fresh (curSum was -2)",
          "explanation": "curSum=-2, nums[1]=1. max(1, -2+1)=max(1,-1)=1. Restart! A negative prefix drags us down.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              -2,
              1,
              -3,
              4,
              -1,
              2,
              1,
              -5,
              4
            ],
            "states": [
              "eliminated",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "1": "i"
            }
          },
          "variables": {
            "curSum": 1,
            "maxSum": 1
          }
        },
        {
          "title": "i=3: Extend (4 is a big gain)",
          "explanation": "curSum=-2 (after i=2), nums[3]=4. max(4, -2+4)=max(4,2)=4. Restart again — jump to 4 directly.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              -2,
              1,
              -3,
              4,
              -1,
              2,
              1,
              -5,
              4
            ],
            "states": [
              "eliminated",
              "eliminated",
              "eliminated",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "3": "i"
            }
          },
          "variables": {
            "curSum": 4,
            "maxSum": 4
          }
        },
        {
          "title": "Subarray [4,-1,2,1] accumulates to 6",
          "explanation": "From index 3: 4→3(+(-1))→5(+2)→6(+1)→1(+(-5)→start fresh). Max was 6 at index 6.",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              -2,
              1,
              -3,
              4,
              -1,
              2,
              1,
              -5,
              4
            ],
            "states": [
              "eliminated",
              "eliminated",
              "eliminated",
              "found",
              "found",
              "found",
              "found",
              "eliminated",
              "default"
            ],
            "pointers": {
              "3": "start",
              "6": "max"
            }
          },
          "variables": {
            "maxSum": 6,
            "subarray": "[4,-1,2,1]"
          },
          "complexity": "O(n) time — single pass. O(1) space — two variables."
        }
      ]
    },
    {
      "id": "longest-substring",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "description": "Given string s, find the length of the longest substring without repeating characters.",
      "examples": [
        {
          "input": "s = \"abcabcbb\"",
          "output": "3",
          "explanation": "\"abc\" is the answer."
        }
      ],
      "constraints": [
        "0 ≤ s.length ≤ 5×10⁴"
      ],
      "starterCode": {
        "js": "function lengthOfLongestSubstring(s) {\n  const seen = new Map();\n  let left=0, max=0;\n}",
        "python": "def length_of_longest_substring(s):\n    seen={}; left=max_len=0"
      },
      "solution": {
        "js": "function lengthOfLongestSubstring(s) {\n  const seen=new Map(); let left=0,max=0;\n  for(let right=0;right<s.length;right++){\n    if(seen.has(s[right]))left=Math.max(left,seen.get(s[right])+1);\n    seen.set(s[right],right);\n    max=Math.max(max,right-left+1);\n  }\n  return max;\n}",
        "python": "def length_of_longest_substring(s):\n    seen={}; left=max_len=0\n    for right,ch in enumerate(s):\n        if ch in seen: left=max(left,seen[ch]+1)\n        seen[ch]=right\n        max_len=max(max_len,right-left+1)\n    return max_len"
      },
      "testCases": [
        {
          "input": "\"abcabcbb\"",
          "expected": "3"
        },
        {
          "input": "\"bbbbb\"",
          "expected": "1"
        },
        {
          "input": "\"pwwkew\"",
          "expected": "3",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(min(m,n))",
      "hints": [
        "Track last seen index of each character.",
        "Move left past the duplicate when found."
      ],
      "tags": [
        "sliding-window",
        "hash-map",
        "string"
      ],
      "walkthrough": [
        {
          "title": "Expand window to the right",
          "explanation": "Use a HashMap storing last seen index of each character. Expand right pointer. If we see a duplicate, jump left past the previous occurrence.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              "a",
              "b",
              "c",
              "a",
              "b",
              "c",
              "b",
              "b"
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7"
            ],
            "states": [
              "active",
              "active",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "0": "L",
              "2": "R"
            }
          },
          "variables": {
            "window": "\"abc\"",
            "length": 3,
            "max": 3
          }
        },
        {
          "title": "Hit duplicate \"a\" at index 3",
          "explanation": "seen[\"a\"]=0. left=max(0, 0+1)=1. Skip past the old \"a\". Window is now \"bca\" (indices 1-3).",
          "phase": "compare",
          "visual": {
            "type": "array",
            "array": [
              "a",
              "b",
              "c",
              "a",
              "b",
              "c",
              "b",
              "b"
            ],
            "states": [
              "eliminated",
              "active",
              "active",
              "active",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "1": "L",
              "3": "R"
            },
            "mapEntries": [
              {
                "key": "a",
                "value": 3
              },
              {
                "key": "b",
                "value": 1
              },
              {
                "key": "c",
                "value": 2
              }
            ]
          },
          "variables": {
            "left": 1,
            "right": 3,
            "max": 3
          },
          "insight": "We jump left to seen[char]+1, not just left+1. This handles cases like \"abba\" where the duplicate is far back."
        },
        {
          "title": "Final result",
          "explanation": "After full scan of \"abcabcbb\", max window length was 3 (e.g. \"abc\"). The pointer jump ensures we never shrink left past a valid position.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              "a",
              "b",
              "c",
              "a",
              "b",
              "c",
              "b",
              "b"
            ],
            "states": [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited"
            ]
          },
          "variables": {
            "maxLength": 3
          },
          "complexity": "O(n) — right pointer advances once; left only moves forward. O(min(m,n)) space."
        }
      ]
    },
    {
      "id": "min-window-substring",
      "title": "Minimum Window Substring",
      "difficulty": "Hard",
      "description": "Return the minimum window substring of s that contains every character in t.",
      "examples": [
        {
          "input": "s=\"ADOBECODEBANC\", t=\"ABC\"",
          "output": "\"BANC\""
        }
      ],
      "constraints": [
        "1 ≤ s.length, t.length ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function minWindow(s, t) {\n  \n}",
        "python": "def min_window(s, t):\n    pass"
      },
      "solution": {
        "js": "function minWindow(s,t){\n  const need=new Map(),have=new Map();\n  for(const c of t)need.set(c,(need.get(c)||0)+1);\n  let formed=0,req=need.size,l=0,res='',resLen=Infinity;\n  for(let r=0;r<s.length;r++){\n    const c=s[r];have.set(c,(have.get(c)||0)+1);\n    if(need.has(c)&&have.get(c)===need.get(c))formed++;\n    while(formed===req){\n      if(r-l+1<resLen){resLen=r-l+1;res=s.slice(l,r+1);}\n      const lc=s[l];have.set(lc,have.get(lc)-1);\n      if(need.has(lc)&&have.get(lc)<need.get(lc))formed--;\n      l++;\n    }\n  }\n  return res;\n}",
        "python": "from collections import Counter\ndef min_window(s,t):\n    need=Counter(t);have={};formed=req=len(need);l=0;res='';res_len=float('inf')\n    for r,c in enumerate(s):\n        have[c]=have.get(c,0)+1\n        if c in need and have[c]==need[c]: formed-=1\n        while formed==0:\n            if r-l+1<res_len: res_len=r-l+1;res=s[l:r+1]\n            lc=s[l];have[lc]-=1\n            if lc in need and have[lc]<need[lc]: formed+=1\n            l+=1\n    return res"
      },
      "testCases": [
        {
          "input": "\"ADOBECODEBANC\"\n\"ABC\"",
          "expected": "\"BANC\""
        },
        {
          "input": "\"a\"\n\"a\"",
          "expected": "\"a\""
        },
        {
          "input": "\"a\"\n\"aa\"",
          "expected": "\"\"",
          "hidden": true
        }
      ],
      "timeComplexity": "O(|s|+|t|)",
      "spaceComplexity": "O(|s|+|t|)",
      "hints": [
        "Track how many unique t-characters are fully satisfied.",
        "Shrink window from left when all are satisfied."
      ],
      "tags": [
        "sliding-window",
        "hash-map"
      ],
      "walkthrough": [
        {
          "title": "Track character requirements",
          "explanation": "Build need={A:1,B:1,C:1} from t=\"ABC\". \"formed\" counts how many unique characters in t are fully satisfied in our current window.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              "A",
              "D",
              "O",
              "B",
              "E",
              "C",
              "O",
              "D",
              "E",
              "B",
              "A",
              "N",
              "C"
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "variables": {
            "need": "{A:1,B:1,C:1}",
            "formed": 0,
            "required": 3
          }
        },
        {
          "title": "Expand right until all satisfied",
          "explanation": "Expand right. At r=5 (\"C\"), we have A✓ B✓ C✓ → formed=3=required. Window \"ADOBEC\" contains all of t.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              "A",
              "D",
              "O",
              "B",
              "E",
              "C",
              "O",
              "D",
              "E",
              "B",
              "A",
              "N",
              "C"
            ],
            "states": [
              "active",
              "active",
              "active",
              "active",
              "active",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "0": "L",
              "5": "R"
            }
          },
          "variables": {
            "window": "\"ADOBEC\"",
            "formed": 3,
            "length": 6
          }
        },
        {
          "title": "Shrink left to minimize window",
          "explanation": "While all required chars are satisfied, try to shrink. Remove \"A\" from left — formed drops back to 2. Best window so far was \"ADOBEC\" (6 chars).",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              "A",
              "D",
              "O",
              "B",
              "E",
              "C",
              "O",
              "D",
              "E",
              "B",
              "A",
              "N",
              "C"
            ],
            "states": [
              "eliminated",
              "active",
              "active",
              "active",
              "active",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "1": "L",
              "5": "R"
            }
          },
          "variables": {
            "left": 1,
            "best": "\"ADOBEC\"",
            "bestLen": 6
          }
        },
        {
          "title": "Final answer: \"BANC\"",
          "explanation": "After full scan, the minimum window is \"BANC\" (indices 9-12, length 4). This is shorter than \"ADOBEC\".",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              "A",
              "D",
              "O",
              "B",
              "E",
              "C",
              "O",
              "D",
              "E",
              "B",
              "A",
              "N",
              "C"
            ],
            "states": [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "result",
              "result",
              "result",
              "result"
            ],
            "pointers": {
              "9": "L",
              "12": "R"
            }
          },
          "variables": {
            "answer": "\"BANC\"",
            "length": 4
          },
          "complexity": "O(|s|+|t|) — both pointers traverse s once. Space O(|s|+|t|)."
        }
      ]
    },
    {
      "id": "best-time-to-buy-sell-stock",
      "title": "Best Time to Buy and Sell Stock",
      "difficulty": "Easy",
      "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
      "examples": [
        {
          "input": "prices = [7,1,5,3,6,4]",
          "output": "5"
        }
      ],
      "constraints": [
        "1 ≤ prices.length ≤ 10^5"
      ],
      "starterCode": {
        "js": "function maxProfit(prices) {\n  \n}",
        "python": "def max_profit(prices):\n    pass"
      },
      "solution": {
        "js": "function maxProfit(prices) {\n  let minPrice = Infinity, maxProf = 0;\n  for (let p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxProf = Math.max(maxProf, p - minPrice);\n  }\n  return maxProf;\n}",
        "python": "def max_profit(prices):\n    min_price, max_prof = float('inf'), 0\n    for p in prices:\n        min_price = min(min_price, p)\n        max_prof = max(max_prof, p - min_price)\n    return max_prof"
      },
      "testCases": [
        {
          "input": "[7,1,5,3,6,4]",
          "expected": "5"
        },
        {
          "input": "[7,6,4,3,1]",
          "expected": "0"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Keep track of the minimum price seen so far."
      ],
      "tags": [
        "sliding-window",
        "array",
        "dynamic-programming"
      ],
      "walkthrough": []
    },
    {
      "id": "best-time-to-buy-and-sell-stock",
      "title": "Best Time to Buy and Sell Stock",
      "difficulty": "Easy",
      "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\n \nExample 1:\n\n\n<strong>Input:</strong> prices = [7,1,5,3,6,4]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\n\n\nExample 2:\n\n\n<strong>Input:</strong> prices = [7,6,4,3,1]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> In this case, no transactions are done and the max profit = 0.\n\n\n \nConstraints:\n\n\n\t1 <= prices.length <= 105\n\t0 <= prices[i] <= 104",
      "examples": [
        {
          "input": "[7,1,5,3,6,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[7,6,4,3,1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function bestTimeToBuyAndSellStock(input) {\n  // Your code here\n}",
        "python": "def best_time_to_buy_and_sell_stock(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/\n * Time O(N) | Space O(1)\n * @param {number} prices\n * @return {number}\n */\nvar maxProfit = function (prices) {\n    let [left, right, max] = [0, 1, 0];\n\n    while (right < prices.length) {\n        const canSlide = prices[right] <= prices[left];\n        if (canSlide) left = right;\n\n        const window = prices[right] - prices[left];\n\n        max = Math.max(max, window);\n        right++;\n    }\n\n    return max;\n};\n\n/**\n * Another approach without using sliding window\n * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/\n * Time O(N) | Space O(1)\n * @param {number} prices\n * @return {number}\n */\n\nvar maxProfit = function (prices) {\n    let min = prices[0];\n    let max = min;\n    let value = 0;\n    for (let i = 0; i < prices.length; i++) {\n        if (i != prices.length - 1 && prices[i] <= min) {\n            max = min = prices[i];\n        } else if (prices[i] > max) {\n            max = prices[i];\n        }\n        value = max - min > value ? max - min : value;\n    }\n    return value;\n};\n",
        "python": "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        res = 0\n        \n        lowest = prices[0]\n        for price in prices:\n            if price < lowest:\n                lowest = price\n            res = max(res, price - lowest)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Best Time to Buy and Sell Stock",
          "explanation": "Best Time to Buy and Sell Stock is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Sliding Window"
      ],
      "hints": []
    },
    {
      "id": "longest-substring-without-repeating-characters",
      "title": "Longest Substring Without Repeating Characters",
      "difficulty": "Medium",
      "description": "Given a string s, find the length of the longest substring without duplicate characters.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"abcabcbb\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is \"abc\", with the length of 3. Note that <code>\"bca\"</code> and <code>\"cab\"</code> are also correct answers.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"bbbbb\"\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The answer is \"b\", with the length of 1.\n\n\nExample 3:\n\n\n<strong>Input:</strong> s = \"pwwkew\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.\n\n\n \nConstraints:\n\n\n\t0 <= s.length <= 5 * 104\n\ts consists of English letters, digits, symbols and spaces.",
      "examples": [
        {
          "input": "\"abcabcbb\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"bbbbb\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"pwwkew\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestSubstringWithoutRepeatingCharacters(input) {\n  // Your code here\n}",
        "python": "def longest_substring_without_repeating_characters(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/longest-substring-without-repeating-characters/\n * Time O(N) | Space O(N)\n * @param {string} s\n * @return {number}\n */\n\nvar lengthOfLongestSubstring = function (s) {\n    const set = new Set();\n    let l = 0;\n    let max = 0;\n\n    for (let r = 0; r < s.length; r++) {\n        while (set.has(s[r])) {\n            set.delete(s[l]);\n            l++;\n        }\n        set.add(s[r]);\n        max = Math.max(max, set.size);\n    }\n    return max;\n};\n",
        "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        charSet = set()\n        l = 0\n        res = 0\n\n        for r in range(len(s)):\n            while s[r] in charSet:\n                charSet.remove(s[l])\n                l += 1\n            charSet.add(s[r])\n            res = max(res, r - l + 1)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Substring Without Repeating Characters",
          "explanation": "Longest Substring Without Repeating Characters is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Sliding Window"
      ],
      "hints": [
        "Since maximum string size is at most 26, generate and check all possible substrings with length at most 26."
      ]
    },
    {
      "id": "longest-repeating-character-replacement",
      "title": "Longest Repeating Character Replacement",
      "difficulty": "Medium",
      "description": "You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"ABAB\", k = 2\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the two 'A's with two 'B's or vice versa.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"AABABBA\", k = 1\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> Replace the one 'A' in the middle with 'B' and form \"AABBBBA\".\nThe substring \"BBBB\" has the longest repeating letters, which is 4.\nThere may exists other ways to achieve this answer too.\n\n \nConstraints:\n\n\n\t1 <= s.length <= 105\n\ts consists of only uppercase English letters.\n\t0 <= k <= s.length",
      "examples": [
        {
          "input": "\"ABAB\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"AABABBA\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestRepeatingCharacterReplacement(input) {\n  // Your code here\n}",
        "python": "def longest_repeating_character_replacement(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/longest-repeating-character-replacement/\n * Time O(((N + 26) * N) * (M - N)) | Space O(1)\n * @param {string} s\n * @param {number} k\n * @return {number}\n */\nvar characterReplacement = function (s, k) {\n    let res = 0;\n    let count = new Map();\n    let l = 0;\n\n    for (let r = 0; r < s.length; r++) {\n        let len = r - l + 1;\n        count.set(s[r], 1 + (count.get(s[r]) || 0));\n\n        if (len - Math.max(...count.values()) > k) {\n            count.set(s[l], count.get(s[l]) - 1);\n            l++;\n        }\n        len = r - l + 1;\n        res = Math.max(res, len);\n    }\n\n    return res;\n};\n\n/**\n * https://leetcode.com/problems/longest-repeating-character-replacement/\n * Time O(((N + 26) * N) * (M - N)) | Space O(1)\n * @param {string} s\n * @param {number} k\n * @return {number}\n */\nvar characterReplacement = function (s, k) {\n    let [left, right, longest, max] = new Array(4).fill(0);\n    const frequencyMap = new Array(26).fill(0);\n\n    while (right < s.length) {\n        const count = addRightFrequency(s, right, frequencyMap);\n\n        longest = Math.max(longest, count);\n\n        let window = right - left + 1;\n        const canSlide = k < window - longest;\n        if (canSlide) {\n            subtractLeftFrequency(s, left, frequencyMap);\n            left++;\n        }\n\n        window = right - left + 1;\n        max = Math.max(max, window);\n\n        right++;\n    }\n\n    return max;\n};\n\nconst addRightFrequency = (s, right, map) => {\n    const char = s[right];\n    const index = getCode(char);\n\n    map[index]++;\n\n    return map[index];\n};\n\nconst subtractLeftFrequency = (s, left, map) => {\n    const char = s[left];\n    const index = getCode(char);\n\n    map[index]--;\n\n    return map[index];\n};\n\nconst getCode = (char) => char.charCodeAt(0) - 'A'.charCodeAt(0);\n",
        "python": "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        count = {}\n        \n        l = 0\n        maxf = 0\n        for r in range(len(s)):\n            count[s[r]] = 1 + count.get(s[r], 0)\n            maxf = max(maxf, count[s[r]])\n\n            if (r - l + 1) - maxf > k:\n                count[s[l]] -= 1\n                l += 1\n\n        return (r - l + 1)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Repeating Character Replacement",
          "explanation": "Longest Repeating Character Replacement is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(((N + 26)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Sliding Window"
      ],
      "hints": []
    },
    {
      "id": "permutation-in-string",
      "title": "Permutation in String",
      "difficulty": "Medium",
      "description": "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.\n\nIn other words, return true if one of s1's permutations is the substring of s2.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s1 = \"ab\", s2 = \"eidbaooo\"\n<strong>Output:</strong> true\n<strong>Explanation:</strong> s2 contains one permutation of s1 (\"ba\").\n\n\nExample 2:\n\n\n<strong>Input:</strong> s1 = \"ab\", s2 = \"eidboaoo\"\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\t1 <= s1.length, s2.length <= 104\n\ts1 and s2 consist of lowercase English letters.",
      "examples": [
        {
          "input": "\"ab\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"eidbaooo\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"ab\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function permutationInString(input) {\n  // Your code here\n}",
        "python": "def permutation_in_string(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/permutation-in-string/\n * Time O(N + (M - N)) | Space O(1)\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nvar checkInclusion = (s1, s2) => {\n    const isInvalid = s2.length < s1.length;\n    if (isInvalid) return false;\n\n    let [left, right] = [0, 0];\n    const [s1FrequencyMap, s2FrequencyMap] = getFrequencyMaps(s1);\n\n    while (right < s2.length) {\n        addRightFrequency(s2, right, s2FrequencyMap);\n\n        const window = right - left + 1;\n        const isPermutation =\n            window === s1.length && isSame(s1FrequencyMap, s2FrequencyMap);\n        if (isPermutation) return true;\n\n        const canSlide = s1.length <= window;\n        if (canSlide) {\n            subtractLeftFrequency(s2, left, s2FrequencyMap);\n            left++;\n        }\n\n        right++;\n    }\n\n    return false;\n};\n\nconst getFrequencyMaps = (s1) => {\n    const [s1FrequencyMap, s2FrequencyMap] = new Array(2)\n        .fill()\n        .map(() => new Array(26).fill(0));\n\n    for (const char of s1) s1FrequencyMap[getCode(char)]++;\n\n    return [s1FrequencyMap, s2FrequencyMap];\n};\n\nconst getCode = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);\n\nconst addRightFrequency = (s, right, frequencyMap) => {\n    const char = s[right];\n    const index = getCode(char);\n\n    frequencyMap[index]++;\n\n    return frequencyMap[index];\n};\n\nconst subtractLeftFrequency = (s, left, frequencyMap) => {\n    const char = s[left];\n    const index = getCode(char);\n\n    frequencyMap[index]--;\n\n    return frequencyMap[index];\n};\n\nconst isSame = (a, b) => {\n    for (let i = 0; i < 26; i++) {\n        const isMatch = a[i] === b[i];\n        if (!isMatch) return false;\n    }\n\n    return true;\n};\n\n//////////////////////////////////////////////////////////////////////////////\n// Static Sliding Window\n// Time: Theta(l1 + l2) O(l1 + l2)  Space: Theta(1) O(1)\n// Highest performing solution. Simply builds a map of the character counts\n// for `s1` and `s1.length` of `s2` whose characters are within `s1`, updates\n// the `s2` character map as it slides from the beginning of `s2` to the end\n// of `s2`, and returns upon verifying a match between the `s1` and `s2`\n// character maps.\n//////////////////////////////////////////////////////////////////////////////\n\n/**\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nfunction checkInclusion(s1, s2) {\n    if (s1.length > s2.length) {\n        return false;\n    }\n\n    const s1Chars = Object.create(null);\n    const s2Chars = Object.create(null);\n\n    for (const ch of s1) {\n        if (!(ch in s1Chars)) {\n            s1Chars[ch] = 0;\n            s2Chars[ch] = 0;\n        }\n        ++s1Chars[ch];\n    }\n\n    for (let i = 0; i < s1.length; ++i) {\n        const ch = s2[i];\n        if (ch in s1Chars) {\n            ++s2Chars[ch];\n        }\n    }\n\n    let matches = 0;\n    let matched = 0;\n\n    for (const ch in s1Chars) {\n        if (s1Chars[ch] === s2Chars[ch]) {\n            ++matches;\n        }\n        ++matched;\n    }\n\n    const last = s2.length - s1.length;\n\n    for (let i = 0; i < last; ++i) {\n        if (matches === matched) {\n            return true;\n        }\n\n        const ch1 = s2[i];\n        const ch2 = s2[i + s1.length];\n\n        if (ch1 in s1Chars) {\n            if (s1Chars[ch1] === s2Chars[ch1]--) {\n                --matches;\n            } else if (s1Chars[ch1] === s2Chars[ch1]) {\n                ++matches;\n            }\n        }\n\n        if (ch2 in s1Chars) {\n            if (s1Chars[ch2] === s2Chars[ch2]++) {\n                --matches;\n            } else if (s1Chars[ch2] === s2Chars[ch2]) {\n                ++matches;\n            }\n        }\n    }\n\n    return matches === matched;\n}\n\n//////////////////////////////////////////////////////////////////////////////\n// Optimized Backtracking\n// Time: Theta(l1 + l2) O(l1 + l2^2)  Space: Theta(l1) O(l1)\n// This solution passes the tests, but it is much slower than other passing\n// solutions. At each possible beginning character of `s1` within `s2` a fresh\n// map is created and a second pointer increments until it either matches `s1`\n// or fails and moves the first and second pointer to the next available\n// matching index.\n//////////////////////////////////////////////////////////////////////////////\n\n/**\n * @param {string} s1\n * @param {string} s2\n * @return {boolean}\n */\nfunction checkInclusion(s1, s2) {\n    if (s1.length > s2.length) {\n        return false;\n    }\n\n    const s1Chars = Object.create(null);\n\n    for (const ch of s1) {\n        if (!(ch in s1Chars)) {\n            s1Chars[ch] = 0;\n        }\n        ++s1Chars[ch];\n    }\n\n    const last = s2.length - s1.length;\n    let i = 0;\n\n    while (i <= last) {\n        while (i <= last && !(s2[i] in s1Chars)) {\n            ++i;\n        }\n\n        if (i > last) {\n            return false;\n        }\n\n        const subChars = Object.create(null);\n        let j = i;\n\n        while (j < s2.length && s2[j] in s1Chars) {\n            const ch = s2[j];\n\n            if (!(ch in subChars)) {\n                subChars[ch] = 0;\n            }\n            ++subChars[ch];\n\n            if (subChars[ch] > s1Chars[ch]) {\n                break;\n            }\n\n            ++j;\n        }\n\n        if (s1.length === j - i) {\n            return true;\n        }\n\n        if (j < s2.length && s2[j] in s1Chars) {\n            while (s2[i] !== s2[j]) {\n                ++i;\n            }\n            ++i;\n        } else {\n            i = j;\n        }\n    }\n\n    return false;\n}\n",
        "python": "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        if len(s1) > len(s2):\n            return False\n\n        s1Count, s2Count = [0] * 26, [0] * 26\n        for i in range(len(s1)):\n            s1Count[ord(s1[i]) - ord(\"a\")] += 1\n            s2Count[ord(s2[i]) - ord(\"a\")] += 1\n\n        matches = 0\n        for i in range(26):\n            matches += 1 if s1Count[i] == s2Count[i] else 0\n\n        l = 0\n        for r in range(len(s1), len(s2)):\n            if matches == 26:\n                return True\n\n            index = ord(s2[r]) - ord(\"a\")\n            s2Count[index] += 1\n            if s1Count[index] == s2Count[index]:\n                matches += 1\n            elif s1Count[index] + 1 == s2Count[index]:\n                matches -= 1\n\n            index = ord(s2[l]) - ord(\"a\")\n            s2Count[index] -= 1\n            if s1Count[index] == s2Count[index]:\n                matches += 1\n            elif s1Count[index] - 1 == s2Count[index]:\n                matches -= 1\n            l += 1\n        return matches == 26\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Permutation in String",
          "explanation": "Permutation in String is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N + (M - N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Sliding Window"
      ],
      "hints": [
        "Obviously, brute force will result in TLE. Think of something else.",
        "How will you check whether one string is a permutation of another string?",
        "One way is to sort the string and then compare. But, Is there a better way?",
        "If one string is a permutation of another string then they must have one common metric. What is that?",
        "Both strings must have same character frequencies, if  one is permutation of another. Which data structure should be used to store frequencies?",
        "What about hash table?  An array of size 26?"
      ]
    },
    {
      "id": "minimum-window-substring",
      "title": "Minimum Window Substring",
      "difficulty": "Hard",
      "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".\n\nThe testcases will be generated such that the answer is unique.\n\n \nExample 1:\n\n\n<strong>Input:</strong> s = \"ADOBECODEBANC\", t = \"ABC\"\n<strong>Output:</strong> \"BANC\"\n<strong>Explanation:</strong> The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t.\n\n\nExample 2:\n\n\n<strong>Input:</strong> s = \"a\", t = \"a\"\n<strong>Output:</strong> \"a\"\n<strong>Explanation:</strong> The entire string s is the minimum window.\n\n\nExample 3:\n\n\n<strong>Input:</strong> s = \"a\", t = \"aa\"\n<strong>Output:</strong> \"\"\n<strong>Explanation:</strong> Both 'a's from t must be included in the window.\nSince the largest window of s only has one 'a', return empty string.\n\n\n \nConstraints:\n\n\n\tm == s.length\n\tn == t.length\n\t1 <= m, n <= 105\n\ts and t consist of uppercase and lowercase English letters.\n\n\n \nFollow up: Could you find an algorithm that runs in O(m + n) time?",
      "examples": [
        {
          "input": "\"ADOBECODEBANC\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"ABC\"",
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
        "js": "function minimumWindowSubstring(input) {\n  // Your code here\n}",
        "python": "def minimum_window_substring(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/minimum-window-substring/\n * Time O(N + M) | SpaceO(N + M)\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function (s, t) {\n    const isMissingArgs = !s.length || !t.length;\n    if (isMissingArgs) return '';\n\n    const frequencyMap = getFrequencyMap(t);\n    const { start, end } = getWindowPointers(s, t, frequencyMap);\n\n    return getSubString(s, start, end);\n};\n\nconst getFrequencyMap = (str, frequencyMap = new Map()) => {\n    for (const char of str) {\n        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);\n    }\n\n    return frequencyMap;\n};\n\nconst getWindowPointers = (s, t, frequencyMap) => {\n    let [left, right, matched, start, end] = [0, 0, 0, 0, s.length + 1];\n\n    while (right < s.length) {\n        matched = addRightFrequency(s, right, frequencyMap, matched);\n\n        const canSlide = () => matched === t.length;\n        while (canSlide()) {\n            const window = right - left + 1;\n\n            const isSmaller = window < end;\n            if (isSmaller) {\n                [start, end] = [left, window];\n            }\n\n            matched = subtractLeftFrequency(s, left, frequencyMap, matched);\n            left++;\n        }\n\n        right++;\n    }\n\n    return { start, end };\n};\n\nconst addRightFrequency = (s, right, frequencyMap, matched) => {\n    const char = s[right];\n\n    if (frequencyMap.has(char)) {\n        frequencyMap.set(char, frequencyMap.get(char) - 1);\n\n        const isInWindow = 0 <= frequencyMap.get(char);\n        if (isInWindow) matched++;\n    }\n\n    return matched;\n};\n\nconst subtractLeftFrequency = (s, left, frequencyMap, matched) => {\n    const char = s[left];\n\n    if (frequencyMap.has(char)) {\n        const isOutOfWindow = frequencyMap.get(char) === 0;\n        if (isOutOfWindow) matched--;\n\n        frequencyMap.set(char, frequencyMap.get(char) + 1);\n    }\n\n    return matched;\n};\n\nconst getSubString = (s, start, end) =>\n    end <= s.length ? s.slice(start, start + end) : '';\n",
        "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if len(s) < len(t):\n            return \"\"\n\n        countT, window = {}, {}\n        for c in t:\n            countT[c] = 1 + countT.get(c, 0)\n\n        have, need = 0, len(countT)\n        res, resLen = [-1, -1], float(\"infinity\")\n        l = 0\n        for r in range(len(s)):\n            c = s[r]\n            window[c] = 1 + window.get(c, 0)\n\n            if c in countT and window[c] == countT[c]:\n                have += 1\n\n            while have == need:\n                # update our result\n                if (r - l + 1) < resLen:\n                    res = [l, r]\n                    resLen = r - l + 1\n                # pop from the left of our window\n                window[s[l]] -= 1\n                if s[l] in countT and window[s[l]] < countT[s[l]]:\n                    have -= 1\n                l += 1\n        l, r = res\n        return s[l : r + 1] if resLen != float(\"infinity\") else \"\"\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Minimum Window Substring",
          "explanation": "Minimum Window Substring is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N + M)",
      "spaceComplexity": "O(N + M)",
      "tags": [
        "Sliding Window"
      ],
      "hints": [
        "Use two pointers to create a window of letters in s, which would have all the characters from t.",
        "Expand the right pointer until all the characters of t are covered.",
        "Once all the characters are covered, move the left pointer and ensure that all the characters are still covered to minimize the subarray size.",
        "Continue expanding the right and left pointers until you reach the end of s."
      ]
    },
    {
      "id": "sliding-window-maximum",
      "title": "Sliding Window Maximum",
      "difficulty": "Hard",
      "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [1,3,-1,-3,5,3,6,7], k = 3\n<strong>Output:</strong> [3,3,5,5,6,7]\n<strong>Explanation:</strong> \nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       <strong>3</strong>\n 1 [3  -1  -3] 5  3  6  7       <strong>3</strong>\n 1  3 [-1  -3  5] 3  6  7      <strong> 5</strong>\n 1  3  -1 [-3  5  3] 6  7       <strong>5</strong>\n 1  3  -1  -3 [5  3  6] 7       <strong>6</strong>\n 1  3  -1  -3  5 [3  6  7]      <strong>7</strong>\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [1], k = 1\n<strong>Output:</strong> [1]\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 105\n\t-104 <= nums[i] <= 104\n\t1 <= k <= nums.length",
      "examples": [
        {
          "input": "[1,3,-1,-3,5,3,6,7]",
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
        "js": "function slidingWindowMaximum(input) {\n  // Your code here\n}",
        "python": "def sliding_window_maximum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nfunction Node(value) {\n    this.value = value;\n    this.prev = null;\n    this.next = null;\n}\n\nfunction Deque() {\n    this.left = null;\n    this.right = null;\n    this.size = 0;\n    this.pushRight = function (value) {\n        const node = new Node(value);\n        if (this.size == 0) {\n            this.left = node;\n            this.right = node;\n        } else {\n            this.right.next = node;\n            node.prev = this.right;\n            this.right = node;\n        }\n        this.size++;\n        return this.size;\n    };\n    this.popRight = function () {\n        if (this.size == 0) return null;\n        const removedNode = this.right;\n        this.right = this.right.prev;\n        if (this.right) this.right.next = null;\n        this.size--;\n        return removedNode;\n    };\n    this.pushLeft = function (value) {\n        const node = new Node(value);\n        if (this.size == 0) {\n            this.left = node;\n            this.right = node;\n        } else {\n            this.left.prev = node;\n            node.next = this.left;\n            this.left = node;\n        }\n        this.size++;\n        return this.size;\n    };\n    this.popLeft = function () {\n        if (this.size == 0) return null;\n        const removedNode = this.left;\n        this.left = this.left.next;\n        if (this.left) this.left.prev = null;\n        this.size--;\n        return removedNode;\n    };\n}\n\nvar maxSlidingWindow = function (nums, k) {\n    const output = [];\n    let deque = new Deque();\n    let left = 0;\n    let right = 0;\n\n    while (right < nums.length) {\n        // pop smaller values from q\n        while (deque.right && nums[deque.right.value] < nums[right])\n            deque.popRight();\n        deque.pushRight(right);\n\n        // remove left val from window\n        if (left > deque.left.value) deque.popLeft();\n\n        if (right + 1 >= k) {\n            output.push(nums[deque.left.value]);\n            left++;\n        }\n        right++;\n    }\n    return output;\n};\n\n/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\n\n// Deque Implementation using Lazy Deletion\nclass LazyDeletionDeque {\n    constructor() {\n        this.deque = [];\n        this.leftIdx = 0;\n    }\n\n    isEmpty = () => {\n        return this.deque.length === this.leftIdx;\n    };\n    push = (num) => {\n        this.deque.push(num);\n    };\n    popFront = () => {\n        this.leftIdx++;\n    };\n    popBack = () => {\n        !this.isEmpty() && this.deque.pop();\n    };\n    front = () => {\n        return this.deque[this.leftIdx];\n    };\n    back = () => {\n        return this.deque[this.deque.length - 1];\n    };\n}\n\nvar maxSlidingWindowWithLazyDeletionDeque = function (nums, k) {\n    const deque = new LazyDeletionDeque();\n    const answer = [];\n    let leftWindow = 0;\n    for (let rightWindow = 0; rightWindow < nums.length; rightWindow++) {\n        const rightNum = nums[rightWindow];\n        while (!deque.isEmpty() && rightNum > deque.back()) {\n            deque.popBack();\n        }\n        deque.push(rightNum);\n\n        if (rightWindow >= k - 1) {\n            const dequeFront = deque.front();\n            const leftNum = nums[leftWindow];\n            if (leftNum === dequeFront) {\n                deque.popFront();\n            }\n            answer.push(dequeFront);\n            leftWindow++;\n        }\n    }\n    return answer;\n};\n",
        "python": "class Solution:\n    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:\n        output = []\n        q = collections.deque()  # index\n        l = r = 0\n        # O(n) O(n)\n        while r < len(nums):\n            # pop smaller values from q\n            while q and nums[q[-1]] < nums[r]:\n                q.pop()\n            q.append(r)\n\n            # remove left val from window\n            if l > q[0]:\n                q.popleft()\n\n            if (r + 1) >= k:\n                output.append(nums[q[0]])\n                l += 1\n            r += 1\n\n        return output\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Sliding Window Maximum",
          "explanation": "Sliding Window Maximum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Sliding Window"
      ],
      "hints": [
        "How about using a data structure such as deque (double-ended queue)?",
        "The queue size need not be the same as the window’s size.",
        "Remove redundant elements and the queue should store only elements that need to be considered."
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "When should you use variable vs fixed sliding window?",
      "options": [
        "Always fixed",
        "Fixed for exact k-size, variable for optimal",
        "Always variable",
        "Depends on memory"
      ],
      "correct": 1,
      "explanation": "Fixed when you need exactly k elements. Variable when optimizing with a constraint."
    }
  ],
  "cheatSheet": "# Sliding Window\n```js\nlet l=0,max=0;\nfor(let r=0;r<n;r++){\n  // add s[r]\n  while(invalid){l++;}\n  max=Math.max(max,r-l+1);\n}\n```",
  "proTips": [
    "Identify the window constraint first",
    "For string problems, track char frequencies with a Map"
  ],
  "faangQuotes": [
    "\"Minimum Window Substring is our favorite screening question.\" — Google"
  ],
  "usefulLinks": [
    {
      "title": "Sliding Window Pattern",
      "url": "https://leetcode.com/discuss/general-discussion/1122776/summary-of-sliding-window-patterns"
    }
  ],
  "visualizationType": "array",
  "usage": "This algorithmic technique is used when we need to handle the input data in a specific window size.",
  "dsInvolved": "Array, String, HashTable",
  "sampleProblems": [
    "Longest Substring with 'K' Distinct Characters",
    "Fruits into Baskets"
  ]
};
