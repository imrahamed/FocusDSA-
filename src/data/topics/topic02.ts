import { Topic } from "./types";

export const topic02: Topic = {
  "id": "topic02",
  "slug": "two-pointers",
  "title": "Two Pointers",
  "emoji": "👉",
  "color": "#22c55e",
  "gradient": "from-jade-500 to-jade-400",
  "layman": "Imagine finding two people in a sorted line who together weigh 150kg. Instead of checking everyone against everyone, stand one at each end and walk inward — if too heavy move the heavier side in; if too light move the lighter side.",
  "technical": "Two pointers exploit sorted order to reduce O(n²) nested loops to O(n). The invariant: maintain a valid search space that shrinks monotonically, guaranteeing termination and correctness.",
  "keyInsights": [
    "Requires sorted array OR specific structure (palindrome, partitioned)",
    "Left advances when we need a larger value, right retreats for smaller",
    "Can extend to 3Sum via outer loop + inner two pointers"
  ],
  "timeComplexities": [
    {
      "operation": "Two Sum II (sorted)",
      "best": "O(1)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    },
    {
      "operation": "3Sum",
      "best": "O(n²)",
      "avg": "O(n²)",
      "worst": "O(n²)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "container-water",
      "title": "Container With Most Water",
      "difficulty": "Medium",
      "description": "Given n vertical lines where line i has height height[i], find two lines that together with the x-axis contain the most water.",
      "examples": [
        {
          "input": "height = [1,8,6,2,5,4,8,3,7]",
          "output": "49"
        }
      ],
      "constraints": [
        "n == height.length",
        "2 ≤ n ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  \n}",
        "python": "def max_area(height):\n    left, right = 0, len(height) - 1"
      },
      "solution": {
        "js": "function maxArea(height) {\n  let left=0,right=height.length-1,max=0;\n  while(left<right){\n    max=Math.max(max,Math.min(height[left],height[right])*(right-left));\n    if(height[left]<height[right])left++;\n    else right--;\n  }\n  return max;\n}",
        "python": "def max_area(height):\n    left,right=0,len(height)-1; max_w=0\n    while left<right:\n        max_w=max(max_w,min(height[left],height[right])*(right-left))\n        if height[left]<height[right]: left+=1\n        else: right-=1\n    return max_w"
      },
      "testCases": [
        {
          "input": "[1,8,6,2,5,4,8,3,7]",
          "expected": "49"
        },
        {
          "input": "[1,1]",
          "expected": "1"
        },
        {
          "input": "[4,3,2,1,4]",
          "expected": "16",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Move the shorter wall inward — keeping the taller wall can only help."
      ],
      "tags": [
        "two-pointers",
        "greedy"
      ],
      "walkthrough": [
        {
          "title": "Start at both ends",
          "explanation": "Place left pointer at index 0 (height 1) and right pointer at index 8 (height 7). Water = min(1,7) × (8-0) = 1×8 = 8.",
          "phase": "init",
          "visual": {
            "type": "bars",
            "array": [
              1,
              8,
              6,
              2,
              5,
              4,
              8,
              3,
              7
            ],
            "states": [
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "active"
            ],
            "pointers": {
              "0": "L",
              "8": "R"
            }
          },
          "variables": {
            "left": 0,
            "right": 8,
            "area": 8,
            "max": 8
          }
        },
        {
          "title": "Move the shorter wall",
          "explanation": "height[left]=1 < height[right]=7. Moving the right pointer can only decrease width AND keep the same height limit (min). Moving left might find a taller wall. So left++.",
          "phase": "scan",
          "visual": {
            "type": "bars",
            "array": [
              1,
              8,
              6,
              2,
              5,
              4,
              8,
              3,
              7
            ],
            "states": [
              "eliminated",
              "active",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "active"
            ],
            "pointers": {
              "1": "L",
              "8": "R"
            }
          },
          "insight": "Greedy proof: the water is limited by the shorter side. Moving the shorter side is the ONLY way to possibly increase water height.",
          "variables": {
            "left": 1,
            "right": 8,
            "area": "min(8,7)×7 = 49",
            "max": 49
          }
        },
        {
          "title": "Found maximum: 49",
          "explanation": "height[left=1]=8, height[right=8]=7. Area = min(8,7)×7 = 49. This is the maximum! Continue shrinking until left≥right.",
          "phase": "found",
          "visual": {
            "type": "bars",
            "array": [
              1,
              8,
              6,
              2,
              5,
              4,
              8,
              3,
              7
            ],
            "states": [
              "eliminated",
              "result",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "result"
            ],
            "pointers": {
              "1": "L",
              "8": "R"
            }
          },
          "variables": {
            "max": 49,
            "width": 7,
            "height": "min(8,7)=7"
          },
          "complexity": "O(n) — each pointer moves inward at most n times total. O(1) space."
        }
      ]
    },
    {
      "id": "three-sum",
      "title": "3Sum",
      "difficulty": "Medium",
      "description": "Given an integer array nums, return all triplets [i,j,k] such that nums[i]+nums[j]+nums[k]==0. No duplicate triplets.",
      "examples": [
        {
          "input": "nums = [-1,0,1,2,-1,-4]",
          "output": "[[-1,-1,2],[-1,0,1]]"
        }
      ],
      "constraints": [
        "3 ≤ nums.length ≤ 3000"
      ],
      "starterCode": {
        "js": "function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  \n}",
        "python": "def three_sum(nums):\n    nums.sort()"
      },
      "solution": {
        "js": "function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  const res=[];\n  for(let i=0;i<nums.length-2;i++){\n    if(i>0&&nums[i]===nums[i-1])continue;\n    let l=i+1,r=nums.length-1;\n    while(l<r){\n      const s=nums[i]+nums[l]+nums[r];\n      if(s===0){res.push([nums[i],nums[l],nums[r]]);while(l<r&&nums[l]===nums[l+1])l++;while(l<r&&nums[r]===nums[r-1])r--;l++;r--;}\n      else if(s<0)l++;else r--;\n    }\n  }\n  return res;\n}",
        "python": "def three_sum(nums):\n    nums.sort(); res=[]\n    for i in range(len(nums)-2):\n        if i>0 and nums[i]==nums[i-1]: continue\n        l,r=i+1,len(nums)-1\n        while l<r:\n            s=nums[i]+nums[l]+nums[r]\n            if s==0: res.append([nums[i],nums[l],nums[r]]);l+=1;r-=1\n            elif s<0: l+=1\n            else: r-=1\n    return res"
      },
      "testCases": [
        {
          "input": "[-1,0,1,2,-1,-4]",
          "expected": "[[-1,-1,2],[-1,0,1]]"
        },
        {
          "input": "[0,0,0]",
          "expected": "[[0,0,0]]",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n²)",
      "spaceComplexity": "O(log n)",
      "hints": [
        "Sort first.",
        "Fix one number, then two-pointer on the rest.",
        "Skip duplicate outer elements."
      ],
      "tags": [
        "two-pointers",
        "sorting"
      ],
      "walkthrough": [
        {
          "title": "Sort the array",
          "explanation": "Sort [-1,0,1,2,-1,-4] → [-4,-1,-1,0,1,2]. Sorting is the prerequisite for two-pointer to work and makes duplicate skipping easy.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              -4,
              -1,
              -1,
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
              "5"
            ],
            "states": [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default"
            ]
          }
        },
        {
          "title": "Fix i=1 (value -1), two-pointer inner",
          "explanation": "Fix nums[i]=-1. Set L=i+1=2, R=5. Sum = -1+(-1)+2 = 0. Found triplet! Store [-1,-1,2], then advance both pointers and skip duplicates.",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              -4,
              -1,
              -1,
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
              "5"
            ],
            "states": [
              "eliminated",
              "pointer",
              "active",
              "default",
              "default",
              "found"
            ],
            "pointers": {
              "1": "i",
              "2": "L",
              "5": "R"
            }
          },
          "variables": {
            "nums[i]": -1,
            "nums[L]": -1,
            "nums[R]": 2,
            "sum": 0,
            "triplet": "[-1,-1,2]"
          },
          "insight": "Two-pointer on a sorted subarray: if sum<0, need bigger → L++. If sum>0, need smaller → R--. If sum=0, found it!"
        },
        {
          "title": "Continue: L=3, R=4",
          "explanation": "After advancing, L=3 (value 0), R=4 (value 1). Sum = -1+0+1 = 0. Found second triplet [-1,0,1]! Then L≥R, move to next i.",
          "phase": "found",
          "visual": {
            "type": "array",
            "array": [
              -4,
              -1,
              -1,
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
              "5"
            ],
            "states": [
              "eliminated",
              "pointer",
              "eliminated",
              "active",
              "active",
              "eliminated"
            ],
            "pointers": {
              "1": "i",
              "3": "L",
              "4": "R"
            }
          },
          "variables": {
            "triplet": "[-1,0,1]",
            "result": "[[-1,-1,2],[-1,0,1]]"
          },
          "complexity": "Time O(n²) — O(n) outer × O(n) two-pointer inner. Space O(log n) for sort."
        }
      ]
    },
    {
      "id": "trapping-rain-water",
      "title": "Trapping Rain Water",
      "difficulty": "Hard",
      "description": "Given n non-negative integers representing an elevation map, compute how much water it can trap.",
      "examples": [
        {
          "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          "output": "6"
        }
      ],
      "constraints": [
        "1 ≤ n ≤ 2×10⁴"
      ],
      "starterCode": {
        "js": "function trap(height) {\n  let left=0, right=height.length-1;\n  let leftMax=0, rightMax=0, water=0;\n}",
        "python": "def trap(height):\n    left,right=0,len(height)-1\n    left_max=right_max=water=0"
      },
      "solution": {
        "js": "function trap(height) {\n  let l=0,r=height.length-1,lm=0,rm=0,w=0;\n  while(l<r){\n    if(height[l]<height[r]){lm=Math.max(lm,height[l]);w+=lm-height[l];l++;}\n    else{rm=Math.max(rm,height[r]);w+=rm-height[r];r--;}\n  }\n  return w;\n}",
        "python": "def trap(height):\n    l,r=0,len(height)-1; lm=rm=w=0\n    while l<r:\n        if height[l]<height[r]: lm=max(lm,height[l]); w+=lm-height[l]; l+=1\n        else: rm=max(rm,height[r]); w+=rm-height[r]; r-=1\n    return w"
      },
      "testCases": [
        {
          "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
          "expected": "6"
        },
        {
          "input": "[4,2,0,3,2,5]",
          "expected": "9"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Water at cell = min(maxLeft, maxRight) − height[cell]",
        "Process from the smaller side first."
      ],
      "tags": [
        "two-pointers",
        "stack"
      ],
      "walkthrough": [
        {
          "title": "Water level formula",
          "explanation": "Water trapped at position i = min(maxLeft, maxRight) - height[i]. We need the highest wall on each side. Two-pointer maintains these incrementally.",
          "phase": "init",
          "visual": {
            "type": "bars",
            "array": [
              0,
              1,
              0,
              2,
              1,
              0,
              1,
              3,
              2,
              1,
              2,
              1
            ],
            "states": [
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
              "default"
            ]
          },
          "insight": "Key insight: process the side with the shorter max-wall. Why? Because water there is determined by that shorter side — the other side is guaranteed to be taller."
        },
        {
          "title": "Process left side (leftMax < rightMax)",
          "explanation": "height[left=0]=0 < height[right=11]=1. leftMax=0. Water at 0 = leftMax - height[0] = 0-0 = 0. Advance left.",
          "phase": "scan",
          "visual": {
            "type": "bars",
            "array": [
              0,
              1,
              0,
              2,
              1,
              0,
              1,
              3,
              2,
              1,
              2,
              1
            ],
            "states": [
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
              "comparing"
            ],
            "pointers": {
              "0": "L",
              "11": "R"
            }
          },
          "variables": {
            "left": 0,
            "right": 11,
            "leftMax": 0,
            "rightMax": 1,
            "water": 0
          }
        },
        {
          "title": "Accumulate trapped water",
          "explanation": "After full sweep: positions 2,4,5,6,9,10 trap water. Total = 0+0+1+0+0+1+0+2+1+0+1+0 = 6.",
          "phase": "done",
          "visual": {
            "type": "bars",
            "array": [
              0,
              1,
              0,
              2,
              1,
              0,
              1,
              3,
              2,
              1,
              2,
              1
            ],
            "states": [
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
              "visited"
            ]
          },
          "variables": {
            "totalWater": 6
          },
          "complexity": "O(n) time — single pass. O(1) space — just 4 variables."
        }
      ]
    },
    {
      "id": "valid-palindrome",
      "title": "Valid Palindrome",
      "difficulty": "Easy",
      "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
      "examples": [
        {
          "input": "s = \"A man, a plan, a canal: Panama\"",
          "output": "true"
        }
      ],
      "constraints": [
        "1 ≤ s.length ≤ 2*10^5"
      ],
      "starterCode": {
        "js": "function isPalindrome(s) {\n  \n}",
        "python": "def is_palindrome(s):\n    pass"
      },
      "solution": {
        "js": "function isPalindrome(s) {\n  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    if (s[l] !== s[r]) return false;\n    l++; r--;\n  }\n  return true;\n}",
        "python": "def is_palindrome(s):\n    s = [c.lower() for c in s if c.isalnum()]\n    return s == s[::-1]"
      },
      "testCases": [
        {
          "input": "\"A man, a plan, a canal: Panama\"",
          "expected": "true"
        },
        {
          "input": "\"race a car\"",
          "expected": "false"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Use two pointers, one from the start and one from the end, skipping non-alphanumeric characters."
      ],
      "tags": [
        "two-pointers",
        "string"
      ],
      "walkthrough": []
    },
    {
      "id": "two-sum-ii-input-array-is-sorted",
      "title": "Two Sum II - Input Array Is Sorted",
      "difficulty": "Medium",
      "description": "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.\n\nReturn the indices of the two numbers index1 and index2, each incremented by one, as an integer array [index1, index2] of length 2.\n\nThe tests are generated such that there is exactly one solution. You may not use the same element twice.\n\nYour solution must use only constant extra space.\n\n \nExample 1:\n\n\n<strong>Input:</strong> numbers = [<u>2</u>,<u>7</u>,11,15], target = 9\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of 2 and 7 is 9. Therefore, index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n\n\nExample 2:\n\n\n<strong>Input:</strong> numbers = [<u>2</u>,3,<u>4</u>], target = 6\n<strong>Output:</strong> [1,3]\n<strong>Explanation:</strong> The sum of 2 and 4 is 6. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 3. We return [1, 3].\n\n\nExample 3:\n\n\n<strong>Input:</strong> numbers = [<u>-1</u>,<u>0</u>], target = -1\n<strong>Output:</strong> [1,2]\n<strong>Explanation:</strong> The sum of -1 and 0 is -1. Therefore index<sub>1</sub> = 1, index<sub>2</sub> = 2. We return [1, 2].\n\n\n \nConstraints:\n\n\n\t2 <= numbers.length <= 3 * 104\n\t-1000 <= numbers[i] <= 1000\n\tnumbers is sorted in non-decreasing order.\n\t-1000 <= target <= 1000\n\tThe tests are generated such that there is exactly one s...",
      "examples": [
        {
          "input": "[2,7,11,15]",
          "output": "See problem description for expected output."
        },
        {
          "input": "9",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,3,4]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function twoSumIiInputArrayIsSorted(input) {\n  // Your code here\n}",
        "python": "def two_sum_ii_input_array_is_sorted(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/\n * Time O(N) | Space O(1)\n * @param {number[]} numbers\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function (numbers, target) {\n    let [left, right] = [0, numbers.length - 1];\n\n    while (left < right) {\n        const sum = numbers[left] + numbers[right];\n\n        const isTarget = sum === target;\n        if (isTarget) return [left + 1, right + 1];\n\n        const isTargetGreater = sum < target;\n        if (isTargetGreater) left++;\n\n        const isTargetLess = target < sum;\n        if (isTargetLess) right--;\n    }\n\n    return [-1, -1];\n};\n",
        "python": "class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        l, r = 0, len(numbers) - 1\n\n        while l < r:\n            curSum = numbers[l] + numbers[r]\n\n            if curSum > target:\n                r -= 1\n            elif curSum < target:\n                l += 1\n            else:\n                return [l + 1, r + 1]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Two Sum II - Input Array Is Sorted",
          "explanation": "Two Sum II - Input Array Is Sorted is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Two Pointers"
      ],
      "hints": []
    },
    {
      "id": "3sum",
      "title": "3Sum",
      "difficulty": "Medium",
      "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\n \nExample 1:\n\n\n<strong>Input:</strong> nums = [-1,0,1,2,-1,-4]\n<strong>Output:</strong> [[-1,-1,2],[-1,0,1]]\n<strong>Explanation:</strong> \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n\n\nExample 2:\n\n\n<strong>Input:</strong> nums = [0,1,1]\n<strong>Output:</strong> []\n<strong>Explanation:</strong> The only possible triplet does not sum up to 0.\n\n\nExample 3:\n\n\n<strong>Input:</strong> nums = [0,0,0]\n<strong>Output:</strong> [[0,0,0]]\n<strong>Explanation:</strong> The only possible triplet sums up to 0.\n\n\n \nConstraints:\n\n\n\t3 <= nums.length <= 3000\n\t-105 <= nums[i] <= 105",
      "examples": [
        {
          "input": "[-1,0,1,2,-1,-4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,1,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[0,0,0]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function 3sum(input) {\n  // Your code here\n}",
        "python": "def 3sum(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function (nums) {\n    const res = [];\n    nums.sort((a, b) => a - b);\n\n    for (let i = 0; i < nums.length; i++) {\n        const a = nums[i];\n        if (a > 0) break;\n        if (i > 0 && a === nums[i - 1]) continue;\n\n        let l = i + 1;\n        let r = nums.length - 1;\n        while (l < r) {\n            const threeSum = a + nums[l] + nums[r];\n            if (threeSum > 0) {\n                r--;\n            } else if (threeSum < 0) {\n                l++;\n            } else {\n                res.push([a, nums[l], nums[r]]);\n                l++;\n                r--;\n                while (nums[l] === nums[l - 1] && l < r) {\n                    l++;\n                }\n            }\n        }\n    }\n    return res;\n};\n",
        "python": "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        nums.sort()\n\n        for i, a in enumerate(nums):\n            # Skip positive integers\n            if a > 0:\n                break\n\n            if i > 0 and a == nums[i - 1]:\n                continue\n\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                threeSum = a + nums[l] + nums[r]\n                if threeSum > 0:\n                    r -= 1\n                elif threeSum < 0:\n                    l += 1\n                else:\n                    res.append([a, nums[l], nums[r]])\n                    l += 1\n                    r -= 1\n                    while nums[l] == nums[l - 1] and l < r:\n                        l += 1\n                        \n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding 3Sum",
          "explanation": "3Sum is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Two Pointers"
      ],
      "hints": [
        "So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!",
        "For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
        "The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
      ]
    },
    {
      "id": "container-with-most-water",
      "title": "Container With Most Water",
      "difficulty": "Medium",
      "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.\n\n \nExample 1:\n\n\n<strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]\n<strong>Output:</strong> 49\n<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\n\n\nExample 2:\n\n\n<strong>Input:</strong> height = [1,1]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\tn == height.length\n\t2 <= n <= 105\n\t0 <= height[i] <= 104",
      "examples": [
        {
          "input": "[1,8,6,2,5,4,8,3,7]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1,1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function containerWithMostWater(input) {\n  // Your code here\n}",
        "python": "def container_with_most_water(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/container-with-most-water/\n * Two pointers, Time O(N) | Space(1)\n * @param {number[]} height\n * @return {number}\n */\n\nvar maxArea = function (height) {\n    let [left, right, max] = [0, height.length - 1, 0];\n\n    while (left < right) {\n        let containerHeight, area;\n        let containerWidth = right - left;\n\n        if (height[left] < height[right]) {\n            containerHeight = height[left];\n            left++;\n        } else {\n            containerHeight = height[right];\n            right--;\n        }\n\n        area = containerWidth * containerHeight;\n\n        if (area > max) {\n            max = area;\n        }\n    }\n\n    return max;\n};\n",
        "python": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        l, r = 0, len(height) - 1\n        res = 0\n\n        while l < r:\n            res = max(res, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r]:\n                l += 1\n            elif height[r] <= height[l]:\n                r -= 1\n            \n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Container With Most Water",
          "explanation": "Container With Most Water is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Two Pointers"
      ],
      "hints": [
        "If you simulate the problem, it will be O(n^2) which is not efficient.",
        "Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.",
        "How can you calculate the amount of water at each step?"
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "In Container With Most Water, why do we always move the shorter wall?",
      "options": [
        "Arbitrary choice",
        "Moving taller wall can only decrease area",
        "Algorithm requirement",
        "Both B is correct"
      ],
      "correct": 1,
      "explanation": "Area = min(h[l],h[r])×width. Height is capped by shorter wall. Moving shorter wall might increase height; moving taller wall keeps height the same or worse."
    }
  ],
  "cheatSheet": "# Two Pointers\n```js\nlet l=0, r=arr.length-1;\nwhile(l<r) {\n  if(condition) l++;\n  else r--;\n}\n```",
  "proTips": [
    "Sort array first unless problem says otherwise",
    "For 3Sum: fix outer, two-pointer inner, skip duplicates"
  ],
  "faangQuotes": [
    "\"Trapping Rain Water is our gold standard Hard problem — it requires the invariant insight.\" — Amazon"
  ],
  "usefulLinks": [
    {
      "title": "Two Pointer Technique",
      "url": "https://leetcode.com/articles/two-pointer-technique/"
    }
  ],
  "visualizationType": "array",
  "usage": "Used when searching for pairs in a sorted array, finding a subarray that meets a condition, or reversing elements.",
  "dsInvolved": "Array, String",
  "sampleProblems": [
    "Container With Most Water",
    "3Sum",
    "Trapping Rain Water",
    "Valid Palindrome"
  ]
};
