import { Topic } from "./types";

export const topic09: Topic = {
  "id": "topic09",
  "slug": "shortest-path",
  "title": "Shortest Path Algorithms",
  "emoji": "🛣️",
  "color": "#06b6d4",
  "gradient": "from-cyan-500 to-ocean-400",
  "layman": "Dijkstra is like GPS routing — always expand the nearest unvisited city. Bellman-Ford handles negative toll roads. Floyd-Warshall computes every city pair at once.",
  "technical": "Dijkstra: greedy+min-heap O((V+E)log V), no negatives. Bellman-Ford: relax V-1 times O(VE). Floyd-Warshall: DP all-pairs O(V³).",
  "keyInsights": [
    "Dijkstra fails on negative edges",
    "Bellman-Ford: Vth iteration still relaxing → negative cycle",
    "Floyd-Warshall: dp[i][j]=min(dp[i][j],dp[i][k]+dp[k][j])"
  ],
  "timeComplexities": [
    {
      "operation": "Dijkstra",
      "best": "O((V+E)logV)",
      "avg": "O((V+E)logV)",
      "worst": "O((V+E)logV)",
      "space": "O(V)"
    },
    {
      "operation": "Bellman-Ford",
      "best": "O(VE)",
      "avg": "O(VE)",
      "worst": "O(VE)",
      "space": "O(V)"
    }
  ],
  "questions": [
    {
      "id": "network-delay",
      "title": "Network Delay Time (Dijkstra)",
      "difficulty": "Medium",
      "description": "Given n nodes, times[i]=[u,v,w], find minimum time for signal from k to reach all nodes.",
      "examples": [
        {
          "input": "times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2",
          "output": "2"
        }
      ],
      "constraints": [
        "1≤k≤n≤100"
      ],
      "starterCode": {
        "js": "function networkDelayTime(times,n,k){\n  // Build adj list, run Dijkstra\n}",
        "python": "import heapq\ndef network_delay_time(times,n,k):\n    pass"
      },
      "solution": {
        "js": "function networkDelayTime(times,n,k){\n  const graph=Array.from({length:n+1},()=>[]);\n  for(const[u,v,w]of times)graph[u].push([v,w]);\n  const dist=Array(n+1).fill(Infinity);dist[k]=0;\n  const heap=[[0,k]];\n  while(heap.length){\n    heap.sort((a,b)=>a[0]-b[0]);\n    const[d,u]=heap.shift();\n    if(d>dist[u])continue;\n    for(const[v,w]of graph[u]){\n      if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;heap.push([dist[v],v]);}\n    }\n  }\n  const max=Math.max(...dist.slice(1));\n  return max===Infinity?-1:max;\n}",
        "python": "import heapq\ndef network_delay_time(times,n,k):\n    graph={i:[] for i in range(1,n+1)}\n    for u,v,w in times: graph[u].append((v,w))\n    dist={i:float('inf') for i in range(1,n+1)};dist[k]=0\n    heap=[(0,k)]\n    while heap:\n        d,u=heapq.heappop(heap)\n        if d>dist[u]: continue\n        for v,w in graph[u]:\n            if dist[u]+w<dist[v]: dist[v]=dist[u]+w;heapq.heappush(heap,(dist[v],v))\n    m=max(dist.values())\n    return m if m<float('inf') else -1"
      },
      "testCases": [
        {
          "input": "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2",
          "expected": "2"
        }
      ],
      "timeComplexity": "O((V+E)log V)",
      "spaceComplexity": "O(V+E)",
      "hints": [
        "Greedy: always extend nearest unvisited node."
      ],
      "tags": [
        "graph",
        "dijkstra",
        "heap"
      ],
      "walkthrough": [
        {
          "title": "Initialize distances from source k=2",
          "explanation": "dist[2]=0 (source), all others=∞. Push (0,node2) into min-heap.",
          "phase": "init",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "1",
                "label": "1",
                "x": 100,
                "y": 100
              },
              {
                "id": "2",
                "label": "2",
                "x": 250,
                "y": 40,
                "state": "active"
              },
              {
                "id": "3",
                "label": "3",
                "x": 400,
                "y": 100
              },
              {
                "id": "4",
                "label": "4",
                "x": 400,
                "y": 180
              }
            ],
            "treeEdges": [
              [
                "2",
                "1"
              ],
              [
                "2",
                "3"
              ],
              [
                "3",
                "4"
              ]
            ]
          },
          "variables": {
            "dist[1]": "∞",
            "dist[2]": 0,
            "dist[3]": "∞",
            "dist[4]": "∞"
          }
        },
        {
          "title": "Process node 2: relax neighbors",
          "explanation": "Pop (0,2). Relax edges 2→1 (weight 1): dist[1]=min(∞,0+1)=1. Relax 2→3 (weight 1): dist[3]=1.",
          "phase": "scan",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "1",
                "label": "1",
                "x": 100,
                "y": 100,
                "state": "comparing"
              },
              {
                "id": "2",
                "label": "2",
                "x": 250,
                "y": 40,
                "state": "found"
              },
              {
                "id": "3",
                "label": "3",
                "x": 400,
                "y": 100,
                "state": "comparing"
              },
              {
                "id": "4",
                "label": "4",
                "x": 400,
                "y": 180
              }
            ],
            "treeEdges": [
              [
                "2",
                "1"
              ],
              [
                "2",
                "3"
              ],
              [
                "3",
                "4"
              ]
            ]
          },
          "variables": {
            "dist[1]": 1,
            "dist[3]": 1
          }
        },
        {
          "title": "Process nodes 1 and 3, then 4",
          "explanation": "Process (1,1): no outgoing edges. Process (1,3): relax 3→4 (weight 1): dist[4]=2. Process (2,4): no outgoing edges.",
          "phase": "done",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "1",
                "label": "1",
                "x": 100,
                "y": 100,
                "state": "found"
              },
              {
                "id": "2",
                "label": "2",
                "x": 250,
                "y": 40,
                "state": "found"
              },
              {
                "id": "3",
                "label": "3",
                "x": 400,
                "y": 100,
                "state": "found"
              },
              {
                "id": "4",
                "label": "4",
                "x": 400,
                "y": 180,
                "state": "found"
              }
            ],
            "treeEdges": [
              [
                "2",
                "1"
              ],
              [
                "2",
                "3"
              ],
              [
                "3",
                "4"
              ]
            ]
          },
          "variables": {
            "dist[1]": 1,
            "dist[2]": 0,
            "dist[3]": 1,
            "dist[4]": 2,
            "answer": "max=2"
          },
          "complexity": "Answer = max(dist) = 2. Time O((V+E)log V)."
        }
      ]
    },
    {
      "id": "reconstruct-itinerary",
      "title": "Reconstruct Itinerary",
      "difficulty": "Hard",
      "description": "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.\n\nAll of the tickets belong to a man who departs from \"JFK\", thus, the itinerary must begin with \"JFK\". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.\n\n\n\tFor example, the itinerary [\"JFK\", \"LGA\"] has a smaller lexical order than [\"JFK\", \"LGB\"].\n\n\nYou may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.\n\n \nExample 1:\n\n\n<strong>Input:</strong> tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]\n<strong>Output:</strong> [\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]\n\n\nExample 2:\n\n\n<strong>Input:</strong> tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]\n<strong>Output:</strong> [\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]\n<strong>Explanation:</strong> Another possible reconstruction is [\"JFK\",\"SFO\",\"ATL\",\"JFK\",\"ATL\",\"SFO\"] but it is larger in lexical order.\n\n\n \nConstraints:\n\n\n\t1 <= tickets.length <= 300\n\ttickets[i].length == 2\n\tfromi.length == 3\n\ttoi.length == 3\n\tfromi and toi consist of uppercase English letters.\n\tfromi != toi",
      "examples": [
        {
          "input": "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function reconstructItinerary(input) {\n  // Your code here\n}",
        "python": "def reconstruct_itinerary(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/reconstruct-itinerary/\n * @param {string[][]} tickets\n * @return {string[]}\n */\nvar findItinerary = (tickets) => {\n    tickets.sort();\n\n    const graph = buildGraph(tickets);\n\n    return dfs(tickets, graph);\n};\n\nconst dfs = (tickets, graph, city = 'JFK', path = ['JFK']) => {\n    const isBaseCase = path.length === tickets.length + 1;\n    if (isBaseCase) return true;\n\n    const queue = graph.get(city) || [];\n\n    const isEmpty = queue.length === 0;\n    if (isEmpty) return false;\n\n    for (const nextCity of queue.slice()) {\n        path.push(nextCity);\n        queue.shift();\n\n        if (dfs(tickets, graph, nextCity, path)) return path;\n\n        path.pop();\n        queue.push(nextCity);\n    }\n\n    return false;\n};\n\nconst buildGraph = (tickets, graph = new Map()) => {\n    for (const [src, dst] of tickets) {\n        const edges = graph.get(src) || [];\n\n        edges.push(dst);\n        graph.set(src, edges);\n    }\n\n    return graph;\n};\n",
        "python": "class Solution:\n    def findItinerary(self, tickets: List[List[str]]) -> List[str]:\n        adj = {src: [] for src, dst in tickets}\n        res = []\n\n        for src, dst in tickets:\n            adj[src].append(dst)\n\n        for key in adj:\n            adj[key].sort()\n\n        def dfs(adj, src):\n            if src in adj:\n                destinations = adj[src][:]\n                while destinations:\n                    dest = destinations[0]\n                    adj[src].pop(0)\n                    dfs(adj, dest)\n                    destinations = adj[src][:]\n            res.append(src)\n\n        dfs(adj, \"JFK\")\n        res.reverse()\n\n        if len(res) != len(tickets) + 1:\n            return []\n\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Reconstruct Itinerary",
          "explanation": "Reconstruct Itinerary is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": []
    },
    {
      "id": "min-cost-to-connect-all-points",
      "title": "Min Cost to Connect All Points",
      "difficulty": "Medium",
      "description": "You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].\n\nThe cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.\n\nReturn the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.\n\n \nExample 1:\n\n\n<strong>Input:</strong> points = [[0,0],[2,2],[3,10],[5,2],[7,0]]\n<strong>Output:</strong> 20\n<strong>Explanation:</strong> \n<img alt=\"\" src=\"https://assets.leetcode.com/uploads/2020/08/26/c.png\" style=\"width: 214px; height: 268px;\" />\nWe can connect the points as shown above to get the minimum cost of 20.\nNotice that there is a unique path between every pair of points.\n\n\nExample 2:\n\n\n<strong>Input:</strong> points = [[3,12],[-2,5],[-4,1]]\n<strong>Output:</strong> 18\n\n\n \nConstraints:\n\n\n\t1 <= points.length <= 1000\n\t-106 <= xi, yi <= 106\n\tAll pairs (xi, yi) are distinct.",
      "examples": [
        {
          "input": "[[0,0],[2,2],[3,10],[5,2],[7,0]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,12],[-2,5],[-4,1]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function minCostToConnectAllPoints(input) {\n  // Your code here\n}",
        "python": "def min_cost_to_connect_all_points(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Min Cost to Connect All Points",
          "explanation": "Min Cost to Connect All Points is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": [
        "Connect each pair of points with a weighted edge, the weight being the manhattan distance between those points.",
        "The problem is now the cost of minimum spanning tree in graph with above edges."
      ]
    },
    {
      "id": "network-delay-time",
      "title": "Network Delay Time",
      "difficulty": "Medium",
      "description": "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.\n\n \nExample 1:\n\n\n<strong>Input:</strong> times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\n<strong>Output:</strong> 2\n\n\nExample 2:\n\n\n<strong>Input:</strong> times = [[1,2,1]], n = 2, k = 1\n<strong>Output:</strong> 1\n\n\nExample 3:\n\n\n<strong>Input:</strong> times = [[1,2,1]], n = 2, k = 2\n<strong>Output:</strong> -1\n\n\n \nConstraints:\n\n\n\t1 <= k <= n <= 100\n\t1 <= times.length <= 6000\n\ttimes[i].length == 3\n\t1 <= ui, vi <= n\n\tui != vi\n\t0 <= wi <= 100\n\tAll the pairs (ui, vi) are unique. (i.e., no multiple edges.)",
      "examples": [
        {
          "input": "[[2,1,1],[2,3,1],[3,4,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "4",
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
        "js": "function networkDelayTime(input) {\n  // Your code here\n}",
        "python": "def network_delay_time(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Network Delay Time",
          "explanation": "Network Delay Time is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": [
        "We visit each node at some time, and if that time is better than the fastest time we've reached this node, we travel along outgoing edges in sorted order.  Alternatively, we could use Dijkstra's algorithm."
      ]
    },
    {
      "id": "swim-in-rising-water",
      "title": "Swim in Rising Water",
      "difficulty": "Hard",
      "description": "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).\n\nIt starts raining, and water gradually rises over time. At time t, the water level is t, meaning any cell with elevation less than equal to t is submerged or reachable.\n\nYou can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.\n\nReturn the minimum time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).\n\n \nExample 1:\n\n\n<strong>Input:</strong> grid = [[0,2],[1,3]]\n<strong>Output:</strong> 3\nExplanation:\nAt time 0, you are in grid location (0, 0).\nYou cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.\nYou cannot reach point (1, 1) until time 3.\nWhen the depth of water is 3, we can swim anywhere inside the grid.\n\n\nExample 2:\n\n\n<strong>Input:</strong> grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]\n<strong>Output:</strong> 16\n<strong>Explanation:</strong> The final route is shown.\nWe need to wait until time 16 so that (0, 0) and (4, 4) are connected.\n\n\n \nConstraints:\n\n\n\tn == grid.length\n\tn == grid[i].length\n\t1 <= n <= 50\n\t0 <= grid[i][j] < n2\n\tEach value grid[i][j] is unique.",
      "examples": [
        {
          "input": "[[0,2],[1,3]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function swimInRisingWater(input) {\n  // Your code here\n}",
        "python": "def swim_in_rising_water(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Swim in Rising Water",
          "explanation": "Swim in Rising Water is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": [
        "Use either Dijkstra's, or binary search for the best time T for which you can reach the end if you only step on squares at most T."
      ]
    },
    {
      "id": "alien-dictionary",
      "title": "Alien Dictionary",
      "difficulty": "Hard",
      "description": "Solve the Alien Dictionary problem.",
      "examples": [
        {
          "input": "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"z\",\"x\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"z\",\"x\",\"z\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function alienDictionary(input) {\n  // Your code here\n}",
        "python": "def alien_dictionary(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * BFS\n * https://leetcode.com/problems/alien-dictionary/\n * @param {string[]} words\n * @return {string}\n */\nvar alienOrder = function (words) {\n    const { graph, frequencyMap, queue, buffer } = buildGraph(words);\n\n    if (!canBuildGraph(words, graph, frequencyMap)) return '';\n\n    queueSources(queue, frequencyMap);\n    bfs(queue, frequencyMap, graph, buffer);\n\n    return frequencyMap.size <= buffer.length ? buffer.join('') : '';\n};\n\nvar initGraph = () => ({\n    graph: new Map(),\n    frequencyMap: new Map(),\n    queue: new Queue(),\n    buffer: [],\n});\n\nvar buildGraph = (words) => {\n    const { graph, frequencyMap, queue, buffer } = initGraph();\n\n    for (const word of words) {\n        for (const char of word) {\n            frequencyMap.set(char, 0);\n            graph.set(char, []);\n        }\n    }\n\n    return { graph, frequencyMap, queue, buffer };\n};\n\nvar canBuildGraph = (words, graph, frequencyMap) => {\n    for (let index = 0; index < words.length - 1; index++) {\n        const [word1, word2] = [words[index], words[index + 1]];\n        const minLength = Math.min(word1.length, word2.length);\n\n        const isWord1Longer = word2.length < word1.length;\n        const isPrefix = isWord1Longer && word1.startsWith(word2);\n\n        if (isPrefix) return false;\n\n        for (let j = 0; j < minLength; j++) {\n            const [char1, char2] = [word1[j], word2[j]];\n\n            const isEqual = char1 === char2;\n            if (isEqual) continue;\n\n            graph.get(char1).push(char2);\n            frequencyMap.set(char2, frequencyMap.get(char2) + 1);\n\n            break;\n        }\n    }\n\n    return true;\n};\n\nconst bfs = (queue, frequencyMap, graph, buffer) => {\n    while (!queue.isEmpty()) {\n        for (let level = queue.size() - 1; 0 <= level; level--) {\n            checkNeighbors(queue, frequencyMap, graph, buffer);\n        }\n    }\n};\n\nvar checkNeighbors = (queue, frequencyMap, graph, buffer) => {\n    const char = queue.dequeue();\n\n    buffer.push(char);\n\n    for (const next of graph.get(char)) {\n        const value = frequencyMap.get(next) - 1;\n\n        frequencyMap.set(next, value);\n\n        const isEmpty = frequencyMap.get(next) === 0;\n        if (!isEmpty) continue;\n\n        queue.enqueue(next);\n    }\n};\n\nconst queueSources = (queue, frequencyMap) => {\n    for (const [key, value] of frequencyMap) {\n        const isEmpty = frequencyMap.get(key) === 0;\n        if (!isEmpty) continue;\n\n        queue.enqueue(key);\n    }\n};\n\n/**\n * DFS\n * https://leetcode.com/problems/alien-dictionary/\n * @param {string[]} words\n * @return {string}\n */\nvar alienOrder = function (words) {\n    const { graph, seen, buffer } = buildGraph(words);\n\n    if (!canBuildGraph(words, graph)) return '';\n\n    for (const [char] of graph) {\n        if (!dfs(char, graph, seen, buffer)) return '';\n    }\n\n    return buffer.reverse().join('');\n};\n\nvar initGraph = () => ({\n    graph: new Map(),\n    seen: new Map(),\n    buffer: [],\n});\n\nvar buildGraph = (words) => {\n    const { graph, seen, buffer } = initGraph();\n\n    for (const word of words) {\n        for (const char of word) {\n            graph.set(char, []);\n        }\n    }\n\n    return { graph, seen, buffer };\n};\n\nvar canBuildGraph = (words, graph) => {\n    for (let index = 0; index < words.length - 1; index++) {\n        const [word1, word2] = [words[index], words[index + 1]];\n        const minLength = Math.min(word1.length, word2.length);\n\n        const isWord1Longer = word2.length < word1.length;\n        const isPrefix = isWord1Longer && word1.startsWith(word2);\n\n        if (isPrefix) return false;\n\n        for (let j = 0; j < minLength; j++) {\n            const [char1, char2] = [word1[j], word2[j]];\n\n            const isEqual = char1 === char2;\n            if (isEqual) continue;\n\n            graph.get(char1).push(char2);\n\n            break;\n        }\n    }\n\n    return true;\n};\n\nconst dfs = (char, graph, seen, buffer) => {\n    if (seen.has(char)) return seen.get(char);\n\n    if (!backTrack(char, graph, seen, buffer)) return false;\n\n    buffer.push(char);\n\n    return true;\n};\n\nconst backTrack = (char, graph, seen, buffer) => {\n    seen.set(char, false);\n    for (const neighbor of graph.get(char)) {\n        if (!dfs(neighbor, graph, seen, buffer)) return false;\n    }\n    seen.set(char, true);\n\n    return true;\n};\n",
        "python": "class Solution:\n    def alienOrder(self, words: List[str]) -> str:\n        adj = {char: set() for word in words for char in word}\n\n        for i in range(len(words) - 1):\n            w1, w2 = words[i], words[i + 1]\n            minLen = min(len(w1), len(w2))\n            if len(w1) > len(w2) and w1[:minLen] == w2[:minLen]:\n                return \"\"\n            for j in range(minLen):\n                if w1[j] != w2[j]:\n                    print(w1[j], w2[j])\n                    adj[w1[j]].add(w2[j])\n                    break\n\n        visited = {}  # {char: bool} False visited, True current path\n        res = []\n\n        def dfs(char):\n            if char in visited:\n                return visited[char]\n\n            visited[char] = True\n\n            for neighChar in adj[char]:\n                if dfs(neighChar):\n                    return True\n\n            visited[char] = False\n            res.append(char)\n\n        for char in adj:\n            if dfs(char):\n                return \"\"\n\n        res.reverse()\n        return \"\".join(res)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Alien Dictionary",
          "explanation": "Alien Dictionary is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": []
    },
    {
      "id": "cheapest-flights-within-k-stops",
      "title": "Cheapest Flights Within K Stops",
      "difficulty": "Medium",
      "description": "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.\n\nYou are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.\n\n \nExample 1:\n\n\n<strong>Input:</strong> n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1\n<strong>Output:</strong> 700\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.\nNote that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.\n\n\nExample 2:\n\n\n<strong>Input:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1\n<strong>Output:</strong> 200\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.\n\n\nExample 3:\n\n\n<strong>Input:</strong> n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0\n<strong>Output:</strong> 500\n<strong>Explanation:</strong>\nThe graph is shown above.\nThe optimal path with no stops from city 0 to 2 is marked in red and has cost 500.\n\n\n \nConstraints:\n\n\n\t2 <= n <= 100\n\t0 <= flights.length <= (n * (n - 1) / 2)\n\tflights[i].length == 3\n\t0 <= fromi, toi < n\n\tfromi != toi\n\t1 <= pric...",
      "examples": [
        {
          "input": "4",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "0",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function cheapestFlightsWithinKStops(input) {\n  // Your code here\n}",
        "python": "def cheapest_flights_within_k_stops(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Cheapest Flights Within K Stops",
          "explanation": "Cheapest Flights Within K Stops is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Advanced Graphs"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Dijkstra doesn't work with:",
      "options": [
        "Unweighted graphs",
        "Positive weights",
        "Negative weights",
        "Directed graphs"
      ],
      "correct": 2,
      "explanation": "Dijkstra's greedy assumption breaks with negative edges — use Bellman-Ford instead."
    }
  ],
  "cheatSheet": "# Dijkstra\n```python\nheap=[(0,src)]; dist=defaultdict(lambda:inf); dist[src]=0\nwhile heap:\n    d,u=heappop(heap)\n    if d>dist[u]: continue\n    for v,w in graph[u]:\n        if dist[u]+w<dist[v]: dist[v]=dist[u]+w; heappush(heap,(dist[v],v))\n```",
  "proTips": [
    "Dijkstra for non-negative, Bellman-Ford for negatives",
    "Detect negative cycles: still relaxing on Vth pass"
  ],
  "faangQuotes": [
    "\"Dijkstra tests heap mastery AND graph modeling.\" — Meta"
  ],
  "visualizationType": "graph",
  "usage": "Used to find the shortest path between nodes in a graph, with or without weighted edges.",
  "dsInvolved": "Graph, Priority Queue, Heap",
  "sampleProblems": [
    "Network Delay Time",
    "Cheapest Flights Within K Stops",
    "Path With Minimum Effort"
  ]
};
