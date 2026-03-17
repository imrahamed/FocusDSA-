import { Topic } from "./types";

export const topic15: Topic = {
  "id": "topic15",
  "slug": "bit-manipulation",
  "title": "Bit Manipulation",
  "emoji": "⚡",
  "color": "#f59e0b",
  "gradient": "from-amber-500 to-yellow-400",
  "layman": "Computers store everything in 1s and 0s. Bit tricks let you do things with single CPU instructions. XOR of a number with itself is 0 — perfect for finding the odd-one-out.",
  "technical": "Core: AND, OR, XOR, NOT, shifts. XOR: commutative, associative, x^x=0, x^0=x. x&(x-1) clears lowest set bit.",
  "keyInsights": [
    "x&(x-1) clears lowest set bit",
    "x&(-x) isolates lowest set bit (Fenwick tree)",
    "XOR cancels duplicates: a^a=0"
  ],
  "timeComplexities": [
    {
      "operation": "Bit operations",
      "best": "O(1)",
      "avg": "O(1)",
      "worst": "O(1)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "single-number",
      "title": "Single Number",
      "difficulty": "Easy",
      "description": "Every element appears twice except one. Find it in O(n) time and O(1) space.",
      "examples": [
        {
          "input": "nums=[2,2,1]",
          "output": "1"
        },
        {
          "input": "nums=[4,1,2,1,2]",
          "output": "4"
        }
      ],
      "constraints": [
        "1≤nums.length≤3×10⁴"
      ],
      "starterCode": {
        "js": "function singleNumber(nums){\n  // XOR: a^a=0, a^0=a\n}",
        "python": "def single_number(nums):\n    pass"
      },
      "solution": {
        "js": "function singleNumber(nums){\n  return nums.reduce((xor,n)=>xor^n,0);\n}",
        "python": "def single_number(nums):\n    from functools import reduce; import operator\n    return reduce(operator.xor,nums)"
      },
      "testCases": [
        {
          "input": "[2,2,1]",
          "expected": "1"
        },
        {
          "input": "[4,1,2,1,2]",
          "expected": "4"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "XOR all numbers. Pairs cancel to 0, leaving the single element."
      ],
      "tags": [
        "bit-manipulation",
        "xor"
      ],
      "walkthrough": [
        {
          "title": "XOR properties",
          "explanation": "XOR (^): x^x=0 (same values cancel), x^0=x (zero has no effect), commutative and associative. So XOR all elements: pairs cancel, single remains.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              4,
              1,
              2,
              1,
              2
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default",
              "default"
            ]
          },
          "insight": "XOR is its own inverse: a^b^a = b. Pairs literally vanish!"
        },
        {
          "title": "XOR all elements: 4^1^2^1^2",
          "explanation": "4^1=5, 5^2=7, 7^1=6, 6^2=4. The pairs (1^1=0, 2^2=0) cancel. Result: 4.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              4,
              1,
              2,
              1,
              2
            ],
            "states": [
              "found",
              "eliminated",
              "eliminated",
              "eliminated",
              "eliminated"
            ]
          },
          "variables": {
            "xor so far": "4^1^2^1^2=4"
          },
          "code": "return nums.reduce((xor, n) => xor ^ n, 0);",
          "codeHighlight": [
            1
          ]
        },
        {
          "title": "Answer: 4",
          "explanation": "4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4. Only the single number survives.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              4,
              1,
              2,
              1,
              2
            ],
            "states": [
              "result",
              "visited",
              "visited",
              "visited",
              "visited"
            ]
          },
          "variables": {
            "answer": 4
          },
          "complexity": "O(n) — one reduce pass. O(1) — no extra space."
        }
      ]
    },
    {
      "id": "number-of-1-bits",
      "title": "Number of 1 Bits",
      "difficulty": "Easy",
      "description": "Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).\n\n \nExample 1:\n\n\nInput: n = 11\n\nOutput: 3\n\nExplanation:\n\nThe input binary string 1011 has a total of three set bits.\n\n\nExample 2:\n\n\nInput: n = 128\n\nOutput: 1\n\nExplanation:\n\nThe input binary string 10000000 has a total of one set bit.\n\n\nExample 3:\n\n\nInput: n = 2147483645\n\nOutput: 30\n\nExplanation:\n\nThe input binary string 1111111111111111111111111111101 has a total of thirty set bits.\n\n\n \nConstraints:\n\n\n\t1 <= n <= 231 - 1\n\n\n \nFollow up: If this function is called many times, how would you optimize it?",
      "examples": [
        {
          "input": "11",
          "output": "See problem description for expected output."
        },
        {
          "input": "128",
          "output": "See problem description for expected output."
        },
        {
          "input": "2147483645",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function numberOf1Bits(input) {\n  // Your code here\n}",
        "python": "def number_of_1_bits(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/number-of-1-bits/\n * Time O(1) | Space (1)\n * @param {number} n - a positive integer\n * @return {number}\n */\nvar hammingWeight = function (n) {\n    let [bits, mask] = [0, 1];\n\n    for (let i = 0; i < 32; i++) {\n        const hasBit = (n & mask) !== 0;\n        if (hasBit) bits++;\n\n        mask <<= 1;\n    }\n\n    return bits;\n};\n\n/**\n * https://leetcode.com/problems/number-of-1-bits/\n * Time O(1) | Space (1)\n * @param {number} n - a positive integer\n * @return {number}\n */\nvar hammingWeight = function (n, sum = 0) {\n    while (n !== 0) {\n        n &= n - 1;\n        sum++;\n    }\n\n    return sum;\n};\n",
        "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        res = 0\n        while n:\n            n &= n - 1\n            res += 1\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Number of 1 Bits",
          "explanation": "Number of 1 Bits is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": []
    },
    {
      "id": "counting-bits",
      "title": "Counting Bits",
      "difficulty": "Easy",
      "description": "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.\n\n \nExample 1:\n\n\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> [0,1,1]\n<strong>Explanation:</strong>\n0 --> 0\n1 --> 1\n2 --> 10\n\n\nExample 2:\n\n\n<strong>Input:</strong> n = 5\n<strong>Output:</strong> [0,1,1,2,1,2]\n<strong>Explanation:</strong>\n0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101\n\n\n \nConstraints:\n\n\n\t0 <= n <= 105\n\n\n \nFollow up:\n\n\n\tIt is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?\n\tCan you do it without using any built-in function (i.e., like __builtin_popcount in C++)?",
      "examples": [
        {
          "input": "2",
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
        "js": "function countingBits(input) {\n  // Your code here\n}",
        "python": "def counting_bits(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/counting-bits/\n * Time O(N) | Space (1)\n * @param {number} n\n * @return {number[]}\n */\nvar countBits = function (n, dp = [0]) {\n    for (let i = 1; i < n + 1; i++) {\n        const [mid, bit] = [i >> 1, i & 1];\n        const bits = dp[mid] + bit;\n\n        dp.push(bits);\n    }\n\n    return dp;\n};\n",
        "python": "class Solution:\n    def countBits(self, n: int) -> List[int]:\n        dp = [0] * (n + 1)\n        offset = 1\n\n        for i in range(1, n + 1):\n            if offset * 2 == i:\n                offset = i\n            dp[i] = 1 + dp[i - offset]\n        return dp\n\n# Another dp solution\nclass Solution2:\n    def countBits(self, n: int) -> List[int]:\n        res = [0] * (n + 1)\n        for i in range(1, n + 1):\n            if i % 2 == 1:\n                res[i] = res[i - 1] + 1\n            else:\n                res[i] = res[i // 2]\n        return res\n# This solution is based on the division of odd and even numbers. \n# I think it's easier to understand.\n# This is my full solution, covering the details: https://leetcode.com/problems/counting-bits/solutions/4411054/odd-and-even-numbers-a-easier-to-understanding-way-of-dp/\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Counting Bits",
          "explanation": "Counting Bits is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": [
        "You should make use of what you have produced already.",
        "Divide the numbers in ranges like [2-3], [4-7], [8-15] and so on. And try to generate new range from previous.",
        "Or does the odd/even status of the number help you in calculating the number of 1s?"
      ]
    },
    {
      "id": "reverse-bits",
      "title": "Reverse Bits",
      "difficulty": "Easy",
      "description": "Reverse bits of a given 32 bits signed integer.\n\n \nExample 1:\n\n\nInput: n = 43261596\n\nOutput: 964176192\n\nExplanation:\n\n\n\t\n\t\t\n\t\t\tInteger\n\t\t\tBinary\n\t\t\n\t\t\n\t\t\t43261596\n\t\t\t00000010100101000001111010011100\n\t\t\n\t\t\n\t\t\t964176192\n\t\t\t00111001011110000010100101000000\n\t\t\n\t\n\n\n\nExample 2:\n\n\nInput: n = 2147483644\n\nOutput: 1073741822\n\nExplanation:\n\n\n\t\n\t\t\n\t\t\tInteger\n\t\t\tBinary\n\t\t\n\t\t\n\t\t\t2147483644\n\t\t\t01111111111111111111111111111100\n\t\t\n\t\t\n\t\t\t1073741822\n\t\t\t00111111111111111111111111111110\n\t\t\n\t\n\n\n\n \nConstraints:\n\n\n\t0 <= n <= 231 - 2\n\tn is even.\n\n\n \nFollow up: If this function is called many times, how would you optimize it?",
      "examples": [
        {
          "input": "43261596",
          "output": "See problem description for expected output."
        },
        {
          "input": "2147483644",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function reverseBits(input) {\n  // Your code here\n}",
        "python": "def reverse_bits(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/reverse-bits/\n * Time O(1) | Space O(1)\n * @param {number} n - a positive integer\n * @return {number} - a positive integer\n */\nvar reverseBits = function (n, bit = 0) {\n    for (let i = 0; i < 32; i++) {\n        bit <<= 1; // Double * 2\n        bit |= n & 1; // Flip\n        n >>= 1; // Reduce * 0.5\n    }\n\n    return bit >>> 0;\n};\n",
        "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        res = 0\n        for i in range(32):\n            bit = (n >> i) & 1\n            res += (bit << (31 - i))\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Reverse Bits",
          "explanation": "Reverse Bits is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": []
    },
    {
      "id": "missing-number",
      "title": "Missing Number",
      "difficulty": "Easy",
      "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.\n\n \nExample 1:\n\n\nInput: nums = [3,0,1]\n\nOutput: 2\n\nExplanation:\n\nn = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.\n\n\nExample 2:\n\n\nInput: nums = [0,1]\n\nOutput: 2\n\nExplanation:\n\nn = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.\n\n\nExample 3:\n\n\nInput: nums = [9,6,4,2,3,5,7,0,1]\n\nOutput: 8\n\nExplanation:\n\nn = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.\n\n\n\n\n \n\n\n\n \n\n\n \n\n \n\n\n\n\n\n\n \nConstraints:\n\n\n\tn == nums.length\n\t1 <= n <= 104\n\t0 <= nums[i] <= n\n\tAll the numbers of nums are unique.\n\n\n \nFollow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?",
      "examples": [
        {
          "input": "[3,0,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[9,6,4,2,3,5,7,0,1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function missingNumber(input) {\n  // Your code here\n}",
        "python": "def missing_number(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/missing-number/\n * Time O(N) | Space O(1)\n * @param {number[]} nums\n * @return {number}\n */\nvar missingNumber = function (nums, missingNumber = nums.length) {\n    for (let i = 0; i < nums.length; i++) {\n        const xor = i ^ nums[i];\n\n        missingNumber ^= xor;\n    }\n\n    return missingNumber;\n};\n",
        "python": "class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        res = len(nums)\n\n        for i in range(len(nums)):\n            res += i - nums[i]\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Missing Number",
          "explanation": "Missing Number is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": []
    },
    {
      "id": "sum-of-two-integers",
      "title": "Sum of Two Integers",
      "difficulty": "Medium",
      "description": "Given two integers a and b, return the sum of the two integers without using the operators + and -.\n\n \nExample 1:\n<strong>Input:</strong> a = 1, b = 2\n<strong>Output:</strong> 3\nExample 2:\n<strong>Input:</strong> a = 2, b = 3\n<strong>Output:</strong> 5\n\n \nConstraints:\n\n\n\t-1000 <= a, b <= 1000",
      "examples": [
        {
          "input": "1",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
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
        "js": "function sumOfTwoIntegers(input) {\n  // Your code here\n}",
        "python": "def sum_of_two_integers(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/sum-of-two-integers/\n * Time O(1) | Space O(1)\n * @param {number} a\n * @param {number} b\n * @return {number}\n */\nvar getSum = function (a, b) {\n    while (b !== 0) {\n        const [xor, carry] = [a ^ b, (a & b) << 1];\n\n        a = xor;\n        b = carry;\n    }\n\n    return a;\n};\n",
        "python": "class Solution:\n    def getSum(self, a: int, b: int) -> int:\n        def add(a, b):\n            if not a or not b:\n                return a or b\n            return add(a ^ b, (a & b) << 1)\n\n        if a * b < 0:  # assume a < 0, b > 0\n            if a > 0:\n                return self.getSum(b, a)\n            if add(~a, 1) == b:  # -a == b\n                return 0\n            if add(~a, 1) < b:  # -a < b\n                return add(~add(add(~a, 1), add(~b, 1)), 1)  # -add(-a, -b)\n\n        return add(a, b)  # a*b >= 0 or (-a) > b > 0\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Sum of Two Integers",
          "explanation": "Sum of Two Integers is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": []
    },
    {
      "id": "reverse-integer",
      "title": "Reverse Integer",
      "difficulty": "Medium",
      "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).\n\n \nExample 1:\n\n\n<strong>Input:</strong> x = 123\n<strong>Output:</strong> 321\n\n\nExample 2:\n\n\n<strong>Input:</strong> x = -123\n<strong>Output:</strong> -321\n\n\nExample 3:\n\n\n<strong>Input:</strong> x = 120\n<strong>Output:</strong> 21\n\n\n \nConstraints:\n\n\n\t-231 <= x <= 231 - 1",
      "examples": [
        {
          "input": "123",
          "output": "See problem description for expected output."
        },
        {
          "input": "-123",
          "output": "See problem description for expected output."
        },
        {
          "input": "120",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function reverseInteger(input) {\n  // Your code here\n}",
        "python": "def reverse_integer(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/reverse-integer/\n * Time O(log(x)) | Space O(1)\n * @param {number} x\n * @return {number}\n */\nvar reverse = function (x, result = 0) {\n    while (x !== 0) {\n        const digit = x % 10;\n\n        if (isOutOfBounds(digit, result)) return 0;\n\n        x = Math.trunc(x / 10);\n        result = result * 10 + digit;\n    }\n\n    return result;\n};\n\nconst isOutOfBounds = (digit, result) => {\n    const [max, min] = [2 ** 31 - 1, -(2 ** 31)];\n    const [maxProduct, maxRemainder] = [max / 10, max % 10];\n    const [minProduct, minRemainder] = [min / 10, min % 10];\n    const isTarget = result === maxProduct;\n\n    const isMaxOut = maxProduct < result || (isTarget && maxRemainder <= digit);\n    const isMinOut = result < minProduct || (isTarget && digit <= minRemainder);\n\n    return isMaxOut || isMinOut;\n};\n",
        "python": "class Solution:\n    def reverse(self, x: int) -> int:\n        # Integer.MAX_VALUE = 2147483647 (end with 7)\n        # Integer.MIN_VALUE = -2147483648 (end with -8 )\n\n        MIN = -2147483648  # -2^31,\n        MAX = 2147483647  #  2^31 - 1\n\n        res = 0\n        while x:\n            digit = int(math.fmod(x, 10))  # (python dumb) -1 %  10 = 9\n            x = int(x / 10)  # (python dumb) -1 // 10 = -1\n\n            if res > MAX // 10 or (res == MAX // 10 and digit > MAX % 10):\n                return 0\n            if res < MIN // 10 or (res == MIN // 10 and digit < MIN % 10):\n                return 0\n            res = (res * 10) + digit\n\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Reverse Integer",
          "explanation": "Reverse Integer is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(x)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Bit Manipulation"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "What does n&(n-1) do?",
      "options": [
        "Sets lowest bit",
        "Clears lowest set bit",
        "Returns n-1",
        "Checks power of 2"
      ],
      "correct": 1,
      "explanation": "n-1 flips the lowest set bit and all below. n&(n-1) clears that bit."
    }
  ],
  "cheatSheet": "# Bit Tricks\n| Trick | Code |\n|-------|------|\n| Check power of 2 | n>0&&(n&(n-1))==0 |\n| Clear lowest bit | n&(n-1) |\n| Isolate lowest bit | n&(-n) |\n| XOR unique | arr.reduce((a,b)=>a^b) |",
  "proTips": [
    "x^x=0, x^0=x — XOR cancels pairs",
    "n&(n-1) counts set bits in O(set bits) iterations"
  ],
  "faangQuotes": [
    "\"Counting Bits with DP + bit tricks is beautiful.\" — Google"
  ],
  "visualizationType": "array",
  "usage": "Used for low-level optimizations and solving specific math or array problems using bitwise operators.",
  "dsInvolved": "Integer, Bitwise Operators",
  "sampleProblems": [
    "Single Number",
    "Number of 1 Bits",
    "Counting Bits"
  ]
};
