import { Topic } from "./types";

export const topic16: Topic = {
  "id": "topic16",
  "slug": "trie",
  "title": "Trie / Prefix Tree",
  "emoji": "🌐",
  "color": "#22d3ee",
  "gradient": "from-cyan-400 to-ocean-400",
  "layman": "A Trie is like phone auto-complete. Each node is a letter, and paths from root spell out words. Searching \"app\" checks root→a→p→p in 3 steps regardless of how many words are stored.",
  "technical": "Trie: n-ary tree where root-to-node path = prefix. Insert/search/startsWith: O(m) where m=word length.",
  "keyInsights": [
    "TrieNode: children dict + isEndOfWord",
    "Search vs startsWith: search needs isEnd=true",
    "Word Search II: Trie + DFS on grid"
  ],
  "timeComplexities": [
    {
      "operation": "Insert/Search",
      "best": "O(1)",
      "avg": "O(m)",
      "worst": "O(m)",
      "space": "O(m)"
    }
  ],
  "questions": [
    {
      "id": "implement-trie",
      "title": "Implement Trie (Prefix Tree)",
      "difficulty": "Medium",
      "description": "Implement a Trie with insert, search, and startsWith.",
      "examples": [
        {
          "input": "insert(\"apple\"), search(\"apple\")",
          "output": "true"
        }
      ],
      "constraints": [
        "1≤word.length≤2000",
        "lowercase letters only"
      ],
      "starterCode": {
        "js": "class TrieNode{\n  constructor(){this.children={};this.isEnd=false;}\n}\nclass Trie{\n  constructor(){this.root=new TrieNode();}\n  insert(word){}\n  search(word){}\n  startsWith(prefix){}\n}",
        "python": "class TrieNode:\n    def __init__(self): self.children={}; self.is_end=False\nclass Trie:\n    def __init__(self): self.root=TrieNode()\n    def insert(self,w): pass\n    def search(self,w): pass\n    def starts_with(self,p): pass"
      },
      "solution": {
        "js": "class TrieNode{constructor(){this.children={};this.isEnd=false;}}\nclass Trie{\n  constructor(){this.root=new TrieNode();}\n  insert(w){let n=this.root;for(const c of w){if(!n.children[c])n.children[c]=new TrieNode();n=n.children[c];}n.isEnd=true;}\n  _find(s){let n=this.root;for(const c of s){if(!n.children[c])return null;n=n.children[c];}return n;}\n  search(w){const n=this._find(w);return n!==null&&n.isEnd;}\n  startsWith(p){return this._find(p)!==null;}\n}",
        "python": "class TrieNode:\n    def __init__(self): self.children={}; self.is_end=False\nclass Trie:\n    def __init__(self): self.root=TrieNode()\n    def insert(self,w):\n        n=self.root\n        for c in w:\n            if c not in n.children: n.children[c]=TrieNode()\n            n=n.children[c]\n        n.is_end=True\n    def _find(self,s):\n        n=self.root\n        for c in s:\n            if c not in n.children: return None\n            n=n.children[c]\n        return n\n    def search(self,w): n=self._find(w); return n is not None and n.is_end\n    def starts_with(self,p): return self._find(p) is not None"
      },
      "testCases": [
        {
          "input": "insert(\"apple\"), search(\"apple\")",
          "expected": "true"
        },
        {
          "input": "search(\"app\")",
          "expected": "false"
        }
      ],
      "timeComplexity": "O(m) per op",
      "spaceComplexity": "O(n×m)",
      "hints": [
        "Each node stores children dict and isEnd flag."
      ],
      "tags": [
        "trie",
        "design"
      ],
      "walkthrough": [
        {
          "title": "Trie structure: letters as nodes",
          "explanation": "Each character in a word is a node. Paths from root to isEnd=true nodes spell complete words. Paths to non-end nodes are prefixes.",
          "phase": "init",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "root",
                "label": "",
                "x": 250,
                "y": 20
              },
              {
                "id": "a",
                "label": "a",
                "x": 150,
                "y": 80
              },
              {
                "id": "b",
                "label": "b",
                "x": 350,
                "y": 80
              },
              {
                "id": "ap",
                "label": "p",
                "x": 100,
                "y": 150
              },
              {
                "id": "bp",
                "label": "a",
                "x": 350,
                "y": 150
              },
              {
                "id": "app",
                "label": "p",
                "x": 100,
                "y": 220
              },
              {
                "id": "bpa",
                "label": "t",
                "x": 350,
                "y": 220
              },
              {
                "id": "appl",
                "label": "l",
                "x": 100,
                "y": 290
              },
              {
                "id": "apple",
                "label": "e*",
                "x": 100,
                "y": 360
              }
            ],
            "treeEdges": [
              [
                "root",
                "a"
              ],
              [
                "root",
                "b"
              ],
              [
                "a",
                "ap"
              ],
              [
                "b",
                "bp"
              ],
              [
                "ap",
                "app"
              ],
              [
                "bp",
                "bpa"
              ],
              [
                "app",
                "appl"
              ],
              [
                "appl",
                "apple"
              ]
            ],
            "treeHighlighted": [
              "apple"
            ]
          }
        },
        {
          "title": "Insert \"apple\"",
          "explanation": "Traverse root→a→p→p→l→e. Create nodes that don't exist. Mark final node isEnd=true (★).",
          "phase": "update",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "root",
                "label": "",
                "x": 250,
                "y": 20
              },
              {
                "id": "a",
                "label": "a",
                "x": 150,
                "y": 80,
                "state": "active"
              },
              {
                "id": "ap",
                "label": "p",
                "x": 100,
                "y": 150,
                "state": "active"
              },
              {
                "id": "app",
                "label": "p",
                "x": 100,
                "y": 220,
                "state": "active"
              },
              {
                "id": "appl",
                "label": "l",
                "x": 100,
                "y": 290,
                "state": "active"
              },
              {
                "id": "apple",
                "label": "e★",
                "x": 100,
                "y": 360,
                "state": "found"
              }
            ],
            "treeEdges": [
              [
                "root",
                "a"
              ],
              [
                "a",
                "ap"
              ],
              [
                "ap",
                "app"
              ],
              [
                "app",
                "appl"
              ],
              [
                "appl",
                "apple"
              ]
            ]
          }
        },
        {
          "title": "search(\"apple\") → true",
          "explanation": "Traverse a→p→p→l→e. Reach node \"e\". isEnd=true → return true.",
          "phase": "found",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "root",
                "label": "",
                "x": 250,
                "y": 20
              },
              {
                "id": "a",
                "label": "a",
                "x": 150,
                "y": 80,
                "state": "found"
              },
              {
                "id": "ap",
                "label": "p",
                "x": 100,
                "y": 150,
                "state": "found"
              },
              {
                "id": "app",
                "label": "p",
                "x": 100,
                "y": 220,
                "state": "found"
              },
              {
                "id": "appl",
                "label": "l",
                "x": 100,
                "y": 290,
                "state": "found"
              },
              {
                "id": "apple",
                "label": "e★",
                "x": 100,
                "y": 360,
                "state": "result"
              }
            ],
            "treeEdges": [
              [
                "root",
                "a"
              ],
              [
                "a",
                "ap"
              ],
              [
                "ap",
                "app"
              ],
              [
                "app",
                "appl"
              ],
              [
                "appl",
                "apple"
              ]
            ]
          },
          "variables": {
            "isEnd": "true",
            "result": "true"
          }
        },
        {
          "title": "search(\"app\") → false, startsWith(\"app\") → true",
          "explanation": "a→p→p: node exists but isEnd=false → search returns false. startsWith just checks node exists → returns true.",
          "phase": "done",
          "visual": {
            "type": "tree",
            "treeNodes": [
              {
                "id": "root",
                "label": "",
                "x": 250,
                "y": 20
              },
              {
                "id": "a",
                "label": "a",
                "x": 150,
                "y": 80,
                "state": "found"
              },
              {
                "id": "ap",
                "label": "p",
                "x": 100,
                "y": 150,
                "state": "found"
              },
              {
                "id": "app",
                "label": "p",
                "x": 100,
                "y": 220,
                "state": "comparing"
              },
              {
                "id": "appl",
                "label": "l",
                "x": 100,
                "y": 290
              },
              {
                "id": "apple",
                "label": "e★",
                "x": 100,
                "y": 360
              }
            ],
            "treeEdges": [
              [
                "root",
                "a"
              ],
              [
                "a",
                "ap"
              ],
              [
                "ap",
                "app"
              ],
              [
                "app",
                "appl"
              ],
              [
                "appl",
                "apple"
              ]
            ]
          },
          "variables": {
            "search(\"app\")": "false (isEnd=false)",
            "startsWith(\"app\")": "true (node exists)"
          },
          "complexity": "O(m) per operation — traverse exactly m character nodes."
        }
      ]
    },
    {
      "id": "implement-trie-prefix-tree",
      "title": "Implement Trie (Prefix Tree)",
      "difficulty": "Medium",
      "description": "A trie (pronounced as \"try\") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.\n\nImplement the Trie class:\n\n\n\tTrie() Initializes the trie object.\n\tvoid insert(String word) Inserts the string word into the trie.\n\tboolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.\n\tboolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.\n\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"Trie\", \"insert\", \"search\", \"search\", \"startsWith\", \"insert\", \"search\"]\n[[], [\"apple\"], [\"apple\"], [\"app\"], [\"app\"], [\"app\"], [\"app\"]]\n<strong>Output</strong>\n[null, null, true, false, true, null, true]\n\n<strong>Explanation</strong>\nTrie trie = new Trie();\ntrie.insert(\"apple\");\ntrie.search(\"apple\");   // return True\ntrie.search(\"app\");     // return False\ntrie.startsWith(\"app\"); // return True\ntrie.insert(\"app\");\ntrie.search(\"app\");     // return True\n\n\n \nConstraints:\n\n\n\t1 <= word.length, prefix.length <= 2000\n\tword and prefix consist only of lowercase English letters.\n\tAt most 3 * 104 calls in total will be made to insert, search, and startsWith.",
      "examples": [
        {
          "input": "[\"Trie\",\"insert\",\"search\",\"search\",\"startsWith\",\"insert\",\"search\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[\"apple\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"],[\"app\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function implementTriePrefixTree(input) {\n  // Your code here\n}",
        "python": "def implement_trie_prefix_tree(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Your Trie object will be instantiated and called as such:\n * var obj = new Trie()\n * obj.insert(word)\n * var param_2 = obj.search(word)\n * var param_3 = obj.startsWith(prefix)\n */\n\nclass TrieNode {\n    constructor() {\n        this.children = {};\n        this.isWord = false;\n    }\n}\n\nclass Trie {\n    constructor() {\n        this.root = new TrieNode();\n    }\n\n    /* Time O(N) | Space O(N) */\n    insert(word, node = this.root) {\n        for (const char of word) {\n            const child = node.children[char] || new TrieNode();\n\n            node.children[char] = child;\n\n            node = child;\n        }\n\n        node.isWord = true;\n    }\n\n    /* Time O(N) | Space O(1) */\n    search(word, node = this.root) {\n        for (const char of word) {\n            const child = node.children[char] || null;\n\n            if (!child) return false;\n\n            node = child;\n        }\n\n        return node.isWord;\n    }\n\n    /* Time O(N) | Space O(1) */\n    startsWith(prefix, node = this.root) {\n        for (const char of prefix) {\n            const child = node.children[char] || null;\n\n            if (!child) return false;\n\n            node = child;\n        }\n\n        return true;\n    }\n}\n",
        "python": "class TrieNode:\n    def __init__(self):\n        self.children = [None] * 26\n        self.end = False\n\n\nclass Trie:\n    def __init__(self):\n        \"\"\"\n        Initialize your data structure here.\n        \"\"\"\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        \"\"\"\n        Inserts a word into the trie.\n        \"\"\"\n        curr = self.root\n        for c in word:\n            i = ord(c) - ord(\"a\")\n            if curr.children[i] is None:\n                curr.children[i] = TrieNode()\n            curr = curr.children[i]\n        curr.end = True\n\n    def search(self, word: str) -> bool:\n        \"\"\"\n        Returns if the word is in the trie.\n        \"\"\"\n        curr = self.root\n        for c in word:\n            i = ord(c) - ord(\"a\")\n            if curr.children[i] is None:\n                return False\n            curr = curr.children[i]\n        return curr.end\n\n    def startsWith(self, prefix: str) -> bool:\n        \"\"\"\n        Returns if there is any word in the trie that starts with the given prefix.\n        \"\"\"\n        curr = self.root\n        for c in prefix:\n            i = ord(c) - ord(\"a\")\n            if curr.children[i] is None:\n                return False\n            curr = curr.children[i]\n        return True\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Implement Trie (Prefix Tree)",
          "explanation": "Implement Trie (Prefix Tree) is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Tries"
      ],
      "hints": []
    },
    {
      "id": "design-add-and-search-words-data-structure",
      "title": "Design Add and Search Words Data Structure",
      "difficulty": "Medium",
      "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\nImplement the WordDictionary class:\n\n\n\tWordDictionary() Initializes the object.\n\tvoid addWord(word) Adds word to the data structure, it can be matched later.\n\tbool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.\n\n\n \nExample:\n\n\n<strong>Input</strong>\n[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]\n[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]\n<strong>Output</strong>\n[null,null,null,null,false,true,true,true]\n\n<strong>Explanation</strong>\nWordDictionary wordDictionary = new WordDictionary();\nwordDictionary.addWord(\"bad\");\nwordDictionary.addWord(\"dad\");\nwordDictionary.addWord(\"mad\");\nwordDictionary.search(\"pad\"); // return False\nwordDictionary.search(\"bad\"); // return True\nwordDictionary.search(\".ad\"); // return True\nwordDictionary.search(\"b..\"); // return True\n\n\n \nConstraints:\n\n\n\t1 <= word.length <= 25\n\tword in addWord consists of lowercase English letters.\n\tword in search consist of '.' or lowercase English letters.\n\tThere will be at most 2 dots in word for search queries.\n\tAt most 104 calls will be made to addWord and search.",
      "examples": [
        {
          "input": "[\"WordDictionary\",\"addWord\",\"addWord\",\"addWord\",\"search\",\"search\",\"search\",\"search\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[\"bad\"],[\"dad\"],[\"mad\"],[\"pad\"],[\"bad\"],[\".ad\"],[\"b..\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function designAddAndSearchWordsDataStructure(input) {\n  // Your code here\n}",
        "python": "def design_add_and_search_words_data_structure(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Your WordDictionary object will be instantiated and called as such:\n * var obj = new WordDictionary()\n * obj.addWord(word)\n * var param_2 = obj.search(word)\n */\n\nclass TrieNode {\n    constructor() {\n        this.children = {};\n        this.isWord = false;\n    }\n}\n\nclass WordDictionary {\n    constructor() {\n        this.root = new TrieNode();\n    }\n\n    /* Time O(N) | Space O(N) */\n    addWord(word, node = this.root) {\n        for (const char of word) {\n            const child = node.children[char] || new TrieNode();\n\n            node.children[char] = child;\n\n            node = child;\n        }\n\n        node.isWord = true;\n    }\n\n    /* Time O(N) | Space O(N) */\n    search(word) {\n        return this.dfs(word, this.root, 0);\n    }\n\n    dfs(word, node, level) {\n        if (!node) return false;\n\n        const isWord = level === word.length;\n        if (isWord) return node.isWord;\n\n        const isWildCard = word[level] === '.';\n        if (isWildCard) return this.hasWildCard(word, node, level);\n\n        return this.dfs(word, node.children[word[level]], level + 1);\n    }\n\n    hasWildCard(word, node, level) {\n        for (const char of Object.keys(node.children)) {\n            const child = node.children[char];\n\n            const hasWord = this.dfs(word, child, level + 1);\n            if (hasWord) return true;\n        }\n\n        return false;\n    }\n}\n",
        "python": "class TrieNode:\n    def __init__(self):\n        self.children = {}  # a : TrieNode\n        self.word = False\n\n\nclass WordDictionary:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def addWord(self, word: str) -> None:\n        cur = self.root\n        for c in word:\n            if c not in cur.children:\n                cur.children[c] = TrieNode()\n            cur = cur.children[c]\n        cur.word = True\n\n    def search(self, word: str) -> bool:\n        def dfs(j, root):\n            cur = root\n\n            for i in range(j, len(word)):\n                c = word[i]\n                if c == \".\":\n                    for child in cur.children.values():\n                        if dfs(i + 1, child):\n                            return True\n                    return False\n                else:\n                    if c not in cur.children:\n                        return False\n                    cur = cur.children[c]\n            return cur.word\n\n        return dfs(0, self.root)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Design Add and Search Words Data Structure",
          "explanation": "Design Add and Search Words Data Structure is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Tries"
      ],
      "hints": [
        "You should be familiar with how a Trie works. If not, please work on this problem: <a href=\"https://leetcode.com/problems/implement-trie-prefix-tree/\">Implement Trie (Prefix Tree)</a> first."
      ]
    },
    {
      "id": "word-search-ii",
      "title": "Word Search II",
      "difficulty": "Hard",
      "description": "Given an m x n board of characters and a list of strings words, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.\n\n \nExample 1:\n\n\n<strong>Input:</strong> board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]\n<strong>Output:</strong> [\"eat\",\"oath\"]\n\n\nExample 2:\n\n\n<strong>Input:</strong> board = [[\"a\",\"b\"],[\"c\",\"d\"]], words = [\"abcb\"]\n<strong>Output:</strong> []\n\n\n \nConstraints:\n\n\n\tm == board.length\n\tn == board[i].length\n\t1 <= m, n <= 12\n\tboard[i][j] is a lowercase English letter.\n\t1 <= words.length <= 3 * 104\n\t1 <= words[i].length <= 10\n\twords[i] consists of lowercase English letters.\n\tAll the strings of words are unique.",
      "examples": [
        {
          "input": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"oath\",\"pea\",\"eat\",\"rain\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[\"a\",\"b\"],[\"c\",\"d\"]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function wordSearchIi(input) {\n  // Your code here\n}",
        "python": "def word_search_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {character[][]} board\n * @param {string[]} words\n * Time O((ROWS * COLS) * (4 * (3 ^ (WORDS - 1)))) | Space O(N)\n * @return {string[]}\n */\nvar findWords = function (board, words) {\n    return new Trie(words).searchBoard(board);\n};\n\nclass TrieNode {\n    constructor() {\n        this.children = {};\n        this.word = '';\n    }\n}\n\nclass Trie {\n    constructor(words) {\n        this.root = new TrieNode();\n        words.forEach((word) => this.insert(word));\n    }\n\n    /* Time O(N) | Space O(N) */\n    insert(word, node = this.root) {\n        for (const char of word) {\n            const child = node.children[char] || new TrieNode();\n\n            node.children[char] = child;\n\n            node = child;\n        }\n\n        node.word = word;\n    }\n\n    /* Time O((ROWS * COLS) * (4 * (3 ^ (WORDS - 1)))) | Space O(N) */\n    searchBoard(board, node = this.root, words = []) {\n        const [rows, cols] = [board.length, board[0].length];\n\n        for (let row = 0; row < rows; row++) {\n            for (let col = 0; col < cols; col++) {\n                this.dfs(board, row, rows, col, cols, node, words);\n            }\n        }\n\n        return words;\n    }\n\n    dfs(board, row, rows, col, cols, node, words) {\n        const char = board[row][col];\n        const child = node.children[char] || null;\n\n        if (this.canSkip(char, child)) return;\n\n        node = child;\n        this.checkWord(node, words);\n        this.backTrack(board, row, rows, col, cols, node, words);\n    }\n\n    canSkip(char, child) {\n        const hasSeen = char === '#';\n        const isMissingChild = !child;\n\n        return hasSeen || isMissingChild;\n    }\n\n    checkWord(node, words) {\n        if (!node.word.length) return;\n\n        words.push(node.word);\n        node.word = '';\n    }\n\n    backTrack(board, row, rows, col, cols, node, words) {\n        const char = board[row][col];\n\n        board[row][col] = '#';\n\n        for (const [_row, _col] of this.getNeighbors(row, rows, col, cols)) {\n            this.dfs(board, _row, rows, _col, cols, node, words);\n        }\n\n        board[row][col] = char;\n    }\n\n    getNeighbors(row, rows, col, cols) {\n        return [\n            [row - 1, col],\n            [row + 1, col],\n            [row, col - 1],\n            [row, col + 1],\n        ].filter(([_row, _col]) => !this.isOutOfBounds(_row, rows, _col, cols));\n    }\n\n    isOutOfBounds(row, rows, col, cols) {\n        const isRowOut = row < 0 || rows <= row;\n        const isColOut = col < 0 || cols <= col;\n\n        return isRowOut || isColOut;\n    }\n}\n",
        "python": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.isWord = False\n        self.refs = 0\n\n    def addWord(self, word):\n        cur = self\n        cur.refs += 1\n        for c in word:\n            if c not in cur.children:\n                cur.children[c] = TrieNode()\n            cur = cur.children[c]\n            cur.refs += 1\n        cur.isWord = True\n\n    def removeWord(self, word):\n        cur = self\n        cur.refs -= 1\n        for c in word:\n            if c in cur.children:\n                cur = cur.children[c]\n                cur.refs -= 1\n\n\nclass Solution:\n    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:\n        root = TrieNode()\n        for w in words:\n            root.addWord(w)\n\n        ROWS, COLS = len(board), len(board[0])\n        res, visit = set(), set()\n\n        def dfs(r, c, node, word):\n            if (\n                r not in range(ROWS) \n                or c not in range(COLS)\n                or board[r][c] not in node.children\n                or node.children[board[r][c]].refs < 1\n                or (r, c) in visit\n            ):\n                return\n\n            visit.add((r, c))\n            node = node.children[board[r][c]]\n            word += board[r][c]\n            if node.isWord:\n                node.isWord = False\n                res.add(word)\n                root.removeWord(word)\n\n            dfs(r + 1, c, node, word)\n            dfs(r - 1, c, node, word)\n            dfs(r, c + 1, node, word)\n            dfs(r, c - 1, node, word)\n            visit.remove((r, c))\n\n        for r in range(ROWS):\n            for c in range(COLS):\n                dfs(r, c, root, \"\")\n\n        return list(res)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Word Search II",
          "explanation": "Word Search II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O((ROWS * COLS)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Tries"
      ],
      "hints": [
        "You would need to optimize your backtracking to pass the larger test. Could you stop backtracking earlier?",
        "If the current candidate does not exist in all words&#39; prefix, you could stop backtracking immediately. What kind of data structure could answer such query efficiently? Does a hash table work? Why or why not? How about a Trie? If you would like to learn how to implement a basic trie, please work on this problem: <a href=\"https://leetcode.com/problems/implement-trie-prefix-tree/\">Implement Trie (Prefix Tree)</a> first."
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Trie search for word of length m:",
      "options": [
        "O(n)",
        "O(m)",
        "O(log n)",
        "O(1)"
      ],
      "correct": 1,
      "explanation": "O(m) — independent of total words stored. That's the Trie advantage."
    }
  ],
  "cheatSheet": "# Trie\n```js\nclass TrieNode{constructor(){this.children={};this.isEnd=false;}}\nclass Trie{\n  insert(w){let n=this.root;for(const c of w){if(!n.children[c])n.children[c]=new TrieNode();n=n.children[c];}n.isEnd=true;}\n  search(w){const n=this._find(w);return n&&n.isEnd;}\n}\n```",
  "proTips": [
    "Use Trie for multi-word search (Word Search II)",
    "isEnd distinguishes prefixes from complete words"
  ],
  "faangQuotes": [
    "\"Word Search II combining Trie+DFS is our staff-level problem.\" — Google"
  ],
  "visualizationType": "trie",
  "usage": "Used for fast retrieval of strings and prefixes, making it ideal for autocomplete or dictionary searches.",
  "dsInvolved": "Trie Node, Hash Map, String",
  "sampleProblems": [
    "Implement Trie (Prefix Tree)",
    "Design Add and Search Words Data Structure",
    "Word Search II"
  ]
};
