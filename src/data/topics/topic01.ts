import { Topic } from "./types";

export const topic01: Topic = {
  "id": "topic01",
  "slug": "arrays-hashing",
  "title": "Arrays & Hashing",
  "emoji": "🗃️",
  "color": "#0ea5e9",
  "gradient": "from-ocean-500 to-ocean-400",
  "layman": "Think of an array like a numbered row of lockers. You can instantly open locker #42 without checking every locker first. Hashing is like a magical index card that tells you EXACTLY which locker holds your item.",
  "technical": "Arrays provide O(1) random access via direct memory addressing. Hash maps achieve amortized O(1) insert/lookup using hash functions + collision resolution. Key insight: trade space for time by caching computed results.",
  "keyInsights": [
    "HashMap reduces O(n²) brute force to O(n) by storing complements",
    "Frequency maps enable counting problems in linear time",
    "Two-pass or one-pass hash techniques for complement problems",
    "Modular hashing: h(k) = k mod m where m is prime"
  ],
  "timeComplexities": [
    {
      "operation": "Array Access",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(1)",
      "space": "O(1)"
    },
    {
      "operation": "HashMap Insert",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(n)",
      "space": "O(n)"
    },
    {
      "operation": "HashMap Lookup",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "two-sum",
      "title": "Two Sum",
      "difficulty": "Easy",
      "description": "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Each input has exactly one solution; you may not use the same element twice.",
      "examples": [
        {
          "input": "nums = [2,7,11,15], target = 9",
          "output": "[0,1]",
          "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
        },
        {
          "input": "nums = [3,2,4], target = 6",
          "output": "[1,2]"
        }
      ],
      "constraints": [
        "2 ≤ nums.length ≤ 10⁴",
        "-10⁹ ≤ nums[i] ≤ 10⁹"
      ],
      "starterCode": {
        "js": "function twoSum(nums, target) {\n  // Your solution here\n}",
        "python": "def two_sum(nums, target):\n    pass"
      },
      "solution": {
        "js": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}",
        "python": "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n    return []"
      },
      "testCases": [
        {
          "input": "[2,7,11,15]\n9",
          "expected": "[0,1]"
        },
        {
          "input": "[3,2,4]\n6",
          "expected": "[1,2]"
        },
        {
          "input": "[3,3]\n6",
          "expected": "[0,1]"
        },
        {
          "input": "[-1,-2,-3,-4]\n-7",
          "expected": "[2,3]",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "For each number, what value would complete the pair?",
        "Store seen numbers in a HashMap for O(1) lookup."
      ],
      "tags": [
        "hash-map",
        "array",
        "one-pass"
      ],
      "walkthrough": [
        {
          "title": "Understand the problem",
          "explanation": "We have nums=[2,7,11,15] and target=9. We need to find two indices whose values sum to 9. Brute force checks every pair — O(n²). Can we do better?",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              2,
              7,
              11,
              15
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "insight": "Key question: for each number x, we need target-x. If we could look that up instantly, we'd solve it in one pass."
        },
        {
          "title": "Initialize HashMap",
          "explanation": "Create an empty HashMap. We'll store { value → index } as we scan. This lets us check in O(1) if the complement of any element has already been seen.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              2,
              7,
              11,
              15
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default"
            ],
            "mapEntries": []
          },
          "code": "const map = new Map();\nfor (let i = 0; i < nums.length; i++) {\n  const complement = target - nums[i];\n  if (map.has(complement)) return [map.get(complement), i];\n  map.set(nums[i], i);\n}",
          "codeHighlight": [
            1
          ],
          "variables": {
            "map": "{}",
            "i": "-",
            "target": 9
          }
        },
        {
          "title": "i=0: Check complement for 2",
          "explanation": "At index 0, value is 2. Complement = 9 - 2 = 7. Is 7 in the HashMap? No — map is empty. So store map[2] = 0 and move on.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              2,
              7,
              11,
              15
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "active",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "0": "i"
            },
            "mapEntries": [
              {
                "key": 2,
                "value": 0
              }
            ]
          },
          "code": "const complement = target - nums[i]; // 9 - 2 = 7\nif (map.has(complement)) ...       // false\nmap.set(nums[i], i);               // map[2] = 0",
          "codeHighlight": [
            1,
            2,
            3
          ],
          "variables": {
            "i": 0,
            "nums[i]": 2,
            "complement": 7,
            "map.has(7)": "false"
          },
          "insight": "We store the current element so future elements can find their complement instantly."
        },
        {
          "title": "i=1: Check complement for 7",
          "explanation": "At index 1, value is 7. Complement = 9 - 7 = 2. Is 2 in the HashMap? YES! map[2] = 0. We found our pair: indices [0, 1]!",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              2,
              7,
              11,
              15
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "found",
              "found",
              "default",
              "default"
            ],
            "pointers": {
              "0": "prev",
              "1": "i"
            },
            "mapEntries": [
              {
                "key": 2,
                "value": 0
              }
            ]
          },
          "code": "const complement = target - nums[i]; // 9 - 7 = 2\nif (map.has(complement)) return [map.get(complement), i];\n// map.get(2) = 0, i = 1 → return [0, 1]",
          "codeHighlight": [
            1,
            2
          ],
          "variables": {
            "i": 1,
            "nums[i]": 7,
            "complement": 2,
            "map.has(2)": "true ✓"
          },
          "insight": "One pass! We found the answer without ever checking element 11 or 15. The HashMap lookup was O(1)."
        },
        {
          "title": "Return result",
          "explanation": "Return [0, 1]. Total work: one loop iteration per element = O(n) time. HashMap storage = O(n) space. This beats the O(n²) brute force of checking every pair.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              2,
              7,
              11,
              15
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "result",
              "result",
              "eliminated",
              "eliminated"
            ]
          },
          "variables": {
            "answer": "[0, 1]"
          },
          "complexity": "Time: O(n) — one pass. Space: O(n) — HashMap stores up to n elements."
        }
      ]
    },
    {
      "id": "contains-duplicate",
      "title": "Contains Duplicate",
      "difficulty": "Easy",
      "description": "Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.",
      "examples": [
        {
          "input": "nums = [1,2,3,1]",
          "output": "true"
        },
        {
          "input": "nums = [1,2,3,4]",
          "output": "false"
        }
      ],
      "constraints": [
        "1 ≤ nums.length ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function containsDuplicate(nums) {\n  \n}",
        "python": "def contains_duplicate(nums):\n    pass"
      },
      "solution": {
        "js": "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}",
        "python": "def contains_duplicate(nums):\n    return len(set(nums)) != len(nums)"
      },
      "testCases": [
        {
          "input": "[1,2,3,1]",
          "expected": "true"
        },
        {
          "input": "[1,2,3,4]",
          "expected": "false"
        },
        {
          "input": "[1,1,1,3,3,4,3,2,4,2]",
          "expected": "true",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "A Set only stores unique values.",
        "If Set size < array length, there was a duplicate."
      ],
      "tags": [
        "set",
        "array"
      ],
      "walkthrough": [
        {
          "title": "The Set insight",
          "explanation": "A Set automatically rejects duplicates. If we insert all elements and the Set is smaller than the original array, a duplicate was discarded.",
          "phase": "init",
          "visual": {
            "type": "split",
            "left": [
              1,
              2,
              3,
              1
            ],
            "right": [
              1,
              2,
              3
            ],
            "leftLabel": "Original array",
            "rightLabel": "After Set (duplicates removed)",
            "leftStates": [
              "default",
              "default",
              "default",
              "active"
            ],
            "rightStates": [
              "default",
              "default",
              "default"
            ]
          },
          "insight": "Set size (3) < array length (4) → duplicate exists!"
        },
        {
          "title": "Scan and insert into Set",
          "explanation": "We iterate through [1,2,3,1]. Elements 1,2,3 are added. When we hit the second 1, the Set already contains it — so the sizes diverge.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "visited",
              "visited",
              "visited",
              "found"
            ],
            "pointers": {
              "3": "dup!"
            },
            "mapEntries": [
              {
                "key": 1,
                "value": "idx 0"
              },
              {
                "key": 2,
                "value": "idx 1"
              },
              {
                "key": 3,
                "value": "idx 2"
              }
            ]
          },
          "variables": {
            "Set": "{1,2,3}",
            "Set.size": 3,
            "array.length": 4
          },
          "complexity": "Time O(n) — one pass. Space O(n) — Set stores unique elements."
        },
        {
          "title": "Return comparison",
          "explanation": "new Set(nums).size (3) !== nums.length (4) → return true. If all unique, sizes match → return false.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              1
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3"
            ],
            "states": [
              "found",
              "found",
              "found",
              "result"
            ]
          },
          "code": "return new Set(nums).size !== nums.length;",
          "codeHighlight": [
            1
          ],
          "variables": {
            "result": "true"
          }
        }
      ]
    },
    {
      "id": "top-k-frequent",
      "title": "Top K Frequent Elements",
      "difficulty": "Medium",
      "description": "Given an integer array nums and an integer k, return the k most frequent elements.",
      "examples": [
        {
          "input": "nums = [1,1,1,2,2,3], k = 2",
          "output": "[1,2]"
        }
      ],
      "constraints": [
        "1 ≤ nums.length ≤ 10⁵",
        "k is in range [1, unique elements]"
      ],
      "starterCode": {
        "js": "function topKFrequent(nums, k) {\n  \n}",
        "python": "def top_k_frequent(nums, k):\n    pass"
      },
      "solution": {
        "js": "function topKFrequent(nums, k) {\n  const freq = new Map();\n  for (const n of nums) freq.set(n, (freq.get(n)||0)+1);\n  const buckets = Array.from({length:nums.length+1},()=>[]);\n  for (const [num,cnt] of freq) buckets[cnt].push(num);\n  const res = [];\n  for (let i=buckets.length-1;i>=0&&res.length<k;i--) res.push(...buckets[i]);\n  return res.slice(0,k);\n}",
        "python": "from collections import Counter\ndef top_k_frequent(nums, k):\n    count = Counter(nums)\n    buckets = [[] for _ in range(len(nums)+1)]\n    for num, freq in count.items(): buckets[freq].append(num)\n    res = []\n    for i in range(len(buckets)-1,-1,-1):\n        res.extend(buckets[i])\n        if len(res)>=k: break\n    return res[:k]"
      },
      "testCases": [
        {
          "input": "[1,1,1,2,2,3]\n2",
          "expected": "[1,2]"
        },
        {
          "input": "[1]\n1",
          "expected": "[1]"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "Frequency map first.",
        "Bucket sort by frequency achieves O(n) — frequency is at most n."
      ],
      "tags": [
        "hash-map",
        "bucket-sort",
        "counting"
      ],
      "walkthrough": [
        {
          "title": "Count frequencies",
          "explanation": "First build a frequency map. For [1,1,1,2,2,3], element 1 appears 3×, 2 appears 2×, 3 appears 1×.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              1,
              1,
              1,
              2,
              2,
              3
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5"
            ],
            "states": [
              "visited",
              "visited",
              "visited",
              "comparing",
              "comparing",
              "active"
            ],
            "mapEntries": [
              {
                "key": 1,
                "value": 3
              },
              {
                "key": 2,
                "value": 2
              },
              {
                "key": 3,
                "value": 1
              }
            ]
          },
          "code": "const freq = new Map();\nfor (const n of nums) freq.set(n, (freq.get(n)||0)+1);",
          "codeHighlight": [
            1,
            2
          ],
          "variables": {
            "freq": "{1→3, 2→2, 3→1}"
          }
        },
        {
          "title": "Create frequency buckets",
          "explanation": "Create an array of n+1 buckets where bucket[i] holds all numbers that appear exactly i times. Max frequency ≤ n, so this is bounded. This is the O(n) trick!",
          "phase": "update",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "bucket[1]",
                "[3]"
              ],
              [
                "bucket[2]",
                "[2]"
              ],
              [
                "bucket[3]",
                "[1]"
              ]
            ],
            "colHeaders": [
              "Index",
              "Numbers"
            ],
            "gridHighlighted": [
              [
                0,
                1
              ],
              [
                1,
                1
              ],
              [
                2,
                1
              ]
            ]
          },
          "insight": "Bucket sort on frequency sidesteps the O(n log n) comparison sort lower bound because frequency values are bounded integers.",
          "code": "const buckets = Array.from({length:nums.length+1},()=>[]);\nfor (const [num,cnt] of freq) buckets[cnt].push(num);",
          "codeHighlight": [
            1,
            2
          ],
          "variables": {
            "buckets[1]": "[3]",
            "buckets[2]": "[2]",
            "buckets[3]": "[1]"
          }
        },
        {
          "title": "Read top-k from buckets (highest first)",
          "explanation": "Sweep buckets from the end (highest frequency) and collect k elements. k=2: take bucket[3]=[1], then bucket[2]=[2]. Done!",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              3,
              2,
              1
            ],
            "labels": [
              "freq=3",
              "freq=2",
              "freq=1"
            ],
            "states": [
              "found",
              "found",
              "eliminated"
            ],
            "pointers": {
              "0": "first",
              "1": "second"
            }
          },
          "variables": {
            "result": "[1, 2]",
            "k": 2
          },
          "complexity": "Time O(n) — counting + bucketing + scanning are all O(n). Space O(n)."
        }
      ]
    },
    {
      "id": "longest-consecutive",
      "title": "Longest Consecutive Sequence",
      "difficulty": "Medium",
      "description": "Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) time.",
      "examples": [
        {
          "input": "nums = [100,4,200,1,3,2]",
          "output": "4",
          "explanation": "Sequence is [1,2,3,4]"
        }
      ],
      "constraints": [
        "0 ≤ nums.length ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function longestConsecutive(nums) {\n  \n}",
        "python": "def longest_consecutive(nums):\n    pass"
      },
      "solution": {
        "js": "function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let best = 0;\n  for (const n of set) {\n    if (!set.has(n-1)) {\n      let cur=n, len=1;\n      while(set.has(cur+1)){cur++;len++;}\n      best=Math.max(best,len);\n    }\n  }\n  return best;\n}",
        "python": "def longest_consecutive(nums):\n    s = set(nums); best = 0\n    for n in s:\n        if n-1 not in s:\n            cur,length=n,1\n            while cur+1 in s: cur+=1; length+=1\n            best=max(best,length)\n    return best"
      },
      "testCases": [
        {
          "input": "[100,4,200,1,3,2]",
          "expected": "4"
        },
        {
          "input": "[]",
          "expected": "0",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "Only start counting from the beginning of a sequence (no n-1 in set)."
      ],
      "tags": [
        "set",
        "array",
        "greedy"
      ],
      "walkthrough": [
        {
          "title": "Load everything into a HashSet",
          "explanation": "Put all elements in a Set for O(1) lookup. Our array [100,4,200,1,3,2] becomes a set. Now we can check existence instantly.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              100,
              4,
              200,
              1,
              3,
              2
            ],
            "labels": [
              "",
              "",
              "",
              "",
              "",
              ""
            ],
            "states": [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited"
            ]
          },
          "insight": "We need O(n) total. The key trick: only start counting from sequence beginnings."
        },
        {
          "title": "Find sequence starts",
          "explanation": "A number n is a sequence start if n-1 is NOT in the set. For 1: is 0 in the set? No → sequence start! For 2: is 1 in the set? Yes → skip. For 100: is 99 in set? No → start.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              4,
              100,
              200
            ],
            "labels": [
              "start",
              "skip",
              "skip",
              "skip",
              "start",
              "start"
            ],
            "states": [
              "found",
              "eliminated",
              "eliminated",
              "eliminated",
              "found",
              "found"
            ]
          },
          "code": "for (const n of set) {\n  if (!set.has(n - 1)) { // sequence start!\n    let cur = n, len = 1;\n    while (set.has(cur + 1)) { cur++; len++; }\n    best = Math.max(best, len);\n  }\n}",
          "codeHighlight": [
            2
          ],
          "variables": {
            "starts": "1, 100, 200"
          }
        },
        {
          "title": "Count from each start",
          "explanation": "From start=1: check 2✓, 3✓, 4✓, 5✗ → length 4. From start=100: check 101✗ → length 1. From start=200: check 201✗ → length 1. Best = 4.",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              1,
              2,
              3,
              4
            ],
            "labels": [
              "start",
              "+1",
              "+2",
              "+3"
            ],
            "states": [
              "found",
              "found",
              "found",
              "found"
            ],
            "pointers": {
              "0": "cur→"
            }
          },
          "variables": {
            "best": 4,
            "sequence": "[1,2,3,4]"
          },
          "complexity": "O(n) — each element is visited at most twice: once when checking if it's a start, once when counting from its sequence's start."
        }
      ]
    },
    {
      "id": "group-anagrams",
      "title": "Group Anagrams",
      "difficulty": "Medium",
      "description": "Given an array of strings strs, group the anagrams together.",
      "examples": [
        {
          "input": "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
          "output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]"
        }
      ],
      "constraints": [
        "1 ≤ strs.length ≤ 10⁴",
        "0 ≤ strs[i].length ≤ 100"
      ],
      "starterCode": {
        "js": "function groupAnagrams(strs) {\n  \n}",
        "python": "def group_anagrams(strs):\n    pass"
      },
      "solution": {
        "js": "function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key,[]);\n    map.get(key).push(s);\n  }\n  return [...map.values()];\n}",
        "python": "from collections import defaultdict\ndef group_anagrams(strs):\n    groups = defaultdict(list)\n    for s in strs:\n        groups[tuple(sorted(s))].append(s)\n    return list(groups.values())"
      },
      "testCases": [
        {
          "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
          "expected": "3 groups"
        },
        {
          "input": "[\"\"]",
          "expected": "[[\"\"]]"
        }
      ],
      "timeComplexity": "O(n·k log k)",
      "spaceComplexity": "O(n·k)",
      "hints": [
        "What is the canonical form of an anagram?",
        "Sorted string is the same for all anagrams."
      ],
      "tags": [
        "hash-map",
        "string",
        "sorting"
      ],
      "walkthrough": [
        {
          "title": "The canonical key idea",
          "explanation": "\"eat\", \"tea\", \"ate\" are all anagrams — they contain the same letters. If we sort each word's letters, they all become \"aet\". That sorted form is our HashMap key.",
          "phase": "init",
          "visual": {
            "type": "split",
            "left": [
              "eat",
              "tea",
              "tan",
              "ate",
              "nat",
              "bat"
            ],
            "right": [
              "aet",
              "aet",
              "ant",
              "aet",
              "ant",
              "abt"
            ],
            "leftLabel": "Original",
            "rightLabel": "Sorted letters (key)"
          },
          "insight": "\"eat\" → sort → \"aet\". \"tea\" → sort → \"aet\". Same key → same group!"
        },
        {
          "title": "Build groups via HashMap",
          "explanation": "For each word, compute its sorted key and append to the corresponding HashMap list. \"eat\"→\"aet\": map[\"aet\"] = [\"eat\"]. \"tea\"→\"aet\": map[\"aet\"] = [\"eat\",\"tea\"].",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              "eat",
              "tea",
              "tan",
              "ate",
              "nat",
              "bat"
            ],
            "states": [
              "found",
              "found",
              "comparing",
              "found",
              "comparing",
              "active"
            ],
            "mapEntries": [
              {
                "key": "aet",
                "value": "[eat,tea,ate]"
              },
              {
                "key": "ant",
                "value": "[tan,nat]"
              },
              {
                "key": "abt",
                "value": "[bat]"
              }
            ]
          },
          "code": "for (const s of strs) {\n  const key = s.split('').sort().join('');\n  if (!map.has(key)) map.set(key, []);\n  map.get(key).push(s);\n}",
          "codeHighlight": [
            2,
            3,
            4
          ],
          "variables": {
            "groups so far": "3"
          }
        },
        {
          "title": "Return all groups",
          "explanation": "Return map.values() — three groups: [[\"eat\",\"tea\",\"ate\"], [\"tan\",\"nat\"], [\"bat\"]]. Each group contains all anagrams.",
          "phase": "done",
          "visual": {
            "type": "split",
            "left": [
              "eat",
              "tea",
              "ate"
            ],
            "right": [
              "tan",
              "nat"
            ],
            "leftLabel": "Group 1 (aet)",
            "rightLabel": "Group 2 (ant)",
            "leftStates": [
              "found",
              "found",
              "found"
            ],
            "rightStates": [
              "comparing",
              "comparing"
            ]
          },
          "complexity": "Time O(n·k log k) — sorting each word of length k. Space O(n·k) for the HashMap."
        }
      ]
    },
    {
      "id": "valid-anagram",
      "title": "Valid Anagram",
      "difficulty": "Easy",
      "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
      "examples": [
        {
          "input": "s = \"anagram\", t = \"nagaram\"",
          "output": "true"
        }
      ],
      "constraints": [
        "1 ≤ s.length, t.length ≤ 5*10^4"
      ],
      "starterCode": {
        "js": "function isAnagram(s, t) {\n  \n}",
        "python": "def is_anagram(s, t):\n    pass"
      },
      "solution": {
        "js": "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
        "python": "from collections import Counter\ndef is_anagram(s, t):\n    return Counter(s) == Counter(t)"
      },
      "testCases": [
        {
          "input": "\"anagram\"\n\"nagaram\"",
          "expected": "true"
        },
        {
          "input": "\"rat\"\n\"car\"",
          "expected": "false"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Use an array of size 26 or a HashMap to count character frequencies."
      ],
      "tags": [
        "hash-map",
        "string"
      ],
      "walkthrough": []
    },
    {
      "id": "top-k-frequent-elements",
      "title": "Top K Frequent Elements",
      "difficulty": "Medium",
      "description": "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.\n\n \nExample 1:\n\n\nInput: nums = [1,1,1,2,2,3], k = 2\n\nOutput: [1,2]\n\n\nExample 2:\n\n\nInput: nums = [1], k = 1\n\nOutput: [1]\n\n\nExample 3:\n\n\nInput: nums = [1,2,1,2,1,2,3,1,3,2], k = 2\n\nOutput: [1,2]\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 105\n\t-104 <= nums[i] <= 104\n\tk is in the range [1, the number of unique elements in the array].\n\tIt is guaranteed that the answer is unique.\n\n\n \nFollow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.",
      "examples": [
        {
          "input": "[1,1,1,2,2,3]",
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
        "js": "function topKFrequentElements(input) {\n  // Your code here\n}",
        "python": "def top_k_frequent_elements(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Set - Frequency Counter | Using sort\n * Time O(NlogN) | Space O(N)\n * https://leetcode.com/problems/top-k-frequent-elements/\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar topKFrequent = function (nums, k) {\n    let frequency = {};\n    for (let i = 0; i < nums.length; i++) {\n        if (frequency.hasOwnProperty(nums[i])) frequency[nums[i]] += 1;\n        else frequency[nums[i]] = 1;\n    }\n    let result = Object.keys(frequency).map((key) => [\n        Number(key),\n        frequency[key],\n    ]);\n    let sortedResult = result.sort((a, b) => {\n        return b[1] - a[1];\n    });\n    let output = [];\n    for (let i = 0; i < k; i++) {\n        output.push(sortedResult[i][0]);\n    }\n    return output;\n};\n\n/**\n * Without Sort\n * Time O(N) | Space O(k)\n * https://leetcode.com/problems/top-k-frequent-elements/\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\n\nvar topKFrequent = function (nums, k) {\n    const mp = new Map();\n    const arr = new Array(nums.length + 1).fill(0);\n    const ans = [];\n\n    nums.forEach((el) => {\n        const val = mp.get(el) || 0;\n        mp.set(el, val + 1);\n    });\n\n    for (let [key, value] of mp) {\n        const prev = arr[value] || [];\n        prev.push(key);\n        arr[value] = prev;\n    }\n\n    arr.reverse();\n    for (let el of arr) {\n        if (k < 1) break;\n        if (el) {\n            for (let el2 of el) {\n                ans.push(el2);\n                k--;\n            }\n        }\n    }\n\n    return ans;\n};\n",
        "python": "class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        count = {}\n        freq = [[] for i in range(len(nums) + 1)]\n\n        for n in nums:\n            count[n] = 1 + count.get(n, 0)\n        for n, c in count.items():\n            freq[c].append(n)\n\n        res = []\n        for i in range(len(freq) - 1, 0, -1):\n            res += freq[i]\n            if len(res) == k:\n                return res\n                \n\n        # O(n)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Top K Frequent Elements",
          "explanation": "Top K Frequent Elements is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(NlogN)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Arrays & Hashing"
      ],
      "hints": []
    },
    {
      "id": "encode-and-decode-strings",
      "title": "Encode and Decode Strings",
      "difficulty": "Medium",
      "description": "Solve the Encode and Decode Strings problem.",
      "examples": [
        {
          "input": "[\"Hello\",\"World\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function encodeAndDecodeStrings(input) {\n  // Your code here\n}",
        "python": "def encode_and_decode_strings(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * String - Delimiter\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string[]} strs\n * @return {string}\n */\nvar encode = (strs) => {\n    return strs\n        .map(\n            (str) => `${str.length}#${str}`,\n        ) /* Time O(N) | Ignore Auxillary Space O(N) */\n        .join(''); /* Time O(N) | Ignore Auxillary Space O(N) */\n};\n\n/**\n * String - Delimiter\n * Time O(N * K) | Space O(N)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string} str\n * @return {string[]}\n */\nvar decode = (str, index = 0, decodedWords = []) => {\n    while (index < str.length) {\n        /* Time O(N) */\n        const { nextIndex, word } = delimitWord(\n            str,\n            index,\n        ); /* Time O(K) | Ignore Auxillary Space Space (K) */\n\n        decodedWords.push(\n            word,\n        ); /*           | Ignore Auxillary Space O(N * K ) */\n        index = nextIndex;\n    }\n\n    return decodedWords;\n};\n\nconst delimitWord = (str, index) => {\n    const delimiter = str.indexOf('#', index); /* Time O(K) */\n    const length = Number(str.slice(index, delimiter)); /* Time O(K) */\n    const [start, end] = [delimiter + 1, delimiter + length + 1];\n    const word = str.slice(\n        start,\n        end,\n    ); /* Time O(K) | Ignore Auxillary Space O(K) */\n\n    return {\n        nextIndex: end,\n        word,\n    };\n};\n\n/**\n * Non-ASCII Delimiter - Ignore Auxiliary Space\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string[]} strs\n * @return {string}\n */\nvar encode = (strs, nonASCIICode = String.fromCharCode(257)) => {\n    return strs.join(\n        nonASCIICode,\n    ); /* Time O(N) | Ignore Auxillary Space O(N) */\n};\n\n/**\n * Non-ASCII Delimiter - Ignore Auxiliary Space\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string[]} strs\n * @return {string}\n */\nvar decode = (strs, nonASCIICode = String.fromCharCode(257)) => {\n    return strs.split(\n        nonASCIICode,\n    ); /* Time O(N) | Ignore Auxillary Space O(N) */\n};\n\n/**\n * Chunk Transfer Encoding\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string[]} strs\n * @return {string}\n */\nvar encode = (strs, sb = []) => {\n    for (const str of strs) {\n        /* Time O(N) */\n        const code = getCode(str); /* Time O(1) */\n        const encoding = `${code}${str}`;\n\n        sb.push(encoding);\n    }\n\n    return sb.join(''); /* Time O(N) | Ignore Auxillary Space O(N) */\n};\n\nconst getCode = (str) => str.length.toString(2).padStart(8, '0');\n\n/**\n * Chunk Transfer Encoding\n * Time O(N) | Space O(1)\n * https://leetcode.com/problems/encode-and-decode-strings/\n * @param {string} str\n * @return {string[]}\n */\nvar decode = (str, output = []) => {\n    for (\n        let left = 0, right = left + 8, length = 0;\n        left < str.length;\n        left = right + length, right = left + 8\n    ) {\n        /* Time O(N) */\n        const countString = str.slice(\n            left,\n            right,\n        ); /*           | Ignore Auxillary Space O(K) */\n        length = parseInt(countString, 2);\n\n        const decoding = str.slice(\n            right,\n            right + length,\n        ); /* Time O(K) | Ignore Auxillary Space O(N * K) */\n        output.push(decoding); /*           | Ignore Auxillary Space O(N * K) */\n    }\n\n    return output;\n};\n",
        "python": "class Solution:\n    def encode(self, strs):\n        res = \"\"\n        for s in strs:\n            res += str(len(s)) + \"#\" + s\n        return res\n\n    def decode(self, s):\n        res = []\n        i = 0\n        \n        while i < len(s):\n            j = i\n            while s[j] != '#':\n                j += 1\n            length = int(s[i:j])\n            i = j + 1\n            j = i + length\n            res.append(s[i:j])\n            i = j\n            \n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Encode and Decode Strings",
          "explanation": "Encode and Decode Strings is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Arrays & Hashing"
      ],
      "hints": []
    },
    {
      "id": "product-of-array-except-self",
      "title": "Product of Array Except Self",
      "difficulty": "Medium",
      "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.\n\n \nExample 1:\n<strong>Input:</strong> nums = [1,2,3,4]\n<strong>Output:</strong> [24,12,8,6]\nExample 2:\n<strong>Input:</strong> nums = [-1,1,0,-3,3]\n<strong>Output:</strong> [0,0,9,0,0]\n\n \nConstraints:\n\n\n\t2 <= nums.length <= 105\n\t-30 <= nums[i] <= 30\n\tThe input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.\n\n\n \nFollow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)",
      "examples": [
        {
          "input": "[1,2,3,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[-1,1,0,-3,3]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function productOfArrayExceptSelf(input) {\n  // Your code here\n}",
        "python": "def product_of_array_except_self(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Array\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/product-of-array-except-self/\n * @param {number[]} nums\n * @return {number[]}\n */\nfunction productExceptSelf(nums) {\n    const result = [];\n    let prefix = 1;\n    let postfix = 1;\n\n    for (let i = 0; i < nums.length; i++) {\n        result[i] = prefix;\n        prefix *= nums[i];\n    }\n    for (let i = nums.length - 2; i >= 0; i--) {\n        postfix *= nums[i + 1];\n        result[i] *= postfix;\n    }\n\n    return result;\n}\n",
        "python": "class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        res = [1] * (len(nums))\n\n        for i in range(1, len(nums)):\n            res[i] = res[i-1] * nums[i-1]\n        postfix = 1\n        for i in range(len(nums) - 1, -1, -1):\n            res[i] *= postfix\n            postfix *= nums[i]\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Product of Array Except Self",
          "explanation": "Product of Array Except Self is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Arrays & Hashing"
      ],
      "hints": [
        "Think how you can efficiently utilize prefix and suffix products to calculate the product of all elements except self for each index. Can you pre-compute the prefix and suffix products in linear time to avoid redundant calculations?",
        "Can you minimize additional space usage by reusing memory or modifying the input array to store intermediate results?"
      ]
    },
    {
      "id": "valid-sudoku",
      "title": "Valid Sudoku",
      "difficulty": "Medium",
      "description": "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n\n\n\tEach row must contain the digits 1-9 without repetition.\n\tEach column must contain the digits 1-9 without repetition.\n\tEach of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.\n\n\nNote:\n\n\n\tA Sudoku board (partially filled) could be valid but is not necessarily solvable.\n\tOnly the filled cells need to be validated according to the mentioned rules.\n\n\n \nExample 1:\n\n\n<strong>Input:</strong> board = \n[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]\n,[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"]\n,[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"]\n,[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"]\n,[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"]\n,[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"]\n,[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"]\n,[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"]\n,[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> board = \n[[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"]\n,[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"]\n,[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"]\n,[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"]\n,[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"]\n,[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"]\n,[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"]\n,[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"]\n,[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> Same as Example 1, except with the <strong>5</strong> in the top left corner being modified to <stro...",
      "examples": [
        {
          "input": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function validSudoku(input) {\n  // Your code here\n}",
        "python": "def valid_sudoku(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Hash Map - Matrix\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * https://leetcode.com/problems/valid-sudoku/\n * @param {character[][]} board\n * @return {boolean}\n */\n\nvar isValidSudoku = function (board) {\n    let row = [];\n    let col = [];\n    let squares = new Map();\n    // Creating new col, row and sqaures Sets\n    for (let i = 0; i < 9; i++) {\n        let newRowSet = new Set();\n        let newColSet = new Set();\n        row.push(newRowSet);\n        col.push(newColSet);\n        for (let j = 0; j < 9; j++) {\n            squares.set(`${Math.floor(i / 3)}:${Math.floor(j / 3)}`, new Set());\n        }\n    }\n\n    for (let i = 0; i < 9; i++) {\n        for (let j = 0; j < 9; j++) {\n            if (board[i][j] === '.') {\n                continue;\n            }\n            if (\n                row[i].has(board[i][j]) ||\n                col[j].has(board[i][j]) ||\n                squares\n                    .get(`${Math.floor(i / 3)}:${Math.floor(j / 3)}`)\n                    .has(board[i][j])\n            ) {\n                return false;\n            }\n            row[i].add(board[i][j]);\n            col[j].add(board[i][j]);\n            squares\n                .get(`${Math.floor(i / 3)}:${Math.floor(j / 3)}`)\n                .add(board[i][j]);\n        }\n    }\n    return true;\n};\n\n/**\n * Hash Map - Matrix\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * https://leetcode.com/problems/valid-sudoku/\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = (board) => {\n    const boards = 3;\n    const [boxes, cols, rows] =\n        getBoards(boards); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    return searchGrid(\n        board,\n        boxes,\n        cols,\n        rows,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n};\n\nvar initBoard = (rows, cols) =>\n    new Array(rows).fill().map(() => new Array(cols).fill(false));\n\nvar getBoards = (boards) => {\n    const [rows, cols] = [9, 9];\n\n    return new Array(boards).fill().map(() => initBoard(rows, cols));\n};\n\nvar searchGrid = (board, boxes, cols, rows) => {\n    const [_rows, _cols] = [9, 9];\n\n    for (let row = 0; row < _rows; row++) {\n        /* Time O(ROWS)*/\n        for (let col = 0; col < _cols; col++) {\n            /* Time O(COLS)*/\n            const char = board[row][col];\n            const index = Math.floor(row / 3) * 3 + Math.floor(col / 3);\n\n            const isEmpty = char === '.';\n            if (isEmpty) continue;\n\n            const hasMoved =\n                boxes[index][char - 1] ||\n                cols[col][char - 1] ||\n                rows[row][char - 1];\n            if (hasMoved) return false;\n\n            rows[row][char - 1] = true; /* Space O(ROWS * COLS)*/\n            cols[col][char - 1] = true; /* Space O(ROWS * COLS)*/\n            boxes[index][char - 1] = true; /* Space O(ROWS * COLS)*/\n        }\n    }\n\n    return true;\n};\n\n/**\n * Array - Fixed Size\n * Time O(ROWS * COLS) | Space O(CELLS)\n * https://leetcode.com/problems/valid-sudoku/\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = (board) => {\n    const [boards, cells] = [3, 9];\n    const [boxes, rows, cols] = getBoards(\n        boards,\n        cells,\n    ); /* Time O(ROWS * COLS) | Space O(CELLS) */\n\n    return searchGrid(\n        board,\n        boxes,\n        rows,\n        cols,\n    ); /* Time O(ROWS * COLS) | Space O(CELLS) */\n};\n\nvar getBoards = (boards, cells) =>\n    new Array(boards).fill().map(() => new Array(cells).fill(0));\n\nvar searchGrid = (board, boxes, rows, cols) => {\n    const [_rows, _cols] = [9, 9];\n\n    for (let row = 0; row < _rows; row++) {\n        /* Time O(ROWS)*/\n        for (let col = 0; col < _cols; col++) {\n            /* Time O(COLS)*/\n            const char = board[row][col];\n            const position = 1 << (char - 1);\n            const index = Math.floor(row / 3) * 3 + Math.floor(col / 3);\n\n            const isEmpty = char === '.';\n            if (isEmpty) continue;\n\n            const hasMoved =\n                boxes[index] & position ||\n                cols[col] & position ||\n                rows[row] & position;\n            if (hasMoved) return false;\n\n            rows[row] |= position; /* Space O(CELLS)*/\n            cols[col] |= position; /* Space O(CELLS)*/\n            boxes[index] |= position; /* Space O(CELLS)*/\n        }\n    }\n\n    return true;\n};\n",
        "python": "class Solution:\n    def isValidSudoku(self, board: List[List[str]]) -> bool:\n        cols = collections.defaultdict(set)\n        rows = collections.defaultdict(set)\n        squares = collections.defaultdict(set)  # key = (r /3, c /3)\n\n        for r in range(9):\n            for c in range(9):\n                if board[r][c] == \".\":\n                    continue\n                if (\n                    board[r][c] in rows[r]\n                    or board[r][c] in cols[c]\n                    or board[r][c] in squares[(r // 3, c // 3)]\n                ):\n                    return False\n                cols[c].add(board[r][c])\n                rows[r].add(board[r][c])\n                squares[(r // 3, c // 3)].add(board[r][c])\n\n        return True\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Valid Sudoku",
          "explanation": "Valid Sudoku is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Arrays & Hashing"
      ],
      "hints": []
    },
    {
      "id": "longest-consecutive-sequence",
      "title": "Longest Consecutive Sequence",
      "difficulty": "Medium",
      "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [100,4,200,1,3,2]\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> The longest consecutive elements sequence is <code>[1, 2, 3, 4]</code>. Therefore its length is 4.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [0,3,7,2,5,8,4,6,0,1]\n<strong>Output:</strong> 9\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [1,0,1,2]\n<strong>Output:</strong> 3\n\n\n \nConstraints:\n\n\n\t0 <= nums.length <= 105\n\t-109 <= nums[i] <= 109",
      "examples": [
        {
          "input": "[100,4,200,1,3,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,3,7,2,5,8,4,6,0,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,0,1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function longestConsecutiveSequence(input) {\n  // Your code here\n}",
        "python": "def longest_consecutive_sequence(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Brute Force\n * Greedy - Max Score\n * Time O (N^3) | Space O(1)\n * https://leetcode.com/problems/longest-consecutive-sequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar longestConsecutive = (nums, maxScore = 0) => {\n    for (const num of nums) {\n        /* Time O(N) */\n        let [currNum, score] = [num, 1];\n\n        while (isStreak(nums, currNum + 1)) {\n            /* Time O(N * N) */\n            currNum++;\n            score++;\n        }\n\n        maxScore = Math.max(maxScore, score);\n    }\n\n    return maxScore;\n};\n\nconst isStreak = (nums, num) => {\n    for (let i = 0; i < nums.length; i++) {\n        /* Time O(N) */\n        const isEqual = nums[i] === num;\n        if (isEqual) return true;\n    }\n\n    return false;\n};\n\n/**\n * Sort - HeapSort Space O(1) | QuickSort Space O(log(K))\n * Greedy - Max Score\n * Time O (N * log(N)) | Space O(1)\n * https://leetcode.com/problems/longest-consecutive-sequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar longestConsecutive = (nums) => {\n    if (!nums.length) return 0;\n\n    nums.sort((a, b) => a - b); /* Time O(N * log(N)) | Space O(1 || log(N)) */\n\n    return search(nums); /* Time O(N) */\n};\n\nconst search = (nums) => {\n    let [maxScore, score] = [1, 1];\n\n    for (let i = 1; i < nums.length; i++) {\n        /* Time O(N) */\n        const isPrevDuplicate = nums[i - 1] === nums[i];\n        if (isPrevDuplicate) continue;\n\n        const isStreak = nums[i] === nums[i - 1] + 1;\n        if (isStreak) {\n            score++;\n            continue;\n        }\n\n        maxScore = Math.max(maxScore, score);\n        score = 1;\n    }\n\n    return Math.max(maxScore, score);\n};\n\n/**\n * Hash Set - Intelligent Sequence\n * Greedy - Max Score\n * Time O (N) | Space O(N)\n * https://leetcode.com/problems/longest-consecutive-sequence/\n * @param {number[]} nums\n * @return {number}\n */\nvar longestConsecutive = (nums, maxScore = 0) => {\n    const numSet = new Set(nums); /* Time O(N) | Space O(N) */\n\n    for (const num of [...numSet]) {\n        /* Time O(N) */\n        const prevNum = num - 1;\n\n        if (numSet.has(prevNum)) continue; /* Time O(N) */\n\n        let [currNum, score] = [num, 1];\n\n        const isStreak = () => numSet.has(currNum + 1);\n        while (isStreak()) {\n            /* Time O(N) */\n            currNum++;\n            score++;\n        }\n\n        maxScore = Math.max(maxScore, score);\n    }\n\n    return maxScore;\n};\n",
        "python": "class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        numSet = set(nums)\n        longest = 0\n\n        for n in numSet:\n            # check if its the start of a sequence\n            if (n - 1) not in numSet:\n                length = 1\n                while (n + length) in numSet:\n                    length += 1\n                longest = max(length, longest)\n        return longest\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Longest Consecutive Sequence",
          "explanation": "Longest Consecutive Sequence is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Arrays & Hashing"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "What is the average time complexity of HashMap lookup?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n log n)"
      ],
      "correct": 2,
      "explanation": "HashMap achieves amortized O(1) lookup via hash function + direct addressing."
    },
    {
      "id": "q2",
      "question": "In Two Sum, why do we store the complement instead of checking all pairs?",
      "options": [
        "Saves memory",
        "Enables O(1) pair lookup per element",
        "Avoids duplicates",
        "Same thing"
      ],
      "correct": 1,
      "explanation": "Storing complement=target-nums[i] lets us check O(1) if the matching number has been seen, reducing O(n²) to O(n)."
    },
    {
      "id": "q3",
      "question": "What is the worst-case time for a HashMap operation?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      "correct": 2,
      "explanation": "Worst case (all keys collide) degrades to O(n) linked list traversal."
    }
  ],
  "cheatSheet": "# Arrays & Hashing\n## Templates\n```js\n// Frequency map\nconst freq = new Map();\nfor (const x of arr) freq.set(x, (freq.get(x)||0)+1);\n\n// Two Sum pattern\nconst seen = new Map();\nfor (let i=0;i<nums.length;i++) {\n  if (seen.has(target-nums[i])) return [seen.get(target-nums[i]),i];\n  seen.set(nums[i],i);\n}\n```",
  "proTips": [
    "Always clarify: can the same element be used twice?",
    "HashMap vs HashSet: Map when you need values, Set for existence"
  ],
  "faangQuotes": [
    "\"Two Sum is our litmus test — we want to see if you immediately think HashMap.\" — Google Senior Engineer"
  ],
  "usefulLinks": [
    {
      "title": "LeetCode Explore: Arrays",
      "url": "https://leetcode.com/explore/learn/card/array-and-string/"
    }
  ],
  "visualizationType": "array",
  "usage": "Used when you need to store and retrieve data efficiently, count frequencies, or find pairs matching a condition.",
  "dsInvolved": "Array, HashTable, HashSet",
  "sampleProblems": [
    "Two Sum",
    "Contains Duplicate",
    "Top K Frequent Elements",
    "Longest Consecutive Sequence",
    "Group Anagrams"
  ]
};
