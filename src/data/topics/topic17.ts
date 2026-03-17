import { Topic } from "./types";

export const topic17: Topic = {
  "id": "topic17",
  "slug": "union-find",
  "title": "Union Find / Disjoint Set",
  "emoji": "🔀",
  "color": "#10b981",
  "gradient": "from-emerald-500 to-teal-400",
  "layman": "Union-Find tracks which group each item belongs to. Are Alice and Bob in the same friend group? Union merges groups, Find identifies the group.",
  "technical": "DSU with path compression + union by rank: amortized O(α(n)) ≈ O(1) per operation.",
  "keyInsights": [
    "Path compression: point every node to root on find",
    "Union by rank: attach smaller tree to larger",
    "Together: inverse Ackermann O(α(n))",
    "Kruskal MST: sort edges, union if no cycle"
  ],
  "timeComplexities": [
    {
      "operation": "Find (path compression)",
      "best": "O(1)",
      "avg": "O(α(n))",
      "worst": "O(α(n))",
      "space": "O(1)"
    },
    {
      "operation": "Union (by rank)",
      "best": "O(1)",
      "avg": "O(α(n))",
      "worst": "O(α(n))",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "number-provinces",
      "title": "Number of Provinces",
      "difficulty": "Medium",
      "description": "Given isConnected[i][j]=1 if cities i and j are directly connected, return the number of provinces.",
      "examples": [
        {
          "input": "isConnected=[[1,1,0],[1,1,0],[0,0,1]]",
          "output": "2"
        }
      ],
      "constraints": [
        "1≤n≤200"
      ],
      "starterCode": {
        "js": "function findCircleNum(isConnected){\n  const n=isConnected.length;\n  const parent=Array.from({length:n},(_,i)=>i);\n  const rank=Array(n).fill(0);\n  function find(x){}\n  function union(x,y){}\n}",
        "python": "def find_circle_num(ic):\n    n=len(ic)\n    parent=list(range(n)); rank=[0]*n\n    def find(x): pass\n    def union(x,y): pass"
      },
      "solution": {
        "js": "function findCircleNum(ic){\n  const n=ic.length;\n  const p=Array.from({length:n},(_,i)=>i),r=Array(n).fill(0);\n  function find(x){return p[x]===x?x:(p[x]=find(p[x]));}\n  function union(x,y){\n    const[px,py]=[find(x),find(y)];\n    if(px===py)return;\n    if(r[px]<r[py])p[px]=py;\n    else if(r[px]>r[py])p[py]=px;\n    else{p[py]=px;r[px]++;}\n  }\n  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(ic[i][j])union(i,j);\n  return new Set(Array.from({length:n},(_,i)=>find(i))).size;\n}",
        "python": "def find_circle_num(ic):\n    n=len(ic);parent=list(range(n));rank=[0]*n\n    def find(x):\n        if parent[x]!=x: parent[x]=find(parent[x])\n        return parent[x]\n    def union(x,y):\n        px,py=find(x),find(y)\n        if px==py: return\n        if rank[px]<rank[py]: px,py=py,px\n        parent[py]=px\n        if rank[px]==rank[py]: rank[px]+=1\n    for i in range(n):\n        for j in range(i+1,n):\n            if ic[i][j]: union(i,j)\n    return len(set(find(i) for i in range(n)))"
      },
      "testCases": [
        {
          "input": "[[1,1,0],[1,1,0],[0,0,1]]",
          "expected": "2"
        },
        {
          "input": "[[1,0,0],[0,1,0],[0,0,1]]",
          "expected": "3",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n²·α(n))",
      "spaceComplexity": "O(n)",
      "hints": [
        "Union all connected pairs. Count distinct roots."
      ],
      "tags": [
        "union-find",
        "graph"
      ],
      "walkthrough": [
        {
          "title": "Initialize: each city is its own province",
          "explanation": "parent=[0,1,2] — each node is its own root. rank=[0,0,0].",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              0,
              1,
              2
            ],
            "labels": [
              "parent[0]",
              "parent[1]",
              "parent[2]"
            ],
            "states": [
              "active",
              "active",
              "active"
            ]
          },
          "variables": {
            "parent": "[0,1,2]",
            "provinces": 3
          }
        },
        {
          "title": "Union(0,1): cities 0 and 1 are connected",
          "explanation": "find(0)=0, find(1)=1. Different roots → union. rank equal → parent[1]=0, rank[0]++.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              0,
              0,
              2
            ],
            "labels": [
              "parent[0]",
              "parent[1]",
              "parent[2]"
            ],
            "states": [
              "active",
              "found",
              "comparing"
            ]
          },
          "variables": {
            "parent": "[0,0,2]",
            "rank[0]": 1,
            "provinces": 2
          }
        },
        {
          "title": "Count distinct roots",
          "explanation": "find(0)=0, find(1)=find(parent[1]=0)=0. find(2)=2. Roots: {0,2}. Size=2 → 2 provinces.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              0,
              0,
              2
            ],
            "labels": [
              "root=0",
              "→root=0",
              "root=2"
            ],
            "states": [
              "result",
              "found",
              "result"
            ]
          },
          "variables": {
            "answer": 2
          },
          "complexity": "O(n²) pairs × O(α(n)) per union. Space O(n)."
        }
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Path compression in Union-Find:",
      "options": [
        "Increases height",
        "Flattens tree on find",
        "Only with union by rank",
        "No effect"
      ],
      "correct": 1,
      "explanation": "Path compression makes every node on the find path point directly to root, flattening future queries."
    }
  ],
  "cheatSheet": "# Union-Find\n```js\nconst p=Array.from({length:n},(_,i)=>i);\nfunction find(x){return p[x]===x?x:(p[x]=find(p[x]));}\nfunction union(x,y){const[px,py]=[find(x),find(y)];if(px!==py)p[py]=px;}\n```",
  "proTips": [
    "Use both path compression AND union by rank",
    "Count roots: nodes where parent[i]==i after unions"
  ],
  "faangQuotes": [
    "\"Kruskal MST using Union-Find is elegant and efficient.\" — Amazon"
  ],
  "visualizationType": "graph",
  "usage": "Used to manage disjoint sets and efficiently determine if two elements are in the same set or merge sets.",
  "dsInvolved": "Array, Graph",
  "sampleProblems": [
    "Number of Provinces",
    "Redundant Connection",
    "Accounts Merge"
  ]
};
