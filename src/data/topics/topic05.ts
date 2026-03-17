import { Topic } from "./types";

export const topic05: Topic = {
  "id": "topic05",
  "slug": "stacks-queues",
  "title": "Stacks & Queues",
  "emoji": "📚",
  "color": "#f43f5e",
  "gradient": "from-rose-500 to-rose-400",
  "layman": "A stack is like a stack of plates — add and remove from the top only (LIFO). A queue is like a coffee shop line — first in, first out (FIFO).",
  "technical": "Stacks enable O(1) push/pop with LIFO ordering, perfect for nested structures. Monotonic stacks maintain increasing/decreasing invariants for Next Greater Element problems.",
  "keyInsights": [
    "Monotonic stack: pop elements violating monotonic property",
    "Stack for parentheses: push open, pop/check on close",
    "Deque for O(1) front and back operations"
  ],
  "timeComplexities": [
    {
      "operation": "Stack push/pop",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(1)",
      "space": "O(n)"
    },
    {
      "operation": "Monotonic Stack (total)",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(n)"
    }
  ],
  "questions": [
    {
      "id": "valid-parentheses",
      "title": "Valid Parentheses",
      "difficulty": "Easy",
      "description": "Given a string s with '(', ')', '{', '}', '[', ']', determine if it is valid.",
      "examples": [
        {
          "input": "s = \"()[]{}\"",
          "output": "true"
        },
        {
          "input": "s = \"(]\"",
          "output": "false"
        }
      ],
      "constraints": [
        "1 ≤ s.length ≤ 10⁴"
      ],
      "starterCode": {
        "js": "function isValid(s) {\n  const stack=[];\n  const map={')':'(', '}':'{', ']':'['};\n}",
        "python": "def is_valid(s):\n    stack=[]\n    pairs={')':'(', '}':'{', ']':'['}"
      },
      "solution": {
        "js": "function isValid(s){\n  const stack=[];\n  const map={')':'(','}':'{',']':'['};\n  for(const c of s){\n    if('([{'.includes(c))stack.push(c);\n    else if(stack.pop()!==map[c])return false;\n  }\n  return stack.length===0;\n}",
        "python": "def is_valid(s):\n    stack=[]; pairs={')':'(', '}':'{', ']':'['}\n    for c in s:\n        if c in '([{': stack.append(c)\n        elif not stack or stack.pop()!=pairs[c]: return False\n    return len(stack)==0"
      },
      "testCases": [
        {
          "input": "\"()[]{}\"",
          "expected": "true"
        },
        {
          "input": "\"(]\"",
          "expected": "false"
        },
        {
          "input": "\"([)]\"",
          "expected": "false",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(n)",
      "hints": [
        "Push open brackets. On close bracket, top of stack must match."
      ],
      "tags": [
        "stack",
        "string"
      ],
      "walkthrough": [
        {
          "title": "Process \"(\" — push",
          "explanation": "Open bracket → push onto stack. Stack: [\"(\"].",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              "(",
              ")",
              "{",
              "}",
              "[",
              "]"
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
              "active",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "0": "i"
            }
          },
          "variables": {
            "stack": "[\"(\"]"
          }
        },
        {
          "title": "Process \")\" — pop and check",
          "explanation": "Close bracket \")\". Pop stack top = \"(\". Does \"(\" match map[\")\"]=\"(\"? YES. Stack empty.",
          "phase": "compare",
          "visual": {
            "type": "array",
            "array": [
              "(",
              ")",
              "{",
              "}",
              "[",
              "]"
            ],
            "states": [
              "found",
              "found",
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
            "stack": "[]",
            "match": "✓"
          }
        },
        {
          "title": "Process all brackets — empty stack = valid",
          "explanation": "After processing all 6 chars, stack is empty → return true. A non-empty stack means unclosed brackets.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              "(",
              ")",
              "{",
              "}",
              "[",
              "]"
            ],
            "states": [
              "found",
              "found",
              "found",
              "found",
              "found",
              "found"
            ]
          },
          "variables": {
            "stack": "[]",
            "result": "true"
          },
          "complexity": "O(n) time, O(n) space for stack."
        }
      ]
    },
    {
      "id": "min-stack",
      "title": "Min Stack",
      "difficulty": "Medium",
      "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n\n\n\tMinStack() initializes the stack object.\n\tvoid push(int val) pushes the element val onto the stack.\n\tvoid pop() removes the element on the top of the stack.\n\tint top() gets the top element of the stack.\n\tint getMin() retrieves the minimum element in the stack.\n\n\nYou must implement a solution with O(1) time complexity for each function.\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]\n\n<strong>Output</strong>\n[null,null,null,null,-3,null,0,-2]\n\n<strong>Explanation</strong>\nMinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2\n\n\n \nConstraints:\n\n\n\t-231 <= val <= 231 - 1\n\tMethods pop, top and getMin operations will always be called on non-empty stacks.\n\tAt most 3 * 104 calls will be made to push, pop, top, and getMin.",
      "examples": [
        {
          "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[-2],[0],[-3],[],[],[],[]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function minStack(input) {\n  // Your code here\n}",
        "python": "def min_stack(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/min-stack\n * Time O(1) | Space O(N)\n * Your MinStack object will be instantiated and called as such:\n * var obj = new MinStack()\n * obj.push(x)\n * obj.pop()\n * var param_3 = obj.top()\n * var param_4 = obj.getMin()\n */\nclass MinStack {\n    /**\n     * @constructor\n     */\n    constructor() {\n        this.stack = [];\n        this.minStack = [];\n    }\n\n    /**\n     * @param {number} val\n     * @return {void}\n     */\n    push(val, { minStack } = this) {\n        this.stack.push(val); /* Space O(N) */\n\n        const isMinEmpty = !minStack.length;\n        const hasNewMin = val <= this.top(minStack);\n        const canAddMin = isMinEmpty || hasNewMin;\n        if (canAddMin) minStack.push(val); /* Space O(N) */\n    }\n\n    /**\n     * @return {void}\n     */\n    pop({ stack, minStack } = this) {\n        const top = stack.pop(); /* Time O(1) */\n\n        const canPopMin = top === this.getMin();\n        if (canPopMin) minStack.pop(); /* Time O(1) */\n    }\n\n    /**\n     * @param {Array}\n     * @return {number}\n     */\n    top(stack = this.stack) {\n        return stack.length ? stack[stack.length - 1] /* Time O(1) */ : null;\n    }\n\n    /**\n     * @return {number}\n     */\n    getMin(minStack = this.minStack) {\n        return this.top(minStack); /* Time O(1) */\n    }\n}\n\n/**\n * https://leetcode.com/problems/min-stack\n * Time O(1) | Space O(1)\n * Your MinStack object will be instantiated and called as such:\n * var obj = new MinStack()\n * obj.push(x)\n * obj.pop()\n * var param_3 = obj.top()\n * var param_4 = obj.getMin()\n */\nclass MinStack {\n    constructor() {\n        this.head = null;\n    }\n\n    push(val) {\n        this.head = !this.head /* Space O(1) */\n            ? new Node(val, val, null)\n            : new Node(val, Math.min(val, this.head.min), this.head);\n    }\n\n    pop() {\n        this.head = this.head.next; /* Time O(1) */\n    }\n\n    top() {\n        return this.head.val; /* Time O(1) */\n    }\n\n    getMin() {\n        return this.head.min; /* Time O(1) */\n    }\n}\n\nclass Node {\n    constructor(val, min, next) {\n        this.val = val;\n        this.min = min;\n        this.next = next;\n    }\n}\n",
        "python": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.minStack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def getMin(self) -> int:\n        return self.minStack[-1]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Min Stack",
          "explanation": "Min Stack is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Stack"
      ],
      "hints": [
        "Consider each node in the stack having a minimum value. (Credits to @aakarshmadhavan)"
      ]
    },
    {
      "id": "evaluate-reverse-polish-notation",
      "title": "Evaluate Reverse Polish Notation",
      "difficulty": "Medium",
      "description": "You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nNote that:\n\n\n\tThe valid operators are '+', '-', '*', and '/'.\n\tEach operand may be an integer or another expression.\n\tThe division between two integers always truncates toward zero.\n\tThere will not be any division by zero.\n\tThe input represents a valid arithmetic expression in a reverse polish notation.\n\tThe answer and all the intermediate calculations can be represented in a 32-bit integer.\n\n\n \nExample 1:\n\n\n<strong>Input:</strong> tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> ((2 + 1) * 3) = 9\n\n\nExample 2:\n\n\n<strong>Input:</strong> tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> (4 + (13 / 5)) = 6\n\n\nExample 3:\n\n\n<strong>Input:</strong> tokens = [\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"]\n<strong>Output:</strong> 22\n<strong>Explanation:</strong> ((10 * (6 / ((9 + 3) * -11))) + 17) + 5\n= ((10 * (6 / (12 * -11))) + 17) + 5\n= ((10 * (6 / -132)) + 17) + 5\n= ((10 * 0) + 17) + 5\n= (0 + 17) + 5\n= 17 + 5\n= 22\n\n\n \nConstraints:\n\n\n\t1 <= tokens.length <= 104\n\ttokens[i] is either an operator: \"+\", \"-\", \"*\", or \"/\", or an integer in the range [-200, 200].",
      "examples": [
        {
          "input": "[\"2\",\"1\",\"+\",\"3\",\"*\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"4\",\"13\",\"5\",\"/\",\"+\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function evaluateReversePolishNotation(input) {\n  // Your code here\n}",
        "python": "def evaluate_reverse_polish_notation(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/evaluate-reverse-polish-notation\n * Time O(N^2) | Space(1)\n * @param {string[]} tokens\n * @return {number}\n */\nvar evalRPN = function (tokens, index = 0) {\n    while (1 < tokens.length) {\n        /* Time O(N) */\n        const isOperation = () => tokens[index] in OPERATORS;\n        while (!isOperation()) index++; /* Time O(N) */\n\n        const value = performOperation(tokens, index);\n\n        tokens[index] = value;\n        tokens.splice(index - 2, 2); /* Time O(N) */\n        index--;\n    }\n\n    return tokens[0];\n};\n\nvar OPERATORS = {\n    '+': (a, b) => a + b,\n    '-': (a, b) => a - b,\n    '*': (a, b) => a * b,\n    '/': (a, b) => Math.trunc(a / b),\n};\n\nvar performOperation = (tokens, index) => {\n    const [rightNum, leftNum] = [\n        Number(tokens[index - 1]),\n        Number(tokens[index - 2]),\n    ];\n    const operation = OPERATORS[tokens[index]];\n\n    return operation(leftNum, rightNum);\n};\n\n/**\n * https://leetcode.com/problems/evaluate-reverse-polish-notation\n * Time O(N) | Space(N)\n * @param {string[]} tokens\n * @return {number}\n */\nvar evalRPN = function (tokens, stack = []) {\n    for (const char of tokens) {\n        /* Time O(N) */\n        const isOperation = char in OPERATORS;\n        if (isOperation) {\n            const value = performOperation(char, stack);\n\n            stack.push(value); /* Space O(N) */\n\n            continue;\n        }\n\n        stack.push(Number(char)); /* Space O(N) */\n    }\n\n    return stack.pop();\n};\n\nvar OPERATORS = {\n    '+': (a, b) => a + b,\n    '-': (a, b) => a - b,\n    '*': (a, b) => a * b,\n    '/': (a, b) => Math.trunc(a / b),\n};\n\nvar performOperation = (char, stack) => {\n    const [rightNum, leftNum] = [stack.pop(), stack.pop()];\n    const operation = OPERATORS[char];\n\n    return operation(leftNum, rightNum);\n};\n",
        "python": "class Solution:\n    def evalRPN(self, tokens: List[str]) -> int:\n        stack = []\n        for c in tokens:\n            if c == \"+\":\n                stack.append(stack.pop() + stack.pop())\n            elif c == \"-\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(b - a)\n            elif c == \"*\":\n                stack.append(stack.pop() * stack.pop())\n            elif c == \"/\":\n                a, b = stack.pop(), stack.pop()\n                stack.append(int(float(b) / a))\n            else:\n                stack.append(int(c))\n        return stack[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Evaluate Reverse Polish Notation",
          "explanation": "Evaluate Reverse Polish Notation is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Stack"
      ],
      "hints": []
    },
    {
      "id": "generate-parentheses",
      "title": "Generate Parentheses",
      "difficulty": "Medium",
      "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n \nExample 1:\n<strong>Input:</strong> n = 3\n<strong>Output:</strong> [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\nExample 2:\n<strong>Input:</strong> n = 1\n<strong>Output:</strong> [\"()\"]\n\n \nConstraints:\n\n\n\t1 <= n <= 8",
      "examples": [
        {
          "input": "3",
          "output": "See problem description for expected output."
        },
        {
          "input": "1",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function generateParentheses(input) {\n  // Your code here\n}",
        "python": "def generate_parentheses(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * DFS\n * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))\n * Time O(2^N) | Space O(2^N)\n * https://leetcode.com/problems/generate-parentheses\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = (n) => dfs(n);\n\nconst dfs = (n, combos = [], open = 0, close = 0, path = []) => {\n    const isBaseCase = path.length === n * 2;\n    if (isBaseCase) {\n        combos.push(path.join('')); /* Space O(N + N) */\n\n        return combos;\n    }\n\n    const isOpen = open < n;\n    if (isOpen)\n        backTrackOpen(\n            n,\n            combos,\n            open,\n            close,\n            path,\n        ); /* Time O(2^N) | Space O(2^N) */\n\n    const isClose = close < open;\n    if (isClose)\n        backTrackClose(\n            n,\n            combos,\n            open,\n            close,\n            path,\n        ); /* Time O(2^N) | Space O(2^N) */\n\n    return combos;\n};\n\nconst backTrackOpen = (n, combos, open, close, path) => {\n    path.push('('); /* Space O(N) */\n    dfs(n, combos, open + 1, close, path); /* Time O(2^N) | Space O(2^N) */\n    path.pop();\n};\n\nconst backTrackClose = (n, combos, open, close, path) => {\n    path.push(')'); /* Space O(N) */\n    dfs(n, combos, open, close + 1, path); /* Time O(2^N) | Space O(2^N) */\n    path.pop();\n};\n\n/**\n * BFS\n * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))\n * Time O(2^N) | Space O(2^N)\n * https://leetcode.com/problems/generate-parentheses\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = (n) => bfs(n);\n\nconst bfs = (n, combos = []) => {\n    const queue = new Queue([['', 0, 0]]);\n\n    while (!queue.isEmpty()) {\n        /* Time O(2^N) */\n        const [str, open, close] = queue.dequeue();\n\n        const isBaseCase = open === n && close === n;\n        if (isBaseCase) {\n            combos.push(str); /* Space O(N) */\n\n            continue;\n        }\n\n        const isOpen = open < n;\n        if (isOpen)\n            queue.enqueue([`${str}(`, open + 1, close]); /* Space O(2^N) */\n\n        const isClose = close < open;\n        if (isClose)\n            queue.enqueue([`${str})`, open, close + 1]); /* Space O(2^N) */\n    }\n\n    return combos;\n};\n\n/**\n * DFS\n * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))\n * Time O(2^N) | Space O(2^N)\n * https://leetcode.com/problems/generate-parentheses\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = (n, combos = []) => {\n    const isBaseCase = n === 0;\n    if (isBaseCase) {\n        combos.push('');\n\n        return combos;\n    }\n\n    for (let c = 0; c < n; c++) {\n        for (const left of generateParenthesis(c)) {\n            for (const right of generateParenthesis(n - 1 - c)) {\n                combos.push(`(${left})${right}`);\n            }\n        }\n    }\n\n    return combos;\n};\n",
        "python": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        stack = []\n        res = []\n\n        def backtrack(openN, closedN):\n            if openN == closedN == n:\n                res.append(\"\".join(stack))\n                return\n\n            if openN < n:\n                stack.append(\"(\")\n                backtrack(openN + 1, closedN)\n                stack.pop()\n            if closedN < openN:\n                stack.append(\")\")\n                backtrack(openN, closedN + 1)\n                stack.pop()\n\n        backtrack(0, 0)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Generate Parentheses",
          "explanation": "Generate Parentheses is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(((4^N)",
      "spaceComplexity": "O(((4^N)",
      "tags": [
        "Stack"
      ],
      "hints": []
    },
    {
      "id": "daily-temperatures",
      "title": "Daily Temperatures",
      "difficulty": "Medium",
      "description": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.\n\n \nExample 1:\n<strong>Input:</strong> temperatures = [73,74,75,71,69,72,76,73]\n<strong>Output:</strong> [1,1,4,2,1,1,0,0]\nExample 2:\n<strong>Input:</strong> temperatures = [30,40,50,60]\n<strong>Output:</strong> [1,1,1,0]\nExample 3:\n<strong>Input:</strong> temperatures = [30,60,90]\n<strong>Output:</strong> [1,1,0]\n\n \nConstraints:\n\n\n\t1 <= temperatures.length <= 105\n\t30 <= temperatures[i] <= 100",
      "examples": [
        {
          "input": "[73,74,75,71,69,72,76,73]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[30,40,50,60]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[30,60,90]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function dailyTemperatures(input) {\n  // Your code here\n}",
        "python": "def daily_temperatures(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/daily-temperatures\n * Time O(N) | Space O(N) - result array will always count as extra space\n * @param {number[]} temperatures\n * @return {number[]}\n */\nvar dailyTemperatures = function (temp) {\n    let res = new Array(temp.length).fill(0);\n    let stack = [];\n\n    for (let i = 0; i < temp.length; i++) {\n        while (stack.length && temp[i] > temp[stack[stack.length - 1]]) {\n            let idx = stack.pop();\n            res[idx] = i - idx;\n        }\n        stack.push(i);\n    }\n    return res;\n};\n\n/**\n * https://leetcode.com/problems/daily-temperatures\n * Time O(N) | Space O(N)\n * @param {number[]} temperatures\n * @return {number[]}\n */\nvar dailyTemperatures = function (temperatures, stack = []) {\n    const days = Array(temperatures.length).fill(0);\n\n    for (let day = 0; day < temperatures.length; day++) {\n        /* Time O(N + N) */\n        while (canShrink(stack, temperatures, day)) {\n            /* Time O(N + N) */\n            const prevColdDay = stack.pop();\n            const daysToWait = day - prevColdDay;\n\n            days[prevColdDay] = daysToWait; /* Ignore Space O(N) */\n        }\n\n        stack.push(day); /* Space O(N) */\n    }\n\n    return days;\n};\n\nconst canShrink = (stack, temperatures, day) => {\n    const previousDay = stack[stack.length - 1];\n    const [prevTemperature, currTemperature] = [\n        temperatures[previousDay],\n        temperatures[day],\n    ];\n    const isWarmer = prevTemperature < currTemperature;\n\n    return stack.length && isWarmer;\n};\n\n/**\n * https://leetcode.com/problems/daily-temperatures\n * Time O(N) | Space O(1)\n * @param {number[]} temperatures\n * @return {number[]}\n */\nvar dailyTemperatures = function (temperatures, hottest = 0) {\n    const days = new Array(temperatures.length).fill(0);\n\n    for (let day = temperatures.length - 1; 0 <= day; day--) {\n        /* Time O(N + N) */\n        const temperature = temperatures[day];\n\n        const isHotter = hottest <= temperature;\n        if (isHotter) {\n            hottest = temperature;\n            continue; /* Time O(N + N) */\n        }\n\n        search(\n            temperatures,\n            day,\n            temperature,\n            days,\n        ); /* Time O(N + N) | Ignore Space O(N) */\n    }\n\n    return days;\n};\n\nconst search = (temperatures, day, temperature, days, dayCount = 1) => {\n    const isHotter = () => temperatures[day + dayCount] <= temperature;\n    while (isHotter()) dayCount += days[day + dayCount]; /* Time O(N + N) */\n\n    days[day] = dayCount; /* Ignore Space O(N) */\n};\n",
        "python": "class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        res = [0] * len(temperatures)\n        stack = []  # pair: [temp, index]\n\n        for i, t in enumerate(temperatures):\n            while stack and t > stack[-1][0]:\n                stackT, stackInd = stack.pop()\n                res[stackInd] = i - stackInd\n            stack.append((t, i))\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Daily Temperatures",
          "explanation": "Daily Temperatures is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Stack"
      ],
      "hints": [
        "If the temperature is say, 70 today, then in the future a warmer temperature must be either 71, 72, 73, ..., 99, or 100.  We could remember when all of them occur next."
      ]
    },
    {
      "id": "car-fleet",
      "title": "Car Fleet",
      "difficulty": "Medium",
      "description": "There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.\n\nYou are given two integer arrays position and speed, both of length n, where position[i] is the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour.\n\nA car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.\n\nA car fleet is a single car or a group of cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet.\n\nIf a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.\n\nReturn the number of car fleets that will arrive at the destination.\n\n \nExample 1:\n\n\nInput: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]\n\nOutput: 3\n\nExplanation:\n\n\n\tThe cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.\n\tThe car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.\n\tThe cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.\n\n\n\nExample 2:\n\n\nInput: target = 10, position = [3], speed = [3]\n\nOutput: 1\n\nExplanation:\nThere is only one car, hence there is only one fleet.\n\nExample 3:\n\n\nInput: target = 100, position = [0,2,4], speed = [4,2,1]\n\nOutput: 1\n\nExplanation:\n\n\n\tThe cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, ...",
      "examples": [
        {
          "input": "12",
          "output": "See problem description for expected output."
        },
        {
          "input": "[10,8,0,5,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,4,1,1,3]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function carFleet(input) {\n  // Your code here\n}",
        "python": "def car_fleet(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Car Fleet",
          "explanation": "Car Fleet is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Stack"
      ],
      "hints": []
    },
    {
      "id": "largest-rectangle-in-histogram",
      "title": "Largest Rectangle in Histogram",
      "difficulty": "Hard",
      "description": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.\n\n \nExample 1:\n\n\n<strong>Input:</strong> heights = [2,1,5,6,2,3]\n<strong>Output:</strong> 10\n<strong>Explanation:</strong> The above is a histogram where width of each bar is 1.\nThe largest rectangle is shown in the red area, which has an area = 10 units.\n\n\nExample 2:\n\n\n<strong>Input:</strong> heights = [2,4]\n<strong>Output:</strong> 4\n\n\n \nConstraints:\n\n\n\t1 <= heights.length <= 105\n\t0 <= heights[i] <= 104",
      "examples": [
        {
          "input": "[2,1,5,6,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,4]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function largestRectangleInHistogram(input) {\n  // Your code here\n}",
        "python": "def largest_rectangle_in_histogram(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/\n * Time O(N^3) | Space O(1)\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function (heights, maxArea = 0) {\n    for (let i = 0; i < heights.length; i++) {\n        /* Time O(N) */\n        for (let j = i; j < heights.length; j++) {\n            /* Time O(N) */\n            let min = Infinity;\n\n            for (let k = i; k <= j; k++) {\n                /* Time O(N) */\n                min = Math.min(min, heights[k]);\n            }\n\n            const area = min * (j - i + 1);\n\n            maxArea = Math.max(maxArea, area);\n        }\n    }\n\n    return maxArea;\n};\n\n/**\n * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/\n * Time O(N^2) | Space O(1)\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function (heights, maxArea = 0) {\n    for (let i = 0; i < heights.length; i++) {\n        /* Time O(N) */\n        let min = Infinity;\n\n        for (let j = i; j < heights.length; j++) {\n            /* Time O(N) */\n            min = Math.min(min, heights[j]);\n\n            const area = min * (j - i + 1);\n\n            maxArea = Math.max(maxArea, area);\n        }\n    }\n\n    return maxArea;\n};\n\n/**\n * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/\n * Time O(N^2) | Space O(N)\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function (\n    heights,\n    left = 0,\n    right = heights.length - 1,\n) {\n    const isBaseCase = right < left;\n    if (isBaseCase) return 0;\n\n    return divideAndConquer(\n        heights,\n        left,\n        right,\n    ); /* Time O(N^2) | Space O(N) */\n};\n\nconst divideAndConquer = (heights, left, right, min = left) => {\n    for (let i = left; i <= right; i++) {\n        /* Time O(N) */\n        const isMinGreater = heights[i] < heights[min];\n        if (!isMinGreater) continue;\n\n        min = i;\n    }\n\n    const window = right - left + 1;\n    const area = heights[min] * window;\n\n    const leftArea = largestRectangleArea(\n        heights,\n        min + 1,\n        right,\n    ); /* Time O(N^2) | Space O(N) */\n    const rightArea = largestRectangleArea(\n        heights,\n        left,\n        min - 1,\n    ); /* Time O(N^2) | Space O(N) */\n\n    return Math.max(area, leftArea, rightArea);\n};\n\n/**\n * https://leetcode.com/problems/largest-rectangle-in-histogram/solution/\n * Time O(N) | Space O(N)\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function (heights) {\n    const { stack, maxArea } = fillStack(heights); /* Time O(N) | Space O(N) */\n\n    return getMaxArea(heights, stack, maxArea); /* Time O(N) */\n};\n\nconst fillStack = (heights, stack = [], maxArea = 0) => {\n    for (let index = 0; index < heights.length; index++) {\n        /* Time O(N + N) */\n        let start = index;\n\n        const isCurrHeightLess = ([prevIndex, prevHeight], currHeight) =>\n            currHeight < prevHeight;\n        const canShrink = () =>\n            isCurrHeightLess(stack[stack.length - 1], heights[index]);\n        while (stack.length && canShrink()) {\n            /* Time O(N + N) */\n            const [_index, _height] = stack.pop();\n            const width = index - _index;\n            const area = _height * width;\n\n            maxArea = Math.max(maxArea, area);\n            start = _index;\n        }\n\n        stack.push([start, heights[index]]); /* Space O(N) */\n    }\n\n    return { stack, maxArea };\n};\n\nconst getMaxArea = (heights, stack, maxArea) => {\n    for (const [index, height] of stack) {\n        /* Time O(N) */\n        const width = heights.length - index;\n        const area = height * width;\n\n        maxArea = Math.max(maxArea, area);\n    }\n\n    return maxArea;\n};\n",
        "python": "class Solution:\n    def largestRectangleArea(self, heights: List[int]) -> int:\n        maxArea = 0\n        stack = []  # pair: (index, height)\n\n        for i, h in enumerate(heights):\n            start = i\n            while stack and stack[-1][1] > h:\n                index, height = stack.pop()\n                maxArea = max(maxArea, height * (i - index))\n                start = index\n            stack.append((start, h))\n\n        for i, h in stack:\n            maxArea = max(maxArea, h * (len(heights) - i))\n        return maxArea\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Largest Rectangle in Histogram",
          "explanation": "Largest Rectangle in Histogram is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N^3)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Stack"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "A monotonic decreasing stack contains elements:",
      "options": [
        "Sorted ascending",
        "Sorted descending",
        "Random",
        "Equal"
      ],
      "correct": 1,
      "explanation": "Monotonic decreasing: each element ≤ the element below it."
    }
  ],
  "cheatSheet": "# Stacks\n```js\n// Monotonic stack (next greater element)\nconst stack=[];\nfor(let i=0;i<n;i++){\n  while(stack.length&&arr[stack.at(-1)]<arr[i]){\n    result[stack.pop()]=arr[i];\n  }\n  stack.push(i);\n}\n```",
  "proTips": [
    "Draw the stack state step by step",
    "Monotonic stack: think \"what is this element the answer for?\""
  ],
  "faangQuotes": [
    "\"Sliding Window Maximum (deque) separates good from great candidates.\" — Google"
  ],
  "visualizationType": "array",
  "usage": "Used for tracking state in LIFO (stacks) or FIFO (queues) order. Useful for parenthesis matching, monotonic sequences, or level-order processing.",
  "dsInvolved": "Stack, Queue, Deque, Array",
  "sampleProblems": [
    "Valid Parentheses",
    "Min Stack",
    "Implement Queue using Stacks"
  ]
};
