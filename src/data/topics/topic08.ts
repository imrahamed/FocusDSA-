import { Topic } from "./types";

export const topic08: Topic = {
  "id": "topic08",
  "slug": "graphs-bfs-dfs",
  "title": "Graphs – BFS & DFS",
  "emoji": "🕸️",
  "color": "#818cf8",
  "gradient": "from-indigo-500 to-violet-400",
  "layman": "A graph is any network of connected things. BFS explores neighbors level by level (like ripples in water). DFS dives deep down one path before backtracking (like solving a maze).",
  "technical": "Graphs G=(V,E). DFS: stack (recursion). BFS: queue. Time O(V+E). Always mark visited to avoid cycles.",
  "keyInsights": [
    "BFS finds shortest path in unweighted graphs",
    "DFS finds components, cycles, topological order",
    "Always use visited set",
    "Adjacency list O(V+E) vs matrix O(V²)"
  ],
  "timeComplexities": [
    {
      "operation": "BFS/DFS",
      "best": "O(V+E)",
      "avg": "O(V+E)",
      "worst": "O(V+E)",
      "space": "O(V)"
    }
  ],
  "questions": [
    {
      "id": "number-of-islands",
      "title": "Number of Islands",
      "difficulty": "Medium",
      "description": "Given an m×n grid of '1's (land) and '0's (water), return the number of islands.",
      "examples": [
        {
          "input": "grid = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
          "output": "2"
        }
      ],
      "constraints": [
        "1 ≤ m,n ≤ 300"
      ],
      "starterCode": {
        "js": "function numIslands(grid){\n  let count=0;\n  function dfs(r,c){\n    // mark + explore 4 dirs\n  }\n}",
        "python": "def num_islands(grid):\n    count=0\n    def dfs(r,c): pass"
      },
      "solution": {
        "js": "function numIslands(grid){\n  let count=0;\n  function dfs(r,c){\n    if(r<0||r>=grid.length||c<0||c>=grid[0].length||grid[r][c]!=='1')return;\n    grid[r][c]='0';\n    dfs(r+1,c);dfs(r-1,c);dfs(r,c+1);dfs(r,c-1);\n  }\n  for(let r=0;r<grid.length;r++)\n    for(let c=0;c<grid[0].length;c++)\n      if(grid[r][c]==='1'){dfs(r,c);count++;}\n  return count;\n}",
        "python": "def num_islands(grid):\n    def dfs(r,c):\n        if r<0 or r>=len(grid) or c<0 or c>=len(grid[0]) or grid[r][c]!='1': return\n        grid[r][c]='0'\n        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(r+dr,c+dc)\n    count=0\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c]=='1': dfs(r,c); count+=1\n    return count"
      },
      "testCases": [
        {
          "input": "[[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
          "expected": "2"
        },
        {
          "input": "[[\"1\",\"1\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"1\",\"1\"]]",
          "expected": "1",
          "hidden": true
        }
      ],
      "timeComplexity": "O(m×n)",
      "spaceComplexity": "O(m×n)",
      "hints": [
        "DFS from every unvisited land cell, marking as visited (set to \"0\")."
      ],
      "tags": [
        "graph",
        "dfs",
        "matrix"
      ],
      "walkthrough": [
        {
          "title": "Scan for unvisited land cells",
          "explanation": "Iterate grid. When we find \"1\" (unvisited land), start a DFS to mark the entire island as visited, then increment count.",
          "phase": "init",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "1",
                "1",
                "0"
              ],
              [
                "0",
                "1",
                "0"
              ],
              [
                "0",
                "0",
                "1"
              ]
            ],
            "colHeaders": [
              "0",
              "1",
              "2"
            ],
            "rowHeaders": [
              "0",
              "1",
              "2"
            ]
          }
        },
        {
          "title": "Island 1: DFS from (0,0)",
          "explanation": "Start DFS at (0,0)=\"1\". Mark (0,0)=\"0\". Explore neighbors: (0,1)=\"1\"→mark, (1,1)=\"1\"→mark. No more land connected. Island 1 found.",
          "phase": "scan",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "✓",
                "✓",
                "0"
              ],
              [
                "0",
                "✓",
                "0"
              ],
              [
                "0",
                "0",
                "1"
              ]
            ],
            "colHeaders": [
              "0",
              "1",
              "2"
            ],
            "rowHeaders": [
              "0",
              "1",
              "2"
            ],
            "gridHighlighted": [
              [
                0,
                0
              ],
              [
                0,
                1
              ],
              [
                1,
                1
              ]
            ]
          },
          "variables": {
            "count": 1
          }
        },
        {
          "title": "Island 2: DFS from (2,2)",
          "explanation": "Continue scan. (2,2)=\"1\". DFS marks just (2,2). No adjacent land. Island 2 complete.",
          "phase": "found",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "✓",
                "✓",
                "0"
              ],
              [
                "0",
                "✓",
                "0"
              ],
              [
                "0",
                "0",
                "✓"
              ]
            ],
            "colHeaders": [
              "0",
              "1",
              "2"
            ],
            "rowHeaders": [
              "0",
              "1",
              "2"
            ],
            "gridHighlighted": [
              [
                2,
                2
              ]
            ]
          },
          "variables": {
            "count": 2
          }
        },
        {
          "title": "Return 2",
          "explanation": "Total islands = 2. DFS \"sinks\" each island by marking cells \"0\", preventing double-counting.",
          "phase": "done",
          "visual": {
            "type": "grid",
            "grid": [
              [
                "0",
                "0",
                "0"
              ],
              [
                "0",
                "0",
                "0"
              ],
              [
                "0",
                "0",
                "0"
              ]
            ],
            "colHeaders": [
              "0",
              "1",
              "2"
            ],
            "rowHeaders": [
              "0",
              "1",
              "2"
            ]
          },
          "variables": {
            "answer": 2
          },
          "complexity": "O(m×n) — each cell visited at most once."
        }
      ]
    },
    {
      "id": "max-area-of-island",
      "title": "Max Area of Island",
      "difficulty": "Medium",
      "description": "You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.\n\nThe area of an island is the number of cells with a value 1 in the island.\n\nReturn the maximum area of an island in grid. If there is no island, return 0.\n\n \nExample 1:\n\n\n<strong>Input:</strong> grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> The answer is not 11, because the island must be connected 4-directionally.\n\n\nExample 2:\n\n\n<strong>Input:</strong> grid = [[0,0,0,0,0,0,0,0]]\n<strong>Output:</strong> 0\n\n\n \nConstraints:\n\n\n\tm == grid.length\n\tn == grid[i].length\n\t1 <= m, n <= 50\n\tgrid[i][j] is either 0 or 1.",
      "examples": [
        {
          "input": "[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,0,0,0,0,0,0,0]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function maxAreaOfIsland(input) {\n  // Your code here\n}",
        "python": "def max_area_of_island(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/max-area-of-island\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {number[][]} grid\n * @return {number}\n */\nvar maxAreaOfIsland = function (grid, maxArea = 0) {\n    const [rows, cols] = [grid.length, grid[0].length];\n    const seen = new Array(rows).fill().map(() => new Array(cols));\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const area = getArea(\n                grid,\n                row,\n                rows,\n                col,\n                cols,\n                seen,\n            ); /* Space O(ROWS * COLS) */\n\n            maxArea = Math.max(maxArea, area);\n        }\n    }\n\n    return maxArea;\n};\n\nvar getArea = (grid, row, rows, col, cols, seen) => {\n    const isBaseCase = grid[row][col] === 0;\n    if (isBaseCase) return 0;\n\n    if (seen[row][col]) return 0;\n    seen[row][col] = true; /* Space O(ROWS * COLS) */\n\n    return dfs(grid, row, rows, col, cols, seen) + 1; /* Space O(ROWS * COLS) */\n};\n\nconst dfs = (grid, row, rows, col, cols, seen, area = 0) => {\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        area += getArea(grid, _row, rows, _col, cols, seen);\n    }\n\n    return area;\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\n/**\n * https://leetcode.com/problems/number-of-islands/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {character[][]} grid\n * @return {number}\n */\nvar maxAreaOfIsland = (grid, maxArea = 0) => {\n    const [rows, cols] = [grid.length, grid[0].length];\n    const seen = new Array(rows).fill().map(() => new Array(cols));\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const isBaseCase = grid[row][col] === 0;\n            if (isBaseCase) continue;\n\n            if (seen[row][col]) continue;\n            seen[row][col] = true; /* Space O(ROWS * COLS) */\n\n            const area = getArea(\n                new Queue([[row, col]]),\n                grid,\n                seen,\n            ); /* Space O(ROWS * COLS) */\n\n            maxArea = Math.max(maxArea, area);\n        }\n    }\n\n    return maxArea;\n};\n\nvar getArea = (queue, grid, seen, area = 0) => {\n    const [rows, cols] = [grid.length, grid[0].length];\n\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            /* Time O(WIDTH) */\n            const [row, col] = queue.dequeue();\n\n            for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n                const isBaseCase = grid[_row][_col] === 0;\n                if (isBaseCase) continue;\n\n                if (seen[_row][_col]) continue;\n                seen[_row][_col] = true; /* Space O(ROWS * COLS) */\n\n                queue.enqueue([_row, _col]); /* Space O(HEIGHT) */\n            }\n\n            area++;\n        }\n    }\n\n    return area;\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n",
        "python": "class Solution:\n    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:\n        ROWS, COLS = len(grid), len(grid[0])\n        visit = set()\n\n        def dfs(r, c):\n            if (\n                r < 0\n                or r == ROWS\n                or c < 0\n                or c == COLS\n                or grid[r][c] == 0\n                or (r, c) in visit\n            ):\n                return 0\n            visit.add((r, c))\n            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)\n\n        area = 0\n        for r in range(ROWS):\n            for c in range(COLS):\n                area = max(area, dfs(r, c))\n        return area\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Max Area of Island",
          "explanation": "Max Area of Island is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "clone-graph",
      "title": "Clone Graph",
      "difficulty": "Medium",
      "description": "Given a reference of a node in a connected undirected graph.\n\nReturn a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.\n\n\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n}\n\n\n \n\nTest case format:\n\nFor simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.\n\nAn adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.\n\nThe given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.\n\n \nExample 1:\n\n\n<strong>Input:</strong> adjList = [[2,4],[1,3],[2,4],[1,3]]\n<strong>Output:</strong> [[2,4],[1,3],[2,4],[1,3]]\n<strong>Explanation:</strong> There are 4 nodes in the graph.\n1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).\n4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).\n\n\nExample 2:\n\n\n<strong>Input:</strong> adjList = [[]]\n<strong>Output:</strong> [[]]\n<strong>Explanation:</strong> Note that the input contains one empty list. The graph consists of only one ...",
      "examples": [
        {
          "input": "[[2,4],[1,3],[2,4],[1,3]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[]]",
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
        "js": "function cloneGraph(input) {\n  // Your code here\n}",
        "python": "def clone_graph(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/clone-graph/\n * Time O(V + E) | Space O(N)\n * @param {Node} node\n * @return {Node}\n */\nvar cloneGraph = function (node, seen = new Map()) {\n    const isBaseCase = node === null;\n    if (isBaseCase) return null;\n\n    if (seen.has(node)) return seen.get(node);\n\n    return dfs(node, seen); /* Time O(V + E) | Space O(N) */\n};\n\nconst dfs = (node, seen) => {\n    const clone = new Node(node.val);\n\n    seen.set(node, clone); /*               | Space O(N) */\n\n    for (const neighbor of node.neighbors) {\n        const cloneNeighbor = cloneGraph(\n            neighbor,\n            seen,\n        ); /* Time O(V + E) | Space O(H) */\n\n        clone.neighbors.push(\n            cloneNeighbor,\n        ); /*               | Space O(V + E) */\n    }\n\n    return clone;\n};\n\n/**\n * https://leetcode.com/problems/clone-graph/\n * Time O(V + E) | Space O(N)\n * @param {Node} node\n * @return {Node}\n */\nvar cloneGraph = function (node, seen = new Map()) {\n    const isBaseCase = node === null;\n    if (isBaseCase) return null;\n\n    seen.set(node, new Node(node.val)); /*               | Space O(N) */\n\n    bfs(new Queue([node]), seen); /* Time O(V + E) | Space O(N) */\n\n    return seen.get(node);\n};\n\nconst bfs = (queue, seen) => {\n    while (!queue.isEmpty()) {\n        /* Time O(V + E) */\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            /* Time O(W) */\n            const node = queue.dequeue();\n\n            cloneNeighbors(node, seen, queue); /* Space O(N) */\n        }\n    }\n};\n\nconst cloneNeighbors = (node, seen, queue) => {\n    for (const neighbor of node.neighbors) {\n        if (!seen.has(neighbor)) {\n            seen.set(neighbor, new Node(neighbor.val)); /* Space O(N) */\n            queue.enqueue(neighbor); /* Space O(W) */\n        }\n\n        const [parentClone, neighborClone] = [\n            seen.get(node),\n            seen.get(neighbor),\n        ];\n\n        parentClone.neighbors.push(neighborClone); /* Space O(V + E) */\n    }\n};\n",
        "python": "class Solution:\n    def cloneGraph(self, node: \"Node\") -> \"Node\":\n        oldToNew = {}\n\n        def dfs(node):\n            if node in oldToNew:\n                return oldToNew[node]\n\n            copy = Node(node.val)\n            oldToNew[node] = copy\n            for nei in node.neighbors:\n                copy.neighbors.append(dfs(nei))\n            return copy\n\n        return dfs(node) if node else None\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Clone Graph",
          "explanation": "Clone Graph is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "walls-and-gates",
      "title": "Walls and Gates",
      "difficulty": "Medium",
      "description": "Solve the Walls and Gates problem.",
      "examples": [
        {
          "input": "[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[-1]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function wallsAndGates(input) {\n  // Your code here\n}",
        "python": "def walls_and_gates(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/walls-and-gates/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {number[][]} rooms\n * @return {void} Do not return anything, modify rooms in-place instead.\n */\nvar wallsAndGates = function (rooms) {\n    const [rows, cols] = [rooms.length, rooms[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        for (let col = 0; col < cols; col++) {\n            const isGate = rooms[row][col] === 0;\n            if (!isGate) continue;\n\n            dfs(rooms, row, col);\n        }\n    }\n};\n\nconst dfs = (rooms, row, col) => {\n    const [rows, cols] = [rooms.length, rooms[0].length];\n\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        const isPreviousDistanceGreater =\n            rooms[_row][_col] <= rooms[row][col] + 1;\n        if (isPreviousDistanceGreater) continue;\n\n        rooms[_row][_col] = rooms[row][col] + 1;\n\n        dfs(rooms, _row, _col);\n    }\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && 0 <= _col && _row < rows && _col < cols,\n        );\n\n/**\n * https://leetcode.com/problems/walls-and-gates/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {number[][]} rooms\n * @return {void} Do not return anything, modify rooms in-place instead.\n */\nvar wallsAndGates = function (rooms) {\n    const queue = searchGrid(rooms);\n\n    bfs(rooms, queue);\n};\n\nconst searchGrid = (rooms, queue = new Queue([])) => {\n    const [rows, cols] = [rooms.length, rooms[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        for (let col = 0; col < cols; col++) {\n            const isGate = rooms[row][col] === 0;\n            if (!isGate) continue;\n\n            queue.enqueue([row, col]);\n        }\n    }\n\n    return queue;\n};\n\nconst bfs = (rooms, queue) => {\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            checkNeighbors(rooms, queue);\n        }\n    }\n};\n\nconst checkNeighbors = (rooms, queue) => {\n    const [rows, cols] = [rooms.length, rooms[0].length];\n    const [row, col] = queue.dequeue();\n\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        const isINF = rooms[_row][_col] === 2147483647; /* (2 ** 31) - 1 */\n        if (!isINF) continue;\n\n        rooms[_row][_col] = rooms[row][col] + 1;\n        queue.enqueue([_row, _col]);\n    }\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && 0 <= _col && _row < rows && _col < cols,\n        );\n",
        "python": "class Solution:\n    \"\"\"\n    @param rooms: m x n 2D grid\n    @return: nothing\n    \"\"\"\n\n    def walls_and_gates(self, rooms: List[List[int]]):\n        ROWS, COLS = len(rooms), len(rooms[0])\n        visit = set()\n        q = deque()\n\n        def addRooms(r, c):\n            if (\n                min(r, c) < 0\n                or r == ROWS\n                or c == COLS\n                or (r, c) in visit\n                or rooms[r][c] == -1\n            ):\n                return\n            visit.add((r, c))\n            q.append([r, c])\n\n        for r in range(ROWS):\n            for c in range(COLS):\n                if rooms[r][c] == 0:\n                    q.append([r, c])\n                    visit.add((r, c))\n\n        dist = 0\n        while q:\n            for i in range(len(q)):\n                r, c = q.popleft()\n                rooms[r][c] = dist\n                addRooms(r + 1, c)\n                addRooms(r - 1, c)\n                addRooms(r, c + 1)\n                addRooms(r, c - 1)\n            dist += 1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Walls and Gates",
          "explanation": "Walls and Gates is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "rotting-oranges",
      "title": "Rotting Oranges",
      "difficulty": "Medium",
      "description": "You are given an m x n grid where each cell can have one of three values:\n\n\n\t0 representing an empty cell,\n\t1 representing a fresh orange, or\n\t2 representing a rotten orange.\n\n\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.\n\n \nExample 1:\n\n\n<strong>Input:</strong> grid = [[2,1,1],[1,1,0],[0,1,1]]\n<strong>Output:</strong> 4\n\n\nExample 2:\n\n\n<strong>Input:</strong> grid = [[2,1,1],[0,1,1],[1,0,1]]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.\n\n\nExample 3:\n\n\n<strong>Input:</strong> grid = [[0,2]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> Since there are already no fresh oranges at minute 0, the answer is just 0.\n\n\n \nConstraints:\n\n\n\tm == grid.length\n\tn == grid[i].length\n\t1 <= m, n <= 10\n\tgrid[i][j] is 0, 1, or 2.",
      "examples": [
        {
          "input": "[[2,1,1],[1,1,0],[0,1,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[2,1,1],[0,1,1],[1,0,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,2]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function rottingOranges(input) {\n  // Your code here\n}",
        "python": "def rotting_oranges(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Rotting Oranges",
          "explanation": "Rotting Oranges is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "pacific-atlantic-water-flow",
      "title": "Pacific Atlantic Water Flow",
      "difficulty": "Medium",
      "description": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.\n\n \nExample 1:\n\n\n<strong>Input:</strong> heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\n<strong>Output:</strong> [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\n<strong>Explanation:</strong> The following cells can flow to the Pacific and Atlantic oceans, as shown below:\n[0,4]: [0,4] -> Pacific Ocean \n       [0,4] -> Atlantic Ocean\n[1,3]: [1,3] -> [0,3] -> Pacific Ocean \n       [1,3] -> [1,4] -> Atlantic Ocean\n[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean \n       [1,4] -> Atlantic Ocean\n[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean \n       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean\n[3,0]: [3,0] -> Pacific Ocean \n    ...",
      "examples": [
        {
          "input": "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
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
        "js": "function pacificAtlanticWaterFlow(input) {\n  // Your code here\n}",
        "python": "def pacific_atlantic_water_flow(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/pacific-atlantic-water-flow/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {number[][]} heights\n * @return {number[][]}\n */\nvar pacificAtlantic = function (heights) {\n    const [pacificReachable, atlanticReachable] =\n        search(heights); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    return searchGrid(\n        heights,\n        pacificReachable,\n        atlanticReachable,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n};\n\nvar search = (heights) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n    const [pacificReachable, atlanticReachable] = [\n        getMatrix(rows, cols),\n        getMatrix(rows, cols),\n    ]; /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    searchRows(heights, rows, cols, pacificReachable, atlanticReachable);\n    searchCols(heights, rows, cols, pacificReachable, atlanticReachable);\n\n    return [pacificReachable, atlanticReachable];\n};\n\nvar getMatrix = (rows, cols) =>\n    new Array(rows)\n        .fill() /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n        .map(() => new Array(cols).fill(false));\n\nvar searchRows = (heights, rows, cols, pacificReachable, atlanticReachable) => {\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        const [pacificStart, atlanticStart] = [0, cols - 1];\n\n        dfs(\n            row,\n            pacificStart,\n            rows,\n            cols,\n            pacificReachable,\n            heights,\n        ); /* Space O(ROWS * COLS) */\n        dfs(\n            row,\n            atlanticStart,\n            rows,\n            cols,\n            atlanticReachable,\n            heights,\n        ); /* Space O(ROWS * COLS) */\n    }\n};\n\nvar searchCols = (heights, rows, cols, pacificReachable, atlanticReachable) => {\n    for (let col = 0; col < cols; col++) {\n        /* Time O(COLS) */\n        const [pacificStart, atlanticStart] = [0, rows - 1];\n\n        dfs(\n            pacificStart,\n            col,\n            rows,\n            cols,\n            pacificReachable,\n            heights,\n        ); /* Space O(ROWS * COLS) */\n        dfs(\n            atlanticStart,\n            col,\n            rows,\n            cols,\n            atlanticReachable,\n            heights,\n        ); /* Space O(ROWS * COLS) */\n    }\n};\n\nconst dfs = (row, col, rows, cols, isReachable, heights) => {\n    isReachable[row][col] = true;\n\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        if (isReachable[_row][_col]) continue;\n\n        const isLower = heights[_row][_col] < heights[row][col];\n        if (isLower) continue;\n\n        dfs(\n            _row,\n            _col,\n            rows,\n            cols,\n            isReachable,\n            heights,\n        ); /* Space O(ROWS * COLS) */\n    }\n};\n\nvar searchGrid = (\n    heights,\n    pacificReachable,\n    atlanticReachable,\n    intersection = [],\n) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const isReachable =\n                pacificReachable[row][col] && atlanticReachable[row][col];\n            if (!isReachable) continue;\n\n            intersection.push([row, col]); /* Space O(ROWS * COLS) */\n        }\n    }\n\n    return intersection;\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\n/**\n * https://leetcode.com/problems/pacific-atlantic-water-flow/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {number[][]} heights\n * @return {number[][]}\n */\nvar pacificAtlantic = function (heights) {\n    const [pacificQueue, atlanticQueue] =\n        search(heights); /* Time O(ROWS + COLS) | Space O(ROWS + COLS) */\n    const [pacificReachable, atlanticReachable] = [\n        bfs(heights, pacificQueue),\n        bfs(heights, atlanticQueue),\n    ]; /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    return getIntersection(\n        heights,\n        pacificReachable,\n        atlanticReachable,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n};\n\nvar search = (\n    heights,\n    pacificQueue = new Queue([]),\n    atlanticQueue = new Queue([]),\n) => {\n    searchRows(heights, pacificQueue, atlanticQueue);\n    searchCols(heights, pacificQueue, atlanticQueue);\n\n    return [pacificQueue, atlanticQueue];\n};\n\nvar searchRows = (heights, pacificQueue, atlanticQueue) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        pacificQueue.enqueue([row, 0]); /* Space O(ROWS) */\n        atlanticQueue.enqueue([row, cols - 1]); /* Space O(ROWS) */\n    }\n};\n\nvar searchCols = (heights, pacificQueue, atlanticQueue) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n\n    for (let col = 0; col < cols; col++) {\n        /* Time O(COLS) */\n        pacificQueue.enqueue([0, col]); /* Space O(COLS) */\n        atlanticQueue.enqueue([rows - 1, col]); /* Space O(COLS) */\n    }\n};\n\nconst bfs = (heights, queue) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n    const isReachable = getMatrix(\n        rows,\n        cols,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            /*                     | Space O(WIDTH) */\n            const [row, col] = queue.dequeue();\n\n            checkNeighbor(heights, row, rows, col, cols, isReachable, queue);\n        }\n    }\n\n    return isReachable;\n};\n\nvar getMatrix = (rows, cols) =>\n    new Array(rows)\n        .fill() /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n        .map(() => new Array(cols).fill(false));\n\nvar checkNeighbor = (heights, row, rows, col, cols, isReachable, queue) => {\n    isReachable[row][col] = true;\n\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        if (isReachable[_row][_col]) continue;\n\n        const isLower = heights[_row][_col] < heights[row][col];\n        if (isLower) continue;\n\n        queue.enqueue([_row, _col]);\n    }\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\nconst getIntersection = (\n    heights,\n    pacificReachable,\n    atlanticReachable,\n    intersection = [],\n) => {\n    const [rows, cols] = [heights.length, heights[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const isReachable =\n                pacificReachable[row][col] && atlanticReachable[row][col];\n            if (!isReachable) continue;\n\n            intersection.push([row, col]); /* Space O(ROWS * COLS) */\n        }\n    }\n\n    return intersection;\n};\n",
        "python": "class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        ROWS, COLS = len(heights), len(heights[0])\n        pac, atl = set(), set()\n\n        def dfs(r, c, visit, prevHeight):\n            if (\n                (r, c) in visit\n                or r < 0\n                or c < 0\n                or r == ROWS\n                or c == COLS\n                or heights[r][c] < prevHeight\n            ):\n                return\n            visit.add((r, c))\n            dfs(r + 1, c, visit, heights[r][c])\n            dfs(r - 1, c, visit, heights[r][c])\n            dfs(r, c + 1, visit, heights[r][c])\n            dfs(r, c - 1, visit, heights[r][c])\n\n        for c in range(COLS):\n            dfs(0, c, pac, heights[0][c])\n            dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])\n\n        for r in range(ROWS):\n            dfs(r, 0, pac, heights[r][0])\n            dfs(r, COLS - 1, atl, heights[r][COLS - 1])\n\n        res = []\n        for r in range(ROWS):\n            for c in range(COLS):\n                if (r, c) in pac and (r, c) in atl:\n                    res.append([r, c])\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Pacific Atlantic Water Flow",
          "explanation": "Pacific Atlantic Water Flow is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "surrounded-regions",
      "title": "Surrounded Regions",
      "difficulty": "Medium",
      "description": "You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:\n\n\n\tConnect: A cell is connected to adjacent cells horizontally or vertically.\n\tRegion: To form a region connect every 'O' cell.\n\tSurround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board. Such regions are completely enclosed by 'X' cells.\n\n\nTo capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.\n\n \nExample 1:\n\n\nInput: board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\n\nOutput: [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\n\nExplanation:\n\nIn the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.\n\n\nExample 2:\n\n\nInput: board = [[\"X\"]]\n\nOutput: [[\"X\"]]\n\n\n \nConstraints:\n\n\n\tm == board.length\n\tn == board[i].length\n\t1 <= m, n <= 200\n\tboard[i][j] is 'X' or 'O'.",
      "examples": [
        {
          "input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[\"X\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function surroundedRegions(input) {\n  // Your code here\n}",
        "python": "def surrounded_regions(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/surrounded-regions/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solve = function solve(board) {\n    searchRows(board); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n    searchCols(board); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n    searchGrid(board); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n};\n\nvar searchRows = (board) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        dfs(board, row, rows, 0, cols); /* Space O(ROWS) */\n        dfs(board, row, rows, cols - 1, cols); /* Space O(ROWS) */\n    }\n};\n\nvar searchCols = (board) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let col = 1; col < cols - 1; col++) {\n        /* Time O(COLS) */\n        dfs(board, 0, rows, col, cols); /* Space O(COLS) */\n        dfs(board, rows - 1, rows, col, cols); /* Space O(COLS) */\n    }\n};\n\nvar searchGrid = (board) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const isO = board[row][col] === 'O';\n            if (isO) board[row][col] = 'X';\n\n            const isStar = board[row][col] === '*';\n            if (isStar) board[row][col] = 'O';\n        }\n    }\n};\n\nconst dfs = (board, row, rows, col, cols) => {\n    const isBaseCase = board[row][col] !== 'O';\n    if (isBaseCase) return;\n\n    board[row][col] = '*';\n\n    for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n        dfs(\n            board,\n            _row,\n            rows,\n            _col,\n            cols,\n        ); /* Time O(HEIGHT) | Space O(HEIGHT) */\n    }\n};\n\nvar getNeighbors = (row, rows, col, cols) =>\n    [\n        [0, 1],\n        [0, -1],\n        [1, 0],\n        [-1, 0],\n    ]\n        .map(([_row, _col]) => [row + _row, col + _col])\n        .filter(\n            ([_row, _col]) =>\n                0 <= _row && _row < rows && 0 <= _col && _col < cols,\n        );\n\n/**\n * https://leetcode.com/problems/surrounded-regions/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solve = function solve(board, queue = new Queue([])) {\n    searchRows(board, queue); /* Time O(ROWS + COLS) | Space O(ROWS + COLS) */\n    searchCols(board, queue); /* Time O(ROWS + COLS) | Space O(ROWS + COLS) */\n    bfs(board, queue); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n    searchGrid(board); /* Time O(ROWS * COLS) */\n};\n\nvar searchRows = (board, queue) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        queue.enqueue([row, 0]); /* Space O(ROWS) */\n        queue.enqueue([row, cols - 1]); /* Space O(ROWS) */\n    }\n};\n\nvar searchCols = (board, queue) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let col = 0; col < cols - 1; col++) {\n        /* Time O(COLS) */\n        queue.enqueue([0, col]); /* Space O(COLS) */\n        queue.enqueue([rows - 1, col]); /* Space O(COLS) */\n    }\n};\n\nvar bfs = (board, queue) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            /* Time O(WIDTH) */\n            const [row, col] = queue.dequeue();\n\n            const isBaseCase = board[row][col] !== 'O';\n            if (isBaseCase) continue;\n\n            board[row][col] = '*';\n\n            for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {\n                queue.enqueue([_row, _col]); /* Space O(WIDTH) */\n            }\n        }\n    }\n};\n\nvar searchGrid = (board) => {\n    const [rows, cols] = [board.length, board[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time O(COLS) */\n            const isO = board[row][col] === 'O';\n            if (isO) board[row][col] = 'X';\n\n            const isStar = board[row][col] === '*';\n            if (isStar) board[row][col] = 'O';\n        }\n    }\n};\n",
        "python": "class Solution:\n    def solve(self, board: List[List[str]]) -> None:\n        rows, cols = len(board), len(board[0])\n        flag = set()\n\n        def dfs(r, c):\n            if not(r in range(rows) and c in range(cols)) or board[r][c] != 'O' or (r, c) in flag:\n                return\n            flag.add((r, c))\n            return (dfs(r + 1, c), dfs(r - 1, c), dfs(r, c + 1), dfs(r, c - 1))\n\n        # traverse through the board\n        for r in range(rows):\n            for c in range(cols):\n                if( (r == 0 or c == 0 or r == rows - 1 or c == cols - 1) and board[r][c] == 'O'):\n                    dfs(r, c)\n\n        # set all of the 'X's to 'O's\n        for r in range(rows):\n            for c in range(cols):\n                if board[r][c] == 'O' and (r, c) not in flag:\n                    board[r][c] = 'X'\n\n    '''\n    def solve(self, board: List[List[str]]) -> None:\n        ROWS, COLS = len(board), len(board[0])\n\n        def capture(r, c):\n            if r < 0 or c < 0 or r == ROWS or c == COLS or board[r][c] != \"O\":\n                return\n            board[r][c] = \"T\"\n            capture(r + 1, c)\n            capture(r - 1, c)\n            capture(r, c + 1)\n            capture(r, c - 1)\n\n        # 1. (DFS) Capture unsurrounded regions (O -> T)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if board[r][c] == \"O\" and (r in [0, ROWS - 1] or c in [0, COLS - 1]):\n                    capture(r, c)\n\n        # 2. Capture surrounded regions (O -> X)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if board[r][c] == \"O\":\n                    board[r][c] = \"X\"\n\n        # 3. Uncapture unsurrounded regions (T -> O)\n        for r in range(ROWS):\n            for c in range(COLS):\n                if board[r][c] == \"T\":\n                    board[r][c] = \"O\"\n    '''\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Surrounded Regions",
          "explanation": "Surrounded Regions is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "course-schedule",
      "title": "Course Schedule",
      "difficulty": "Medium",
      "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\n\n\tFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\n\nReturn true if you can finish all courses. Otherwise, return false.\n\n \nExample 1:\n\n\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.\n\n\nExample 2:\n\n\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.\n\n\n \nConstraints:\n\n\n\t1 <= numCourses <= 2000\n\t0 <= prerequisites.length <= 5000\n\tprerequisites[i].length == 2\n\t0 <= ai, bi < numCourses\n\tAll the pairs prerequisites[i] are unique.",
      "examples": [
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,0]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function courseSchedule(input) {\n  // Your code here\n}",
        "python": "def course_schedule(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/course-schedule/\n * Time O((V)^2 + E) | Space O(V + E)\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function (numCourses, prerequisites) {\n    const { graph, path } = buildGraph(numCourses, prerequisites);\n\n    return hasPath(numCourses, graph, path);\n};\n\nvar initGraph = (numCourses) => ({\n    graph: new Array(numCourses).fill().map(() => []),\n    path: new Array(numCourses).fill(false),\n});\n\nvar buildGraph = (numCourses, prerequisites) => {\n    const { graph, path } = initGraph(numCourses);\n\n    for (const [src, dst] of prerequisites) {\n        const neighbors = graph[dst] || [];\n\n        neighbors.push(src);\n\n        graph[dst] = neighbors;\n    }\n\n    return { graph, path };\n};\n\nvar hasPath = (numCourses, graph, path) => {\n    for (let course = 0; course < numCourses; course++) {\n        if (isCyclic(course, graph, path)) return false;\n    }\n\n    return true;\n};\n\nvar isCyclic = (currCourse, graph, path) => {\n    const hasSeen = path[currCourse];\n    if (hasSeen) return true;\n\n    const isMissingNext = !(currCourse in graph);\n    if (isMissingNext) return false;\n\n    return backTrack(currCourse, graph, path);\n};\n\nvar backTrack = (currCourse, graph, path) => {\n    path[currCourse] = true;\n    const _hasCycle = hasCycle(currCourse, graph, path);\n    path[currCourse] = false;\n\n    return _hasCycle;\n};\n\nvar hasCycle = (currCourse, graph, path) => {\n    for (const neighbor of graph[currCourse]) {\n        if (isCyclic(neighbor, graph, path)) return true;\n    }\n\n    return false;\n};\n\n/**\n * https://leetcode.com/problems/course-schedule/\n * Time O(V + E) | Space O(V + E)\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function (numCourses, prerequisites) {\n    const { graph, visited, path } = buildGraph(numCourses, prerequisites);\n\n    for (let currCourse = 0; currCourse < numCourses; currCourse++) {\n        if (isCyclic(currCourse, graph, visited, path)) return false;\n    }\n\n    return true;\n};\n\nvar initGraph = (numCourses) => ({\n    graph: new Array(numCourses).fill().map(() => []),\n    visited: new Array(numCourses).fill(false),\n    path: new Array(numCourses).fill(false),\n});\n\nvar buildGraph = (numCourses, prerequisites) => {\n    const { graph, visited, path } = initGraph(numCourses);\n\n    for (const [src, dst] of prerequisites) {\n        const neighbors = graph[dst] || [];\n\n        neighbors.push(src);\n\n        graph[dst] = neighbors;\n    }\n\n    return { graph, visited, path };\n};\n\nvar isCyclic = (currCourse, graph, visited, path) => {\n    const isVisited = visited[currCourse];\n    if (isVisited) return false;\n\n    const hasSeen = path[currCourse];\n    if (hasSeen) return true;\n\n    const isMissingNext = !(currCourse in graph);\n    if (isMissingNext) return false;\n\n    const _isCyclic = backTrack(currCourse, graph, visited, path);\n\n    visited[currCourse] = true;\n\n    return _isCyclic;\n};\n\nvar backTrack = (currCourse, graph, visited, path) => {\n    path[currCourse] = true;\n    const _hasCycle = hasCycle(currCourse, graph, visited, path);\n    path[currCourse] = false;\n\n    return _hasCycle;\n};\n\nvar hasCycle = (currCourse, graph, visited, path) => {\n    for (const neighbor of graph[currCourse]) {\n        if (isCyclic(neighbor, graph, visited, path)) return true;\n    }\n\n    return false;\n};\n\n/**\n * https://leetcode.com/problems/course-schedule/\n * Time O(V + E) | Space O(V + E)\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {boolean}\n */\nvar canFinish = function (numCourses, prerequisites) {\n    const { graph, indegree } = buildGraph(numCourses, prerequisites);\n    const topologicalOrder = topologicalSort(graph, indegree);\n    const isDirectedAcyclicGraph = topologicalOrder.length === numCourses;\n\n    return isDirectedAcyclicGraph;\n};\n\nvar initGraph = (numCourses) => ({\n    graph: new Array(numCourses).fill().map(() => []),\n    indegree: new Array(numCourses).fill(0),\n});\n\nvar buildGraph = (numCourses, prerequisites) => {\n    const { graph, indegree } = initGraph(numCourses);\n\n    for (const [src, dst] of prerequisites) {\n        graph[src].push(dst);\n        indegree[dst]++;\n    }\n\n    return { graph, indegree };\n};\n\nvar topologicalSort = (graph, indegree, order = []) => {\n    const queue = searchGraph(graph, indegree);\n\n    bfs(graph, indegree, queue, order);\n\n    return order;\n};\n\nvar searchGraph = (graph, indegree, queue = new Queue([])) => {\n    for (const node in graph) {\n        const isSource = indegree[node] === 0;\n        if (isSource) queue.enqueue(node);\n    }\n\n    return queue;\n};\n\nvar bfs = (graph, indegree, queue, order) => {\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            checkNeighbors(graph, indegree, queue, order);\n        }\n    }\n};\n\nvar checkNeighbors = (graph, indegree, queue, order) => {\n    const node = queue.dequeue();\n\n    order.push(node);\n\n    for (const neighbor of graph[node]) {\n        indegree[neighbor]--;\n\n        const isSource = indegree[neighbor] === 0;\n        if (isSource) queue.enqueue(neighbor);\n    }\n};\n",
        "python": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        # dfs\n        preMap = {i: [] for i in range(numCourses)}\n\n        # map each course to : prereq list\n        for crs, pre in prerequisites:\n            preMap[crs].append(pre)\n\n        visiting = set()\n\n        def dfs(crs):\n            if crs in visiting:\n                return False\n            if preMap[crs] == []:\n                return True\n\n            visiting.add(crs)\n            for pre in preMap[crs]:\n                if not dfs(pre):\n                    return False\n            visiting.remove(crs)\n            preMap[crs] = []\n            return True\n\n        for c in range(numCourses):\n            if not dfs(c):\n                return False\n        return True\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Course Schedule",
          "explanation": "Course Schedule is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O((V)",
      "spaceComplexity": "O(V + E)",
      "tags": [
        "Graphs"
      ],
      "hints": [
        "This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.",
        "<a href=\"https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/03Graphs.pdf\" target=\"_blank\">Topological Sort via DFS</a> - A great tutorial explaining the basic concepts of Topological Sort.",
        "Topological sort could also be done via <a href=\"http://en.wikipedia.org/wiki/Topological_sorting#Algorithms\" target=\"_blank\">BFS</a>."
      ]
    },
    {
      "id": "course-schedule-ii",
      "title": "Course Schedule II",
      "difficulty": "Medium",
      "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\n\n\tFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.\n\n \nExample 1:\n\n\n<strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].\n\n\nExample 2:\n\n\n<strong>Input:</strong> numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\n<strong>Output:</strong> [0,2,1,3]\n<strong>Explanation:</strong> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.\nSo one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].\n\n\nExample 3:\n\n\n<strong>Input:</strong> numCourses = 1, prerequisites = []\n<strong>Output:</strong> [0]\n\n\n \nConstraints:\n\n\n\t1 <= numCourses <= 2000\n\t0 <= prerequisites.length <= numCourses * (numCourses - 1)\n\tprerequisites[i].length == 2\n\t0 <= ai, bi < numCourses\n\tai != bi\n\tAll the pairs ...",
      "examples": [
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,0]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "4",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function courseScheduleIi(input) {\n  // Your code here\n}",
        "python": "def course_schedule_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/course-schedule-ii/\n * Time O(V + E) | Space O(V + E)\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {number[]}\n */\nvar findOrder = function (numCourses, prerequisites) {\n    const { graph, color, isDirectedAcyclicGraph, topologicalOrder } =\n        buildGraph(numCourses, prerequisites);\n\n    search(numCourses, graph, color, topologicalOrder, isDirectedAcyclicGraph);\n\n    return isDirectedAcyclicGraph[0] ? topologicalOrder.reverse() : [];\n};\n\nvar initGraph = (numCourses) => ({\n    graph: new Array(numCourses).fill().map(() => []),\n    color: new Array(numCourses).fill(1), // White\n    isDirectedAcyclicGraph: [true],\n    topologicalOrder: [],\n});\n\nvar buildGraph = (numCourses, prerequisites) => {\n    const { graph, color, isDirectedAcyclicGraph, topologicalOrder } =\n        initGraph(numCourses);\n\n    for (const [src, dst] of prerequisites) {\n        const neighbors = graph[dst] || [];\n\n        neighbors.push(src);\n        graph[dst] = neighbors;\n    }\n\n    return { graph, color, isDirectedAcyclicGraph, topologicalOrder };\n};\n\nvar search = (\n    numCourses,\n    graph,\n    color,\n    topologicalOrder,\n    isDirectedAcyclicGraph,\n) => {\n    for (let i = 0; i < numCourses; i++) {\n        const isNew = color[i] === 1; // White\n        if (isNew)\n            dfs(i, graph, color, topologicalOrder, isDirectedAcyclicGraph);\n    }\n};\n\nvar dfs = (node, graph, color, topologicalOrder, isDirectedAcyclicGraph) => {\n    const hasCycle = !isDirectedAcyclicGraph[0];\n    if (hasCycle) return;\n\n    colorBackTrack(\n        node,\n        graph,\n        color,\n        topologicalOrder,\n        isDirectedAcyclicGraph,\n    );\n\n    topologicalOrder.push(node);\n};\n\nconst colorBackTrack = (\n    node,\n    graph,\n    color,\n    topologicalOrder,\n    isDirectedAcyclicGraph,\n) => {\n    color[node] = 2; // Grey\n    checkNeighbors(\n        node,\n        graph,\n        color,\n        topologicalOrder,\n        isDirectedAcyclicGraph,\n    );\n    color[node] = 3; // Black\n};\n\nvar checkNeighbors = (\n    node,\n    graph,\n    color,\n    topologicalOrder,\n    isDirectedAcyclicGraph,\n) => {\n    for (const neighbor of graph[node]) {\n        const isNew = color[neighbor] === 1; // White\n        if (isNew)\n            dfs(\n                neighbor,\n                graph,\n                color,\n                topologicalOrder,\n                isDirectedAcyclicGraph,\n            );\n\n        const isCycle = color[neighbor] === 2; // Grey\n        if (isCycle) isDirectedAcyclicGraph[0] = false;\n    }\n};\n\n/**\n * https://leetcode.com/problems/course-schedule-ii/\n * Time O(V + E) | Space O(V + E)\n * @param {number} numCourses\n * @param {number[][]} prerequisites\n * @return {number[]}\n */\nvar findOrder = function (numCourses, prerequisites) {\n    const { graph, indegree } = buildGraph(numCourses, prerequisites);\n    const reversedTopologicalOrder = topologicalSort(graph, indegree);\n    const isDirectedAcyclicGraph =\n        reversedTopologicalOrder.length === numCourses;\n\n    return isDirectedAcyclicGraph ? reversedTopologicalOrder : [];\n};\n\nvar initGraph = (numCourses) => ({\n    graph: new Array(numCourses).fill().map(() => []),\n    indegree: new Array(numCourses).fill(0),\n});\n\nvar buildGraph = (numCourses, prerequisites) => {\n    const { graph, indegree } = initGraph(numCourses);\n\n    for (const [src, dst] of prerequisites) {\n        graph[src].push(dst);\n        indegree[dst]++;\n    }\n\n    return { graph, indegree };\n};\n\nvar topologicalSort = (graph, indegree) => {\n    const queue = searchGraph(graph, indegree);\n\n    return bfs(graph, indegree, queue);\n};\n\nvar isSource = (count) => count === 0;\n\nvar searchGraph = (graph, indegree, queue = new Queue([])) => {\n    for (const node in graph) {\n        if (isSource(indegree[node])) queue.enqueue(node);\n    }\n\n    return queue;\n};\n\nvar bfs = (graph, indegree, queue, reversedOrder = []) => {\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            checkNeighbors(graph, indegree, queue, reversedOrder);\n        }\n    }\n\n    return reversedOrder.reverse();\n};\n\nvar checkNeighbors = (graph, indegree, queue, reversedOrder) => {\n    const node = queue.dequeue();\n\n    reversedOrder.push(node);\n\n    for (const neighbor of graph[node]) {\n        indegree[neighbor]--;\n\n        if (isSource(indegree[neighbor])) queue.enqueue(neighbor);\n    }\n};\n",
        "python": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        prereq = {c: [] for c in range(numCourses)}\n        for crs, pre in prerequisites:\n            prereq[crs].append(pre)\n\n        output = []\n        visit, cycle = set(), set()\n\n        def dfs(crs):\n            if crs in cycle:\n                return False\n            if crs in visit:\n                return True\n\n            cycle.add(crs)\n            for pre in prereq[crs]:\n                if dfs(pre) == False:\n                    return False\n            cycle.remove(crs)\n            visit.add(crs)\n            output.append(crs)\n            return True\n\n        for c in range(numCourses):\n            if dfs(c) == False:\n                return []\n        return output\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Course Schedule II",
          "explanation": "Course Schedule II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V + E)",
      "tags": [
        "Graphs"
      ],
      "hints": [
        "This problem is equivalent to finding the topological order in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.",
        "<a href=\"https://www.youtube.com/watch?v=ozso3xxkVGU\" target=\"_blank\">Topological Sort via DFS</a> - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.",
        "Topological sort could also be done via <a href=\"http://en.wikipedia.org/wiki/Topological_sorting#Algorithms\" target=\"_blank\">BFS</a>."
      ]
    },
    {
      "id": "graph-valid-tree",
      "title": "Graph Valid Tree",
      "difficulty": "Medium",
      "description": "Solve the Graph Valid Tree problem.",
      "examples": [
        {
          "input": "5",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,1],[0,2],[0,3],[1,4]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "5",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function graphValidTree(input) {\n  // Your code here\n}",
        "python": "def graph_valid_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/graph-valid-tree/\n * Time O(E * a(N)) | Space O(V)\n * @param {number} n\n * @param {number[][]} edges\n * @return {boolean}\n */\nvar validTree = function (n, edges, root = 0) {\n    const isEqual = edges.length === n - 1;\n    if (!isEqual) return false;\n\n    const { graph, visited } = buildGraph(n, edges);\n\n    dfs(root, graph, visited);\n\n    return visited.size === n;\n};\n\nvar initGraph = (n) => ({\n    graph: new Array(n).fill().map(() => []),\n    visited: new Set(),\n});\n\nvar buildGraph = (n, edges) => {\n    const { graph, visited } = initGraph(n);\n\n    for (const [src, dst] of edges) {\n        graph[src].push(dst);\n        graph[dst].push(src);\n    }\n\n    return { graph, visited };\n};\n\nconst dfs = (node, graph, visited) => {\n    if (visited.has(node)) return;\n    visited.add(node);\n\n    for (const neighbor of graph[node]) {\n        dfs(neighbor, graph, visited);\n    }\n};\n\n/**\n * https://leetcode.com/problems/graph-valid-tree/\n * Time O(E * a(N)) | Space O(V)\n * @param {number} n\n * @param {number[][]} edges\n * @return {boolean}\n */\nvar validTree = function (n, edges) {\n    const isEqual = edges.length === n - 1;\n    if (!isEqual) return false;\n\n    const { graph, visited, queue } = buildGraph(n, edges);\n\n    bfs(graph, visited, queue);\n\n    return visited.size === n;\n};\n\nvar initGraph = (n) => ({\n    graph: new Array(n).fill().map(() => []),\n    visited: new Set(),\n    queue: new Queue(),\n    root: 0,\n});\n\nvar buildGraph = (n, edges) => {\n    const { graph, visited, queue, root } = initGraph(n);\n\n    for (const [src, dst] of edges) {\n        graph[src].push(dst);\n        graph[dst].push(src);\n    }\n\n    queue.enqueue(root);\n    visited.add(root);\n\n    return { graph, visited, queue };\n};\n\nconst bfs = (graph, visited, queue) => {\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            checkNeighbor(graph, visited, queue);\n        }\n    }\n};\n\nconst checkNeighbor = (graph, visited, queue) => {\n    const node = queue.dequeue();\n\n    for (const neighbor of graph[node]) {\n        if (visited.has(neighbor)) continue;\n        visited.add(neighbor);\n\n        queue.enqueue(neighbor);\n    }\n};\n\n/**\n * https://leetcode.com/problems/graph-valid-tree/\n * Time O(E * a(N)) | Space O(V)\n * @param {number} n\n * @param {number[][]} edges\n * @return {boolean}\n */\nvar validTree = function (n, edges) {\n    const union = new Array(n).fill(-1);\n\n    for (const [src, dst] of edges) {\n        const [x, y] = [find(union, src), find(union, dst)];\n\n        const hasCycle = x === y;\n        if (hasCycle) return false;\n\n        compress(union, x, y);\n    }\n\n    const isValid = edges.length === n - 1;\n    return isValid;\n};\n\nconst compress = (union, i, head) => (union[i] = head);\n\nconst find = (union, i, num = union[i]) => {\n    const isEmpty = num === -1;\n    if (isEmpty) return i;\n\n    const head = find(union, num);\n\n    compress(union, i, head);\n\n    return union[i];\n};\n",
        "python": "# Problem is free on Lintcode\nclass Solution:\n    \"\"\"\n    @param n: An integer\n    @param edges: a list of undirected edges\n    @return: true if it's a valid tree, or false\n    \"\"\"\n\n    def validTree(self, n, edges):\n        if not n:\n            return True\n        adj = {i: [] for i in range(n)}\n        for n1, n2 in edges:\n            adj[n1].append(n2)\n            adj[n2].append(n1)\n\n        visit = set()\n\n        def dfs(i, prev):\n            if i in visit:\n                return False\n\n            visit.add(i)\n            for j in adj[i]:\n                if j == prev:\n                    continue\n                if not dfs(j, i):\n                    return False\n            return True\n\n        return dfs(0, -1) and n == len(visit)\n    \n    \n    \n    # alternative solution via DSU O(ElogV) time complexity and \n    # save some space as we don't recreate graph\\tree into adjacency list prior dfs and loop over the edge list directly\n    class Solution:\n    \"\"\"\n    @param n: An integer\n    @param edges: a list of undirected edges\n    @return: true if it's a valid tree, or false\n    \"\"\"\n    def __find(self, n: int) -> int:\n        while n != self.parents.get(n, n):\n            n = self.parents.get(n, n)\n        return n\n\n    def __connect(self, n: int, m: int) -> None:\n        pn = self.__find(n)\n        pm = self.__find(m)\n        if pn == pm:\n            return\n        if self.heights.get(pn, 1) > self.heights.get(pm, 1):\n            self.parents[pn] = pm\n        else:\n            self.parents[pm] = pn\n            self.heights[pm] = self.heights.get(pn, 1) + 1\n        self.components -= 1\n\n    def valid_tree(self, n: int, edges: List[List[int]]) -> bool:\n        # init here as not sure that ctor will be re-invoked in different tests\n        self.parents = {}\n        self.heights = {}\n        self.components = n\n\n        for e1, e2 in edges:\n            if self.__find(e1) == self.__find(e2):  # 'redundant' edge\n                return False\n            self.__connect(e1, e2)\n\n        return self.components == 1  # forest contains one tree\n\n\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Graph Valid Tree",
          "explanation": "Graph Valid Tree is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(E * a(N)",
      "spaceComplexity": "O(V)",
      "tags": [
        "Graphs"
      ],
      "hints": [
        "Given <code>n = 5</code> and <code>edges = [[0, 1], [1, 2], [3, 4]]</code>, what should your return? Is this case a valid tree?",
        "According to the <a href=\"https://en.wikipedia.org/wiki/Tree_(graph_theory)\" target=\"_blank\">definition of tree on Wikipedia</a>: “a tree is an undirected graph in which any two vertices are connected by <i>exactly</i> one path. In other words, any connected graph without simple cycles is a tree.”"
      ]
    },
    {
      "id": "number-of-connected-components-in-an-undirected-graph",
      "title": "Number of Connected Components in an Undirected Graph",
      "difficulty": "Medium",
      "description": "Solve the Number of Connected Components in an Undirected Graph problem.",
      "examples": [
        {
          "input": "5",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,1],[1,2],[3,4]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "5",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function numberOfConnectedComponentsInAnUndirectedGraph(input) {\n  // Your code here\n}",
        "python": "def number_of_connected_components_in_an_undirected_graph(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/\n * Time O(V + E) | Space O(V + E)\n * @param {number} n\n * @param {number[][]} edges\n * @return {number}\n */\nvar countComponents = function (n, edges, count = 0) {\n    const { graph, visited } = buildGraph(n, edges);\n\n    for (const node in graph) {\n        if (hasPath(graph, node, visited)) count++;\n    }\n\n    return count;\n};\n\nconst initGraph = (n) => ({\n    graph: new Array(n).fill().map(() => []),\n    visited: new Array(n).fill(false),\n});\n\nconst buildGraph = (n, edges) => {\n    const { graph, visited } = initGraph(n);\n\n    for (const [src, dst] of edges) {\n        graph[src].push(dst);\n        graph[dst].push(src);\n    }\n\n    return { graph, visited };\n};\n\nconst hasPath = (graph, current, visited) => {\n    if (visited[current]) return false;\n    visited[current] = current;\n\n    for (const neighbor of graph[current]) {\n        hasPath(graph, neighbor, visited);\n    }\n\n    return true;\n};\n\n/**\n * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/\n * Time O(E * a(N)) | Space O(V)\n * @param {number} n\n * @param {number[][]} edges\n * @return {number}\n */\nvar countComponents = function (n, edges) {\n    return new UnionFind(n, edges).connectedComponents;\n};\n\nclass UnionFind {\n    constructor(n, edges) {\n        ((this.parent = new Array(n).fill().map((_, index) => index)),\n            (this.rank = new Array(n).fill(1)));\n        this.connectedComponents = n;\n\n        this.search(edges);\n    }\n\n    search(edges) {\n        for (const [src, dst] of edges) {\n            this.union(src, dst);\n        }\n    }\n\n    find(head, tail = head, { parent } = this) {\n        const isEqual = () => head === parent[head];\n        while (!isEqual()) {\n            head = parent[head];\n        }\n\n        this.compress(tail, head);\n\n        return head;\n    }\n\n    compress(tail, head, { parent } = this) {\n        parent[tail] = head;\n    }\n\n    increaseRank(head, tail, { rank } = this) {\n        rank[head] += rank[tail];\n    }\n\n    union(src, dst, { rank } = this) {\n        const [rootSrc, rootDst] = [this.find(src), this.find(dst)];\n\n        const hasCycle = rootSrc === rootDst;\n        if (hasCycle) return;\n\n        this.connectedComponents--;\n\n        const isGreater = rank[rootSrc] < rank[rootDst];\n        if (isGreater) {\n            this.increaseRank(rootDst, rootSrc);\n            this.compress(rootSrc, rootDst);\n        }\n\n        const isLess = rank[rootDst] <= rank[rootSrc];\n        if (isLess) {\n            this.increaseRank(rootSrc, rootDst);\n            this.compress(rootDst, rootSrc);\n        }\n    }\n}\n",
        "python": "class UnionFind:\n    def __init__(self):\n        self.f = {}\n\n    def findParent(self, x):\n        y = self.f.get(x, x)\n        if x != y:\n            y = self.f[x] = self.findParent(y)\n        return y\n\n    def union(self, x, y):\n        self.f[self.findParent(x)] = self.findParent(y)\n\n\nclass Solution:\n    def countComponents(self, n: int, edges: List[List[int]]) -> int:\n        dsu = UnionFind()\n        for a, b in edges:\n            dsu.union(a, b)\n        return len(set(dsu.findParent(x) for x in range(n)))\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Number of Connected Components in an Undirected Graph",
          "explanation": "Number of Connected Components in an Undirected Graph is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V + E)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "redundant-connection",
      "title": "Redundant Connection",
      "difficulty": "Medium",
      "description": "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.\n\nReturn an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.\n\n \nExample 1:\n\n\n<strong>Input:</strong> edges = [[1,2],[1,3],[2,3]]\n<strong>Output:</strong> [2,3]\n\n\nExample 2:\n\n\n<strong>Input:</strong> edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\n<strong>Output:</strong> [1,4]\n\n\n \nConstraints:\n\n\n\tn == edges.length\n\t3 <= n <= 1000\n\tedges[i].length == 2\n\t1 <= ai < bi <= edges.length\n\tai != bi\n\tThere are no repeated edges.\n\tThe given graph is connected.",
      "examples": [
        {
          "input": "[[1,2],[1,3],[2,3]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,2],[2,3],[3,4],[1,4],[1,5]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function redundantConnection(input) {\n  // Your code here\n}",
        "python": "def redundant_connection(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/redundant-connection/\n * Time O((V)^2 + E) | Space O(V + E)\n * @param {number[][]} edges\n * @return {number[]}\n */\nvar findRedundantConnection = function (edges) {\n    const graph = new Array(1000 + 1).fill().map(() => []);\n\n    for (const [src, dst] of edges) {\n        const hasNodes = src in graph && dst in graph;\n        if (hasNodes && hasRedundantConnection(graph, src, dst))\n            return [src, dst];\n\n        graph[src].push(dst);\n        graph[dst].push(src);\n    }\n};\n\nconst hasRedundantConnection = (graph, source, target, seen = new Set()) => {\n    if (seen.has(source)) return false;\n    seen.add(source);\n\n    const isEqual = source === target;\n    if (isEqual) return true;\n\n    return dfs(graph, source, target, seen);\n};\n\nconst dfs = (graph, source, target, seen) => {\n    for (const neighbor of graph[source]) {\n        if (hasRedundantConnection(graph, neighbor, target, seen)) return true;\n    }\n\n    return false;\n};\n\n/**\n * https://leetcode.com/problems/redundant-connection/\n * Time O(V + E) | Space O(V + E)\n * @param {number[][]} edges\n * @return {number[]}\n */\nvar findRedundantConnection = function (edges) {\n    return new UnionFind(edges).redundantConnection;\n};\n\nclass UnionFind {\n    constructor(edges) {\n        this.parent = new Array(edges.length + 1)\n            .fill()\n            .map((_, index) => index);\n        this.rank = new Array(edges.length + 1).fill(1);\n        this.redundantConnection = [-1, -1];\n\n        this.search(edges);\n    }\n\n    search(edges) {\n        for (let [src, dst] of edges) {\n            const hasConnection = this.union(src, dst);\n            if (!hasConnection) return (this.redundantConnection = [src, dst]);\n        }\n    }\n\n    find(node, { parent } = this) {\n        let head = parent[node];\n\n        const isEqual = () => head === parent[head];\n        while (!isEqual()) {\n            const tail = parent[parent[head]];\n\n            this.compress(head, tail);\n            head = parent[head];\n        }\n\n        return head;\n    }\n\n    compress(tail, head, { parent } = this) {\n        parent[tail] = head;\n    }\n\n    increaseRank(head, tail, { rank } = this) {\n        rank[head] += rank[tail];\n    }\n\n    union(src, dst, { rank } = this) {\n        const [rootSrc, rootDst] = [this.find(src), this.find(dst)];\n\n        const hasCycle = rootSrc === rootDst;\n        if (hasCycle) return false;\n\n        const isSrcGreater = rank[rootDst] < rank[rootSrc];\n        if (isSrcGreater) {\n            this.increaseRank(rootDst, rootSrc);\n            this.compress(rootSrc, rootDst);\n        }\n\n        const isDstGreater = rank[rootSrc] <= rank[rootDst];\n        if (isDstGreater) {\n            this.increaseRank(rootSrc, rootDst);\n            this.compress(rootDst, rootSrc);\n        }\n\n        return true;\n    }\n}\n",
        "python": "class Solution:\n    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:\n        par = [i for i in range(len(edges) + 1)]\n        rank = [1] * (len(edges) + 1)\n\n        def find(n):\n            p = par[n]\n            while p != par[p]:\n                par[p] = par[par[p]]\n                p = par[p]\n            return p\n\n        # return False if already unioned\n        def union(n1, n2):\n            p1, p2 = find(n1), find(n2)\n\n            if p1 == p2:\n                return False\n            if rank[p1] > rank[p2]:\n                par[p2] = p1\n                rank[p1] += rank[p2]\n            else:\n                par[p1] = p2\n                rank[p2] += rank[p1]\n            return True\n\n        for n1, n2 in edges:\n            if not union(n1, n2):\n                return [n1, n2]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Redundant Connection",
          "explanation": "Redundant Connection is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O((V)",
      "spaceComplexity": "O(V + E)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    },
    {
      "id": "word-ladder",
      "title": "Word Ladder",
      "difficulty": "Hard",
      "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n\n\n\tEvery adjacent pair of words differs by a single letter.\n\tEvery si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n\tsk == endWord\n\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.\n\n \nExample 1:\n\n\n<strong>Input:</strong> beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> cog\", which is 5 words long.\n\n\nExample 2:\n\n\n<strong>Input:</strong> beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The endWord \"cog\" is not in wordList, therefore there is no valid transformation sequence.\n\n\n \nConstraints:\n\n\n\t1 <= beginWord.length <= 10\n\tendWord.length == beginWord.length\n\t1 <= wordList.length <= 5000\n\twordList[i].length == beginWord.length\n\tbeginWord, endWord, and wordList[i] consist of lowercase English letters.\n\tbeginWord != endWord\n\tAll the words in wordList are unique.",
      "examples": [
        {
          "input": "\"hit\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"cog\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function wordLadder(input) {\n  // Your code here\n}",
        "python": "def word_ladder(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/word-ladder/\n * Time O(ROWS * COLS) | Space O(ROWS * COLS)\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {number}\n */\nvar ladderLength = function (beginWord, endWord, wordList) {\n    const [queue, wordSet, seen] = [\n        new Queue([[beginWord, 1]]),\n        new Set(wordList),\n        new Set([beginWord]),\n    ];\n\n    return bfs(\n        queue,\n        wordSet,\n        seen,\n        endWord,\n    ); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */\n};\n\nconst bfs = (queue, wordSet, seen, endWord) => {\n    while (!queue.isEmpty()) {\n        for (let i = queue.size() - 1; 0 <= i; i--) {\n            const [word, depth] = queue.dequeue();\n\n            const isTarget = word === endWord;\n            if (isTarget) return depth;\n\n            transform(queue, wordSet, seen, word, depth);\n        }\n    }\n\n    return 0;\n};\n\nconst transform = (queue, wordSet, seen, word, depth) => {\n    for (const index in word) {\n        for (const char of 'abcdefghijklmnopqrstuvwxyz') {\n            const neighbor = getNeighbor(word, index, char);\n\n            const hasSeen = !wordSet.has(neighbor) || seen.has(neighbor);\n            if (hasSeen) continue;\n\n            queue.enqueue([neighbor, depth + 1]);\n            seen.add(neighbor);\n        }\n    }\n};\n\nconst getNeighbor = (word, index, char) => {\n    const neighbor = word.split('');\n\n    neighbor[index] = char;\n\n    return neighbor.join('');\n};\n",
        "python": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        if endWord not in wordList:\n            return 0\n\n        nei = collections.defaultdict(list)\n        wordList.append(beginWord)\n        for word in wordList:\n            for j in range(len(word)):\n                pattern = word[:j] + \"*\" + word[j + 1 :]\n                nei[pattern].append(word)\n\n        visit = set([beginWord])\n        q = deque([beginWord])\n        res = 1\n        while q:\n            for i in range(len(q)):\n                word = q.popleft()\n                if word == endWord:\n                    return res\n                for j in range(len(word)):\n                    pattern = word[:j] + \"*\" + word[j + 1 :]\n                    for neiWord in nei[pattern]:\n                        if neiWord not in visit:\n                            visit.add(neiWord)\n                            q.append(neiWord)\n            res += 1\n        return 0\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Word Ladder",
          "explanation": "Word Ladder is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Graphs"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "BFS finds shortest paths in:",
      "options": [
        "Weighted graphs",
        "Unweighted graphs",
        "Both",
        "Neither"
      ],
      "correct": 1,
      "explanation": "BFS explores level by level — first time a node is reached = shortest path in unweighted graphs."
    }
  ],
  "cheatSheet": "# BFS Template\n```js\nconst queue=[start]; const visited=new Set([start]);\nwhile(queue.length){\n  const node=queue.shift();\n  for(const nei of graph[node]){\n    if(!visited.has(nei)){visited.add(nei);queue.push(nei);}\n  }\n}\n```",
  "proTips": [
    "BFS for shortest path, DFS for connected components",
    "Grid: 4-directional DFS/BFS with bounds check"
  ],
  "faangQuotes": [
    "\"Word Ladder BFS is our favorite because it tests if you can model the problem correctly.\" — Google"
  ],
  "visualizationType": "graph",
  "usage": "Used to explore relationships, find connected components, or traverse networks using depth-first or breadth-first search.",
  "dsInvolved": "Graph, Matrix, Queue, Recursion",
  "sampleProblems": [
    "Number of Islands",
    "Clone Graph",
    "Course Schedule"
  ]
};
