// src/data/topicsData.ts

export type CellState =
  | "default"
  | "active"
  | "comparing"
  | "found"
  | "eliminated"
  | "pointer"
  | "result"
  | "visited";

export interface WalkthroughVisual {
  type: "array" | "bars" | "tree" | "grid" | "linkedlist" | "split";
  // array / bars
  array?: (string | number)[];
  labels?: string[];
  states?: string[];
  pointers?: Record<number, string>;
  mapEntries?: { key: string | number; value: string | number }[];
  // tree
  treeNodes?: {
    id: string;
    label: string;
    x: number;
    y: number;
    state?: string;
  }[];
  treeEdges?: [string, string][];
  treeHighlighted?: string[];
  // grid
  grid?: (string | number)[][];
  colHeaders?: string[];
  rowHeaders?: string[];
  gridHighlighted?: [number, number][];
  // linked list
  llNodes?: { val: string | number; state?: string }[];
  llHighlighted?: number[];
  // split
  left?: (string | number)[];
  right?: (string | number)[];
  leftLabel?: string;
  rightLabel?: string;
  leftStates?: string[];
  rightStates?: string[];
}

export interface WalkthroughStep {
  title: string;
  explanation: string;
  phase?:
    | "init"
    | "scan"
    | "compare"
    | "update"
    | "found"
    | "backtrack"
    | "done";
  visual?: WalkthroughVisual;
  code?: string;
  codeHighlight?: number[];
  variables?: Record<string, string | number>;
  insight?: string;
  complexity?: string;
}

export interface TestCase {
  input: string;
  expected: string;
  hidden?: boolean;
}

export interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Advanced";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: { js: string; python: string };
  solution: { js: string; python: string };
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hints: string[];
  tags: string[];
  walkthrough: WalkthroughStep[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  color: string;
  gradient: string;
  layman: string;
  technical: string;
  keyInsights: string[];
  timeComplexities: {
    operation: string;
    best: string;
    avg: string;
    worst: string;
    space: string;
  }[];
  questions: Question[];
  quiz: QuizQuestion[];
  cheatSheet: string;
  proTips: string[];
  faangQuotes: string[];
  visualizationType:
    | "sorting"
    | "tree"
    | "graph"
    | "dp"
    | "trie"
    | "array"
    | "linkedlist"
    | "heap";
  usefulLinks?: { title: string; url: string }[];
}

