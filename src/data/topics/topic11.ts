import { Topic } from "./types";

export const topic11: Topic = {
  "id": "topic11",
  "slug": "binary-search",
  "title": "Binary Search & Variants",
  "emoji": "🔍",
  "color": "#34d399",
  "gradient": "from-emerald-500 to-jade-400",
  "layman": "Binary search is like finding a word in a dictionary. Open to the middle: if your word comes before, search left half; if after, search right half. Each step halves the search space.",
  "technical": "Binary search requires a monotonic search space. Template: find smallest index where condition is true. \"Binary search on the answer\" for optimization problems.",
  "keyInsights": [
    "off-by-one: use lo<=hi for value, lo<hi for boundary",
    "mid=lo+Math.floor((hi-lo)/2) avoids overflow",
    "Binary search on answer: is the answer monotonic?",
    "Rotated array: one half always sorted"
  ],
  "timeComplexities": [
    {
      "operation": "Binary Search",
      "best": "O(1)",
      "avg": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "search-rotated",
      "title": "Search in Rotated Sorted Array",
      "difficulty": "Medium",
      "description": "Search for target in a rotated sorted array with distinct values. Return index or -1.",
      "examples": [
        {
          "input": "nums=[4,5,6,7,0,1,2], target=0",
          "output": "4"
        }
      ],
      "constraints": [
        "1≤nums.length≤5000",
        "All values unique"
      ],
      "starterCode": {
        "js": "function search(nums,target){\n  let lo=0,hi=nums.length-1;\n  while(lo<=hi){\n    const mid=Math.floor((lo+hi)/2);\n    // Which half is sorted?\n  }\n}",
        "python": "def search(nums,target):\n    lo,hi=0,len(nums)-1"
      },
      "solution": {
        "js": "function search(nums,target){\n  let lo=0,hi=nums.length-1;\n  while(lo<=hi){\n    const mid=Math.floor((lo+hi)/2);\n    if(nums[mid]===target)return mid;\n    if(nums[lo]<=nums[mid]){\n      if(nums[lo]<=target&&target<nums[mid])hi=mid-1;\n      else lo=mid+1;\n    }else{\n      if(nums[mid]<target&&target<=nums[hi])lo=mid+1;\n      else hi=mid-1;\n    }\n  }\n  return -1;\n}",
        "python": "def search(nums,target):\n    lo,hi=0,len(nums)-1\n    while lo<=hi:\n        mid=(lo+hi)//2\n        if nums[mid]==target: return mid\n        if nums[lo]<=nums[mid]:\n            if nums[lo]<=target<nums[mid]: hi=mid-1\n            else: lo=mid+1\n        else:\n            if nums[mid]<target<=nums[hi]: lo=mid+1\n            else: hi=mid-1\n    return -1"
      },
      "testCases": [
        {
          "input": "[4,5,6,7,0,1,2]\n0",
          "expected": "4"
        },
        {
          "input": "[4,5,6,7,0,1,2]\n3",
          "expected": "-1"
        },
        {
          "input": "[1]\n0",
          "expected": "-1",
          "hidden": true
        }
      ],
      "timeComplexity": "O(log n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "One half is always sorted — use it to decide which side to search."
      ],
      "tags": [
        "binary-search"
      ],
      "walkthrough": [
        {
          "title": "Key insight: one half is always sorted",
          "explanation": "After rotation, at least one of [lo..mid] or [mid..hi] is sorted. We can check which by comparing nums[lo] and nums[mid].",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "labels": [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ],
            "pointers": {
              "0": "lo",
              "6": "hi"
            }
          }
        },
        {
          "title": "mid=3, nums[3]=7. Left half [4..7] is sorted",
          "explanation": "nums[lo=0]=4 ≤ nums[mid=3]=7 → left half [4,5,6,7] is sorted. Is target=0 in [4,7]? No (0<4). So search right half.",
          "phase": "compare",
          "visual": {
            "type": "array",
            "array": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "states": [
              "active",
              "active",
              "active",
              "active",
              "comparing",
              "comparing",
              "comparing"
            ],
            "pointers": {
              "0": "lo",
              "3": "mid",
              "6": "hi"
            }
          },
          "variables": {
            "target": 0,
            "left half": "[4,5,6,7]",
            "0 in [4,7]?": "No → go right"
          }
        },
        {
          "title": "lo=4, hi=6, mid=5. Right half [1,2] is sorted",
          "explanation": "nums[lo=4]=0 ≤ nums[mid=5]=1? Yes. Is 0 in [0,1)? 0≥0 and 0<1 → YES. Search left.",
          "phase": "compare",
          "visual": {
            "type": "array",
            "array": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "states": [
              "eliminated",
              "eliminated",
              "eliminated",
              "eliminated",
              "active",
              "comparing",
              "comparing"
            ],
            "pointers": {
              "4": "lo",
              "5": "mid",
              "6": "hi"
            }
          },
          "variables": {
            "target": 0,
            "lo": 4,
            "mid": 5
          }
        },
        {
          "title": "Found: lo=hi=4, nums[4]=0",
          "explanation": "lo=4, hi=4, mid=4. nums[4]=0 = target → return 4!",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              4,
              5,
              6,
              7,
              0,
              1,
              2
            ],
            "states": [
              "eliminated",
              "eliminated",
              "eliminated",
              "eliminated",
              "result",
              "eliminated",
              "eliminated"
            ],
            "pointers": {
              "4": "found!"
            }
          },
          "variables": {
            "answer": 4
          },
          "complexity": "O(log n) — halve search space each step."
        }
      ]
    },
    {
      "id": "binary-search",
      "title": "Binary Search",
      "difficulty": "Easy",
      "description": "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [-1,0,3,5,9,12], target = 9\n<strong>Output:</strong> 4\n<strong>Explanation:</strong> 9 exists in nums and its index is 4\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [-1,0,3,5,9,12], target = 2\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> 2 does not exist in nums so return -1\n\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 104\n\t-104 < nums[i], target < 104\n\tAll the integers in nums are unique.\n\tnums is sorted in ascending order.",
      "examples": [
        {
          "input": "[-1,0,3,5,9,12]",
          "output": "See problem description for expected output."
        },
        {
          "input": "9",
          "output": "See problem description for expected output."
        },
        {
          "input": "[-1,0,3,5,9,12]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function binarySearch(input) {\n  // Your code here\n}",
        "python": "def binary_search(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Binary Search",
          "explanation": "Binary Search is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    },
    {
      "id": "search-a-2d-matrix",
      "title": "Search a 2D Matrix",
      "difficulty": "Medium",
      "description": "You are given an m x n integer matrix matrix with the following two properties:\n\n\n\tEach row is sorted in non-decreasing order.\n\tThe first integer of each row is greater than the last integer of the previous row.\n\n\nGiven an integer target, return true if target is in matrix or false otherwise.\n\nYou must write a solution in O(log(m * n)) time complexity.\n\n \nExample 1:\n\n\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\n<strong>Output:</strong> true\n\n\nExample 2:\n\n\n<strong>Input:</strong> matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\tm == matrix.length\n\tn == matrix[i].length\n\t1 <= m, n <= 100\n\t-104 <= matrix[i][j], target <= 104",
      "examples": [
        {
          "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "3",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function searchA2dMatrix(input) {\n  // Your code here\n}",
        "python": "def search_a_2d_matrix(input):\n    pass"
      },
      "solution": {
        "js": "//////////////////////////////////////////////////////////////////////////////\n// Two level Binary search\n// Time: O(log(m) + log(n))  Space: O(1)\n//////////////////////////////////////////////////////////////////////////////\n/**\n * @param {number[][]} matrix\n * @param {number} target\n * @return {boolean}\n */\nvar searchMatrix = function (matrix, target) {\n    let [rows, cols] = [matrix.length, matrix[0].length];\n    let [top, bot] = [0, rows - 1];\n\n    while (top <= bot) {\n        let row = Math.floor((top + bot) / 2);\n        if (target > matrix[row][cols - 1]) {\n            top = row + 1;\n        } else if (target < matrix[row][0]) {\n            bot = row - 1;\n        } else {\n            break;\n        }\n    }\n\n    if (!(top <= bot)) {\n        return false;\n    }\n\n    let row = Math.floor((top + bot) / 2);\n    let [l, r] = [0, cols - 1];\n    while (l <= r) {\n        let m = Math.floor((l + r) / 2);\n        if (target > matrix[row][m]) {\n            l = m + 1;\n        } else if (target < matrix[row][m]) {\n            r = m - 1;\n        } else if (target == matrix[row][m]) {\n            return true;\n        }\n    }\n    return false;\n};\n\n//////////////////////////////////////////////////////////////////////////////\n// Single Binary Search\n// Time: O(log(mn))  Space: O(1)\n//////////////////////////////////////////////////////////////////////////////\n\n/**\n * @param {number[][]} matrix\n * @param {number} target\n * Time O(log(ROWS * COLS)) | Space O(1)\n * @return {boolean}\n */\nvar searchMatrix = function (matrix, target) {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n    let [left, right] = [0, rows * cols - 1];\n\n    while (left <= right) {\n        const mid = (left + right) >> 1;\n        const [row, col] = [Math.floor(mid / cols), mid % cols];\n        const guess = matrix[row][col];\n\n        const isTarget = guess === target;\n        if (isTarget) return true;\n\n        const isTargetGreater = guess < target;\n        if (isTargetGreater) left = mid + 1;\n\n        const isTargetLess = target < guess;\n        if (isTargetLess) right = mid - 1;\n    }\n\n    return false;\n};\n",
        "python": "class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        ROWS, COLS = len(matrix), len(matrix[0])\n\n        top, bot = 0, ROWS - 1\n        while top <= bot:\n            row = (top + bot) // 2\n            if target > matrix[row][-1]:\n                top = row + 1\n            elif target < matrix[row][0]:\n                bot = row - 1\n            else:\n                break\n\n        if not (top <= bot):\n            return False\n        row = (top + bot) // 2\n        l, r = 0, COLS - 1\n        while l <= r:\n            m = (l + r) // 2\n            if target > matrix[row][m]:\n                l = m + 1\n            elif target < matrix[row][m]:\n                r = m - 1\n            else:\n                return True\n        return False\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Search a 2D Matrix",
          "explanation": "Search a 2D Matrix is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(m)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    },
    {
      "id": "koko-eating-bananas",
      "title": "Koko Eating Bananas",
      "difficulty": "Medium",
      "description": "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.\n\nKoko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\n\nReturn the minimum integer k such that she can eat all the bananas within h hours.\n\n \nExample 1:\n\n\n<strong>Input:</strong> piles = [3,6,7,11], h = 8\n<strong>Output:</strong> 4\n\n\nExample 2:\n\n\n<strong>Input:</strong> piles = [30,11,23,4,20], h = 5\n<strong>Output:</strong> 30\n\n\nExample 3:\n\n\n<strong>Input:</strong> piles = [30,11,23,4,20], h = 6\n<strong>Output:</strong> 23\n\n\n \nConstraints:\n\n\n\t1 <= piles.length <= 104\n\tpiles.length <= h <= 109\n\t1 <= piles[i] <= 109",
      "examples": [
        {
          "input": "[3,6,7,11]",
          "output": "See problem description for expected output."
        },
        {
          "input": "8",
          "output": "See problem description for expected output."
        },
        {
          "input": "[30,11,23,4,20]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function kokoEatingBananas(input) {\n  // Your code here\n}",
        "python": "def koko_eating_bananas(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Koko Eating Bananas",
          "explanation": "Koko Eating Bananas is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    },
    {
      "id": "find-minimum-in-rotated-sorted-array",
      "title": "Find Minimum in Rotated Sorted Array",
      "difficulty": "Medium",
      "description": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:\n\n\n\t[4,5,6,7,0,1,2] if it was rotated 4 times.\n\t[0,1,2,4,5,6,7] if it was rotated 7 times.\n\n\nNotice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].\n\nGiven the sorted rotated array nums of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [3,4,5,1,2]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> The original array was [1,2,3,4,5] rotated 3 times.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [4,5,6,7,0,1,2]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [11,13,15,17]\n<strong>Output:</strong> 11\n<strong>Explanation:</strong> The original array was [11,13,15,17] and it was rotated 4 times. \n\n\n \nConstraints:\n\n\n\tn == nums.length\n\t1 <= n <= 5000\n\t-5000 <= nums[i] <= 5000\n\tAll the integers of nums are unique.\n\tnums is sorted and rotated between 1 and n times.",
      "examples": [
        {
          "input": "[3,4,5,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[4,5,6,7,0,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[11,13,15,17]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function findMinimumInRotatedSortedArray(input) {\n  // Your code here\n}",
        "python": "def find_minimum_in_rotated_sorted_array(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {number[]} nums\n * Time O(log(N)) | Space O(1)\n * @return {number}\n */\nvar findMin = function (nums) {\n    let [left, right] = [0, nums.length - 1];\n\n    while (left < right) {\n        const mid = (left + right) >> 1;\n        const guess = nums[mid];\n        const [leftNum, rightNum] = [nums[left], nums[right]];\n\n        const isTarget = leftNum < rightNum;\n        if (isTarget) return leftNum;\n\n        const isTargetGreater = leftNum <= guess;\n        if (isTargetGreater) left = mid + 1;\n\n        const isTargetLess = guess < leftNum;\n        if (isTargetLess) right = mid;\n    }\n\n    return nums[left];\n};\n",
        "python": "class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        start , end = 0, len(nums) - 1 \n        curr_min = float(\"inf\")\n        \n        while start  <  end :\n            mid = start + (end - start ) // 2\n            curr_min = min(curr_min,nums[mid])\n            \n            # right has the min \n            if nums[mid] > nums[end]:\n                start = mid + 1\n                \n            # left has the  min \n            else:\n                end = mid - 1 \n                \n        return min(curr_min,nums[start])\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Find Minimum in Rotated Sorted Array",
          "explanation": "Find Minimum in Rotated Sorted Array is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": [
        "Array was originally in ascending order. Now that the array is rotated, there would be a point in the array where there is a small deflection from the increasing sequence. eg. The array would be something like [4, 5, 6, 7, 0, 1, 2].",
        "You can divide the search space into two and see which direction to go.\r\nCan you think of an algorithm which has O(logN) search complexity?",
        "<ol>\r\n<li>All the elements to the left of inflection point > first element of the array.</li>\r\n<li>All the elements to the right of inflection point < first element of the array.</li>\r\n<ol>"
      ]
    },
    {
      "id": "search-in-rotated-sorted-array",
      "title": "Search in Rotated Sorted Array",
      "difficulty": "Medium",
      "description": "There is an integer array nums sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].\n\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n \nExample 1:\n<strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 0\n<strong>Output:</strong> 4\nExample 2:\n<strong>Input:</strong> nums = [4,5,6,7,0,1,2], target = 3\n<strong>Output:</strong> -1\nExample 3:\n<strong>Input:</strong> nums = [1], target = 0\n<strong>Output:</strong> -1\n\n \nConstraints:\n\n\n\t1 <= nums.length <= 5000\n\t-104 <= nums[i] <= 104\n\tAll values of nums are unique.\n\tnums is an ascending array that is possibly rotated.\n\t-104 <= target <= 104",
      "examples": [
        {
          "input": "[4,5,6,7,0,1,2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "0",
          "output": "See problem description for expected output."
        },
        {
          "input": "[4,5,6,7,0,1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function searchInRotatedSortedArray(input) {\n  // Your code here\n}",
        "python": "def search_in_rotated_sorted_array(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {number[]} nums\n * @param {number} target\n * Time O(log(N)) | Space O(1)\n * @return {number}\n */\nvar search = (nums, target) => {\n    let [left, right] = [0, nums.length - 1];\n\n    while (left <= right) {\n        const mid = (left + right) >> 1;\n        const guess = nums[mid];\n        const [leftNum, rightNum] = [nums[left], nums[right]];\n\n        const isTarget = guess === target;\n        if (isTarget) return mid;\n\n        const isAscending = leftNum <= guess;\n        if (isAscending) {\n            const isInRange = leftNum <= target;\n            const isLess = target < guess;\n\n            const isTargetGreater = !(isInRange && isLess);\n            if (isTargetGreater) left = mid + 1;\n\n            const isTargetLess = isInRange && isLess;\n            if (isTargetLess) right = mid - 1;\n        }\n\n        const isDescending = guess < leftNum;\n        if (isDescending) {\n            const isGreater = guess < target;\n            const isInRange = target <= rightNum;\n\n            const isTargetGreater = isGreater && isInRange;\n            if (isTargetGreater) left = mid + 1;\n\n            const isTargetLess = !(isGreater && isInRange);\n            if (isTargetLess) right = mid - 1;\n        }\n    }\n\n    return -1;\n};\n",
        "python": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n\n        while l <= r:\n            mid = (l + r) // 2\n            if target == nums[mid]:\n                return mid\n\n            # left sorted portion\n            if nums[l] <= nums[mid]:\n                if target > nums[mid] or target < nums[l]:\n                    l = mid + 1\n                else:\n                    r = mid - 1\n            # right sorted portion\n            else:\n                if target < nums[mid] or target > nums[r]:\n                    r = mid - 1\n                else:\n                    l = mid + 1\n        return -1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Search in Rotated Sorted Array",
          "explanation": "Search in Rotated Sorted Array is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    },
    {
      "id": "time-based-key-value-store",
      "title": "Time Based Key-Value Store",
      "difficulty": "Medium",
      "description": "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\n\nImplement the TimeMap class:\n\n\n\tTimeMap() Initializes the object of the data structure.\n\tvoid set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.\n\tString get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns \"\".\n\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"TimeMap\", \"set\", \"get\", \"get\", \"set\", \"get\", \"get\"]\n[[], [\"foo\", \"bar\", 1], [\"foo\", 1], [\"foo\", 3], [\"foo\", \"bar2\", 4], [\"foo\", 4], [\"foo\", 5]]\n<strong>Output</strong>\n[null, null, \"bar\", \"bar\", null, \"bar2\", \"bar2\"]\n\n<strong>Explanation</strong>\nTimeMap timeMap = new TimeMap();\ntimeMap.set(\"foo\", \"bar\", 1);  // store the key \"foo\" and value \"bar\" along with timestamp = 1.\ntimeMap.get(\"foo\", 1);         // return \"bar\"\ntimeMap.get(\"foo\", 3);         // return \"bar\", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is \"bar\".\ntimeMap.set(\"foo\", \"bar2\", 4); // store the key \"foo\" and value \"bar2\" along with timestamp = 4.\ntimeMap.get(\"foo\", 4);         // return \"bar2\"\ntimeMap.get(\"foo\", 5);         // return \"bar2\"\n\n\n \nConstraints:\n\n\n\t1 <=...",
      "examples": [
        {
          "input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[\"foo\",\"bar\",1],[\"foo\",1],[\"foo\",3],[\"foo\",\"bar2\",4],[\"foo\",4],[\"foo\",5]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function timeBasedKeyValueStore(input) {\n  // Your code here\n}",
        "python": "def time_based_key_value_store(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Time Based Key-Value Store",
          "explanation": "Time Based Key-Value Store is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    },
    {
      "id": "median-of-two-sorted-arrays",
      "title": "Median of Two Sorted Arrays",
      "difficulty": "Hard",
      "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums1 = [1,3], nums2 = [2]\n<strong>Output:</strong> 2.00000\n<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]\n<strong>Output:</strong> 2.50000\n<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n\n \nConstraints:\n\n\n\tnums1.length == m\n\tnums2.length == n\n\t0 <= m <= 1000\n\t0 <= n <= 1000\n\t1 <= m + n <= 2000\n\t-106 <= nums1[i], nums2[i] <= 106",
      "examples": [
        {
          "input": "[1,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,2]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function medianOfTwoSortedArrays(input) {\n  // Your code here\n}",
        "python": "def median_of_two_sorted_arrays(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * Time O(log(N * M)) | Space O(N)\n * @return {number}\n */\nvar findMedianSortedArrays = function (nums1, nums2) {\n    const canSwap = nums2.length < nums1.length;\n    if (canSwap) [nums1, nums2] = [nums2, nums1];\n\n    let [left, right] = [0, nums1.length - 1];\n    const totalLength = nums1.length + nums2.length;\n    const mid = totalLength >> 1;\n    const isEven = totalLength % 2 === 0;\n\n    while (true) {\n        const mid1 = left + right;\n        const mid2 = mid - mid1 - 2;\n        const { aLeft, aRight, bLeft, bRight } = getPointers(\n            nums1,\n            mid1,\n            nums2,\n            mid2,\n        );\n\n        const isTarget = aLeft <= bRight && bLeft <= aRight;\n        if (isTarget)\n            return isEven\n                ? (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2\n                : Math.min(aRight, bRight);\n\n        const isTargetGreater = aLeft <= bRight;\n        if (isTargetGreater) left = mid1 + 1;\n\n        const isTargetLess = bRight < aLeft;\n        if (isTargetLess) right = mid1 - 1;\n    }\n};\n\nconst getPointers = (nums1, mid1, nums2, mid2) => {\n    const getLeft = (nums, index) => (0 <= index ? nums[index] : -Infinity);\n\n    const [aLeft, bLeft] = [getLeft(nums1, mid1), getLeft(nums2, mid2)];\n\n    const getRight = (nums, index) =>\n        index + 1 < nums.length ? nums[index + 1] : Infinity;\n\n    const [aRight, bRight] = [getRight(nums1, mid1), getRight(nums2, mid2)];\n\n    return { aLeft, aRight, bLeft, bRight };\n};\n",
        "python": "# Time: log(min(n, m))\n\n\nclass Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        A, B = nums1, nums2\n        total = len(nums1) + len(nums2)\n        half = total // 2\n\n        if len(B) < len(A):\n            A, B = B, A\n\n        l, r = 0, len(A) - 1\n        while True:\n            i = (l + r) // 2  # A\n            j = half - i - 2  # B\n\n            Aleft = A[i] if i >= 0 else float(\"-infinity\")\n            Aright = A[i + 1] if (i + 1) < len(A) else float(\"infinity\")\n            Bleft = B[j] if j >= 0 else float(\"-infinity\")\n            Bright = B[j + 1] if (j + 1) < len(B) else float(\"infinity\")\n\n            # partition is correct\n            if Aleft <= Bright and Bleft <= Aright:\n                # odd\n                if total % 2:\n                    return min(Aright, Bright)\n                # even\n                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n            elif Aleft > Bright:\n                r = i - 1\n            else:\n                l = i + 1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Median of Two Sorted Arrays",
          "explanation": "Median of Two Sorted Arrays is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(N * M)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Binary Search"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Binary search requires:",
      "options": [
        "Sorted array only",
        "Monotonic condition",
        "Both",
        "Neither"
      ],
      "correct": 1,
      "explanation": "Binary search requires monotonicity — a condition that transitions from false to true (or vice versa) at the answer."
    }
  ],
  "cheatSheet": "# Binary Search\n```js\n// Find leftmost true\nlet lo=0,hi=n;\nwhile(lo<hi){\n  const mid=lo+Math.floor((hi-lo)/2);\n  if(condition(mid))hi=mid;\n  else lo=mid+1;\n}\nreturn lo;\n```",
  "proTips": [
    "Binary search on the answer for min/max optimization",
    "Careful with off-by-one in loop condition and hi/lo update"
  ],
  "faangQuotes": [
    "\"Median of Two Sorted Arrays requires thinking in partitions.\" — Google"
  ],
  "visualizationType": "array",
  "usage": "Used to efficiently search in sorted or monotonically changing search spaces by halving the search area.",
  "dsInvolved": "Array",
  "sampleProblems": [
    "Search in Rotated Sorted Array",
    "Find Minimum in Rotated Sorted Array",
    "Binary Search"
  ]
};
