import { Topic } from "./types";

export const topic18: Topic = {
  "id": "topic18",
  "slug": "advanced-trees",
  "title": "Advanced Trees: Segment & Fenwick",
  "emoji": "🏗️",
  "color": "#c084fc",
  "gradient": "from-purple-500 to-violet-400",
  "layman": "A Segment Tree is like a tournament bracket storing range answers. Want the sum of elements 3–17? The tree gives O(log n) answer by combining precomputed segment results.",
  "technical": "Segment Tree: O(n) build, O(log n) range query, O(log n) point update. Fenwick/BIT: O(log n) prefix sum and update. Lazy propagation: range updates in O(log n).",
  "keyInsights": [
    "Segment tree: node i covers [l,r]; children [l,mid] and [mid+1,r]",
    "Fenwick: BIT[i] stores sum of range of length lowbit(i)",
    "Lowbit: x&(-x)",
    "Lazy propagation defers range updates"
  ],
  "timeComplexities": [
    {
      "operation": "Segment Tree Build",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(n)"
    },
    {
      "operation": "Range Query/Update",
      "best": "O(log n)",
      "avg": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1)"
    },
    {
      "operation": "Fenwick Prefix Sum",
      "best": "O(log n)",
      "avg": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "range-sum-query",
      "title": "Range Sum Query – Mutable (Fenwick Tree)",
      "difficulty": "Hard",
      "description": "Support update(i,val) and sumRange(l,r) in O(log n) each.",
      "examples": [
        {
          "input": "NumArray([1,3,5]), sumRange(0,2)",
          "output": "9"
        }
      ],
      "constraints": [
        "1≤nums.length≤3×10⁴"
      ],
      "starterCode": {
        "js": "class NumArray{\n  constructor(nums){\n    this.n=nums.length;\n    this.tree=Array(this.n+1).fill(0);\n    // Build Fenwick tree\n  }\n  update(i,val){}\n  sumRange(l,r){}\n}",
        "python": "class NumArray:\n    def __init__(self,nums):\n        self.n=len(nums); self.tree=[0]*(self.n+1); self.nums=nums[:]"
      },
      "solution": {
        "js": "class NumArray{\n  constructor(nums){\n    this.n=nums.length;\n    this.tree=Array(this.n+1).fill(0);\n    this.nums=[...nums];\n    for(let i=0;i<nums.length;i++)this._upd(i+1,nums[i]);\n  }\n  _upd(i,d){for(;i<=this.n;i+=i&-i)this.tree[i]+=d;}\n  _sum(i){let s=0;for(;i>0;i-=i&-i)s+=this.tree[i];return s;}\n  update(i,v){this._upd(i+1,v-this.nums[i]);this.nums[i]=v;}\n  sumRange(l,r){return this._sum(r+1)-this._sum(l);}\n}",
        "python": "class NumArray:\n    def __init__(self,nums):\n        self.n=len(nums);self.tree=[0]*(self.n+1);self.nums=nums[:]\n        for i,v in enumerate(nums): self._update(i+1,v)\n    def _update(self,i,d):\n        while i<=self.n: self.tree[i]+=d;i+=i&(-i)\n    def _query(self,i):\n        s=0\n        while i>0: s+=self.tree[i];i-=i&(-i)\n        return s\n    def update(self,i,v): self._update(i+1,v-self.nums[i]);self.nums[i]=v\n    def sum_range(self,l,r): return self._query(r+1)-self._query(l)"
      },
      "testCases": [
        {
          "input": "NumArray([1,3,5]), sumRange(0,2)",
          "expected": "9"
        }
      ],
      "timeComplexity": "O(log n) per op",
      "spaceComplexity": "O(n)",
      "hints": [
        "x&(-x) gives the range length stored at BIT index x.",
        "Query = prefix_sum(r+1) - prefix_sum(l)."
      ],
      "tags": [
        "fenwick-tree",
        "segment-tree",
        "advanced"
      ],
      "walkthrough": [
        {
          "title": "Fenwick tree: lowbit trick",
          "explanation": "BIT[i] stores sum of a range ending at index i with length lowbit(i) = i&(-i). This creates a partial sum structure where queries decompose into O(log n) lookups.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              0,
              1,
              4,
              3,
              9,
              5,
              9,
              8,
              22
            ],
            "labels": [
              "0",
              "BIT[1]",
              "BIT[2]",
              "BIT[3]",
              "BIT[4]",
              "BIT[5]",
              "BIT[6]",
              "BIT[7]",
              "BIT[8]"
            ],
            "states": [
              "eliminated",
              "active",
              "active",
              "active",
              "active",
              "active",
              "active",
              "active",
              "active"
            ]
          },
          "insight": "BIT[4] = sum of indices 1-4. BIT[6] = sum of 5-6. BIT[5]=sum of 5. Clever bit trick structures these ranges."
        },
        {
          "title": "Update: propagate up via +lowbit",
          "explanation": "Update index i: add delta to BIT[i], then jump to i+=(i&-i). This hits all ancestor nodes covering index i.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              0,
              1,
              4,
              3,
              9,
              5,
              9,
              8,
              22
            ],
            "states": [
              "eliminated",
              "active",
              "comparing",
              "eliminated",
              "found",
              "eliminated",
              "eliminated",
              "eliminated",
              "eliminated"
            ],
            "pointers": {
              "1": "start",
              "2": "i+=1",
              "4": "i+=2"
            }
          },
          "code": "function _upd(i, delta) {\n  for (; i <= n; i += i & -i)\n    tree[i] += delta;\n}",
          "codeHighlight": [
            2
          ]
        },
        {
          "title": "Query prefix sum: walk down via -lowbit",
          "explanation": "Prefix sum to index i: accumulate tree[i], then jump to i-=(i&-i). For sumRange(l,r) = prefix(r+1) - prefix(l).",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              0,
              1,
              4,
              3,
              9,
              5,
              9,
              8,
              22
            ],
            "states": [
              "eliminated",
              "eliminated",
              "eliminated",
              "eliminated",
              "found",
              "eliminated",
              "eliminated",
              "eliminated",
              "comparing"
            ],
            "pointers": {
              "4": "i-=4",
              "8": "start→"
            }
          },
          "code": "function _sum(i) {\n  let s = 0;\n  for (; i > 0; i -= i & -i)\n    s += tree[i];\n  return s;\n}",
          "codeHighlight": [
            3
          ]
        },
        {
          "title": "sumRange(0,2) = prefix(3) - prefix(0) = 9",
          "explanation": "prefix(3) = tree[3]+tree[2] = 3+4 = ... Wait, let's trace: nums=[1,3,5]. prefix(3)=1+3+5=9. prefix(0)=0. Answer=9.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              1,
              3,
              5
            ],
            "labels": [
              "nums[0]",
              "nums[1]",
              "nums[2]"
            ],
            "states": [
              "found",
              "found",
              "found"
            ]
          },
          "variables": {
            "answer": 9,
            "BIT sum": "O(log n)"
          },
          "complexity": "O(log n) per update and query. O(n) space."
        }
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Fenwick tree uses which bit trick?",
      "options": [
        "x|(x-1)",
        "x&(x-1)",
        "x&(-x)",
        "x^(x-1)"
      ],
      "correct": 2,
      "explanation": "x&(-x) gives lowest set bit. Adding it traverses up; subtracting traverses down."
    }
  ],
  "cheatSheet": "# Fenwick (BIT)\n```js\nfunction upd(i,d){for(i++;i<=n;i+=i&-i)t[i]+=d;}\nfunction sum(i){let s=0;for(i++;i>0;i-=i&-i)s+=t[i];return s;}\nfunction range(l,r){return sum(r)-sum(l-1);}\n```",
  "proTips": [
    "Fenwick for prefix sums; Segment tree for complex range queries",
    "Lazy propagation for range updates"
  ],
  "faangQuotes": [
    "\"Segment tree with lazy propagation separates senior from staff engineers.\" — Google"
  ],
  "visualizationType": "tree",
  "usage": "Used to perform efficient range queries and point/range updates over an array.",
  "dsInvolved": "Segment Tree, Binary Indexed Tree (Fenwick), Array",
  "sampleProblems": [
    "Range Sum Query - Mutable",
    "Count of Smaller Numbers After Self"
  ]
};