export const TOPICS: Topic[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // TOPIC 01 — Arrays & Hashing
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic01",
    slug: "arrays-hashing",
    title: "Arrays & Hashing",
    emoji: "🗃️",
    color: "#0ea5e9",
    gradient: "from-ocean-500 to-ocean-400",
    layman:
      "Think of an array like a numbered row of lockers. You can instantly open locker #42 without checking every locker first. Hashing is like a magical index card that tells you EXACTLY which locker holds your item.",
    technical:
      "Arrays provide O(1) random access via direct memory addressing. Hash maps achieve amortized O(1) insert/lookup using hash functions + collision resolution. Key insight: trade space for time by caching computed results.",
    keyInsights: [
      "HashMap reduces O(n²) brute force to O(n) by storing complements",
      "Frequency maps enable counting problems in linear time",
      "Two-pass or one-pass hash techniques for complement problems",
      "Modular hashing: h(k) = k mod m where m is prime",
    ],
    timeComplexities: [
      {
        operation: "Array Access",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(1)",
        space: "O(1)",
      },
      {
        operation: "HashMap Insert",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(n)",
        space: "O(n)",
      },
      {
        operation: "HashMap Lookup",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Each input has exactly one solution; you may not use the same element twice.",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "nums[0] + nums[1] = 2 + 7 = 9",
          },
          { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹"],
        starterCode: {
          js: `function twoSum(nums, target) {\n  // Your solution here\n}`,
          python: `def two_sum(nums, target):\n    pass`,
        },
        solution: {
          js: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
          python: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n    return []`,
        },
        testCases: [
          { input: "[2,7,11,15]\n9", expected: "[0,1]" },
          { input: "[3,2,4]\n6", expected: "[1,2]" },
          { input: "[3,3]\n6", expected: "[0,1]" },
          { input: "[-1,-2,-3,-4]\n-7", expected: "[2,3]", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        hints: [
          "For each number, what value would complete the pair?",
          "Store seen numbers in a HashMap for O(1) lookup.",
        ],
        tags: ["hash-map", "array", "one-pass"],
        walkthrough: [
          {
            title: "Understand the problem",
            explanation:
              "We have nums=[2,7,11,15] and target=9. We need to find two indices whose values sum to 9. Brute force checks every pair — O(n²). Can we do better?",
            phase: "init",
            visual: {
              type: "array",
              array: [2, 7, 11, 15],
              labels: ["0", "1", "2", "3"],
              states: ["default", "default", "default", "default"],
            },
            insight:
              "Key question: for each number x, we need target-x. If we could look that up instantly, we'd solve it in one pass.",
          },
          {
            title: "Initialize HashMap",
            explanation:
              "Create an empty HashMap. We'll store { value → index } as we scan. This lets us check in O(1) if the complement of any element has already been seen.",
            phase: "init",
            visual: {
              type: "array",
              array: [2, 7, 11, 15],
              labels: ["0", "1", "2", "3"],
              states: ["default", "default", "default", "default"],
              mapEntries: [],
            },
            code: `const map = new Map();\nfor (let i = 0; i < nums.length; i++) {\n  const complement = target - nums[i];\n  if (map.has(complement)) return [map.get(complement), i];\n  map.set(nums[i], i);\n}`,
            codeHighlight: [1],
            variables: { map: "{}", i: "-", target: 9 },
          },
          {
            title: "i=0: Check complement for 2",
            explanation:
              "At index 0, value is 2. Complement = 9 - 2 = 7. Is 7 in the HashMap? No — map is empty. So store map[2] = 0 and move on.",
            phase: "scan",
            visual: {
              type: "array",
              array: [2, 7, 11, 15],
              labels: ["0", "1", "2", "3"],
              states: ["active", "default", "default", "default"],
              pointers: { 0: "i" },
              mapEntries: [{ key: 2, value: 0 }],
            },
            code: `const complement = target - nums[i]; // 9 - 2 = 7\nif (map.has(complement)) ...       // false\nmap.set(nums[i], i);               // map[2] = 0`,
            codeHighlight: [1, 2, 3],
            variables: {
              i: 0,
              "nums[i]": 2,
              complement: 7,
              "map.has(7)": "false",
            },
            insight:
              "We store the current element so future elements can find their complement instantly.",
          },
          {
            title: "i=1: Check complement for 7",
            explanation:
              "At index 1, value is 7. Complement = 9 - 7 = 2. Is 2 in the HashMap? YES! map[2] = 0. We found our pair: indices [0, 1]!",
            phase: "found",
            visual: {
              type: "array",
              array: [2, 7, 11, 15],
              labels: ["0", "1", "2", "3"],
              states: ["found", "found", "default", "default"],
              pointers: { 0: "prev", 1: "i" },
              mapEntries: [{ key: 2, value: 0 }],
            },
            code: `const complement = target - nums[i]; // 9 - 7 = 2\nif (map.has(complement)) return [map.get(complement), i];\n// map.get(2) = 0, i = 1 → return [0, 1]`,
            codeHighlight: [1, 2],
            variables: {
              i: 1,
              "nums[i]": 7,
              complement: 2,
              "map.has(2)": "true ✓",
            },
            insight:
              "One pass! We found the answer without ever checking element 11 or 15. The HashMap lookup was O(1).",
          },
          {
            title: "Return result",
            explanation:
              "Return [0, 1]. Total work: one loop iteration per element = O(n) time. HashMap storage = O(n) space. This beats the O(n²) brute force of checking every pair.",
            phase: "done",
            visual: {
              type: "array",
              array: [2, 7, 11, 15],
              labels: ["0", "1", "2", "3"],
              states: ["result", "result", "eliminated", "eliminated"],
            },
            variables: { answer: "[0, 1]" },
            complexity:
              "Time: O(n) — one pass. Space: O(n) — HashMap stores up to n elements.",
          },
        ],
      },
      {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        description:
          "Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.",
        examples: [
          { input: "nums = [1,2,3,1]", output: "true" },
          { input: "nums = [1,2,3,4]", output: "false" },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵"],
        starterCode: {
          js: `function containsDuplicate(nums) {\n  \n}`,
          python: `def contains_duplicate(nums):\n    pass`,
        },
        solution: {
          js: `function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}`,
          python: `def contains_duplicate(nums):\n    return len(set(nums)) != len(nums)`,
        },
        testCases: [
          { input: "[1,2,3,1]", expected: "true" },
          { input: "[1,2,3,4]", expected: "false" },
          { input: "[1,1,1,3,3,4,3,2,4,2]", expected: "true", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        hints: [
          "A Set only stores unique values.",
          "If Set size < array length, there was a duplicate.",
        ],
        tags: ["set", "array"],
        walkthrough: [
          {
            title: "The Set insight",
            explanation:
              "A Set automatically rejects duplicates. If we insert all elements and the Set is smaller than the original array, a duplicate was discarded.",
            phase: "init",
            visual: {
              type: "split",
              left: [1, 2, 3, 1],
              right: [1, 2, 3],
              leftLabel: "Original array",
              rightLabel: "After Set (duplicates removed)",
              leftStates: ["default", "default", "default", "active"],
              rightStates: ["default", "default", "default"],
            },
            insight: "Set size (3) < array length (4) → duplicate exists!",
          },
          {
            title: "Scan and insert into Set",
            explanation:
              "We iterate through [1,2,3,1]. Elements 1,2,3 are added. When we hit the second 1, the Set already contains it — so the sizes diverge.",
            phase: "scan",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              labels: ["0", "1", "2", "3"],
              states: ["visited", "visited", "visited", "found"],
              pointers: { 3: "dup!" },
              mapEntries: [
                { key: 1, value: "idx 0" },
                { key: 2, value: "idx 1" },
                { key: 3, value: "idx 2" },
              ],
            },
            variables: { Set: "{1,2,3}", "Set.size": 3, "array.length": 4 },
            complexity:
              "Time O(n) — one pass. Space O(n) — Set stores unique elements.",
          },
          {
            title: "Return comparison",
            explanation:
              "new Set(nums).size (3) !== nums.length (4) → return true. If all unique, sizes match → return false.",
            phase: "done",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              labels: ["0", "1", "2", "3"],
              states: ["found", "found", "found", "result"],
            },
            code: `return new Set(nums).size !== nums.length;`,
            codeHighlight: [1],
            variables: { result: "true" },
          },
        ],
      },
      {
        id: "top-k-frequent",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        description:
          "Given an integer array nums and an integer k, return the k most frequent elements.",
        examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
        constraints: [
          "1 ≤ nums.length ≤ 10⁵",
          "k is in range [1, unique elements]",
        ],
        starterCode: {
          js: `function topKFrequent(nums, k) {\n  \n}`,
          python: `def top_k_frequent(nums, k):\n    pass`,
        },
        solution: {
          js: `function topKFrequent(nums, k) {\n  const freq = new Map();\n  for (const n of nums) freq.set(n, (freq.get(n)||0)+1);\n  const buckets = Array.from({length:nums.length+1},()=>[]);\n  for (const [num,cnt] of freq) buckets[cnt].push(num);\n  const res = [];\n  for (let i=buckets.length-1;i>=0&&res.length<k;i--) res.push(...buckets[i]);\n  return res.slice(0,k);\n}`,
          python: `from collections import Counter\ndef top_k_frequent(nums, k):\n    count = Counter(nums)\n    buckets = [[] for _ in range(len(nums)+1)]\n    for num, freq in count.items(): buckets[freq].append(num)\n    res = []\n    for i in range(len(buckets)-1,-1,-1):\n        res.extend(buckets[i])\n        if len(res)>=k: break\n    return res[:k]`,
        },
        testCases: [
          { input: "[1,1,1,2,2,3]\n2", expected: "[1,2]" },
          { input: "[1]\n1", expected: "[1]" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        hints: [
          "Frequency map first.",
          "Bucket sort by frequency achieves O(n) — frequency is at most n.",
        ],
        tags: ["hash-map", "bucket-sort", "counting"],
        walkthrough: [
          {
            title: "Count frequencies",
            explanation:
              "First build a frequency map. For [1,1,1,2,2,3], element 1 appears 3×, 2 appears 2×, 3 appears 1×.",
            phase: "init",
            visual: {
              type: "array",
              array: [1, 1, 1, 2, 2, 3],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "visited",
                "visited",
                "visited",
                "comparing",
                "comparing",
                "active",
              ],
              mapEntries: [
                { key: 1, value: 3 },
                { key: 2, value: 2 },
                { key: 3, value: 1 },
              ],
            },
            code: `const freq = new Map();\nfor (const n of nums) freq.set(n, (freq.get(n)||0)+1);`,
            codeHighlight: [1, 2],
            variables: { freq: "{1→3, 2→2, 3→1}" },
          },
          {
            title: "Create frequency buckets",
            explanation:
              "Create an array of n+1 buckets where bucket[i] holds all numbers that appear exactly i times. Max frequency ≤ n, so this is bounded. This is the O(n) trick!",
            phase: "update",
            visual: {
              type: "grid",
              grid: [
                ["bucket[1]", "[3]"],
                ["bucket[2]", "[2]"],
                ["bucket[3]", "[1]"],
              ],
              colHeaders: ["Index", "Numbers"],
              gridHighlighted: [
                [0, 1],
                [1, 1],
                [2, 1],
              ],
            },
            insight:
              "Bucket sort on frequency sidesteps the O(n log n) comparison sort lower bound because frequency values are bounded integers.",
            code: `const buckets = Array.from({length:nums.length+1},()=>[]);\nfor (const [num,cnt] of freq) buckets[cnt].push(num);`,
            codeHighlight: [1, 2],
            variables: {
              "buckets[1]": "[3]",
              "buckets[2]": "[2]",
              "buckets[3]": "[1]",
            },
          },
          {
            title: "Read top-k from buckets (highest first)",
            explanation:
              "Sweep buckets from the end (highest frequency) and collect k elements. k=2: take bucket[3]=[1], then bucket[2]=[2]. Done!",
            phase: "found",
            visual: {
              type: "array",
              array: [3, 2, 1],
              labels: ["freq=3", "freq=2", "freq=1"],
              states: ["found", "found", "eliminated"],
              pointers: { 0: "first", 1: "second" },
            },
            variables: { result: "[1, 2]", k: 2 },
            complexity:
              "Time O(n) — counting + bucketing + scanning are all O(n). Space O(n).",
          },
        ],
      },
      {
        id: "longest-consecutive",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        description:
          "Given an unsorted array of integers, return the length of the longest consecutive elements sequence in O(n) time.",
        examples: [
          {
            input: "nums = [100,4,200,1,3,2]",
            output: "4",
            explanation: "Sequence is [1,2,3,4]",
          },
        ],
        constraints: ["0 ≤ nums.length ≤ 10⁵"],
        starterCode: {
          js: `function longestConsecutive(nums) {\n  \n}`,
          python: `def longest_consecutive(nums):\n    pass`,
        },
        solution: {
          js: `function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let best = 0;\n  for (const n of set) {\n    if (!set.has(n-1)) {\n      let cur=n, len=1;\n      while(set.has(cur+1)){cur++;len++;}\n      best=Math.max(best,len);\n    }\n  }\n  return best;\n}`,
          python: `def longest_consecutive(nums):\n    s = set(nums); best = 0\n    for n in s:\n        if n-1 not in s:\n            cur,length=n,1\n            while cur+1 in s: cur+=1; length+=1\n            best=max(best,length)\n    return best`,
        },
        testCases: [
          { input: "[100,4,200,1,3,2]", expected: "4" },
          { input: "[]", expected: "0", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        hints: [
          "Only start counting from the beginning of a sequence (no n-1 in set).",
        ],
        tags: ["set", "array", "greedy"],
        walkthrough: [
          {
            title: "Load everything into a HashSet",
            explanation:
              "Put all elements in a Set for O(1) lookup. Our array [100,4,200,1,3,2] becomes a set. Now we can check existence instantly.",
            phase: "init",
            visual: {
              type: "array",
              array: [100, 4, 200, 1, 3, 2],
              labels: ["", "", "", "", "", ""],
              states: [
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
              ],
            },
            insight:
              "We need O(n) total. The key trick: only start counting from sequence beginnings.",
          },
          {
            title: "Find sequence starts",
            explanation:
              "A number n is a sequence start if n-1 is NOT in the set. For 1: is 0 in the set? No → sequence start! For 2: is 1 in the set? Yes → skip. For 100: is 99 in set? No → start.",
            phase: "scan",
            visual: {
              type: "array",
              array: [1, 2, 3, 4, 100, 200],
              labels: ["start", "skip", "skip", "skip", "start", "start"],
              states: [
                "found",
                "eliminated",
                "eliminated",
                "eliminated",
                "found",
                "found",
              ],
            },
            code: `for (const n of set) {\n  if (!set.has(n - 1)) { // sequence start!\n    let cur = n, len = 1;\n    while (set.has(cur + 1)) { cur++; len++; }\n    best = Math.max(best, len);\n  }\n}`,
            codeHighlight: [2],
            variables: { starts: "1, 100, 200" },
          },
          {
            title: "Count from each start",
            explanation:
              "From start=1: check 2✓, 3✓, 4✓, 5✗ → length 4. From start=100: check 101✗ → length 1. From start=200: check 201✗ → length 1. Best = 4.",
            phase: "found",
            visual: {
              type: "array",
              array: [1, 2, 3, 4],
              labels: ["start", "+1", "+2", "+3"],
              states: ["found", "found", "found", "found"],
              pointers: { 0: "cur→" },
            },
            variables: { best: 4, sequence: "[1,2,3,4]" },
            complexity:
              "O(n) — each element is visited at most twice: once when checking if it's a start, once when counting from its sequence's start.",
          },
        ],
      },
      {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        description:
          "Given an array of strings strs, group the anagrams together.",
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          },
        ],
        constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100"],
        starterCode: {
          js: `function groupAnagrams(strs) {\n  \n}`,
          python: `def group_anagrams(strs):\n    pass`,
        },
        solution: {
          js: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (const s of strs) {\n    const key = s.split('').sort().join('');\n    if (!map.has(key)) map.set(key,[]);\n    map.get(key).push(s);\n  }\n  return [...map.values()];\n}`,
          python: `from collections import defaultdict\ndef group_anagrams(strs):\n    groups = defaultdict(list)\n    for s in strs:\n        groups[tuple(sorted(s))].append(s)\n    return list(groups.values())`,
        },
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected: "3 groups",
          },
          { input: '[""]', expected: '[[""]]' },
        ],
        timeComplexity: "O(n·k log k)",
        spaceComplexity: "O(n·k)",
        hints: [
          "What is the canonical form of an anagram?",
          "Sorted string is the same for all anagrams.",
        ],
        tags: ["hash-map", "string", "sorting"],
        walkthrough: [
          {
            title: "The canonical key idea",
            explanation:
              '"eat", "tea", "ate" are all anagrams — they contain the same letters. If we sort each word\'s letters, they all become "aet". That sorted form is our HashMap key.',
            phase: "init",
            visual: {
              type: "split",
              left: ["eat", "tea", "tan", "ate", "nat", "bat"],
              right: ["aet", "aet", "ant", "aet", "ant", "abt"],
              leftLabel: "Original",
              rightLabel: "Sorted letters (key)",
            },
            insight:
              '"eat" → sort → "aet". "tea" → sort → "aet". Same key → same group!',
          },
          {
            title: "Build groups via HashMap",
            explanation:
              'For each word, compute its sorted key and append to the corresponding HashMap list. "eat"→"aet": map["aet"] = ["eat"]. "tea"→"aet": map["aet"] = ["eat","tea"].',
            phase: "update",
            visual: {
              type: "array",
              array: ["eat", "tea", "tan", "ate", "nat", "bat"],
              states: [
                "found",
                "found",
                "comparing",
                "found",
                "comparing",
                "active",
              ],
              mapEntries: [
                { key: "aet", value: "[eat,tea,ate]" },
                { key: "ant", value: "[tan,nat]" },
                { key: "abt", value: "[bat]" },
              ],
            },
            code: `for (const s of strs) {\n  const key = s.split('').sort().join('');\n  if (!map.has(key)) map.set(key, []);\n  map.get(key).push(s);\n}`,
            codeHighlight: [2, 3, 4],
            variables: { "groups so far": "3" },
          },
          {
            title: "Return all groups",
            explanation:
              'Return map.values() — three groups: [["eat","tea","ate"], ["tan","nat"], ["bat"]]. Each group contains all anagrams.',
            phase: "done",
            visual: {
              type: "split",
              left: ["eat", "tea", "ate"],
              right: ["tan", "nat"],
              leftLabel: "Group 1 (aet)",
              rightLabel: "Group 2 (ant)",
              leftStates: ["found", "found", "found"],
              rightStates: ["comparing", "comparing"],
            },
            complexity:
              "Time O(n·k log k) — sorting each word of length k. Space O(n·k) for the HashMap.",
          },
        ],
      },
      ,
      {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        description:
          "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        examples: [{ input: 's = "anagram", t = "nagaram"', output: "true" }],
        constraints: ["1 ≤ s.length, t.length ≤ 5*10^4"],
        starterCode: {
          js: "function isAnagram(s, t) {\n  \n}",
          python: "def is_anagram(s, t):\n    pass",
        },
        solution: {
          js: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}",
          python:
            "from collections import Counter\ndef is_anagram(s, t):\n    return Counter(s) == Counter(t)",
        },
        testCases: [
          { input: '"anagram"\n"nagaram"', expected: "true" },
          { input: '"rat"\n"car"', expected: "false" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Use an array of size 26 or a HashMap to count character frequencies.",
        ],
        tags: ["hash-map", "string"],
        walkthrough: [],
      } as any,
    ],
    quiz: [
      {
        id: "q1",
        question: "What is the average time complexity of HashMap lookup?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 2,
        explanation:
          "HashMap achieves amortized O(1) lookup via hash function + direct addressing.",
      },
      {
        id: "q2",
        question:
          "In Two Sum, why do we store the complement instead of checking all pairs?",
        options: [
          "Saves memory",
          "Enables O(1) pair lookup per element",
          "Avoids duplicates",
          "Same thing",
        ],
        correct: 1,
        explanation:
          "Storing complement=target-nums[i] lets us check O(1) if the matching number has been seen, reducing O(n²) to O(n).",
      },
      {
        id: "q3",
        question: "What is the worst-case time for a HashMap operation?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation:
          "Worst case (all keys collide) degrades to O(n) linked list traversal.",
      },
    ],
    cheatSheet: `# Arrays & Hashing\n## Templates\n\`\`\`js\n// Frequency map\nconst freq = new Map();\nfor (const x of arr) freq.set(x, (freq.get(x)||0)+1);\n\n// Two Sum pattern\nconst seen = new Map();\nfor (let i=0;i<nums.length;i++) {\n  if (seen.has(target-nums[i])) return [seen.get(target-nums[i]),i];\n  seen.set(nums[i],i);\n}\n\`\`\``,
    proTips: [
      "Always clarify: can the same element be used twice?",
      "HashMap vs HashSet: Map when you need values, Set for existence",
    ],
    faangQuotes: [
      '"Two Sum is our litmus test — we want to see if you immediately think HashMap." — Google Senior Engineer',
    ],
    usefulLinks: [
      {
        title: "LeetCode Explore: Arrays",
        url: "https://leetcode.com/explore/learn/card/array-and-string/",
      },
    ],
    visualizationType: "array",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TOPIC 02 — Two Pointers
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic02",
    slug: "two-pointers",
    title: "Two Pointers",
    emoji: "👉",
    color: "#22c55e",
    gradient: "from-jade-500 to-jade-400",
    layman:
      "Imagine finding two people in a sorted line who together weigh 150kg. Instead of checking everyone against everyone, stand one at each end and walk inward — if too heavy move the heavier side in; if too light move the lighter side.",
    technical:
      "Two pointers exploit sorted order to reduce O(n²) nested loops to O(n). The invariant: maintain a valid search space that shrinks monotonically, guaranteeing termination and correctness.",
    keyInsights: [
      "Requires sorted array OR specific structure (palindrome, partitioned)",
      "Left advances when we need a larger value, right retreats for smaller",
      "Can extend to 3Sum via outer loop + inner two pointers",
    ],
    timeComplexities: [
      {
        operation: "Two Sum II (sorted)",
        best: "O(1)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
      {
        operation: "3Sum",
        best: "O(n²)",
        avg: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "container-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        description:
          "Given n vertical lines where line i has height height[i], find two lines that together with the x-axis contain the most water.",
        examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }],
        constraints: ["n == height.length", "2 ≤ n ≤ 10⁵"],
        starterCode: {
          js: `function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  \n}`,
          python: `def max_area(height):\n    left, right = 0, len(height) - 1`,
        },
        solution: {
          js: `function maxArea(height) {\n  let left=0,right=height.length-1,max=0;\n  while(left<right){\n    max=Math.max(max,Math.min(height[left],height[right])*(right-left));\n    if(height[left]<height[right])left++;\n    else right--;\n  }\n  return max;\n}`,
          python: `def max_area(height):\n    left,right=0,len(height)-1; max_w=0\n    while left<right:\n        max_w=max(max_w,min(height[left],height[right])*(right-left))\n        if height[left]<height[right]: left+=1\n        else: right-=1\n    return max_w`,
        },
        testCases: [
          { input: "[1,8,6,2,5,4,8,3,7]", expected: "49" },
          { input: "[1,1]", expected: "1" },
          { input: "[4,3,2,1,4]", expected: "16", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Move the shorter wall inward — keeping the taller wall can only help.",
        ],
        tags: ["two-pointers", "greedy"],
        walkthrough: [
          {
            title: "Start at both ends",
            explanation:
              "Place left pointer at index 0 (height 1) and right pointer at index 8 (height 7). Water = min(1,7) × (8-0) = 1×8 = 8.",
            phase: "init",
            visual: {
              type: "bars",
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              states: [
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "active",
              ],
              pointers: { 0: "L", 8: "R" },
            },
            variables: { left: 0, right: 8, area: 8, max: 8 },
          },
          {
            title: "Move the shorter wall",
            explanation:
              "height[left]=1 < height[right]=7. Moving the right pointer can only decrease width AND keep the same height limit (min). Moving left might find a taller wall. So left++.",
            phase: "scan",
            visual: {
              type: "bars",
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              states: [
                "eliminated",
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "active",
              ],
              pointers: { 1: "L", 8: "R" },
            },
            insight:
              "Greedy proof: the water is limited by the shorter side. Moving the shorter side is the ONLY way to possibly increase water height.",
            variables: { left: 1, right: 8, area: "min(8,7)×7 = 49", max: 49 },
          },
          {
            title: "Found maximum: 49",
            explanation:
              "height[left=1]=8, height[right=8]=7. Area = min(8,7)×7 = 49. This is the maximum! Continue shrinking until left≥right.",
            phase: "found",
            visual: {
              type: "bars",
              array: [1, 8, 6, 2, 5, 4, 8, 3, 7],
              states: [
                "eliminated",
                "result",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "result",
              ],
              pointers: { 1: "L", 8: "R" },
            },
            variables: { max: 49, width: 7, height: "min(8,7)=7" },
            complexity:
              "O(n) — each pointer moves inward at most n times total. O(1) space.",
          },
        ],
      },
      {
        id: "three-sum",
        title: "3Sum",
        difficulty: "Medium",
        description:
          "Given an integer array nums, return all triplets [i,j,k] such that nums[i]+nums[j]+nums[k]==0. No duplicate triplets.",
        examples: [
          { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
        ],
        constraints: ["3 ≤ nums.length ≤ 3000"],
        starterCode: {
          js: `function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  \n}`,
          python: `def three_sum(nums):\n    nums.sort()`,
        },
        solution: {
          js: `function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  const res=[];\n  for(let i=0;i<nums.length-2;i++){\n    if(i>0&&nums[i]===nums[i-1])continue;\n    let l=i+1,r=nums.length-1;\n    while(l<r){\n      const s=nums[i]+nums[l]+nums[r];\n      if(s===0){res.push([nums[i],nums[l],nums[r]]);while(l<r&&nums[l]===nums[l+1])l++;while(l<r&&nums[r]===nums[r-1])r--;l++;r--;}\n      else if(s<0)l++;else r--;\n    }\n  }\n  return res;\n}`,
          python: `def three_sum(nums):\n    nums.sort(); res=[]\n    for i in range(len(nums)-2):\n        if i>0 and nums[i]==nums[i-1]: continue\n        l,r=i+1,len(nums)-1\n        while l<r:\n            s=nums[i]+nums[l]+nums[r]\n            if s==0: res.append([nums[i],nums[l],nums[r]]);l+=1;r-=1\n            elif s<0: l+=1\n            else: r-=1\n    return res`,
        },
        testCases: [
          { input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]" },
          { input: "[0,0,0]", expected: "[[0,0,0]]", hidden: true },
        ],
        timeComplexity: "O(n²)",
        spaceComplexity: "O(log n)",
        hints: [
          "Sort first.",
          "Fix one number, then two-pointer on the rest.",
          "Skip duplicate outer elements.",
        ],
        tags: ["two-pointers", "sorting"],
        walkthrough: [
          {
            title: "Sort the array",
            explanation:
              "Sort [-1,0,1,2,-1,-4] → [-4,-1,-1,0,1,2]. Sorting is the prerequisite for two-pointer to work and makes duplicate skipping easy.",
            phase: "init",
            visual: {
              type: "array",
              array: [-4, -1, -1, 0, 1, 2],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
            },
          },
          {
            title: "Fix i=1 (value -1), two-pointer inner",
            explanation:
              "Fix nums[i]=-1. Set L=i+1=2, R=5. Sum = -1+(-1)+2 = 0. Found triplet! Store [-1,-1,2], then advance both pointers and skip duplicates.",
            phase: "found",
            visual: {
              type: "array",
              array: [-4, -1, -1, 0, 1, 2],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "eliminated",
                "pointer",
                "active",
                "default",
                "default",
                "found",
              ],
              pointers: { 1: "i", 2: "L", 5: "R" },
            },
            variables: {
              "nums[i]": -1,
              "nums[L]": -1,
              "nums[R]": 2,
              sum: 0,
              triplet: "[-1,-1,2]",
            },
            insight:
              "Two-pointer on a sorted subarray: if sum<0, need bigger → L++. If sum>0, need smaller → R--. If sum=0, found it!",
          },
          {
            title: "Continue: L=3, R=4",
            explanation:
              "After advancing, L=3 (value 0), R=4 (value 1). Sum = -1+0+1 = 0. Found second triplet [-1,0,1]! Then L≥R, move to next i.",
            phase: "found",
            visual: {
              type: "array",
              array: [-4, -1, -1, 0, 1, 2],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "eliminated",
                "pointer",
                "eliminated",
                "active",
                "active",
                "eliminated",
              ],
              pointers: { 1: "i", 3: "L", 4: "R" },
            },
            variables: { triplet: "[-1,0,1]", result: "[[-1,-1,2],[-1,0,1]]" },
            complexity:
              "Time O(n²) — O(n) outer × O(n) two-pointer inner. Space O(log n) for sort.",
          },
        ],
      },
      {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        description:
          "Given n non-negative integers representing an elevation map, compute how much water it can trap.",
        examples: [
          { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
        ],
        constraints: ["1 ≤ n ≤ 2×10⁴"],
        starterCode: {
          js: `function trap(height) {\n  let left=0, right=height.length-1;\n  let leftMax=0, rightMax=0, water=0;\n}`,
          python: `def trap(height):\n    left,right=0,len(height)-1\n    left_max=right_max=water=0`,
        },
        solution: {
          js: `function trap(height) {\n  let l=0,r=height.length-1,lm=0,rm=0,w=0;\n  while(l<r){\n    if(height[l]<height[r]){lm=Math.max(lm,height[l]);w+=lm-height[l];l++;}\n    else{rm=Math.max(rm,height[r]);w+=rm-height[r];r--;}\n  }\n  return w;\n}`,
          python: `def trap(height):\n    l,r=0,len(height)-1; lm=rm=w=0\n    while l<r:\n        if height[l]<height[r]: lm=max(lm,height[l]); w+=lm-height[l]; l+=1\n        else: rm=max(rm,height[r]); w+=rm-height[r]; r-=1\n    return w`,
        },
        testCases: [
          { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
          { input: "[4,2,0,3,2,5]", expected: "9" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Water at cell = min(maxLeft, maxRight) − height[cell]",
          "Process from the smaller side first.",
        ],
        tags: ["two-pointers", "stack"],
        walkthrough: [
          {
            title: "Water level formula",
            explanation:
              "Water trapped at position i = min(maxLeft, maxRight) - height[i]. We need the highest wall on each side. Two-pointer maintains these incrementally.",
            phase: "init",
            visual: {
              type: "bars",
              array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
              states: [
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
              ],
            },
            insight:
              "Key insight: process the side with the shorter max-wall. Why? Because water there is determined by that shorter side — the other side is guaranteed to be taller.",
          },
          {
            title: "Process left side (leftMax < rightMax)",
            explanation:
              "height[left=0]=0 < height[right=11]=1. leftMax=0. Water at 0 = leftMax - height[0] = 0-0 = 0. Advance left.",
            phase: "scan",
            visual: {
              type: "bars",
              array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
              states: [
                "active",
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
                "comparing",
              ],
              pointers: { 0: "L", 11: "R" },
            },
            variables: {
              left: 0,
              right: 11,
              leftMax: 0,
              rightMax: 1,
              water: 0,
            },
          },
          {
            title: "Accumulate trapped water",
            explanation:
              "After full sweep: positions 2,4,5,6,9,10 trap water. Total = 0+0+1+0+0+1+0+2+1+0+1+0 = 6.",
            phase: "done",
            visual: {
              type: "bars",
              array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
              states: [
                "visited",
                "visited",
                "found",
                "visited",
                "found",
                "found",
                "found",
                "visited",
                "visited",
                "found",
                "visited",
                "visited",
              ],
            },
            variables: { totalWater: 6 },
            complexity:
              "O(n) time — single pass. O(1) space — just 4 variables.",
          },
        ],
      },
      ,
      {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        description:
          "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: "true" },
        ],
        constraints: ["1 ≤ s.length ≤ 2*10^5"],
        starterCode: {
          js: "function isPalindrome(s) {\n  \n}",
          python: "def is_palindrome(s):\n    pass",
        },
        solution: {
          js: "function isPalindrome(s) {\n  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    if (s[l] !== s[r]) return false;\n    l++; r--;\n  }\n  return true;\n}",
          python:
            "def is_palindrome(s):\n    s = [c.lower() for c in s if c.isalnum()]\n    return s == s[::-1]",
        },
        testCases: [
          { input: '"A man, a plan, a canal: Panama"', expected: "true" },
          { input: '"race a car"', expected: "false" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Use two pointers, one from the start and one from the end, skipping non-alphanumeric characters.",
        ],
        tags: ["two-pointers", "string"],
        walkthrough: [],
      } as any,
    ],
    quiz: [
      {
        id: "q1",
        question:
          "In Container With Most Water, why do we always move the shorter wall?",
        options: [
          "Arbitrary choice",
          "Moving taller wall can only decrease area",
          "Algorithm requirement",
          "Both B is correct",
        ],
        correct: 1,
        explanation:
          "Area = min(h[l],h[r])×width. Height is capped by shorter wall. Moving shorter wall might increase height; moving taller wall keeps height the same or worse.",
      },
    ],
    cheatSheet: `# Two Pointers\n\`\`\`js\nlet l=0, r=arr.length-1;\nwhile(l<r) {\n  if(condition) l++;\n  else r--;\n}\n\`\`\``,
    proTips: [
      "Sort array first unless problem says otherwise",
      "For 3Sum: fix outer, two-pointer inner, skip duplicates",
    ],
    faangQuotes: [
      '"Trapping Rain Water is our gold standard Hard problem — it requires the invariant insight." — Amazon',
    ],
    usefulLinks: [
      {
        title: "Two Pointer Technique",
        url: "https://leetcode.com/articles/two-pointer-technique/",
      },
    ],
    visualizationType: "array",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TOPICS 03–18 — full data with walkthrough
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "topic03",
    slug: "sliding-window",
    title: "Sliding Window",
    emoji: "🪟",
    color: "#a78bfa",
    gradient: "from-violet-500 to-violet-400",
    layman:
      "Imagine looking through a window sliding along a street. Instead of re-examining every house from scratch, you add the house entering and remove the one leaving.",
    technical:
      "Sliding window maintains a contiguous subarray satisfying some constraint, expanding or contracting as needed. Avoids redundant recomputation by incrementally updating window state.",
    keyInsights: [
      "Expand right to grow window, shrink left to maintain constraint",
      "Variable-length for optimization; fixed-length for exact k-size",
      "HashMap for character frequency tracking in string windows",
    ],
    timeComplexities: [
      {
        operation: "Fixed Window",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
      {
        operation: "Variable Window",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(k)",
      },
    ],
    questions: [
      {
        id: "max-subarray",
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Easy",
        description:
          "Find the subarray with the largest sum and return its sum.",
        examples: [
          {
            input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            output: "6",
            explanation: "Subarray [4,-1,2,1] has sum 6.",
          },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵"],
        starterCode: {
          js: `function maxSubArray(nums) {\n  \n}`,
          python: `def max_sub_array(nums):\n    pass`,
        },
        solution: {
          js: `function maxSubArray(nums) {\n  let maxSum=nums[0],curSum=nums[0];\n  for(let i=1;i<nums.length;i++){\n    curSum=Math.max(nums[i],curSum+nums[i]);\n    maxSum=Math.max(maxSum,curSum);\n  }\n  return maxSum;\n}`,
          python: `def max_sub_array(nums):\n    max_sum=cur_sum=nums[0]\n    for n in nums[1:]:\n        cur_sum=max(n,cur_sum+n)\n        max_sum=max(max_sum,cur_sum)\n    return max_sum`,
        },
        testCases: [
          { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
          { input: "[1]", expected: "1" },
          { input: "[-1]", expected: "-1", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: ["At each position: extend current subarray OR start fresh?"],
        tags: ["dp", "sliding-window", "greedy"],
        walkthrough: [
          {
            title: "Kadane's key decision",
            explanation:
              "At each element, ask: is it better to extend my current subarray, or start a fresh subarray here? curSum = max(nums[i], curSum + nums[i]).",
            phase: "init",
            visual: {
              type: "array",
              array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
              labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
              states: [
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
            },
            insight:
              "If curSum + nums[i] < nums[i], the accumulated sum is negative — better to drop it and restart.",
          },
          {
            title: "i=1: Start fresh (curSum was -2)",
            explanation:
              "curSum=-2, nums[1]=1. max(1, -2+1)=max(1,-1)=1. Restart! A negative prefix drags us down.",
            phase: "scan",
            visual: {
              type: "array",
              array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
              states: [
                "eliminated",
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 1: "i" },
            },
            variables: { curSum: 1, maxSum: 1 },
          },
          {
            title: "i=3: Extend (4 is a big gain)",
            explanation:
              "curSum=-2 (after i=2), nums[3]=4. max(4, -2+4)=max(4,2)=4. Restart again — jump to 4 directly.",
            phase: "update",
            visual: {
              type: "array",
              array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
              states: [
                "eliminated",
                "eliminated",
                "eliminated",
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 3: "i" },
            },
            variables: { curSum: 4, maxSum: 4 },
          },
          {
            title: "Subarray [4,-1,2,1] accumulates to 6",
            explanation:
              "From index 3: 4→3(+(-1))→5(+2)→6(+1)→1(+(-5)→start fresh). Max was 6 at index 6.",
            phase: "found",
            visual: {
              type: "array",
              array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
              states: [
                "eliminated",
                "eliminated",
                "eliminated",
                "found",
                "found",
                "found",
                "found",
                "eliminated",
                "default",
              ],
              pointers: { 3: "start", 6: "max" },
            },
            variables: { maxSum: 6, subarray: "[4,-1,2,1]" },
            complexity: "O(n) time — single pass. O(1) space — two variables.",
          },
        ],
      },
      {
        id: "longest-substring",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description:
          "Given string s, find the length of the longest substring without repeating characters.",
        examples: [
          {
            input: 's = "abcabcbb"',
            output: "3",
            explanation: '"abc" is the answer.',
          },
        ],
        constraints: ["0 ≤ s.length ≤ 5×10⁴"],
        starterCode: {
          js: `function lengthOfLongestSubstring(s) {\n  const seen = new Map();\n  let left=0, max=0;\n}`,
          python: `def length_of_longest_substring(s):\n    seen={}; left=max_len=0`,
        },
        solution: {
          js: `function lengthOfLongestSubstring(s) {\n  const seen=new Map(); let left=0,max=0;\n  for(let right=0;right<s.length;right++){\n    if(seen.has(s[right]))left=Math.max(left,seen.get(s[right])+1);\n    seen.set(s[right],right);\n    max=Math.max(max,right-left+1);\n  }\n  return max;\n}`,
          python: `def length_of_longest_substring(s):\n    seen={}; left=max_len=0\n    for right,ch in enumerate(s):\n        if ch in seen: left=max(left,seen[ch]+1)\n        seen[ch]=right\n        max_len=max(max_len,right-left+1)\n    return max_len`,
        },
        testCases: [
          { input: '"abcabcbb"', expected: "3" },
          { input: '"bbbbb"', expected: "1" },
          { input: '"pwwkew"', expected: "3", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m,n))",
        hints: [
          "Track last seen index of each character.",
          "Move left past the duplicate when found.",
        ],
        tags: ["sliding-window", "hash-map", "string"],
        walkthrough: [
          {
            title: "Expand window to the right",
            explanation:
              "Use a HashMap storing last seen index of each character. Expand right pointer. If we see a duplicate, jump left past the previous occurrence.",
            phase: "init",
            visual: {
              type: "array",
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
              states: [
                "active",
                "active",
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 0: "L", 2: "R" },
            },
            variables: { window: '"abc"', length: 3, max: 3 },
          },
          {
            title: 'Hit duplicate "a" at index 3',
            explanation:
              'seen["a"]=0. left=max(0, 0+1)=1. Skip past the old "a". Window is now "bca" (indices 1-3).',
            phase: "compare",
            visual: {
              type: "array",
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              states: [
                "eliminated",
                "active",
                "active",
                "active",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 1: "L", 3: "R" },
              mapEntries: [
                { key: "a", value: 3 },
                { key: "b", value: 1 },
                { key: "c", value: 2 },
              ],
            },
            variables: { left: 1, right: 3, max: 3 },
            insight:
              'We jump left to seen[char]+1, not just left+1. This handles cases like "abba" where the duplicate is far back.',
          },
          {
            title: "Final result",
            explanation:
              'After full scan of "abcabcbb", max window length was 3 (e.g. "abc"). The pointer jump ensures we never shrink left past a valid position.',
            phase: "done",
            visual: {
              type: "array",
              array: ["a", "b", "c", "a", "b", "c", "b", "b"],
              states: [
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
                "visited",
              ],
            },
            variables: { maxLength: 3 },
            complexity:
              "O(n) — right pointer advances once; left only moves forward. O(min(m,n)) space.",
          },
        ],
      },
      {
        id: "min-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        description:
          "Return the minimum window substring of s that contains every character in t.",
        examples: [{ input: 's="ADOBECODEBANC", t="ABC"', output: '"BANC"' }],
        constraints: ["1 ≤ s.length, t.length ≤ 10⁵"],
        starterCode: {
          js: `function minWindow(s, t) {\n  \n}`,
          python: `def min_window(s, t):\n    pass`,
        },
        solution: {
          js: `function minWindow(s,t){\n  const need=new Map(),have=new Map();\n  for(const c of t)need.set(c,(need.get(c)||0)+1);\n  let formed=0,req=need.size,l=0,res='',resLen=Infinity;\n  for(let r=0;r<s.length;r++){\n    const c=s[r];have.set(c,(have.get(c)||0)+1);\n    if(need.has(c)&&have.get(c)===need.get(c))formed++;\n    while(formed===req){\n      if(r-l+1<resLen){resLen=r-l+1;res=s.slice(l,r+1);}\n      const lc=s[l];have.set(lc,have.get(lc)-1);\n      if(need.has(lc)&&have.get(lc)<need.get(lc))formed--;\n      l++;\n    }\n  }\n  return res;\n}`,
          python: `from collections import Counter\ndef min_window(s,t):\n    need=Counter(t);have={};formed=req=len(need);l=0;res='';res_len=float('inf')\n    for r,c in enumerate(s):\n        have[c]=have.get(c,0)+1\n        if c in need and have[c]==need[c]: formed-=1\n        while formed==0:\n            if r-l+1<res_len: res_len=r-l+1;res=s[l:r+1]\n            lc=s[l];have[lc]-=1\n            if lc in need and have[lc]<need[lc]: formed+=1\n            l+=1\n    return res`,
        },
        testCases: [
          { input: '"ADOBECODEBANC"\n"ABC"', expected: '"BANC"' },
          { input: '"a"\n"a"', expected: '"a"' },
          { input: '"a"\n"aa"', expected: '""', hidden: true },
        ],
        timeComplexity: "O(|s|+|t|)",
        spaceComplexity: "O(|s|+|t|)",
        hints: [
          "Track how many unique t-characters are fully satisfied.",
          "Shrink window from left when all are satisfied.",
        ],
        tags: ["sliding-window", "hash-map"],
        walkthrough: [
          {
            title: "Track character requirements",
            explanation:
              'Build need={A:1,B:1,C:1} from t="ABC". "formed" counts how many unique characters in t are fully satisfied in our current window.',
            phase: "init",
            visual: {
              type: "array",
              array: [
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
                "C",
              ],
              labels: [
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
                "12",
              ],
              states: [
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
                "default",
              ],
            },
            variables: { need: "{A:1,B:1,C:1}", formed: 0, required: 3 },
          },
          {
            title: "Expand right until all satisfied",
            explanation:
              'Expand right. At r=5 ("C"), we have A✓ B✓ C✓ → formed=3=required. Window "ADOBEC" contains all of t.',
            phase: "scan",
            visual: {
              type: "array",
              array: [
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
                "C",
              ],
              states: [
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
                "default",
              ],
              pointers: { 0: "L", 5: "R" },
            },
            variables: { window: '"ADOBEC"', formed: 3, length: 6 },
          },
          {
            title: "Shrink left to minimize window",
            explanation:
              'While all required chars are satisfied, try to shrink. Remove "A" from left — formed drops back to 2. Best window so far was "ADOBEC" (6 chars).',
            phase: "update",
            visual: {
              type: "array",
              array: [
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
                "C",
              ],
              states: [
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
                "default",
              ],
              pointers: { 1: "L", 5: "R" },
            },
            variables: { left: 1, best: '"ADOBEC"', bestLen: 6 },
          },
          {
            title: 'Final answer: "BANC"',
            explanation:
              'After full scan, the minimum window is "BANC" (indices 9-12, length 4). This is shorter than "ADOBEC".',
            phase: "done",
            visual: {
              type: "array",
              array: [
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
                "C",
              ],
              states: [
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
                "result",
              ],
              pointers: { 9: "L", 12: "R" },
            },
            variables: { answer: '"BANC"', length: 4 },
            complexity:
              "O(|s|+|t|) — both pointers traverse s once. Space O(|s|+|t|).",
          },
        ],
      },
      ,
      {
        id: "best-time-to-buy-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description:
          "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5" }],
        constraints: ["1 ≤ prices.length ≤ 10^5"],
        starterCode: {
          js: "function maxProfit(prices) {\n  \n}",
          python: "def max_profit(prices):\n    pass",
        },
        solution: {
          js: "function maxProfit(prices) {\n  let minPrice = Infinity, maxProf = 0;\n  for (let p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxProf = Math.max(maxProf, p - minPrice);\n  }\n  return maxProf;\n}",
          python:
            "def max_profit(prices):\n    min_price, max_prof = float('inf'), 0\n    for p in prices:\n        min_price = min(min_price, p)\n        max_prof = max(max_prof, p - min_price)\n    return max_prof",
        },
        testCases: [
          { input: "[7,1,5,3,6,4]", expected: "5" },
          { input: "[7,6,4,3,1]", expected: "0" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: ["Keep track of the minimum price seen so far."],
        tags: ["sliding-window", "array", "dynamic-programming"],
        walkthrough: [],
      } as any,
    ],
    quiz: [
      {
        id: "q1",
        question: "When should you use variable vs fixed sliding window?",
        options: [
          "Always fixed",
          "Fixed for exact k-size, variable for optimal",
          "Always variable",
          "Depends on memory",
        ],
        correct: 1,
        explanation:
          "Fixed when you need exactly k elements. Variable when optimizing with a constraint.",
      },
    ],
    cheatSheet: `# Sliding Window\n\`\`\`js\nlet l=0,max=0;\nfor(let r=0;r<n;r++){\n  // add s[r]\n  while(invalid){l++;}\n  max=Math.max(max,r-l+1);\n}\n\`\`\``,
    proTips: [
      "Identify the window constraint first",
      "For string problems, track char frequencies with a Map",
    ],
    faangQuotes: [
      '"Minimum Window Substring is our favorite screening question." — Google',
    ],
    usefulLinks: [
      {
        title: "Sliding Window Pattern",
        url: "https://leetcode.com/discuss/general-discussion/1122776/summary-of-sliding-window-patterns",
      },
    ],
    visualizationType: "array",
  },

  {
    id: "topic04",
    slug: "linked-lists",
    title: "Linked Lists",
    emoji: "🔗",
    color: "#f59e0b",
    gradient: "from-amber-500 to-amber-400",
    layman:
      "A linked list is like a treasure hunt — each clue tells you where the next clue is. Unlike an array where items sit in numbered boxes, each node only knows its own value and a pointer to the next.",
    technical:
      "Linked lists: O(1) insert/delete given a pointer, O(n) search. Key techniques: dummy head node, fast/slow pointers, in-place reversal.",
    keyInsights: [
      "Dummy head eliminates edge cases for head deletion",
      "Fast/slow pointer for cycle detection and midpoint finding",
      "Reverse in-place: track prev, cur, next",
      "Draw pointer arrows before coding — prevents bugs",
    ],
    timeComplexities: [
      {
        operation: "Access",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
      {
        operation: "Insert/Delete (head)",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(1)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        description:
          "Given the head of a singly linked list, reverse the list and return the reversed list.",
        examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }],
        constraints: ["0 ≤ n ≤ 5000"],
        starterCode: {
          js: `function reverseList(head) {\n  let prev=null, cur=head;\n}`,
          python: `def reverse_list(head):\n    prev, cur = None, head`,
        },
        solution: {
          js: `function reverseList(head) {\n  let prev=null,cur=head;\n  while(cur){\n    const next=cur.next;\n    cur.next=prev;\n    prev=cur;\n    cur=next;\n  }\n  return prev;\n}`,
          python: `def reverse_list(head):\n    prev,cur=None,head\n    while cur:\n        nxt=cur.next; cur.next=prev; prev=cur; cur=nxt\n    return prev`,
        },
        testCases: [
          { input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]" },
          { input: "[1,2]", expected: "[2,1]" },
          { input: "[]", expected: "[]", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Three pointers: prev, cur, next.",
          "Draw it out on paper first.",
        ],
        tags: ["linked-list", "in-place"],
        walkthrough: [
          {
            title: "Initial state",
            explanation:
              "List: 1→2→3→4→5→null. prev=null, cur=head(1). We will redirect each .next pointer to point backwards.",
            phase: "init",
            visual: {
              type: "linkedlist",
              llNodes: [
                { val: 1 },
                { val: 2 },
                { val: 3 },
                { val: 4 },
                { val: 5 },
              ],
              llHighlighted: [0],
            },
            variables: { prev: "null", cur: 1 },
          },
          {
            title: "Iteration 1: reverse 1→null",
            explanation:
              "Store next=cur.next(2). Set cur.next=prev(null). Move prev=cur(1), cur=next(2).",
            phase: "update",
            visual: {
              type: "linkedlist",
              llNodes: [
                { val: "null", state: "pointer" },
                { val: 1, state: "active" },
                { val: 2, state: "comparing" },
                { val: 3 },
                { val: 4 },
                { val: 5 },
              ],
              llHighlighted: [1],
            },
            variables: { prev: 1, cur: 2, next: 2 },
          },
          {
            title: "Iteration 2: reverse 2→1",
            explanation:
              "next=3. cur(2).next = prev(1). Now 2→1→null. Move prev=2, cur=3.",
            phase: "update",
            visual: {
              type: "linkedlist",
              llNodes: [
                { val: 2, state: "active" },
                { val: 1, state: "visited" },
                { val: 3, state: "comparing" },
                { val: 4 },
                { val: 5 },
              ],
              llHighlighted: [0],
            },
            variables: { prev: 2, cur: 3 },
          },
          {
            title: "Final: reversed list 5→4→3→2→1",
            explanation:
              "After all iterations, prev points to the new head (5). Return prev.",
            phase: "done",
            visual: {
              type: "linkedlist",
              llNodes: [
                { val: 5, state: "found" },
                { val: 4, state: "found" },
                { val: 3, state: "found" },
                { val: 2, state: "found" },
                { val: 1, state: "found" },
              ],
            },
            variables: { result: "5→4→3→2→1" },
            complexity: "O(n) time, O(1) space — in-place pointer redirection.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Floyd's cycle detection uses slow=1 step, fast=?",
        options: ["2 steps", "3 steps", "4 steps", "n steps"],
        correct: 0,
        explanation: "Fast moves 2 steps. If cycle exists, fast will lap slow.",
      },
    ],
    cheatSheet: `# Linked List\n\`\`\`js\nlet prev=null,cur=head;\nwhile(cur){const next=cur.next;cur.next=prev;prev=cur;cur=next;}\nreturn prev;\n\`\`\``,
    proTips: [
      "Always use a dummy head for complex operations",
      "Draw pointer arrows before coding",
    ],
    faangQuotes: [
      '"Reverse Linked List in-place is the first test of pointer manipulation comfort." — Facebook',
    ],
    visualizationType: "linkedlist",
  },

  {
    id: "topic05",
    slug: "stacks-queues",
    title: "Stacks & Queues",
    emoji: "📚",
    color: "#f43f5e",
    gradient: "from-rose-500 to-rose-400",
    layman:
      "A stack is like a stack of plates — add and remove from the top only (LIFO). A queue is like a coffee shop line — first in, first out (FIFO).",
    technical:
      "Stacks enable O(1) push/pop with LIFO ordering, perfect for nested structures. Monotonic stacks maintain increasing/decreasing invariants for Next Greater Element problems.",
    keyInsights: [
      "Monotonic stack: pop elements violating monotonic property",
      "Stack for parentheses: push open, pop/check on close",
      "Deque for O(1) front and back operations",
    ],
    timeComplexities: [
      {
        operation: "Stack push/pop",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(1)",
        space: "O(n)",
      },
      {
        operation: "Monotonic Stack (total)",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
    ],
    questions: [
      {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        description:
          "Given a string s with '(', ')', '{', '}', '[', ']', determine if it is valid.",
        examples: [
          { input: 's = "()[]{}"', output: "true" },
          { input: 's = "(]"', output: "false" },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁴"],
        starterCode: {
          js: `function isValid(s) {\n  const stack=[];\n  const map={')':'(', '}':'{', ']':'['};\n}`,
          python: `def is_valid(s):\n    stack=[]\n    pairs={')':'(', '}':'{', ']':'['}`,
        },
        solution: {
          js: `function isValid(s){\n  const stack=[];\n  const map={')':'(','}':'{',']':'['};\n  for(const c of s){\n    if('([{'.includes(c))stack.push(c);\n    else if(stack.pop()!==map[c])return false;\n  }\n  return stack.length===0;\n}`,
          python: `def is_valid(s):\n    stack=[]; pairs={')':'(', '}':'{', ']':'['}\n    for c in s:\n        if c in '([{': stack.append(c)\n        elif not stack or stack.pop()!=pairs[c]: return False\n    return len(stack)==0`,
        },
        testCases: [
          { input: '"()[]{}"', expected: "true" },
          { input: '"(]"', expected: "false" },
          { input: '"([)]"', expected: "false", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        hints: [
          "Push open brackets. On close bracket, top of stack must match.",
        ],
        tags: ["stack", "string"],
        walkthrough: [
          {
            title: 'Process "(" — push',
            explanation: 'Open bracket → push onto stack. Stack: ["("].',
            phase: "scan",
            visual: {
              type: "array",
              array: ["(", ")", "{", "}", "[", "]"],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "active",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 0: "i" },
            },
            variables: { stack: '["("]' },
          },
          {
            title: 'Process ")" — pop and check',
            explanation:
              'Close bracket ")". Pop stack top = "(". Does "(" match map[")"]="("? YES. Stack empty.',
            phase: "compare",
            visual: {
              type: "array",
              array: ["(", ")", "{", "}", "[", "]"],
              states: [
                "found",
                "found",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 1: "i" },
            },
            variables: { stack: "[]", match: "✓" },
          },
          {
            title: "Process all brackets — empty stack = valid",
            explanation:
              "After processing all 6 chars, stack is empty → return true. A non-empty stack means unclosed brackets.",
            phase: "done",
            visual: {
              type: "array",
              array: ["(", ")", "{", "}", "[", "]"],
              states: ["found", "found", "found", "found", "found", "found"],
            },
            variables: { stack: "[]", result: "true" },
            complexity: "O(n) time, O(n) space for stack.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "A monotonic decreasing stack contains elements:",
        options: ["Sorted ascending", "Sorted descending", "Random", "Equal"],
        correct: 1,
        explanation:
          "Monotonic decreasing: each element ≤ the element below it.",
      },
    ],
    cheatSheet: `# Stacks\n\`\`\`js\n// Monotonic stack (next greater element)\nconst stack=[];\nfor(let i=0;i<n;i++){\n  while(stack.length&&arr[stack.at(-1)]<arr[i]){\n    result[stack.pop()]=arr[i];\n  }\n  stack.push(i);\n}\n\`\`\``,
    proTips: [
      "Draw the stack state step by step",
      'Monotonic stack: think "what is this element the answer for?"',
    ],
    faangQuotes: [
      '"Sliding Window Maximum (deque) separates good from great candidates." — Google',
    ],
    visualizationType: "array",
  },

  {
    id: "topic06",
    slug: "binary-trees",
    title: "Binary Trees & BST",
    emoji: "🌳",
    color: "#22c55e",
    gradient: "from-jade-600 to-jade-400",
    layman:
      "A binary tree is like a family tree where each person has at most 2 children. A BST adds a rule: left child always smaller, right always larger.",
    technical:
      "Every tree problem has recursive structure: solve left, solve right, combine. Master DFS (pre/in/post-order) and BFS (level-order).",
    keyInsights: [
      "Inorder BST traversal yields sorted output",
      "Height = max(leftHeight,rightHeight)+1",
      "Diameter = leftHeight+rightHeight at each node",
    ],
    timeComplexities: [
      {
        operation: "BST Search/Insert",
        best: "O(log n)",
        avg: "O(log n)",
        worst: "O(n)",
        space: "O(h)",
      },
      {
        operation: "Tree Traversal",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(h)",
      },
    ],
    questions: [
      {
        id: "max-depth",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        description:
          "Given the root of a binary tree, return its maximum depth.",
        examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
        constraints: ["0 ≤ n ≤ 10⁴"],
        starterCode: {
          js: `function maxDepth(root) {\n  \n}`,
          python: `def max_depth(root):\n    pass`,
        },
        solution: {
          js: `function maxDepth(root){\n  if(!root)return 0;\n  return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\n}`,
          python: `def max_depth(root):\n    if not root: return 0\n    return 1+max(max_depth(root.left),max_depth(root.right))`,
        },
        testCases: [
          { input: "[3,9,20,null,null,15,7]", expected: "3" },
          { input: "[1,null,2]", expected: "2", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        hints: ["Answer = 1 + max depth of two subtrees."],
        tags: ["tree", "recursion", "dfs"],
        walkthrough: [
          {
            title: "Base case: null node",
            explanation:
              "If node is null, depth is 0. This is the base case that stops recursion.",
            phase: "init",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "r", label: "3", x: 250, y: 40 },
                { id: "l", label: "9", x: 130, y: 110 },
                { id: "ri", label: "20", x: 370, y: 110 },
                { id: "rl", label: "15", x: 310, y: 180 },
                { id: "rr", label: "7", x: 430, y: 180 },
              ],
              treeEdges: [
                ["r", "l"],
                ["r", "ri"],
                ["ri", "rl"],
                ["ri", "rr"],
              ],
            },
          },
          {
            title: "Recurse on leaves",
            explanation:
              "maxDepth(9)=1 (no children). maxDepth(15)=1. maxDepth(7)=1.",
            phase: "scan",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "r", label: "3", x: 250, y: 40 },
                { id: "l", label: "9", x: 130, y: 110, state: "found" },
                { id: "ri", label: "20", x: 370, y: 110 },
                { id: "rl", label: "15", x: 310, y: 180, state: "found" },
                { id: "rr", label: "7", x: 430, y: 180, state: "found" },
              ],
              treeEdges: [
                ["r", "l"],
                ["r", "ri"],
                ["ri", "rl"],
                ["ri", "rr"],
              ],
            },
          },
          {
            title: "Combine at node 20",
            explanation:
              "maxDepth(20) = 1 + max(maxDepth(15), maxDepth(7)) = 1+max(1,1) = 2.",
            phase: "update",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "r", label: "3", x: 250, y: 40 },
                { id: "l", label: "9", x: 130, y: 110, state: "found" },
                { id: "ri", label: "20", x: 370, y: 110, state: "active" },
                { id: "rl", label: "15", x: 310, y: 180, state: "found" },
                { id: "rr", label: "7", x: 430, y: 180, state: "found" },
              ],
              treeEdges: [
                ["r", "l"],
                ["r", "ri"],
                ["ri", "rl"],
                ["ri", "rr"],
              ],
            },
            variables: { "maxDepth(20)": 2 },
          },
          {
            title: "Combine at root",
            explanation:
              "maxDepth(3) = 1+max(maxDepth(9),maxDepth(20)) = 1+max(1,2) = 3.",
            phase: "done",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "r", label: "3", x: 250, y: 40, state: "result" },
                { id: "l", label: "9", x: 130, y: 110, state: "found" },
                { id: "ri", label: "20", x: 370, y: 110, state: "found" },
                { id: "rl", label: "15", x: 310, y: 180, state: "found" },
                { id: "rr", label: "7", x: 430, y: 180, state: "found" },
              ],
              treeEdges: [
                ["r", "l"],
                ["r", "ri"],
                ["ri", "rl"],
                ["ri", "rr"],
              ],
            },
            variables: { answer: 3 },
            complexity:
              "O(n) — visit every node once. O(h) space for recursion stack.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Inorder traversal of a BST produces:",
        options: [
          "Random order",
          "Sorted ascending",
          "Level-by-level",
          "Reverse sorted",
        ],
        correct: 1,
        explanation: "BST: left<node<right. Inorder (L→N→R) = sorted output.",
      },
    ],
    cheatSheet: `# Tree DFS\n\`\`\`js\nfunction dfs(node){\n  if(!node)return;\n  // preorder here\n  dfs(node.left);\n  // inorder here\n  dfs(node.right);\n  // postorder here\n}\n\`\`\``,
    proTips: [
      "Always handle null base case first",
      "Diameter/path sum: return depth from helper, update global max",
    ],
    faangQuotes: [
      '"Serialize/Deserialize Binary Tree is our favorite system design + coding hybrid." — Amazon',
    ],
    visualizationType: "tree",
  },

  {
    id: "topic07",
    slug: "heaps",
    title: "Heaps / Priority Queues",
    emoji: "🏔️",
    color: "#fb923c",
    gradient: "from-orange-500 to-amber-400",
    layman:
      "A heap is like a tournament bracket kept live: the winner always bubbles to the top. Want the top 3 scores from a million players? A heap gives the answer without sorting everyone.",
    technical:
      "Binary heap: complete binary tree satisfying heap property. Insert O(log n) via sift-up, extract O(log n) via sift-down, build-heap O(n).",
    keyInsights: [
      "Two heaps (max+min) for dynamic median",
      "K-th largest: min-heap of size k, pop when size>k",
      "Merge K sorted: heap of (val, listIdx)",
    ],
    timeComplexities: [
      {
        operation: "Insert",
        best: "O(1)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)",
      },
      {
        operation: "Extract Min/Max",
        best: "O(log n)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)",
      },
      {
        operation: "Build Heap",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "kth-largest",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        description:
          "Return the kth largest element in the array (kth in sorted order, not kth distinct).",
        examples: [{ input: "nums=[3,2,1,5,6,4], k=2", output: "5" }],
        constraints: ["1 ≤ k ≤ nums.length ≤ 10⁵"],
        starterCode: {
          js: `function findKthLargest(nums, k) {\n  // Min-heap of size k\n}`,
          python: `import heapq\ndef find_kth_largest(nums, k):\n    pass`,
        },
        solution: {
          js: `function findKthLargest(nums,k){\n  // QuickSelect O(n) avg\n  function qs(l,r){\n    const pivot=nums[r];let p=l;\n    for(let i=l;i<r;i++)if(nums[i]<=pivot){[nums[p],nums[i]]=[nums[i],nums[p]];p++;}\n    [nums[p],nums[r]]=[nums[r],nums[p]];\n    if(p===nums.length-k)return nums[p];\n    if(p<nums.length-k)return qs(p+1,r);\n    return qs(l,p-1);\n  }\n  return qs(0,nums.length-1);\n}`,
          python: `import heapq\ndef find_kth_largest(nums,k):\n    return heapq.nlargest(k,nums)[-1]`,
        },
        testCases: [
          { input: "[3,2,1,5,6,4]\n2", expected: "5" },
          { input: "[3,2,3,1,2,4,5,5,6]\n4", expected: "4", hidden: true },
        ],
        timeComplexity: "O(n) avg QuickSelect / O(n log k) heap",
        spaceComplexity: "O(1) / O(k)",
        hints: [
          "Min-heap of size k: pop when size>k. Top = answer.",
          "QuickSelect partitions like QuickSort but only recurses into one side.",
        ],
        tags: ["heap", "quickselect"],
        walkthrough: [
          {
            title: "Min-heap approach: maintain k largest",
            explanation:
              "Keep a min-heap of size k. For each element: if heap.size<k, push. Else if element>heap.top, pop and push. The heap top is the kth largest.",
            phase: "init",
            visual: {
              type: "array",
              array: [3, 2, 1, 5, 6, 4],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
            },
            insight:
              "Min-heap of size k: the smallest of the k largest elements is always at the top. After processing all elements, the top IS the kth largest.",
            variables: { k: 2, heap: "[]" },
          },
          {
            title: "Process elements, maintain heap size k=2",
            explanation:
              "Push 3,2 (size<k=2). For 1: 1<min(3,2)=2, skip. For 5: 5>2, pop 2, push 5. Heap=[3,5]. For 6: 6>3, pop 3, push 6. Heap=[5,6]. For 4: 4<5, skip.",
            phase: "scan",
            visual: {
              type: "array",
              array: [3, 2, 1, 5, 6, 4],
              states: [
                "found",
                "found",
                "eliminated",
                "found",
                "found",
                "eliminated",
              ],
              pointers: { 0: "keep", 1: "keep", 4: "keep", 3: "keep" },
            },
            variables: { heap: "[5,6]", heapTop: 5 },
          },
          {
            title: "Answer = heap top = 5",
            explanation:
              "Heap contains the 2 largest elements: [5,6]. The smallest of them (heap top) = 5 = the 2nd largest overall.",
            phase: "done",
            visual: {
              type: "array",
              array: [6, 5],
              labels: ["largest", "2nd largest"],
              states: ["comparing", "result"],
            },
            variables: { answer: 5 },
            complexity:
              "O(n log k) — push/pop on heap of size k for each of n elements.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Build-heap time complexity is:",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1,
        explanation:
          "Build-heap is O(n) — sum of sift-down costs is a geometric series converging to O(n).",
      },
    ],
    cheatSheet: `# Heaps\n\`\`\`python\nimport heapq\nheapq.heapify(lst)    # O(n)\nheapq.heappush(lst,v) # O(log n)\nheapq.heappop(lst)    # O(log n)\n\`\`\``,
    proTips: [
      "Two heaps for median maintenance",
      "K-largest: min-heap of size k",
    ],
    faangQuotes: [
      '"Merge K Sorted Lists shows if you understand priority queues deeply." — Google',
    ],
    visualizationType: "heap",
  },

  {
    id: "topic08",
    slug: "graphs-bfs-dfs",
    title: "Graphs – BFS & DFS",
    emoji: "🕸️",
    color: "#818cf8",
    gradient: "from-indigo-500 to-violet-400",
    layman:
      "A graph is any network of connected things. BFS explores neighbors level by level (like ripples in water). DFS dives deep down one path before backtracking (like solving a maze).",
    technical:
      "Graphs G=(V,E). DFS: stack (recursion). BFS: queue. Time O(V+E). Always mark visited to avoid cycles.",
    keyInsights: [
      "BFS finds shortest path in unweighted graphs",
      "DFS finds components, cycles, topological order",
      "Always use visited set",
      "Adjacency list O(V+E) vs matrix O(V²)",
    ],
    timeComplexities: [
      {
        operation: "BFS/DFS",
        best: "O(V+E)",
        avg: "O(V+E)",
        worst: "O(V+E)",
        space: "O(V)",
      },
    ],
    questions: [
      {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        description:
          "Given an m×n grid of '1's (land) and '0's (water), return the number of islands.",
        examples: [
          {
            input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]',
            output: "2",
          },
        ],
        constraints: ["1 ≤ m,n ≤ 300"],
        starterCode: {
          js: `function numIslands(grid){\n  let count=0;\n  function dfs(r,c){\n    // mark + explore 4 dirs\n  }\n}`,
          python: `def num_islands(grid):\n    count=0\n    def dfs(r,c): pass`,
        },
        solution: {
          js: `function numIslands(grid){\n  let count=0;\n  function dfs(r,c){\n    if(r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]!=='1')return;\n    grid[r][c]='0';\n    dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);\n  }\n  for(let r=0;r<grid.length;r++)\n    for(let c=0;c<grid[0].length;c++)\n      if(grid[r][c]==='1'){dfs(r,c);count++;}\n  return count;\n}`,
          python: `def num_islands(grid):\n    def dfs(r,c):\n        if r<0 or r>=len(grid) or c<0 or c>=len(grid[0]) or grid[r][c]!='1': return\n        grid[r][c]='0'\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(r+dr,c+dc)\n    count=0\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c]=='1': dfs(r,c); count+=1\n    return count`,
        },
        testCases: [
          {
            input: '[["1","1","0"],["0","1","0"],["0","0","1"]]',
            expected: "2",
          },
          {
            input: '[["1","1","1"],["0","1","0"],["1","1","1"]]',
            expected: "1",
            hidden: true,
          },
        ],
        timeComplexity: "O(m×n)",
        spaceComplexity: "O(m×n)",
        hints: [
          'DFS from every unvisited land cell, marking as visited (set to "0").',
        ],
        tags: ["graph", "dfs", "matrix"],
        walkthrough: [
          {
            title: "Scan for unvisited land cells",
            explanation:
              'Iterate grid. When we find "1" (unvisited land), start a DFS to mark the entire island as visited, then increment count.',
            phase: "init",
            visual: {
              type: "grid",
              grid: [
                ["1", "1", "0"],
                ["0", "1", "0"],
                ["0", "0", "1"],
              ],
              colHeaders: ["0", "1", "2"],
              rowHeaders: ["0", "1", "2"],
            },
          },
          {
            title: "Island 1: DFS from (0,0)",
            explanation:
              'Start DFS at (0,0)="1". Mark (0,0)="0". Explore neighbors: (0,1)="1"→mark, (1,1)="1"→mark. No more land connected. Island 1 found.',
            phase: "scan",
            visual: {
              type: "grid",
              grid: [
                ["✓", "✓", "0"],
                ["0", "✓", "0"],
                ["0", "0", "1"],
              ],
              colHeaders: ["0", "1", "2"],
              rowHeaders: ["0", "1", "2"],
              gridHighlighted: [
                [0, 0],
                [0, 1],
                [1, 1],
              ],
            },
            variables: { count: 1 },
          },
          {
            title: "Island 2: DFS from (2,2)",
            explanation:
              'Continue scan. (2,2)="1". DFS marks just (2,2). No adjacent land. Island 2 complete.',
            phase: "found",
            visual: {
              type: "grid",
              grid: [
                ["✓", "✓", "0"],
                ["0", "✓", "0"],
                ["0", "0", "✓"],
              ],
              colHeaders: ["0", "1", "2"],
              rowHeaders: ["0", "1", "2"],
              gridHighlighted: [[2, 2]],
            },
            variables: { count: 2 },
          },
          {
            title: "Return 2",
            explanation:
              'Total islands = 2. DFS "sinks" each island by marking cells "0", preventing double-counting.',
            phase: "done",
            visual: {
              type: "grid",
              grid: [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"],
              ],
              colHeaders: ["0", "1", "2"],
              rowHeaders: ["0", "1", "2"],
            },
            variables: { answer: 2 },
            complexity: "O(m×n) — each cell visited at most once.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "BFS finds shortest paths in:",
        options: ["Weighted graphs", "Unweighted graphs", "Both", "Neither"],
        correct: 1,
        explanation:
          "BFS explores level by level — first time a node is reached = shortest path in unweighted graphs.",
      },
    ],
    cheatSheet: `# BFS Template\n\`\`\`js\nconst queue=[start]; const visited=new Set([start]);\nwhile(queue.length){\n  const node=queue.shift();\n  for(const nei of graph[node]){\n    if(!visited.has(nei)){visited.add(nei);queue.push(nei);}\n  }\n}\n\`\`\``,
    proTips: [
      "BFS for shortest path, DFS for connected components",
      "Grid: 4-directional DFS/BFS with bounds check",
    ],
    faangQuotes: [
      '"Word Ladder BFS is our favorite because it tests if you can model the problem correctly." — Google',
    ],
    visualizationType: "graph",
  },

  {
    id: "topic09",
    slug: "shortest-path",
    title: "Shortest Path Algorithms",
    emoji: "🛣️",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-ocean-400",
    layman:
      "Dijkstra is like GPS routing — always expand the nearest unvisited city. Bellman-Ford handles negative toll roads. Floyd-Warshall computes every city pair at once.",
    technical:
      "Dijkstra: greedy+min-heap O((V+E)log V), no negatives. Bellman-Ford: relax V-1 times O(VE). Floyd-Warshall: DP all-pairs O(V³).",
    keyInsights: [
      "Dijkstra fails on negative edges",
      "Bellman-Ford: Vth iteration still relaxing → negative cycle",
      "Floyd-Warshall: dp[i][j]=min(dp[i][j],dp[i][k]+dp[k][j])",
    ],
    timeComplexities: [
      {
        operation: "Dijkstra",
        best: "O((V+E)logV)",
        avg: "O((V+E)logV)",
        worst: "O((V+E)logV)",
        space: "O(V)",
      },
      {
        operation: "Bellman-Ford",
        best: "O(VE)",
        avg: "O(VE)",
        worst: "O(VE)",
        space: "O(V)",
      },
    ],
    questions: [
      {
        id: "network-delay",
        title: "Network Delay Time (Dijkstra)",
        difficulty: "Medium",
        description:
          "Given n nodes, times[i]=[u,v,w], find minimum time for signal from k to reach all nodes.",
        examples: [
          { input: "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2", output: "2" },
        ],
        constraints: ["1≤k≤n≤100"],
        starterCode: {
          js: `function networkDelayTime(times,n,k){\n  // Build adj list, run Dijkstra\n}`,
          python: `import heapq\ndef network_delay_time(times,n,k):\n    pass`,
        },
        solution: {
          js: `function networkDelayTime(times,n,k){\n  const graph=Array.from({length:n+1},()=>[]);\n  for(const[u,v,w]of times)graph[u].push([v,w]);\n  const dist=Array(n+1).fill(Infinity);dist[k]=0;\n  const heap=[[0,k]];\n  while(heap.length){\n    heap.sort((a,b)=>a[0]-b[0]);\n    const[d,u]=heap.shift();\n    if(d>dist[u])continue;\n    for(const[v,w]of graph[u]){\n      if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;heap.push([dist[v],v]);}\n    }\n  }\n  const max=Math.max(...dist.slice(1));\n  return max===Infinity?-1:max;\n}`,
          python: `import heapq\ndef network_delay_time(times,n,k):\n    graph={i:[] for i in range(1,n+1)}\n    for u,v,w in times: graph[u].append((v,w))\n    dist={i:float('inf') for i in range(1,n+1)};dist[k]=0\n    heap=[(0,k)]\n    while heap:\n        d,u=heapq.heappop(heap)\n        if d>dist[u]: continue\n        for v,w in graph[u]:\n            if dist[u]+w<dist[v]: dist[v]=dist[u]+w;heapq.heappush(heap,(dist[v],v))\n    m=max(dist.values())\n    return m if m<float('inf') else -1`,
        },
        testCases: [
          { input: "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2", expected: "2" },
        ],
        timeComplexity: "O((V+E)log V)",
        spaceComplexity: "O(V+E)",
        hints: ["Greedy: always extend nearest unvisited node."],
        tags: ["graph", "dijkstra", "heap"],
        walkthrough: [
          {
            title: "Initialize distances from source k=2",
            explanation:
              "dist[2]=0 (source), all others=∞. Push (0,node2) into min-heap.",
            phase: "init",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "1", label: "1", x: 100, y: 100 },
                { id: "2", label: "2", x: 250, y: 40, state: "active" },
                { id: "3", label: "3", x: 400, y: 100 },
                { id: "4", label: "4", x: 400, y: 180 },
              ],
              treeEdges: [
                ["2", "1"],
                ["2", "3"],
                ["3", "4"],
              ],
            },
            variables: {
              "dist[1]": "∞",
              "dist[2]": 0,
              "dist[3]": "∞",
              "dist[4]": "∞",
            },
          },
          {
            title: "Process node 2: relax neighbors",
            explanation:
              "Pop (0,2). Relax edges 2→1 (weight 1): dist[1]=min(∞,0+1)=1. Relax 2→3 (weight 1): dist[3]=1.",
            phase: "scan",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "1", label: "1", x: 100, y: 100, state: "comparing" },
                { id: "2", label: "2", x: 250, y: 40, state: "found" },
                { id: "3", label: "3", x: 400, y: 100, state: "comparing" },
                { id: "4", label: "4", x: 400, y: 180 },
              ],
              treeEdges: [
                ["2", "1"],
                ["2", "3"],
                ["3", "4"],
              ],
            },
            variables: { "dist[1]": 1, "dist[3]": 1 },
          },
          {
            title: "Process nodes 1 and 3, then 4",
            explanation:
              "Process (1,1): no outgoing edges. Process (1,3): relax 3→4 (weight 1): dist[4]=2. Process (2,4): no outgoing edges.",
            phase: "done",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "1", label: "1", x: 100, y: 100, state: "found" },
                { id: "2", label: "2", x: 250, y: 40, state: "found" },
                { id: "3", label: "3", x: 400, y: 100, state: "found" },
                { id: "4", label: "4", x: 400, y: 180, state: "found" },
              ],
              treeEdges: [
                ["2", "1"],
                ["2", "3"],
                ["3", "4"],
              ],
            },
            variables: {
              "dist[1]": 1,
              "dist[2]": 0,
              "dist[3]": 1,
              "dist[4]": 2,
              answer: "max=2",
            },
            complexity: "Answer = max(dist) = 2. Time O((V+E)log V).",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Dijkstra doesn't work with:",
        options: [
          "Unweighted graphs",
          "Positive weights",
          "Negative weights",
          "Directed graphs",
        ],
        correct: 2,
        explanation:
          "Dijkstra's greedy assumption breaks with negative edges — use Bellman-Ford instead.",
      },
    ],
    cheatSheet: `# Dijkstra\n\`\`\`python\nheap=[(0,src)]; dist=defaultdict(lambda:inf); dist[src]=0\nwhile heap:\n    d,u=heappop(heap)\n    if d>dist[u]: continue\n    for v,w in graph[u]:\n        if dist[u]+w<dist[v]: dist[v]=dist[u]+w; heappush(heap,(dist[v],v))\n\`\`\``,
    proTips: [
      "Dijkstra for non-negative, Bellman-Ford for negatives",
      "Detect negative cycles: still relaxing on Vth pass",
    ],
    faangQuotes: ['"Dijkstra tests heap mastery AND graph modeling." — Meta'],
    visualizationType: "graph",
  },

  {
    id: "topic10",
    slug: "sorting",
    title: "Sorting Algorithms",
    emoji: "🔢",
    color: "#e879f9",
    gradient: "from-fuchsia-500 to-violet-400",
    layman:
      "QuickSort picks a pivot and puts smaller values left, larger right, then repeats. MergeSort splits in half repeatedly then merges sorted halves.",
    technical:
      "Comparison sorts: Ω(n log n) lower bound. QuickSort O(n log n) avg. MergeSort O(n log n) guaranteed, stable. HeapSort O(n log n) in-place. Counting/Radix O(n+k).",
    keyInsights: [
      "QuickSort: random pivot avoids O(n²) worst case",
      "MergeSort: stable, guaranteed O(n log n), extra O(n) space",
      "Stability: equal elements maintain relative order",
    ],
    timeComplexities: [
      {
        operation: "QuickSort",
        best: "O(n log n)",
        avg: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)",
      },
      {
        operation: "MergeSort",
        best: "O(n log n)",
        avg: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
      },
      {
        operation: "HeapSort",
        best: "O(n log n)",
        avg: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "sort-colors",
        title: "Sort Colors (Dutch National Flag)",
        difficulty: "Medium",
        description: "Sort array of 0s, 1s, 2s in-place (red/white/blue).",
        examples: [{ input: "nums=[2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }],
        constraints: ["n==nums.length", "1≤n≤300"],
        starterCode: {
          js: `function sortColors(nums){\n  let lo=0,mid=0,hi=nums.length-1;\n}`,
          python: `def sort_colors(nums):\n    lo=mid=0; hi=len(nums)-1`,
        },
        solution: {
          js: `function sortColors(nums){\n  let lo=0,mid=0,hi=nums.length-1;\n  while(mid<=hi){\n    if(nums[mid]===0){[nums[lo],nums[mid]]=[nums[mid],nums[lo]];lo++;mid++;}\n    else if(nums[mid]===1)mid++;\n    else{[nums[mid],nums[hi]]=[nums[hi],nums[mid]];hi--;}\n  }\n}`,
          python: `def sort_colors(nums):\n    lo=mid=0;hi=len(nums)-1\n    while mid<=hi:\n        if nums[mid]==0: nums[lo],nums[mid]=nums[mid],nums[lo];lo+=1;mid+=1\n        elif nums[mid]==1: mid+=1\n        else: nums[mid],nums[hi]=nums[hi],nums[mid];hi-=1`,
        },
        testCases: [{ input: "[2,0,2,1,1,0]", expected: "[0,0,1,1,2,2]" }],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "Three pointers: lo (0s region end), mid (current), hi (2s region start).",
        ],
        tags: ["sorting", "two-pointers"],
        walkthrough: [
          {
            title: "Three-pointer invariant",
            explanation:
              "lo: everything before lo is 0. hi: everything after hi is 2. mid: current element being classified.",
            phase: "init",
            visual: {
              type: "array",
              array: [2, 0, 2, 1, 1, 0],
              labels: ["0", "1", "2", "3", "4", "5"],
              states: [
                "active",
                "default",
                "default",
                "default",
                "default",
                "comparing",
              ],
              pointers: { 0: "lo/mid", 5: "hi" },
            },
          },
          {
            title: "nums[mid]=2 → swap with hi",
            explanation:
              "nums[0]=2. Swap with nums[hi=5]=0. hi--. Do NOT advance mid (new value at mid unseen).",
            phase: "update",
            visual: {
              type: "array",
              array: [0, 0, 2, 1, 1, 2],
              states: [
                "active",
                "default",
                "comparing",
                "default",
                "default",
                "eliminated",
              ],
              pointers: { 0: "lo/mid", 4: "hi" },
            },
            variables: { lo: 0, mid: 0, hi: 4 },
          },
          {
            title: "nums[mid]=0 → swap with lo",
            explanation:
              "nums[0]=0. Swap with nums[lo=0] (itself). lo++,mid++.",
            phase: "update",
            visual: {
              type: "array",
              array: [0, 0, 2, 1, 1, 2],
              states: [
                "found",
                "active",
                "comparing",
                "default",
                "default",
                "eliminated",
              ],
              pointers: { 0: "sorted", 1: "lo/mid", 4: "hi" },
            },
          },
          {
            title: "Final sorted array",
            explanation:
              "After all iterations: [0,0,1,1,2,2]. Each pointer moves at most n times. One pass.",
            phase: "done",
            visual: {
              type: "array",
              array: [0, 0, 1, 1, 2, 2],
              states: [
                "found",
                "found",
                "visited",
                "visited",
                "result",
                "result",
              ],
            },
            complexity:
              "O(n) time, O(1) space — single pass with three pointers.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Which sort is stable AND O(n log n) guaranteed?",
        options: ["QuickSort", "HeapSort", "MergeSort", "CountingSort"],
        correct: 2,
        explanation:
          "MergeSort is stable and guaranteed O(n log n) in all cases.",
      },
    ],
    cheatSheet: `# Sort Complexity\n| Algorithm | Avg | Worst | Stable |\n|-----------|-----|-------|--------|\n| QuickSort | n log n | n² | No |\n| MergeSort | n log n | n log n | Yes |\n| HeapSort | n log n | n log n | No |`,
    proTips: [
      "Know the sort in your language (JS .sort is Timsort)",
      "Counting sort for bounded integers",
    ],
    faangQuotes: ['"Custom sort comparators show mastery." — Apple'],
    visualizationType: "sorting",
  },

  {
    id: "topic11",
    slug: "binary-search",
    title: "Binary Search & Variants",
    emoji: "🔍",
    color: "#34d399",
    gradient: "from-emerald-500 to-jade-400",
    layman:
      "Binary search is like finding a word in a dictionary. Open to the middle: if your word comes before, search left half; if after, search right half. Each step halves the search space.",
    technical:
      'Binary search requires a monotonic search space. Template: find smallest index where condition is true. "Binary search on the answer" for optimization problems.',
    keyInsights: [
      "off-by-one: use lo<=hi for value, lo<hi for boundary",
      "mid=lo+Math.floor((hi-lo)/2) avoids overflow",
      "Binary search on answer: is the answer monotonic?",
      "Rotated array: one half always sorted",
    ],
    timeComplexities: [
      {
        operation: "Binary Search",
        best: "O(1)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "search-rotated",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        description:
          "Search for target in a rotated sorted array with distinct values. Return index or -1.",
        examples: [{ input: "nums=[4,5,6,7,0,1,2], target=0", output: "4" }],
        constraints: ["1≤nums.length≤5000", "All values unique"],
        starterCode: {
          js: `function search(nums,target){\n  let lo=0,hi=nums.length-1;\n  while(lo<=hi){\n    const mid=Math.floor((lo+hi)/2);\n    // Which half is sorted?\n  }\n}`,
          python: `def search(nums,target):\n    lo,hi=0,len(nums)-1`,
        },
        solution: {
          js: `function search(nums,target){\n  let lo=0,hi=nums.length-1;\n  while(lo<=hi){\n    const mid=Math.floor((lo+hi)/2);\n    if(nums[mid]===target)return mid;\n    if(nums[lo]<=nums[mid]){\n      if(nums[lo]<=target&&target<nums[mid])hi=mid-1;\n      else lo=mid+1;\n    }else{\n      if(nums[mid]<target&&target<=nums[hi])lo=mid+1;\n      else hi=mid-1;\n    }\n  }\n  return -1;\n}`,
          python: `def search(nums,target):\n    lo,hi=0,len(nums)-1\n    while lo<=hi:\n        mid=(lo+hi)//2\n        if nums[mid]==target: return mid\n        if nums[lo]<=nums[mid]:\n            if nums[lo]<=target<nums[mid]: hi=mid-1\n            else: lo=mid+1\n        else:\n            if nums[mid]<target<=nums[hi]: lo=mid+1\n            else: hi=mid-1\n    return -1`,
        },
        testCases: [
          { input: "[4,5,6,7,0,1,2]\n0", expected: "4" },
          { input: "[4,5,6,7,0,1,2]\n3", expected: "-1" },
          { input: "[1]\n0", expected: "-1", hidden: true },
        ],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        hints: [
          "One half is always sorted — use it to decide which side to search.",
        ],
        tags: ["binary-search"],
        walkthrough: [
          {
            title: "Key insight: one half is always sorted",
            explanation:
              "After rotation, at least one of [lo..mid] or [mid..hi] is sorted. We can check which by comparing nums[lo] and nums[mid].",
            phase: "init",
            visual: {
              type: "array",
              array: [4, 5, 6, 7, 0, 1, 2],
              labels: ["0", "1", "2", "3", "4", "5", "6"],
              states: [
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
                "default",
              ],
              pointers: { 0: "lo", 6: "hi" },
            },
          },
          {
            title: "mid=3, nums[3]=7. Left half [4..7] is sorted",
            explanation:
              "nums[lo=0]=4 ≤ nums[mid=3]=7 → left half [4,5,6,7] is sorted. Is target=0 in [4,7]? No (0<4). So search right half.",
            phase: "compare",
            visual: {
              type: "array",
              array: [4, 5, 6, 7, 0, 1, 2],
              states: [
                "active",
                "active",
                "active",
                "active",
                "comparing",
                "comparing",
                "comparing",
              ],
              pointers: { 0: "lo", 3: "mid", 6: "hi" },
            },
            variables: {
              target: 0,
              "left half": "[4,5,6,7]",
              "0 in [4,7]?": "No → go right",
            },
          },
          {
            title: "lo=4, hi=6, mid=5. Right half [1,2] is sorted",
            explanation:
              "nums[lo=4]=0 ≤ nums[mid=5]=1? Yes. Is 0 in [0,1)? 0≥0 and 0<1 → YES. Search left.",
            phase: "compare",
            visual: {
              type: "array",
              array: [4, 5, 6, 7, 0, 1, 2],
              states: [
                "eliminated",
                "eliminated",
                "eliminated",
                "eliminated",
                "active",
                "comparing",
                "comparing",
              ],
              pointers: { 4: "lo", 5: "mid", 6: "hi" },
            },
            variables: { target: 0, lo: 4, mid: 5 },
          },
          {
            title: "Found: lo=hi=4, nums[4]=0",
            explanation: "lo=4, hi=4, mid=4. nums[4]=0 = target → return 4!",
            phase: "found",
            visual: {
              type: "array",
              array: [4, 5, 6, 7, 0, 1, 2],
              states: [
                "eliminated",
                "eliminated",
                "eliminated",
                "eliminated",
                "result",
                "eliminated",
                "eliminated",
              ],
              pointers: { 4: "found!" },
            },
            variables: { answer: 4 },
            complexity: "O(log n) — halve search space each step.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Binary search requires:",
        options: [
          "Sorted array only",
          "Monotonic condition",
          "Both",
          "Neither",
        ],
        correct: 1,
        explanation:
          "Binary search requires monotonicity — a condition that transitions from false to true (or vice versa) at the answer.",
      },
    ],
    cheatSheet: `# Binary Search\n\`\`\`js\n// Find leftmost true\nlet lo=0,hi=n;\nwhile(lo<hi){\n  const mid=lo+Math.floor((hi-lo)/2);\n  if(condition(mid))hi=mid;\n  else lo=mid+1;\n}\nreturn lo;\n\`\`\``,
    proTips: [
      "Binary search on the answer for min/max optimization",
      "Careful with off-by-one in loop condition and hi/lo update",
    ],
    faangQuotes: [
      '"Median of Two Sorted Arrays requires thinking in partitions." — Google',
    ],
    visualizationType: "array",
  },

  {
    id: "topic12",
    slug: "greedy",
    title: "Greedy Algorithms",
    emoji: "🏃",
    color: "#fbbf24",
    gradient: "from-amber-400 to-yellow-300",
    layman:
      "Greedy means always making the locally best choice. Booking meeting rooms: always book the room finishing earliest. Greedy works when local optimum = global optimum.",
    technical:
      "Greedy algorithms build solutions incrementally. Proof: exchange argument. Works when greedy choice property holds.",
    keyInsights: [
      "Exchange argument proves greedy correctness",
      "Sort by end time for interval problems",
      "Greedy fails when future depends on current in complex ways",
    ],
    timeComplexities: [
      {
        operation: "Activity Selection",
        best: "O(n log n)",
        avg: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
      },
      {
        operation: "Jump Game",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "jump-game",
        title: "Jump Game",
        difficulty: "Medium",
        description:
          "Given array nums where nums[i] = max jump length at i, can you reach the last index?",
        examples: [
          { input: "nums=[2,3,1,1,4]", output: "true" },
          { input: "nums=[3,2,1,0,4]", output: "false" },
        ],
        constraints: ["1≤nums.length≤10⁴"],
        starterCode: {
          js: `function canJump(nums){\n  let maxReach=0;\n}`,
          python: `def can_jump(nums):\n    max_reach=0`,
        },
        solution: {
          js: `function canJump(nums){\n  let maxReach=0;\n  for(let i=0;i<nums.length;i++){\n    if(i>maxReach)return false;\n    maxReach=Math.max(maxReach,i+nums[i]);\n  }\n  return true;\n}`,
          python: `def can_jump(nums):\n    max_reach=0\n    for i,jump in enumerate(nums):\n        if i>max_reach: return False\n        max_reach=max(max_reach,i+jump)\n    return True`,
        },
        testCases: [
          { input: "[2,3,1,1,4]", expected: "true" },
          { input: "[3,2,1,0,4]", expected: "false" },
          { input: "[0]", expected: "true", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: ["Track the furthest index reachable from positions 0..i."],
        tags: ["greedy", "array"],
        walkthrough: [
          {
            title: "Track max reachable index",
            explanation:
              "maxReach = furthest index we can ever reach from positions we have visited. At each step, update maxReach = max(maxReach, i+nums[i]).",
            phase: "init",
            visual: {
              type: "array",
              array: [2, 3, 1, 1, 4],
              labels: ["0", "1", "2", "3", "4"],
              states: ["active", "default", "default", "default", "default"],
            },
            variables: { maxReach: 0 },
          },
          {
            title: "i=0: nums[0]=2, maxReach=max(0,0+2)=2",
            explanation:
              "From index 0, we can reach up to index 2. maxReach=2.",
            phase: "scan",
            visual: {
              type: "array",
              array: [2, 3, 1, 1, 4],
              states: ["found", "comparing", "comparing", "default", "default"],
              pointers: { 0: "i", 2: "maxReach" },
            },
            variables: { i: 0, maxReach: 2 },
          },
          {
            title: "i=1: nums[1]=3, maxReach=max(2,1+3)=4",
            explanation:
              "i=1≤maxReach=2 ✓. From 1, can jump 3, reaching index 4 (the end!). maxReach=4.",
            phase: "found",
            visual: {
              type: "array",
              array: [2, 3, 1, 1, 4],
              states: ["found", "found", "default", "default", "found"],
              pointers: { 1: "i", 4: "maxReach" },
            },
            variables: { i: 1, maxReach: 4 },
          },
          {
            title: "Return true — end is reachable",
            explanation:
              "We never hit a position where i>maxReach. We can reach the last index.",
            phase: "done",
            visual: {
              type: "array",
              array: [2, 3, 1, 1, 4],
              states: ["found", "found", "found", "found", "result"],
            },
            variables: { answer: "true" },
            complexity: "O(n) — single pass. O(1) space.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Greedy algorithms are correct when:",
        options: [
          "Optimal substructure only",
          "Greedy choice property",
          "Both hold",
          "Always",
        ],
        correct: 2,
        explanation:
          "Greedy requires both: greedy choice property AND optimal substructure.",
      },
    ],
    cheatSheet: `# Greedy Strategies\n- Intervals: sort by end time\n- Activity selection: pick earliest ending\n- Fractional knapsack: sort by value/weight ratio`,
    proTips: ["Prove via exchange argument", "When greedy fails, try DP"],
    faangQuotes: [
      '"Jump Game II requires proving why the greedy choice is safe." — Airbnb',
    ],
    visualizationType: "array",
  },

  {
    id: "topic13",
    slug: "backtracking",
    title: "Backtracking",
    emoji: "♟️",
    color: "#f43f5e",
    gradient: "from-rose-600 to-rose-400",
    layman:
      "Backtracking is like solving a maze by trying every path, backing up when you hit a dead end. N-Queens: place a queen, try next row, if stuck remove and try elsewhere.",
    technical:
      "Backtracking explores solution space via DFS, pruning invalid branches. Template: choose, recurse, unchoose. Time: O(b^d).",
    keyInsights: [
      "Template: choose, recurse, undo",
      "Pruning is what makes backtracking practical",
      "Subsets: 2^n, Permutations: n!",
    ],
    timeComplexities: [
      {
        operation: "Subsets",
        best: "O(2^n)",
        avg: "O(2^n)",
        worst: "O(2^n)",
        space: "O(n)",
      },
      {
        operation: "Permutations",
        best: "O(n!)",
        avg: "O(n!)",
        worst: "O(n!)",
        space: "O(n)",
      },
    ],
    questions: [
      {
        id: "subsets",
        title: "Subsets",
        difficulty: "Medium",
        description:
          "Given unique elements, return all possible subsets (power set).",
        examples: [
          {
            input: "nums=[1,2,3]",
            output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
          },
        ],
        constraints: ["1≤nums.length≤10", "All unique"],
        starterCode: {
          js: `function subsets(nums){\n  const res=[];\n  function bt(start,curr){\n    res.push([...curr]);\n    for(let i=start;i<nums.length;i++){\n      // choose, recurse, unchoose\n    }\n  }\n  bt(0,[]);\n  return res;\n}`,
          python: `def subsets(nums):\n    res=[]\n    def bt(start,curr):\n        res.append(curr[:])\n    bt(0,[]); return res`,
        },
        solution: {
          js: `function subsets(nums){\n  const res=[];\n  function bt(start,curr){\n    res.push([...curr]);\n    for(let i=start;i<nums.length;i++){\n      curr.push(nums[i]);\n      bt(i+1,curr);\n      curr.pop();\n    }\n  }\n  bt(0,[]);\n  return res;\n}`,
          python: `def subsets(nums):\n    res=[]\n    def bt(start,curr):\n        res.append(curr[:])\n        for i in range(start,len(nums)):\n            curr.append(nums[i])\n            bt(i+1,curr)\n            curr.pop()\n    bt(0,[]); return res`,
        },
        testCases: [
          { input: "[1,2,3]", expected: "8 subsets" },
          { input: "[0]", expected: "[[],[0]]", hidden: true },
        ],
        timeComplexity: "O(2^n)",
        spaceComplexity: "O(n)",
        hints: ["At each step: include or exclude current element."],
        tags: ["backtracking", "recursion"],
        walkthrough: [
          {
            title: "Decision tree: include or exclude each element",
            explanation:
              "For nums=[1,2,3], at each position we make a binary choice: include this number or skip it. 3 decisions × 2 choices = 2³=8 subsets.",
            phase: "init",
            visual: {
              type: "array",
              array: [1, 2, 3],
              labels: ["choice 1", "choice 2", "choice 3"],
              states: ["comparing", "comparing", "comparing"],
            },
            insight:
              "The recursive tree has depth n. At each level, we branch: add the element (go deeper) or skip (advance start pointer).",
          },
          {
            title: "Build subset starting from []",
            explanation:
              "Start: curr=[]. Add nums[0]=1 → curr=[1]. Then add nums[1]=2 → [1,2]. Then add nums[2]=3 → [1,2,3]. Record each state.",
            phase: "scan",
            visual: {
              type: "array",
              array: [
                "[]",
                "[1]",
                "[1,2]",
                "[1,2,3]",
                "[1,3]",
                "[2]",
                "[2,3]",
                "[3]",
              ],
              states: [
                "found",
                "found",
                "found",
                "found",
                "found",
                "found",
                "found",
                "found",
              ],
            },
            variables: { recorded: 8 },
          },
          {
            title: "Backtrack: undo and explore siblings",
            explanation:
              "After [1,2,3]: pop 3 → [1,2]. Pop 2 → [1]. Try 3 → [1,3]. Pop 3 → [1]. Pop 1 → []. Then try starting from 2...",
            phase: "backtrack",
            visual: {
              type: "array",
              array: [1, 2, 3],
              states: ["visited", "visited", "active"],
              pointers: { 2: "backtrack" },
            },
            code: `curr.push(nums[i]);  // choose\nbt(i + 1, curr);     // explore\ncurr.pop();          // UNDO (backtrack)`,
            codeHighlight: [1, 2, 3],
          },
          {
            title: "All 8 subsets collected",
            explanation:
              "The recursion tree explores all 2^3=8 subsets. Each leaf or intermediate node is a valid subset.",
            phase: "done",
            visual: {
              type: "array",
              array: [
                "[]",
                "[1]",
                "[2]",
                "[3]",
                "[1,2]",
                "[1,3]",
                "[2,3]",
                "[1,2,3]",
              ],
              states: [
                "result",
                "result",
                "result",
                "result",
                "result",
                "result",
                "result",
                "result",
              ],
            },
            variables: { total: 8 },
            complexity: "O(2^n) subsets × O(n) to copy each = O(n·2^n).",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Number of subsets of n-element set:",
        options: ["n!", "2^n", "n^2", "n log n"],
        correct: 1,
        explanation:
          "Each element is in or out: 2 choices per element = 2^n subsets.",
      },
    ],
    cheatSheet: `# Backtracking Template\n\`\`\`js\nfunction bt(state){\n  if(done(state)){results.push(clone(state));return;}\n  for(const choice of choices){\n    make(choice); bt(state); undo(choice);\n  }\n}\n\`\`\``,
    proTips: [
      "Prune early: check constraints before recursing",
      "Sort input to skip duplicates easily",
    ],
    faangQuotes: [
      '"N-Queens is our favorite backtracking — spatial reasoning test." — Google',
    ],
    visualizationType: "array",
  },

  {
    id: "topic14",
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    emoji: "🧮",
    color: "#a78bfa",
    gradient: "from-violet-600 to-indigo-400",
    layman:
      "DP is organized recursion with memory. Fibonacci: instead of computing fib(4) 100 times, write it down. DP turns exponential brute force into polynomial solutions.",
    technical:
      "DP applies when: overlapping subproblems + optimal substructure. Top-down (memoization) or bottom-up (tabulation). Patterns: 1D, 2D, knapsack, LCS, bitmask.",
    keyInsights: [
      "Define dp[i] clearly: what does it represent?",
      "Base cases must be correct",
      "Space optimization: reduce 2D DP to 1D",
    ],
    timeComplexities: [
      {
        operation: "1D DP",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(1) optimized",
      },
      {
        operation: "2D DP (LCS)",
        best: "O(mn)",
        avg: "O(mn)",
        worst: "O(mn)",
        space: "O(mn)",
      },
    ],
    questions: [
      {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        description:
          "Rob houses along a street — can't rob two adjacent houses. Maximize total loot.",
        examples: [
          {
            input: "nums=[1,2,3,1]",
            output: "4",
            explanation: "Rob house 0 (1) + house 2 (3) = 4.",
          },
        ],
        constraints: ["1≤nums.length≤100", "0≤nums[i]≤400"],
        starterCode: {
          js: `function rob(nums){\n  // dp[i] = max loot up to house i\n}`,
          python: `def rob(nums):\n    pass`,
        },
        solution: {
          js: `function rob(nums){\n  let prev2=0,prev1=0;\n  for(const n of nums){\n    const cur=Math.max(prev1,prev2+n);\n    prev2=prev1;\n    prev1=cur;\n  }\n  return prev1;\n}`,
          python: `def rob(nums):\n    prev2=prev1=0\n    for n in nums:\n        prev2,prev1=prev1,max(prev1,prev2+n)\n    return prev1`,
        },
        testCases: [
          { input: "[1,2,3,1]", expected: "4" },
          { input: "[2,7,9,3,1]", expected: "12" },
          { input: "[1,3,1,3,100]", expected: "103", hidden: true },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: ["At each house: rob it (prev_prev + cur) OR skip it (prev)."],
        tags: ["dp", "1d-dp"],
        walkthrough: [
          {
            title: "Define the recurrence",
            explanation:
              "dp[i] = max money robbing houses 0..i. Choice at each house: rob it (dp[i-2]+nums[i]) or skip it (dp[i-1]). dp[i] = max of both.",
            phase: "init",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              labels: ["house 0", "house 1", "house 2", "house 3"],
              states: ["default", "default", "default", "default"],
            },
            insight:
              "We only need the previous two values, not the full DP table. Space O(1)!",
          },
          {
            title: "House 0: dp[0]=1",
            explanation: "Only one house available. Rob it: dp[0]=1.",
            phase: "scan",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              states: ["active", "default", "default", "default"],
            },
            variables: { prev2: 0, prev1: 1 },
          },
          {
            title: "House 1: max(rob=0+2=2, skip=1)=2",
            explanation:
              "dp[1] = max(dp[-1]+2, dp[0]) = max(0+2, 1) = max(2,1) = 2. Skip house 0, rob house 1.",
            phase: "update",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              states: ["comparing", "active", "default", "default"],
            },
            variables: { prev2: 1, prev1: 2 },
          },
          {
            title: "House 2: max(rob=1+3=4, skip=2)=4",
            explanation:
              "dp[2] = max(dp[0]+3, dp[1]) = max(1+3, 2) = max(4,2) = 4. Rob house 0 + house 2.",
            phase: "update",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              states: ["found", "eliminated", "active", "default"],
            },
            variables: { prev2: 2, prev1: 4 },
          },
          {
            title: "House 3: max(rob=2+1=3, skip=4)=4",
            explanation:
              "dp[3]=max(dp[1]+1, dp[2])=max(2+1,4)=max(3,4)=4. Skipping house 3 is optimal.",
            phase: "done",
            visual: {
              type: "array",
              array: [1, 2, 3, 1],
              states: ["result", "eliminated", "result", "eliminated"],
            },
            variables: { answer: 4 },
            complexity: "O(n) time, O(1) space — only two variables needed.",
          },
        ],
      },
      {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        description:
          "Return the length of the longest common subsequence of text1 and text2.",
        examples: [
          {
            input: 'text1="abcde", text2="ace"',
            output: "3",
            explanation: 'LCS is "ace".',
          },
        ],
        constraints: ["1≤text1.length,text2.length≤1000"],
        starterCode: {
          js: `function longestCommonSubsequence(text1,text2){\n  const m=text1.length,n=text2.length;\n  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));\n}`,
          python: `def longest_common_subsequence(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]`,
        },
        solution: {
          js: `function longestCommonSubsequence(text1,text2){\n  const m=text1.length,n=text2.length;\n  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));\n  for(let i=1;i<=m;i++)\n    for(let j=1;j<=n;j++)\n      dp[i][j]=text1[i-1]===text2[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);\n  return dp[m][n];\n}`,
          python: `def longest_common_subsequence(text1,text2):\n    m,n=len(text1),len(text2)\n    dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if text1[i-1]==text2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n    return dp[m][n]`,
        },
        testCases: [
          { input: '"abcde"\n"ace"', expected: "3" },
          { input: '"abc"\n"abc"', expected: "3" },
          { input: '"abc"\n"def"', expected: "0", hidden: true },
        ],
        timeComplexity: "O(m×n)",
        spaceComplexity: "O(m×n)",
        hints: [
          "dp[i][j] = LCS of text1[0..i] and text2[0..j].",
          "Match: dp[i-1][j-1]+1. Mismatch: max(skip one of either).",
        ],
        tags: ["dp", "2d-dp", "string"],
        walkthrough: [
          {
            title: "dp[i][j] definition",
            explanation:
              "dp[i][j] = length of LCS of text1[0..i-1] and text2[0..j-1]. Answer is dp[m][n].",
            phase: "init",
            visual: {
              type: "grid",
              grid: [
                ["", "", "a", "c", "e"],
                ["", "0", "0", "0", "0"],
                ["a", "0", "1", "1", "1"],
                ["b", "0", "1", "1", "1"],
                ["c", "0", "1", "2", "2"],
                ["d", "0", "1", "2", "2"],
                ["e", "0", "1", "2", "3"],
              ],
              colHeaders: ["", "", "a", "c", "e"],
              rowHeaders: ["", "", "a", "b", "c", "d", "e"],
              gridHighlighted: [[6, 4]],
            },
          },
          {
            title: "When characters match: diagonal+1",
            explanation:
              "text1[i-1]==text2[j-1] → dp[i][j]=dp[i-1][j-1]+1. E.g., text1[0]='a'==text2[0]='a' → dp[1][1]=dp[0][0]+1=1.",
            phase: "update",
            visual: {
              type: "grid",
              grid: [
                ["", "a", "c", "e"],
                ["a", "1", "1", "1"],
                ["b", "1", "1", "1"],
                ["c", "1", "2", "2"],
                ["d", "1", "2", "2"],
                ["e", "1", "2", "3"],
              ],
              gridHighlighted: [
                [0, 0],
                [3, 1],
                [5, 2],
              ],
            },
            insight:
              "Diagonal means both characters contributed to the LCS — they matched!",
          },
          {
            title: "When mismatch: take max of skipping either",
            explanation:
              "text1[i-1]≠text2[j-1] → dp[i][j]=max(dp[i-1][j], dp[i][j-1]). Take the best LCS ignoring the current char from either string.",
            phase: "update",
            visual: {
              type: "grid",
              grid: [
                ["", "a", "c", "e"],
                ["a", "1", "1", "1"],
                ["b", "1", "1", "1"],
                ["c", "1", "2", "2"],
                ["d", "1", "2", "2"],
                ["e", "1", "2", "3"],
              ],
              gridHighlighted: [
                [1, 1],
                [1, 2],
              ],
            },
            code: `dp[i][j] = text1[i-1]===text2[j-1]\n  ? dp[i-1][j-1]+1          // match\n  : Math.max(dp[i-1][j],    // skip text1[i]\n             dp[i][j-1]);   // skip text2[j]`,
            codeHighlight: [1, 2, 3, 4],
          },
          {
            title: "Answer: dp[5][3]=3",
            explanation:
              'dp[5][3]=3 — LCS length is 3 ("ace"). The table encodes all subproblem answers.',
            phase: "done",
            visual: {
              type: "grid",
              grid: [
                ["", "a", "c", "e"],
                ["a", "1", "1", "1"],
                ["b", "1", "1", "1"],
                ["c", "1", "2", "2"],
                ["d", "1", "2", "2"],
                ["e", "1", "2", "3"],
              ],
              gridHighlighted: [[5, 3]],
            },
            variables: { answer: 3, LCS: '"ace"' },
            complexity: "O(m×n) time and space.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "DP requires two properties:",
        options: [
          "Greedy choice+subproblems",
          "Overlapping subproblems+optimal substructure",
          "Sorted input+recursion",
          "Memoization+tabulation",
        ],
        correct: 1,
        explanation:
          "DP: (1) subproblems overlap, (2) optimal solution contains optimal subproblem solutions.",
      },
    ],
    cheatSheet: `# DP Patterns\n| Pattern | Recurrence |\n|---------|------------|\n| 1D | dp[i]=max(dp[i-1],dp[i-2]+arr[i]) |\n| LCS | dp[i][j]=match?dp[i-1][j-1]+1:max(...) |\n| Knapsack | dp[w]=max(dp[w],dp[w-wt]+val) |`,
    proTips: [
      "Define dp[i] semantically first",
      "Draw the DP table for 2D problems",
    ],
    faangQuotes: [
      '"Edit Distance — if you solve it in 10 min you\'re hired." — Meta',
    ],
    visualizationType: "dp",
  },

  {
    id: "topic15",
    slug: "bit-manipulation",
    title: "Bit Manipulation",
    emoji: "⚡",
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-400",
    layman:
      "Computers store everything in 1s and 0s. Bit tricks let you do things with single CPU instructions. XOR of a number with itself is 0 — perfect for finding the odd-one-out.",
    technical:
      "Core: AND, OR, XOR, NOT, shifts. XOR: commutative, associative, x^x=0, x^0=x. x&(x-1) clears lowest set bit.",
    keyInsights: [
      "x&(x-1) clears lowest set bit",
      "x&(-x) isolates lowest set bit (Fenwick tree)",
      "XOR cancels duplicates: a^a=0",
    ],
    timeComplexities: [
      {
        operation: "Bit operations",
        best: "O(1)",
        avg: "O(1)",
        worst: "O(1)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        description:
          "Every element appears twice except one. Find it in O(n) time and O(1) space.",
        examples: [
          { input: "nums=[2,2,1]", output: "1" },
          { input: "nums=[4,1,2,1,2]", output: "4" },
        ],
        constraints: ["1≤nums.length≤3×10⁴"],
        starterCode: {
          js: `function singleNumber(nums){\n  // XOR: a^a=0, a^0=a\n}`,
          python: `def single_number(nums):\n    pass`,
        },
        solution: {
          js: `function singleNumber(nums){\n  return nums.reduce((xor,n)=>xor^n,0);\n}`,
          python: `def single_number(nums):\n    from functools import reduce; import operator\n    return reduce(operator.xor,nums)`,
        },
        testCases: [
          { input: "[2,2,1]", expected: "1" },
          { input: "[4,1,2,1,2]", expected: "4" },
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        hints: [
          "XOR all numbers. Pairs cancel to 0, leaving the single element.",
        ],
        tags: ["bit-manipulation", "xor"],
        walkthrough: [
          {
            title: "XOR properties",
            explanation:
              "XOR (^): x^x=0 (same values cancel), x^0=x (zero has no effect), commutative and associative. So XOR all elements: pairs cancel, single remains.",
            phase: "init",
            visual: {
              type: "array",
              array: [4, 1, 2, 1, 2],
              labels: ["0", "1", "2", "3", "4"],
              states: ["default", "default", "default", "default", "default"],
            },
            insight:
              "XOR is its own inverse: a^b^a = b. Pairs literally vanish!",
          },
          {
            title: "XOR all elements: 4^1^2^1^2",
            explanation:
              "4^1=5, 5^2=7, 7^1=6, 6^2=4. The pairs (1^1=0, 2^2=0) cancel. Result: 4.",
            phase: "scan",
            visual: {
              type: "array",
              array: [4, 1, 2, 1, 2],
              states: [
                "found",
                "eliminated",
                "eliminated",
                "eliminated",
                "eliminated",
              ],
            },
            variables: { "xor so far": "4^1^2^1^2=4" },
            code: `return nums.reduce((xor, n) => xor ^ n, 0);`,
            codeHighlight: [1],
          },
          {
            title: "Answer: 4",
            explanation:
              "4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4. Only the single number survives.",
            phase: "done",
            visual: {
              type: "array",
              array: [4, 1, 2, 1, 2],
              states: ["result", "visited", "visited", "visited", "visited"],
            },
            variables: { answer: 4 },
            complexity: "O(n) — one reduce pass. O(1) — no extra space.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What does n&(n-1) do?",
        options: [
          "Sets lowest bit",
          "Clears lowest set bit",
          "Returns n-1",
          "Checks power of 2",
        ],
        correct: 1,
        explanation:
          "n-1 flips the lowest set bit and all below. n&(n-1) clears that bit.",
      },
    ],
    cheatSheet: `# Bit Tricks\n| Trick | Code |\n|-------|------|\n| Check power of 2 | n>0&&(n&(n-1))==0 |\n| Clear lowest bit | n&(n-1) |\n| Isolate lowest bit | n&(-n) |\n| XOR unique | arr.reduce((a,b)=>a^b) |`,
    proTips: [
      "x^x=0, x^0=x — XOR cancels pairs",
      "n&(n-1) counts set bits in O(set bits) iterations",
    ],
    faangQuotes: [
      '"Counting Bits with DP + bit tricks is beautiful." — Google',
    ],
    visualizationType: "array",
  },

  {
    id: "topic16",
    slug: "trie",
    title: "Trie / Prefix Tree",
    emoji: "🌐",
    color: "#22d3ee",
    gradient: "from-cyan-400 to-ocean-400",
    layman:
      'A Trie is like phone auto-complete. Each node is a letter, and paths from root spell out words. Searching "app" checks root→a→p→p in 3 steps regardless of how many words are stored.',
    technical:
      "Trie: n-ary tree where root-to-node path = prefix. Insert/search/startsWith: O(m) where m=word length.",
    keyInsights: [
      "TrieNode: children dict + isEndOfWord",
      "Search vs startsWith: search needs isEnd=true",
      "Word Search II: Trie + DFS on grid",
    ],
    timeComplexities: [
      {
        operation: "Insert/Search",
        best: "O(1)",
        avg: "O(m)",
        worst: "O(m)",
        space: "O(m)",
      },
    ],
    questions: [
      {
        id: "implement-trie",
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        description: "Implement a Trie with insert, search, and startsWith.",
        examples: [
          { input: 'insert("apple"), search("apple")', output: "true" },
        ],
        constraints: ["1≤word.length≤2000", "lowercase letters only"],
        starterCode: {
          js: `class TrieNode{\n  constructor(){this.children={};this.isEnd=false;}\n}\nclass Trie{\n  constructor(){this.root=new TrieNode();}\n  insert(word){}\n  search(word){}\n  startsWith(prefix){}\n}`,
          python: `class TrieNode:\n    def __init__(self): self.children={}; self.is_end=False\nclass Trie:\n    def __init__(self): self.root=TrieNode()\n    def insert(self,w): pass\n    def search(self,w): pass\n    def starts_with(self,p): pass`,
        },
        solution: {
          js: `class TrieNode{constructor(){this.children={};this.isEnd=false;}}\nclass Trie{\n  constructor(){this.root=new TrieNode();}\n  insert(w){let n=this.root;for(const c of w){if(!n.children[c])n.children[c]=new TrieNode();n=n.children[c];}n.isEnd=true;}\n  _find(s){let n=this.root;for(const c of s){if(!n.children[c])return null;n=n.children[c];}return n;}\n  search(w){const n=this._find(w);return n!==null&&n.isEnd;}\n  startsWith(p){return this._find(p)!==null;}\n}`,
          python: `class TrieNode:\n    def __init__(self): self.children={}; self.is_end=False\nclass Trie:\n    def __init__(self): self.root=TrieNode()\n    def insert(self,w):\n        n=self.root\n        for c in w:\n            if c not in n.children: n.children[c]=TrieNode()\n            n=n.children[c]\n        n.is_end=True\n    def _find(self,s):\n        n=self.root\n        for c in s:\n            if c not in n.children: return None\n            n=n.children[c]\n        return n\n    def search(self,w): n=self._find(w); return n is not None and n.is_end\n    def starts_with(self,p): return self._find(p) is not None`,
        },
        testCases: [
          { input: 'insert("apple"), search("apple")', expected: "true" },
          { input: 'search("app")', expected: "false" },
        ],
        timeComplexity: "O(m) per op",
        spaceComplexity: "O(n×m)",
        hints: ["Each node stores children dict and isEnd flag."],
        tags: ["trie", "design"],
        walkthrough: [
          {
            title: "Trie structure: letters as nodes",
            explanation:
              "Each character in a word is a node. Paths from root to isEnd=true nodes spell complete words. Paths to non-end nodes are prefixes.",
            phase: "init",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "root", label: "", x: 250, y: 20 },
                { id: "a", label: "a", x: 150, y: 80 },
                { id: "b", label: "b", x: 350, y: 80 },
                { id: "ap", label: "p", x: 100, y: 150 },
                { id: "bp", label: "a", x: 350, y: 150 },
                { id: "app", label: "p", x: 100, y: 220 },
                { id: "bpa", label: "t", x: 350, y: 220 },
                { id: "appl", label: "l", x: 100, y: 290 },
                { id: "apple", label: "e*", x: 100, y: 360 },
              ],
              treeEdges: [
                ["root", "a"],
                ["root", "b"],
                ["a", "ap"],
                ["b", "bp"],
                ["ap", "app"],
                ["bp", "bpa"],
                ["app", "appl"],
                ["appl", "apple"],
              ],
              treeHighlighted: ["apple"],
            },
          },
          {
            title: 'Insert "apple"',
            explanation:
              "Traverse root→a→p→p→l→e. Create nodes that don't exist. Mark final node isEnd=true (★).",
            phase: "update",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "root", label: "", x: 250, y: 20 },
                { id: "a", label: "a", x: 150, y: 80, state: "active" },
                { id: "ap", label: "p", x: 100, y: 150, state: "active" },
                { id: "app", label: "p", x: 100, y: 220, state: "active" },
                { id: "appl", label: "l", x: 100, y: 290, state: "active" },
                { id: "apple", label: "e★", x: 100, y: 360, state: "found" },
              ],
              treeEdges: [
                ["root", "a"],
                ["a", "ap"],
                ["ap", "app"],
                ["app", "appl"],
                ["appl", "apple"],
              ],
            },
          },
          {
            title: 'search("apple") → true',
            explanation:
              'Traverse a→p→p→l→e. Reach node "e". isEnd=true → return true.',
            phase: "found",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "root", label: "", x: 250, y: 20 },
                { id: "a", label: "a", x: 150, y: 80, state: "found" },
                { id: "ap", label: "p", x: 100, y: 150, state: "found" },
                { id: "app", label: "p", x: 100, y: 220, state: "found" },
                { id: "appl", label: "l", x: 100, y: 290, state: "found" },
                { id: "apple", label: "e★", x: 100, y: 360, state: "result" },
              ],
              treeEdges: [
                ["root", "a"],
                ["a", "ap"],
                ["ap", "app"],
                ["app", "appl"],
                ["appl", "apple"],
              ],
            },
            variables: { isEnd: "true", result: "true" },
          },
          {
            title: 'search("app") → false, startsWith("app") → true',
            explanation:
              "a→p→p: node exists but isEnd=false → search returns false. startsWith just checks node exists → returns true.",
            phase: "done",
            visual: {
              type: "tree",
              treeNodes: [
                { id: "root", label: "", x: 250, y: 20 },
                { id: "a", label: "a", x: 150, y: 80, state: "found" },
                { id: "ap", label: "p", x: 100, y: 150, state: "found" },
                { id: "app", label: "p", x: 100, y: 220, state: "comparing" },
                { id: "appl", label: "l", x: 100, y: 290 },
                { id: "apple", label: "e★", x: 100, y: 360 },
              ],
              treeEdges: [
                ["root", "a"],
                ["a", "ap"],
                ["ap", "app"],
                ["app", "appl"],
                ["appl", "apple"],
              ],
            },
            variables: {
              'search("app")': "false (isEnd=false)",
              'startsWith("app")': "true (node exists)",
            },
            complexity:
              "O(m) per operation — traverse exactly m character nodes.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Trie search for word of length m:",
        options: ["O(n)", "O(m)", "O(log n)", "O(1)"],
        correct: 1,
        explanation:
          "O(m) — independent of total words stored. That's the Trie advantage.",
      },
    ],
    cheatSheet: `# Trie\n\`\`\`js\nclass TrieNode{constructor(){this.children={};this.isEnd=false;}}\nclass Trie{\n  insert(w){let n=this.root;for(const c of w){if(!n.children[c])n.children[c]=new TrieNode();n=n.children[c];}n.isEnd=true;}\n  search(w){const n=this._find(w);return n&&n.isEnd;}\n}\n\`\`\``,
    proTips: [
      "Use Trie for multi-word search (Word Search II)",
      "isEnd distinguishes prefixes from complete words",
    ],
    faangQuotes: [
      '"Word Search II combining Trie+DFS is our staff-level problem." — Google',
    ],
    visualizationType: "trie",
  },

  {
    id: "topic17",
    slug: "union-find",
    title: "Union Find / Disjoint Set",
    emoji: "🔀",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-400",
    layman:
      "Union-Find tracks which group each item belongs to. Are Alice and Bob in the same friend group? Union merges groups, Find identifies the group.",
    technical:
      "DSU with path compression + union by rank: amortized O(α(n)) ≈ O(1) per operation.",
    keyInsights: [
      "Path compression: point every node to root on find",
      "Union by rank: attach smaller tree to larger",
      "Together: inverse Ackermann O(α(n))",
      "Kruskal MST: sort edges, union if no cycle",
    ],
    timeComplexities: [
      {
        operation: "Find (path compression)",
        best: "O(1)",
        avg: "O(α(n))",
        worst: "O(α(n))",
        space: "O(1)",
      },
      {
        operation: "Union (by rank)",
        best: "O(1)",
        avg: "O(α(n))",
        worst: "O(α(n))",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "number-provinces",
        title: "Number of Provinces",
        difficulty: "Medium",
        description:
          "Given isConnected[i][j]=1 if cities i and j are directly connected, return the number of provinces.",
        examples: [
          { input: "isConnected=[[1,1,0],[1,1,0],[0,0,1]]", output: "2" },
        ],
        constraints: ["1≤n≤200"],
        starterCode: {
          js: `function findCircleNum(isConnected){\n  const n=isConnected.length;\n  const parent=Array.from({length:n},(_,i)=>i);\n  const rank=Array(n).fill(0);\n  function find(x){}\n  function union(x,y){}\n}`,
          python: `def find_circle_num(ic):\n    n=len(ic)\n    parent=list(range(n)); rank=[0]*n\n    def find(x): pass\n    def union(x,y): pass`,
        },
        solution: {
          js: `function findCircleNum(ic){\n  const n=ic.length;\n  const p=Array.from({length:n},(_,i)=>i),r=Array(n).fill(0);\n  function find(x){return p[x]===x?x:(p[x]=find(p[x]));}\n  function union(x,y){\n    const[px,py]=[find(x),find(y)];\n    if(px===py)return;\n    if(r[px]<r[py])p[px]=py;\n    else if(r[px]>r[py])p[py]=px;\n    else{p[py]=px;r[px]++;}\n  }\n  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(ic[i][j])union(i,j);\n  return new Set(Array.from({length:n},(_,i)=>find(i))).size;\n}`,
          python: `def find_circle_num(ic):\n    n=len(ic);parent=list(range(n));rank=[0]*n\n    def find(x):\n        if parent[x]!=x: parent[x]=find(parent[x])\n        return parent[x]\n    def union(x,y):\n        px,py=find(x),find(y)\n        if px==py: return\n        if rank[px]<rank[py]: px,py=py,px\n        parent[py]=px\n        if rank[px]==rank[py]: rank[px]+=1\n    for i in range(n):\n        for j in range(i+1,n):\n            if ic[i][j]: union(i,j)\n    return len(set(find(i) for i in range(n)))`,
        },
        testCases: [
          { input: "[[1,1,0],[1,1,0],[0,0,1]]", expected: "2" },
          { input: "[[1,0,0],[0,1,0],[0,0,1]]", expected: "3", hidden: true },
        ],
        timeComplexity: "O(n²·α(n))",
        spaceComplexity: "O(n)",
        hints: ["Union all connected pairs. Count distinct roots."],
        tags: ["union-find", "graph"],
        walkthrough: [
          {
            title: "Initialize: each city is its own province",
            explanation:
              "parent=[0,1,2] — each node is its own root. rank=[0,0,0].",
            phase: "init",
            visual: {
              type: "array",
              array: [0, 1, 2],
              labels: ["parent[0]", "parent[1]", "parent[2]"],
              states: ["active", "active", "active"],
            },
            variables: { parent: "[0,1,2]", provinces: 3 },
          },
          {
            title: "Union(0,1): cities 0 and 1 are connected",
            explanation:
              "find(0)=0, find(1)=1. Different roots → union. rank equal → parent[1]=0, rank[0]++.",
            phase: "update",
            visual: {
              type: "array",
              array: [0, 0, 2],
              labels: ["parent[0]", "parent[1]", "parent[2]"],
              states: ["active", "found", "comparing"],
            },
            variables: { parent: "[0,0,2]", "rank[0]": 1, provinces: 2 },
          },
          {
            title: "Count distinct roots",
            explanation:
              "find(0)=0, find(1)=find(parent[1]=0)=0. find(2)=2. Roots: {0,2}. Size=2 → 2 provinces.",
            phase: "done",
            visual: {
              type: "array",
              array: [0, 0, 2],
              labels: ["root=0", "→root=0", "root=2"],
              states: ["result", "found", "result"],
            },
            variables: { answer: 2 },
            complexity: "O(n²) pairs × O(α(n)) per union. Space O(n).",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Path compression in Union-Find:",
        options: [
          "Increases height",
          "Flattens tree on find",
          "Only with union by rank",
          "No effect",
        ],
        correct: 1,
        explanation:
          "Path compression makes every node on the find path point directly to root, flattening future queries.",
      },
    ],
    cheatSheet: `# Union-Find\n\`\`\`js\nconst p=Array.from({length:n},(_,i)=>i);\nfunction find(x){return p[x]===x?x:(p[x]=find(p[x]));}\nfunction union(x,y){const[px,py]=[find(x),find(y)];if(px!==py)p[py]=px;}\n\`\`\``,
    proTips: [
      "Use both path compression AND union by rank",
      "Count roots: nodes where parent[i]==i after unions",
    ],
    faangQuotes: [
      '"Kruskal MST using Union-Find is elegant and efficient." — Amazon',
    ],
    visualizationType: "graph",
  },

  {
    id: "topic18",
    slug: "advanced-trees",
    title: "Advanced Trees: Segment & Fenwick",
    emoji: "🏗️",
    color: "#c084fc",
    gradient: "from-purple-500 to-violet-400",
    layman:
      "A Segment Tree is like a tournament bracket storing range answers. Want the sum of elements 3–17? The tree gives O(log n) answer by combining precomputed segment results.",
    technical:
      "Segment Tree: O(n) build, O(log n) range query, O(log n) point update. Fenwick/BIT: O(log n) prefix sum and update. Lazy propagation: range updates in O(log n).",
    keyInsights: [
      "Segment tree: node i covers [l,r]; children [l,mid] and [mid+1,r]",
      "Fenwick: BIT[i] stores sum of range of length lowbit(i)",
      "Lowbit: x&(-x)",
      "Lazy propagation defers range updates",
    ],
    timeComplexities: [
      {
        operation: "Segment Tree Build",
        best: "O(n)",
        avg: "O(n)",
        worst: "O(n)",
        space: "O(n)",
      },
      {
        operation: "Range Query/Update",
        best: "O(log n)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)",
      },
      {
        operation: "Fenwick Prefix Sum",
        best: "O(log n)",
        avg: "O(log n)",
        worst: "O(log n)",
        space: "O(1)",
      },
    ],
    questions: [
      {
        id: "range-sum-query",
        title: "Range Sum Query – Mutable (Fenwick Tree)",
        difficulty: "Hard",
        description:
          "Support update(i,val) and sumRange(l,r) in O(log n) each.",
        examples: [{ input: "NumArray([1,3,5]), sumRange(0,2)", output: "9" }],
        constraints: ["1≤nums.length≤3×10⁴"],
        starterCode: {
          js: `class NumArray{\n  constructor(nums){\n    this.n=nums.length;\n    this.tree=Array(this.n+1).fill(0);\n    // Build Fenwick tree\n  }\n  update(i,val){}\n  sumRange(l,r){}\n}`,
          python: `class NumArray:\n    def __init__(self,nums):\n        self.n=len(nums); self.tree=[0]*(self.n+1); self.nums=nums[:]`,
        },
        solution: {
          js: `class NumArray{\n  constructor(nums){\n    this.n=nums.length;\n    this.tree=Array(this.n+1).fill(0);\n    this.nums=[...nums];\n    for(let i=0;i<nums.length;i++)this._upd(i+1,nums[i]);\n  }\n  _upd(i,d){for(;i<=this.n;i+=i&-i)this.tree[i]+=d;}\n  _sum(i){let s=0;for(;i>0;i-=i&-i)s+=this.tree[i];return s;}\n  update(i,v){this._upd(i+1,v-this.nums[i]);this.nums[i]=v;}\n  sumRange(l,r){return this._sum(r+1)-this._sum(l);}\n}`,
          python: `class NumArray:\n    def __init__(self,nums):\n        self.n=len(nums);self.tree=[0]*(self.n+1);self.nums=nums[:]\n        for i,v in enumerate(nums): self._update(i+1,v)\n    def _update(self,i,d):\n        while i<=self.n: self.tree[i]+=d;i+=i&(-i)\n    def _query(self,i):\n        s=0\n        while i>0: s+=self.tree[i];i-=i&(-i)\n        return s\n    def update(self,i,v): self._update(i+1,v-self.nums[i]);self.nums[i]=v\n    def sum_range(self,l,r): return self._query(r+1)-self._query(l)`,
        },
        testCases: [
          { input: "NumArray([1,3,5]), sumRange(0,2)", expected: "9" },
        ],
        timeComplexity: "O(log n) per op",
        spaceComplexity: "O(n)",
        hints: [
          "x&(-x) gives the range length stored at BIT index x.",
          "Query = prefix_sum(r+1) - prefix_sum(l).",
        ],
        tags: ["fenwick-tree", "segment-tree", "advanced"],
        walkthrough: [
          {
            title: "Fenwick tree: lowbit trick",
            explanation:
              "BIT[i] stores sum of a range ending at index i with length lowbit(i) = i&(-i). This creates a partial sum structure where queries decompose into O(log n) lookups.",
            phase: "init",
            visual: {
              type: "array",
              array: [0, 1, 4, 3, 9, 5, 9, 8, 22],
              labels: [
                "0",
                "BIT[1]",
                "BIT[2]",
                "BIT[3]",
                "BIT[4]",
                "BIT[5]",
                "BIT[6]",
                "BIT[7]",
                "BIT[8]",
              ],
              states: [
                "eliminated",
                "active",
                "active",
                "active",
                "active",
                "active",
                "active",
                "active",
                "active",
              ],
            },
            insight:
              "BIT[4] = sum of indices 1-4. BIT[6] = sum of 5-6. BIT[5]=sum of 5. Clever bit trick structures these ranges.",
          },
          {
            title: "Update: propagate up via +lowbit",
            explanation:
              "Update index i: add delta to BIT[i], then jump to i+=(i&-i). This hits all ancestor nodes covering index i.",
            phase: "update",
            visual: {
              type: "array",
              array: [0, 1, 4, 3, 9, 5, 9, 8, 22],
              states: [
                "eliminated",
                "active",
                "comparing",
                "eliminated",
                "found",
                "eliminated",
                "eliminated",
                "eliminated",
                "eliminated",
              ],
              pointers: { 1: "start", 2: "i+=1", 4: "i+=2" },
            },
            code: `function _upd(i, delta) {\n  for (; i <= n; i += i & -i)\n    tree[i] += delta;\n}`,
            codeHighlight: [2],
          },
          {
            title: "Query prefix sum: walk down via -lowbit",
            explanation:
              "Prefix sum to index i: accumulate tree[i], then jump to i-=(i&-i). For sumRange(l,r) = prefix(r+1) - prefix(l).",
            phase: "scan",
            visual: {
              type: "array",
              array: [0, 1, 4, 3, 9, 5, 9, 8, 22],
              states: [
                "eliminated",
                "eliminated",
                "eliminated",
                "eliminated",
                "found",
                "eliminated",
                "eliminated",
                "eliminated",
                "comparing",
              ],
              pointers: { 8: "start→", 4: "i-=4" },
            },
            code: `function _sum(i) {\n  let s = 0;\n  for (; i > 0; i -= i & -i)\n    s += tree[i];\n  return s;\n}`,
            codeHighlight: [3],
          },
          {
            title: "sumRange(0,2) = prefix(3) - prefix(0) = 9",
            explanation:
              "prefix(3) = tree[3]+tree[2] = 3+4 = ... Wait, let's trace: nums=[1,3,5]. prefix(3)=1+3+5=9. prefix(0)=0. Answer=9.",
            phase: "done",
            visual: {
              type: "array",
              array: [1, 3, 5],
              labels: ["nums[0]", "nums[1]", "nums[2]"],
              states: ["found", "found", "found"],
            },
            variables: { answer: 9, "BIT sum": "O(log n)" },
            complexity: "O(log n) per update and query. O(n) space.",
          },
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Fenwick tree uses which bit trick?",
        options: ["x|(x-1)", "x&(x-1)", "x&(-x)", "x^(x-1)"],
        correct: 2,
        explanation:
          "x&(-x) gives lowest set bit. Adding it traverses up; subtracting traverses down.",
      },
    ],
    cheatSheet: `# Fenwick (BIT)\n\`\`\`js\nfunction upd(i,d){for(i++;i<=n;i+=i&-i)t[i]+=d;}\nfunction sum(i){let s=0;for(i++;i>0;i-=i&-i)s+=t[i];return s;}\nfunction range(l,r){return sum(r)-sum(l-1);}\n\`\`\``,
    proTips: [
      "Fenwick for prefix sums; Segment tree for complex range queries",
      "Lazy propagation for range updates",
    ],
    faangQuotes: [
      '"Segment tree with lazy propagation separates senior from staff engineers." — Google',
    ],
    visualizationType: "tree",
  },
];

export const getTopicById = (id: string) => TOPICS.find((t) => t.id === id);
export const getTopicBySlug = (slug: string) =>
  TOPICS.find((t) => t.slug === slug);
