import { Topic } from "./types";

export const topic10: Topic = {
  "id": "topic10",
  "slug": "sorting",
  "title": "Sorting Algorithms",
  "emoji": "🔢",
  "color": "#e879f9",
  "gradient": "from-fuchsia-500 to-violet-400",
  "layman": "QuickSort picks a pivot and puts smaller values left, larger right, then repeats. MergeSort splits in half repeatedly then merges sorted halves.",
  "technical": "Comparison sorts: Ω(n log n) lower bound. QuickSort O(n log n) avg. MergeSort O(n log n) guaranteed, stable. HeapSort O(n log n) in-place. Counting/Radix O(n+k).",
  "keyInsights": [
    "QuickSort: random pivot avoids O(n²) worst case",
    "MergeSort: stable, guaranteed O(n log n), extra O(n) space",
    "Stability: equal elements maintain relative order"
  ],
  "timeComplexities": [
    {
      "operation": "QuickSort",
      "best": "O(n log n)",
      "avg": "O(n log n)",
      "worst": "O(n²)",
      "space": "O(log n)"
    },
    {
      "operation": "MergeSort",
      "best": "O(n log n)",
      "avg": "O(n log n)",
      "worst": "O(n log n)",
      "space": "O(n)"
    },
    {
      "operation": "HeapSort",
      "best": "O(n log n)",
      "avg": "O(n log n)",
      "worst": "O(n log n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "sort-colors",
      "title": "Sort Colors (Dutch National Flag)",
      "difficulty": "Medium",
      "description": "Sort array of 0s, 1s, 2s in-place (red/white/blue).",
      "examples": [
        {
          "input": "nums=[2,0,2,1,1,0]",
          "output": "[0,0,1,1,2,2]"
        }
      ],
      "constraints": [
        "n==nums.length",
        "1≤n≤300"
      ],
      "starterCode": {
        "js": "function sortColors(nums){\n  let lo=0,mid=0,hi=nums.length-1;\n}",
        "python": "def sort_colors(nums):\n    lo=mid=0; hi=len(nums)-1"
      },
      "solution": {
        "js": "function sortColors(nums){\n  let lo=0,mid=0,hi=nums.length-1;\n  while(mid<=hi){\n    if(nums[mid]===0){[nums[lo],nums[mid]]=[nums[mid],nums[lo]];lo++;mid++;}\n    else if(nums[mid]===1)mid++;\n    else{[nums[mid],nums[hi]]=[nums[hi],nums[mid]];hi--;}\n  }\n}",
        "python": "def sort_colors(nums):\n    lo=mid=0;hi=len(nums)-1\n    while mid<=hi:\n        if nums[mid]==0: nums[lo],nums[mid]=nums[mid],nums[lo];lo+=1;mid+=1\n        elif nums[mid]==1: mid+=1\n        else: nums[mid],nums[hi]=nums[hi],nums[mid];hi-=1"
      },
      "testCases": [
        {
          "input": "[2,0,2,1,1,0]",
          "expected": "[0,0,1,1,2,2]"
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "hints": [
        "Three pointers: lo (0s region end), mid (current), hi (2s region start)."
      ],
      "tags": [
        "sorting",
        "two-pointers"
      ],
      "walkthrough": [
        {
          "title": "Three-pointer invariant",
          "explanation": "lo: everything before lo is 0. hi: everything after hi is 2. mid: current element being classified.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              2,
              0,
              2,
              1,
              1,
              0
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
              "comparing"
            ],
            "pointers": {
              "0": "lo/mid",
              "5": "hi"
            }
          }
        },
        {
          "title": "nums[mid]=2 → swap with hi",
          "explanation": "nums[0]=2. Swap with nums[hi=5]=0. hi--. Do NOT advance mid (new value at mid unseen).",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              0,
              0,
              2,
              1,
              1,
              2
            ],
            "states": [
              "active",
              "default",
              "comparing",
              "default",
              "default",
              "eliminated"
            ],
            "pointers": {
              "0": "lo/mid",
              "4": "hi"
            }
          },
          "variables": {
            "lo": 0,
            "mid": 0,
            "hi": 4
          }
        },
        {
          "title": "nums[mid]=0 → swap with lo",
          "explanation": "nums[0]=0. Swap with nums[lo=0] (itself). lo++,mid++.",
          "phase": "update",
          "visual": {
            "type": "array",
            "array": [
              0,
              0,
              2,
              1,
              1,
              2
            ],
            "states": [
              "found",
              "active",
              "comparing",
              "default",
              "default",
              "eliminated"
            ],
            "pointers": {
              "0": "sorted",
              "1": "lo/mid",
              "4": "hi"
            }
          }
        },
        {
          "title": "Final sorted array",
          "explanation": "After all iterations: [0,0,1,1,2,2]. Each pointer moves at most n times. One pass.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              0,
              0,
              1,
              1,
              2,
              2
            ],
            "states": [
              "found",
              "found",
              "visited",
              "visited",
              "result",
              "result"
            ]
          },
          "complexity": "O(n) time, O(1) space — single pass with three pointers."
        }
      ]
    },
    {
      "id": "insert-interval",
      "title": "Insert Interval",
      "difficulty": "Medium",
      "description": "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.\n\nInsert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).\n\nReturn intervals after the insertion.\n\nNote that you don't need to modify intervals in-place. You can make a new array and return it.\n\n \nExample 1:\n\n\n<strong>Input:</strong> intervals = [[1,3],[6,9]], newInterval = [2,5]\n<strong>Output:</strong> [[1,5],[6,9]]\n\n\nExample 2:\n\n\n<strong>Input:</strong> intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\n<strong>Output:</strong> [[1,2],[3,10],[12,16]]\n<strong>Explanation:</strong> Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].\n\n\n \nConstraints:\n\n\n\t0 <= intervals.length <= 104\n\tintervals[i].length == 2\n\t0 <= starti <= endi <= 105\n\tintervals is sorted by starti in ascending order.\n\tnewInterval.length == 2\n\t0 <= start <= end <= 105",
      "examples": [
        {
          "input": "[[1,3],[6,9]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,2],[3,5],[6,7],[8,10],[12,16]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function insertInterval(input) {\n  // Your code here\n}",
        "python": "def insert_interval(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/insert-interval/\n * Time O(N) | Space O(N)\n * @param {number[][]} intervals\n * @param {number[]} newInterval\n * @return {number[][]}\n */\nvar insert = function (intervals, newInterval) {\n    const { beforeIndex, before } = getBefore(intervals, newInterval);\n    const afterIndex = mergeIntervals(intervals, newInterval, beforeIndex);\n    const after = intervals.slice(afterIndex);\n\n    return [...before, newInterval, ...after];\n};\n\nconst getBefore = (intervals, newInterval, index = 0, before = []) => {\n    const hasGap = ([prevStart, prevEnd], [currStart, currEnd]) =>\n        prevEnd < currStart;\n\n    while (index < intervals.length && hasGap(intervals[index], newInterval)) {\n        const current = intervals[index];\n\n        before.push(current);\n        index++;\n    }\n\n    return { beforeIndex: index, before };\n};\n\nconst mergeIntervals = (intervals, newInterval, index) => {\n    const hasOverlap = ([prevStart, prevEnd], [currStart, currEnd]) =>\n        currStart <= prevEnd;\n\n    while (\n        index < intervals.length &&\n        hasOverlap(newInterval, intervals[index])\n    ) {\n        const current = intervals[index];\n\n        newInterval[0] = Math.min(newInterval[0], current[0]);\n        newInterval[1] = Math.max(newInterval[1], current[1]);\n        index++;\n    }\n\n    return index;\n};\n",
        "python": "class Solution:\n    def insert(\n        self, intervals: List[List[int]], newInterval: List[int]\n    ) -> List[List[int]]:\n        res = []\n\n        for i in range(len(intervals)):\n            if newInterval[1] < intervals[i][0]:\n                res.append(newInterval)\n                return res + intervals[i:]\n            elif newInterval[0] > intervals[i][1]:\n                res.append(intervals[i])\n            else:\n                newInterval = [\n                    min(newInterval[0], intervals[i][0]),\n                    max(newInterval[1], intervals[i][1]),\n                ]\n        res.append(newInterval)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Insert Interval",
          "explanation": "Insert Interval is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Intervals"
      ],
      "hints": [
        "Intervals Array is sorted. Can you use Binary Search to find the correct position to insert the new Interval.?",
        "Can you try merging the overlapping intervals while inserting the new interval?",
        "This can be done by comparing the end of the last interval with the start of the new interval and vice versa."
      ]
    },
    {
      "id": "merge-intervals",
      "title": "Merge Intervals",
      "difficulty": "Medium",
      "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n \nExample 1:\n\n\n<strong>Input:</strong> intervals = [[1,3],[2,6],[8,10],[15,18]]\n<strong>Output:</strong> [[1,6],[8,10],[15,18]]\n<strong>Explanation:</strong> Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n\n\nExample 2:\n\n\n<strong>Input:</strong> intervals = [[1,4],[4,5]]\n<strong>Output:</strong> [[1,5]]\n<strong>Explanation:</strong> Intervals [1,4] and [4,5] are considered overlapping.\n\n\nExample 3:\n\n\n<strong>Input:</strong> intervals = [[4,7],[1,4]]\n<strong>Output:</strong> [[1,7]]\n<strong>Explanation:</strong> Intervals [1,4] and [4,7] are considered overlapping.\n\n\n \nConstraints:\n\n\n\t1 <= intervals.length <= 104\n\tintervals[i].length == 2\n\t0 <= starti <= endi <= 104",
      "examples": [
        {
          "input": "[[1,3],[2,6],[8,10],[15,18]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,4],[4,5]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[4,7],[1,4]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function mergeIntervals(input) {\n  // Your code here\n}",
        "python": "def merge_intervals(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/merge-intervals/\n * Time O(N * logN) | Space O(N)\n * @param {number[][]} intervals\n * @return {number[][]}\n */\nvar merge = function (intervals) {\n    intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>\n        aStart !== bStart ? aStart - bStart : aEnd - bEnd,\n    );\n\n    return mergerInterval(intervals);\n};\n\nconst mergerInterval = (intervals, merged = []) => {\n    let prev = intervals.shift();\n\n    for (const curr of intervals) {\n        const [prevStart, prevEnd] = prev;\n        const [currStart, currEnd] = curr;\n\n        const hasOverlap = currStart <= prevEnd;\n        if (hasOverlap) {\n            prev[1] = Math.max(prev[1], curr[1]);\n            continue;\n        }\n\n        merged.push(prev);\n        prev = curr;\n    }\n\n    return [...merged, prev];\n};\n",
        "python": "class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        intervals.sort(key=lambda pair: pair[0])\n        output = [intervals[0]]\n\n        for start, end in intervals:\n            lastEnd = output[-1][1]\n\n            if start <= lastEnd:\n                # merge\n                output[-1][1] = max(lastEnd, end)\n            else:\n                output.append([start, end])\n        return output\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Merge Intervals",
          "explanation": "Merge Intervals is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * logN)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Intervals"
      ],
      "hints": []
    },
    {
      "id": "non-overlapping-intervals",
      "title": "Non-overlapping Intervals",
      "difficulty": "Medium",
      "description": "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\nNote that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.\n\n \nExample 1:\n\n\n<strong>Input:</strong> intervals = [[1,2],[2,3],[3,4],[1,3]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> [1,3] can be removed and the rest of the intervals are non-overlapping.\n\n\nExample 2:\n\n\n<strong>Input:</strong> intervals = [[1,2],[1,2],[1,2]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> You need to remove two [1,2] to make the rest of the intervals non-overlapping.\n\n\nExample 3:\n\n\n<strong>Input:</strong> intervals = [[1,2],[2,3]]\n<strong>Output:</strong> 0\n<strong>Explanation:</strong> You don't need to remove any of the intervals since they're already non-overlapping.\n\n\n \nConstraints:\n\n\n\t1 <= intervals.length <= 105\n\tintervals[i].length == 2\n\t-5 * 104 <= starti < endi <= 5 * 104",
      "examples": [
        {
          "input": "[[1,2],[2,3],[3,4],[1,3]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,2],[1,2],[1,2]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,2],[2,3]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function nonOverlappingIntervals(input) {\n  // Your code here\n}",
        "python": "def non_overlapping_intervals(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/non-overlapping-intervals/\n * Time O(N * logN) | Space O(1)\n * @param {number[][]} intervals\n * @return {number}\n */\nvar eraseOverlapIntervals = function (intervals) {\n    intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>\n        aEnd !== bEnd ? aEnd - bEnd : aStart - bStart,\n    );\n\n    return getGaps(intervals);\n};\n\nconst getGaps = (intervals, gaps = 1) => {\n    const prev = intervals.shift();\n\n    for (const curr of intervals) {\n        const [prevStart, prevEnd] = prev;\n        const [currStart, currEnd] = curr;\n\n        const hasGap = prevEnd <= currStart;\n        if (!hasGap) continue;\n\n        prev[1] = curr[1];\n        gaps++;\n    }\n\n    return intervals.length + 1 - gaps;\n};\n",
        "python": "class Solution:\n    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:\n        intervals.sort()\n        res = 0\n        prevEnd = intervals[0][1]\n        for start, end in intervals[1:]:\n            if start >= prevEnd:\n                prevEnd = end\n            else:\n                res += 1\n                prevEnd = min(end, prevEnd)\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Non-overlapping Intervals",
          "explanation": "Non-overlapping Intervals is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * logN)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Intervals"
      ],
      "hints": []
    },
    {
      "id": "meeting-rooms",
      "title": "Meeting Rooms",
      "difficulty": "Easy",
      "description": "Solve the Meeting Rooms problem.",
      "examples": [
        {
          "input": "[[0,30],[5,10],[15,20]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[7,10],[2,4]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function meetingRooms(input) {\n  // Your code here\n}",
        "python": "def meeting_rooms(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/meeting-rooms/\n * Time O(N * logN) | Space O(1)\n * @param {number[][]} intervals\n * @return {boolean}\n */\nvar canAttendMeetings = function (intervals) {\n    intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>\n        aStart !== bStart ? aStart - bStart : aEnd - bEnd,\n    );\n\n    return canAttend(intervals);\n};\n\nconst canAttend = (intervals) => {\n    let prev = intervals.shift();\n\n    for (const curr of intervals) {\n        const [prevStart, prevEnd] = prev;\n        const [currStart, currEnd] = curr;\n\n        const hasOverlap = currStart < prevEnd;\n        if (hasOverlap) return false;\n\n        prev = curr;\n    }\n\n    return true;\n};\n",
        "python": "class Solution:\n    \"\"\"\n    @param intervals: an array of meeting time intervals\n    @return: if a person could attend all meetings\n    \"\"\"\n\n    def canAttendMeetings(self, intervals):\n        intervals.sort(key=lambda i: i[0])\n\n        for i in range(1, len(intervals)):\n            i1 = intervals[i - 1]\n            i2 = intervals[i]\n\n            if i1[1] > i2[0]:\n                return False\n        return True\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Meeting Rooms",
          "explanation": "Meeting Rooms is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * logN)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Intervals"
      ],
      "hints": []
    },
    {
      "id": "meeting-rooms-ii",
      "title": "Meeting Rooms II",
      "difficulty": "Medium",
      "description": "Solve the Meeting Rooms II problem.",
      "examples": [
        {
          "input": "[[0,30],[5,10],[15,20]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[7,10],[2,4]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function meetingRoomsIi(input) {\n  // Your code here\n}",
        "python": "def meeting_rooms_ii(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/meeting-rooms-ii/\n * Time O((N * logN) + (M * logM)) | Space O(1)\n * @param {number[][]} intervals\n * @return {number}\n */\nvar minMeetingRooms = function (intervals) {\n    const { start, end } = splitIntervals(intervals);\n    let [minRooms, startIndex, endIndex] = [0, 0, 0];\n\n    while (startIndex < intervals.length) {\n        const [currStart, prevEnd] = [start[startIndex], end[endIndex]];\n\n        const hasGap = prevEnd <= currStart;\n        if (hasGap) {\n            minRooms--;\n            endIndex++;\n        }\n\n        minRooms++;\n        startIndex++;\n    }\n\n    return minRooms;\n};\n\nconst splitIntervals = (intervals, start = [], end = []) => {\n    for (const [startTime, endTime] of intervals) {\n        start.push(startTime);\n        end.push(endTime);\n    }\n\n    const comparator = (a, b) => a - b;\n\n    start.sort(comparator);\n    end.sort(comparator);\n\n    return { start, end };\n};\n",
        "python": "def minMeetingRooms(self, intervals: List[List[int]]) -> int:\n        time = []\n        for start, end in intervals:\n            time.append((start, 1))\n            time.append((end, -1))\n        \n        time.sort(key=lambda x: (x[0], x[1]))\n        \n        count = 0\n        max_count = 0\n        for t in time:\n            count += t[1]\n            max_count = max(max_count, count)\n        return max_count\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Meeting Rooms II",
          "explanation": "Meeting Rooms II is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O((N * logN)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Intervals"
      ],
      "hints": [
        "Think about how we would approach this problem in a very simplistic way. We will allocate rooms to meetings that occur earlier in the day v/s the ones that occur later on, right?",
        "If you've figured out that we have to <b>sort</b> the meetings by their start time, the next thing to think about is how do we do the allocation? <br>There are two scenarios possible here for any meeting. Either there is no meeting room available and a new one has to be allocated, or a meeting room has freed up and this meeting can take place there.",
        "An important thing to note is that we don't really care <b>which</b> room gets freed up while allocating a room for the current meeting. As long as a room is free, our job is done. <br><br>We already know the rooms we have allocated till now and we also know when are they due to get free because of the end times of the meetings going on in those rooms. We can simply check the room which is due to get vacated the earliest amongst all the allocated rooms.",
        "Following up on the previous hint, we can make use of a min-heap to store the end times of the meetings in various rooms. <br><br>So, every time we want to check if any room is free or not, simply check the topmost element of the min heap as that would be the room that would get free the earliest out of all the other rooms currently occupied.\r\n\r\n<br><br>If the room we extracted from the top of the min heap isn't free, then no other room is. So, we can save time here and simply allocate a new room."
      ]
    },
    {
      "id": "minimum-interval-to-include-each-query",
      "title": "Minimum Interval to Include Each Query",
      "difficulty": "Hard",
      "description": "You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval starting at lefti and ending at righti (inclusive). The size of an interval is defined as the number of integers it contains, or more formally righti - lefti + 1.\n\nYou are also given an integer array queries. The answer to the jth query is the size of the smallest interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1.\n\nReturn an array containing the answers to the queries.\n\n \nExample 1:\n\n\n<strong>Input:</strong> intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]\n<strong>Output:</strong> [3,3,1,4]\n<strong>Explanation:</strong> The queries are processed as follows:\n- Query = 2: The interval [2,4] is the smallest interval containing 2. The answer is 4 - 2 + 1 = 3.\n- Query = 3: The interval [2,4] is the smallest interval containing 3. The answer is 4 - 2 + 1 = 3.\n- Query = 4: The interval [4,4] is the smallest interval containing 4. The answer is 4 - 4 + 1 = 1.\n- Query = 5: The interval [3,6] is the smallest interval containing 5. The answer is 6 - 3 + 1 = 4.\n\n\nExample 2:\n\n\n<strong>Input:</strong> intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]\n<strong>Output:</strong> [2,-1,4,6]\n<strong>Explanation:</strong> The queries are processed as follows:\n- Query = 2: The interval [2,3] is the smallest interval containing 2. The answer is 3 - 2 + 1 = 2.\n- Query = 19: None of the intervals contain 19. The answer is -1....",
      "examples": [
        {
          "input": "[[1,4],[2,4],[3,6],[4,4]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[2,3,4,5]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[2,3],[2,5],[1,8],[20,25]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function minimumIntervalToIncludeEachQuery(input) {\n  // Your code here\n}",
        "python": "def minimum_interval_to_include_each_query(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Minimum Interval to Include Each Query",
          "explanation": "Minimum Interval to Include Each Query is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Intervals"
      ],
      "hints": [
        "Is there a way to order the intervals and queries such that it takes less time to query?",
        "Is there a way to add and remove intervals by going from the smallest query to the largest query to find the minimum size?"
      ]
    },
    {
      "id": "rotate-image",
      "title": "Rotate Image",
      "difficulty": "Medium",
      "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.\n\n \nExample 1:\n\n\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [[7,4,1],[8,5,2],[9,6,3]]\n\n\nExample 2:\n\n\n<strong>Input:</strong> matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\n<strong>Output:</strong> [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]\n\n\n \nConstraints:\n\n\n\tn == matrix.length == matrix[i].length\n\t1 <= n <= 20\n\t-1000 <= matrix[i][j] <= 1000",
      "examples": [
        {
          "input": "[[1,2,3],[4,5,6],[7,8,9]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function rotateImage(input) {\n  // Your code here\n}",
        "python": "def rotate_image(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Time O(ROWS * COLS) | Space O(1)\n * https://leetcode.com/problems/rotate-image/\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar rotate = (matrix) => {\n    transpose(matrix); /* Time O(ROWS * COLS) */\n    reflect(matrix); /* Time O(ROWS * COLS) */\n};\n\nvar transpose = (matrix) => {\n    const rows = matrix.length;\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = row + 1; col < rows; col++) {\n            /* Time O(COLS) */\n            swap1(matrix, row, col);\n        }\n    }\n};\n\nvar swap1 = (matrix, row, col) =>\n    ([matrix[row][col], matrix[col][row]] = [\n        matrix[col][row],\n        matrix[row][col],\n    ]);\n\nvar reflect = (matrix) => {\n    const rows = matrix.length;\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < rows / 2; col++) {\n            /* Time O(COLS) */\n            const reflection = rows - col - 1;\n\n            swap2(matrix, row, col, reflection);\n        }\n    }\n};\n\nvar swap2 = (matrix, row, col, reflection) =>\n    ([matrix[row][col], matrix[row][reflection]] = [\n        matrix[row][reflection],\n        matrix[row][col],\n    ]);\n\n/**\n * Time O(ROWS * COLS) | Space O(1)\n * https://leetcode.com/problems/rotate-image/\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar rotate = (matrix) => {\n    reverse(matrix); /* Time O(ROWS) */\n    transpose(matrix); /* Time O(ROWS * COLS) */\n};\n\nvar reverse = (matrix) => matrix.reverse();\n\nvar transpose = (matrix) => {\n    const rows = matrix.length;\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 0; col < row; col++) {\n            /* Time O(COLS) */\n            swap(matrix, row, col);\n        }\n    }\n};\n\nvar swap = (matrix, row, col) =>\n    ([matrix[row][col], matrix[col][row]] = [\n        matrix[col][row],\n        matrix[row][col],\n    ]);\n",
        "python": "class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        \"\"\"\n        Do not return anything, modify matrix in-place instead.\n        \"\"\"\n        l, r = 0, len(matrix) - 1\n        while l < r:\n            for i in range(r - l):\n                top, bottom = l, r\n\n                # save the topleft\n                topLeft = matrix[top][l + i]\n\n                # move bottom left into top left\n                matrix[top][l + i] = matrix[bottom - i][l]\n\n                # move bottom right into bottom left\n                matrix[bottom - i][l] = matrix[bottom][r - i]\n\n                # move top right into bottom right\n                matrix[bottom][r - i] = matrix[top + i][r]\n\n                # move top left into top right\n                matrix[top + i][r] = topLeft\n            r -= 1\n            l += 1\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Rotate Image",
          "explanation": "Rotate Image is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": []
    },
    {
      "id": "spiral-matrix",
      "title": "Spiral Matrix",
      "difficulty": "Medium",
      "description": "Given an m x n matrix, return all elements of the matrix in spiral order.\n\n \nExample 1:\n\n\n<strong>Input:</strong> matrix = [[1,2,3],[4,5,6],[7,8,9]]\n<strong>Output:</strong> [1,2,3,6,9,8,7,4,5]\n\n\nExample 2:\n\n\n<strong>Input:</strong> matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n<strong>Output:</strong> [1,2,3,4,8,12,11,10,9,5,6,7]\n\n\n \nConstraints:\n\n\n\tm == matrix.length\n\tn == matrix[i].length\n\t1 <= m, n <= 10\n\t-100 <= matrix[i][j] <= 100",
      "examples": [
        {
          "input": "[[1,2,3],[4,5,6],[7,8,9]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function spiralMatrix(input) {\n  // Your code here\n}",
        "python": "def spiral_matrix(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Matrix - Spiral Traversal Pre Update\n * Array - Ignore Auxilary Space O(ROWS * COLS)\n * Time O(ROWS * COLS) | Space O(1)\n * https://leetcode.com/problems/spiral-matrix/\n * @param {number[][]} matrix\n * @return {number[]}\n */\nvar spiralOrder = function (matrix, order = []) {\n    const [rows, cols] = [matrix.length - 1, matrix[0].length - 1];\n    let [top, bot, left, right] = [0, rows, 0, cols];\n\n    const isInBounds = () => left <= right && top <= bot;\n    while (isInBounds()) {\n        /* Time O(ROWS * COLS) */\n        addTop(\n            matrix,\n            top,\n            bot,\n            left,\n            right,\n            order,\n        ); /* Time O(COLS)        | Ignore Auxilary Spsace O(ROWS * COLS) */\n        top++;\n\n        addRight(\n            matrix,\n            top,\n            bot,\n            left,\n            right,\n            order,\n        ); /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */\n        right--;\n\n        const hasRow = top <= bot;\n        if (hasRow) {\n            addBot(\n                matrix,\n                top,\n                bot,\n                left,\n                right,\n                order,\n            ); /* Time O(COLS)         | Ignore Auxilary Spsace O(ROWS * COLS) */\n            bot--;\n        }\n\n        const hasCol = left <= right;\n        if (hasCol) {\n            addLeft(\n                matrix,\n                top,\n                bot,\n                left,\n                right,\n                order,\n            ); /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */\n            left++;\n        }\n    }\n\n    return order;\n};\n\nvar addTop = (matrix, top, bot, left, right, order) => {\n    for (let col = left; col <= right; col++) {\n        /* Time O(COLS) */\n        order.push(\n            matrix[top][col],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addRight = (matrix, top, bot, left, right, order) => {\n    for (let row = top; row <= bot; row++) {\n        /* Time O(ROWS) */\n        order.push(\n            matrix[row][right],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addBot = (matrix, top, bot, left, right, order) => {\n    for (let col = right; left <= col; col--) {\n        /* Time O(COLS) */\n        order.push(\n            matrix[bot][col],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addLeft = (matrix, top, bot, left, right, order) => {\n    for (let row = bot; top <= row; row--) {\n        /* Time O(ROWS) */\n        order.push(\n            matrix[row][left],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\n/**\n * Matrix - Spiral Traversal Post Update\n * Array - Ignore Auxilary Space O(ROWS * COLS)\n * Time O(ROWS * COLS) | Space O(1)\n * https://leetcode.com/problems/spiral-matrix/\n * @param {number[][]} matrix\n * @return {number[]}\n */\nvar spiralOrder = (matrix, order = []) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n    const cells = rows * cols;\n    let [top, bot, left, right] = [0, rows - 1, 0, cols - 1];\n\n    while (order.length < cells) {\n        /* Time O(ROWS * COLS) */\n        traverse(\n            matrix,\n            top,\n            bot,\n            left,\n            right,\n            order,\n        ); /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n\n        top++;\n        bot--;\n        left++;\n        right--;\n    }\n\n    return order;\n};\n\nvar traverse = (matrix, top, bot, left, right, order) => {\n    addTop(\n        matrix,\n        top,\n        bot,\n        left,\n        right,\n        order,\n    ); /* Time O(COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n    addRight(\n        matrix,\n        top,\n        bot,\n        left,\n        right,\n        order,\n    ); /* Time O(ROWS) | Ignore Auxilary Spsace O(ROWS * COLS)*/\n    addBot(\n        matrix,\n        top,\n        bot,\n        left,\n        right,\n        order,\n    ); /* Time O(COLS) | Ignore Auxilary Spsace O(ROWS * COLS)*/\n    addLeft(\n        matrix,\n        top,\n        bot,\n        left,\n        right,\n        order,\n    ); /* Time O(ROWS) | Ignore Auxilary Spsace O(ROWS * COLS. */\n};\n\nvar addTop = (matrix, top, bot, left, right, order) => {\n    for (let col = left; col <= right; col++) {\n        /* Time O(COLS) */\n        order.push(\n            matrix[top][col],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addRight = (matrix, top, bot, left, right, order) => {\n    for (let row = top + 1; row <= bot; row++) {\n        /* Time O(ROWS) */\n        order.push(\n            matrix[row][right],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addBot = (matrix, top, bot, left, right, order) => {\n    for (let col = right - 1; left <= col; col--) {\n        /* Time O(COLS) */\n        const isOutOfBounds = top === bot;\n        if (isOutOfBounds) return;\n\n        order.push(\n            matrix[bot][col],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\nvar addLeft = (matrix, top, bot, left, right, order) => {\n    for (let row = bot - 1; row >= top + 1; row--) {\n        /* Time O(ROWS) */\n        const isOutOfBounds = left === right;\n        if (isOutOfBounds) return;\n\n        order.push(\n            matrix[row][left],\n        ); /* Ignore Auxilary Spsace O(ROWS * COLS) */\n    }\n};\n\n/**\n * Matrix - Mark Visited In Place\n * Array - Ignore Auxilary Space O(ROWS * COLS)\n * Time O(ROWS * COLS) | Space O(1)\n * https://leetcode.com/problems/spiral-matrix/\n * @param {number[][]} matrix\n * @return {number[]}\n */\nvar spiralOrder = (matrix) => {\n    const order =\n        initOrder(\n            matrix,\n        ); /*                     | Ignore Auxilary Spsace O(ROWS * COLS) */\n\n    spiral(\n        matrix,\n        order,\n    ); /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n\n    return order;\n};\n\nconst initOrder = (matrix, VISITED = 101) => {\n    const order = [matrix[0][0]]; /* Ignore Auxilary Spsace O(ROWS * COLS) */\n\n    matrix[0][0] = VISITED; /* Ignore Auxilary Spsace O(ROWS * COLS) */\n\n    return order;\n};\n\nvar spiral = (matrix, order) => {\n    let [row, col, direction, changeDirection] = [0, 0, 0, 0];\n\n    while (changeDirection < 2) {\n        /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n        [row, col, direction, changeDirection] =\n            /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n            getPointers(matrix, row, col, direction, changeDirection, order);\n    }\n};\n\nconst getPointers = (matrix, row, col, direction, changeDirection, order) => {\n    [row, col, direction, changeDirection] =\n        /* Time O(ROWS * COLS) | Ignore Auxilary Spsace O(ROWS * COLS) */\n        move(matrix, row, col, direction, changeDirection, order);\n\n    direction = (direction + 1) % 4;\n    changeDirection += 1;\n\n    return [row, col, direction, changeDirection];\n};\n\nconst move = (\n    matrix,\n    row,\n    col,\n    direction,\n    changeDirection,\n    order,\n    VISITED = 101,\n) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    while (canMove(matrix, row, rows, col, cols, direction)) {\n        /* Time O(ROWS * COLS) */\n        [row, col] = getCell(row, col, direction);\n\n        order.push(\n            matrix[row][col],\n        ); /*                     | Ignore Auxilary Spsace O(ROWS * COLS) */\n        matrix[row][col] = VISITED;\n\n        changeDirection = 0;\n    }\n\n    return [row, col, direction, changeDirection];\n};\n\nconst canMove = (matrix, row, rows, col, cols, direction) => {\n    if (!isInBounds(row, rows, col, cols, direction)) return false;\n\n    return !hasSeen(matrix, row, col, direction);\n};\n\nconst isInBounds = (row, rows, col, cols, direction) => {\n    const [_row, _col] = getCell(row, col, direction);\n    const isRowInBounds = 0 <= _row && _row < rows;\n    const isColInBounds = 0 <= _col && _col < cols;\n\n    return isRowInBounds && isColInBounds;\n};\n\nconst hasSeen = (matrix, row, col, direction, VISITED = 101) => {\n    const [_row, _col] = getCell(row, col, direction);\n\n    return matrix[_row][_col] === VISITED;\n};\n\nconst getDirection = (direction) => {\n    const directions = [\n        [0, 1],\n        [1, 0],\n        [0, -1],\n        [-1, 0],\n    ];\n    /* RIGHT    BOT     LEFT     TOP  */\n    return directions[direction];\n};\n\nconst getCell = (row, col, direction) => {\n    const [_row, _col] = getDirection(direction);\n\n    return [row + _row, col + _col];\n};\n",
        "python": "class Solution:\n    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:\n        res = []\n        left, right = 0, len(matrix[0])\n        top, bottom = 0, len(matrix)\n\n        while left < right and top < bottom:\n            # get every i in the top row\n            for i in range(left, right):\n                res.append(matrix[top][i])\n            top += 1\n            # get every i in the right col\n            for i in range(top, bottom):\n                res.append(matrix[i][right - 1])\n            right -= 1\n            if not (left < right and top < bottom):\n                break\n            # get every i in the bottom row\n            for i in range(right - 1, left - 1, -1):\n                res.append(matrix[bottom - 1][i])\n            bottom -= 1\n            # get every i in the left col\n            for i in range(bottom - 1, top - 1, -1):\n                res.append(matrix[i][left])\n            left += 1\n\n        return res\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Spiral Matrix",
          "explanation": "Spiral Matrix is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS * COLS)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": [
        "Well for some problems, the best way really is to come up with some algorithms for simulation. Basically, you need to simulate what the problem asks us to do.",
        "We go boundary by boundary and move inwards. That is the essential operation. First row, last column, last row, first column, and then we move inwards by 1 and repeat. That's all. That is all the simulation that we need.",
        "Think about when you want to switch the progress on one of the indexes. If you progress on i out of [i, j], you'll shift in the same column. Similarly, by changing values for j, you'd be shifting in the same row.\r\nAlso, keep track of the end of a boundary so that you can move inwards and then keep repeating. It's always best to simulate edge cases like a single column or a single row to see if anything breaks or not."
      ]
    },
    {
      "id": "set-matrix-zeroes",
      "title": "Set Matrix Zeroes",
      "difficulty": "Medium",
      "description": "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.\n\nYou must do it in place.\n\n \nExample 1:\n\n\n<strong>Input:</strong> matrix = [[1,1,1],[1,0,1],[1,1,1]]\n<strong>Output:</strong> [[1,0,1],[0,0,0],[1,0,1]]\n\n\nExample 2:\n\n\n<strong>Input:</strong> matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\n<strong>Output:</strong> [[0,0,0,0],[0,4,5,0],[0,3,1,0]]\n\n\n \nConstraints:\n\n\n\tm == matrix.length\n\tn == matrix[0].length\n\t1 <= m, n <= 200\n\t-231 <= matrix[i][j] <= 231 - 1\n\n\n \nFollow up:\n\n\n\tA straightforward solution using O(mn) space is probably a bad idea.\n\tA simple improvement uses O(m + n) space, but still not the best solution.\n\tCould you devise a constant space solution?",
      "examples": [
        {
          "input": "[[1,1,1],[1,0,1],[1,1,1]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function setMatrixZeroes(input) {\n  // Your code here\n}",
        "python": "def set_matrix_zeroes(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Additional Space\n * Array - Tabulation\n * Time O(ROWS * COLS) | Space (ROWS + COLS)\n * https://leetcode.com/problems/set-matrix-zeroes/\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar setZeroes = function (matrix) {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n    const [_row, _col] = initTabu(rows, cols); /* Space (ROWS + COLS) */\n\n    fillPlacements(\n        matrix,\n        _row,\n        _col,\n    ); /* Time O(ROWS * COLS) | Space (ROWS + COLS) */\n    setZero(matrix, _row, _col); /* Time O(ROWS * COLS) */\n};\n\nconst initTabu = (rows, cols) => [\n    new Array(rows).fill(1) /* Space O(ROWS) */,\n    new Array(cols).fill(1) /* Space O(COLS) */,\n];\n\nconst fillPlacements = (matrix, _row, _col) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time (ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time (COLS) */\n            const isZero = matrix[row][col] === 0;\n            if (!isZero) continue;\n\n            _row[row] = 0; /* Space (ROWS) */\n            _col[col] = 0; /* Space (COLS) */\n        }\n    }\n};\n\nconst setZero = (matrix, _row, _col) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time (ROWS) */\n        for (let col = 0; col < cols; col++) {\n            /* Time (COLS) */\n            const canSet = _row[row] === 0 || _col[col] === 0;\n            if (!canSet) continue;\n\n            matrix[row][col] = 0;\n        }\n    }\n};\n\n/**\n * Constant Space\n * Time O(ROWS * COLS) | Space (1)\n * https://leetcode.com/problems/set-matrix-zeroes/\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar setZeroes = (matrix) => {\n    const _isColZero = isColZero(matrix); /* Time O(ROWS) */\n\n    setEdgesToZero(matrix); /* Time O(ROWS) */\n    setCellsToZero(matrix, _isColZero); /* Time O(ROWS * COLS) */\n};\n\nvar isColZero = (matrix) =>\n    matrix.some((row) => row[0] === 0); /* Time O(ROWS) */\n\nvar setEdgesToZero = (matrix) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time (ROWS) */\n        for (let col = 1; col < cols; col++) {\n            /* Time (COLS) */\n            const canSet = matrix[row][col] === 0;\n            if (!canSet) continue;\n\n            matrix[row][0] = 0;\n            matrix[0][col] = 0;\n        }\n    }\n};\n\nvar setCellsToZero = (matrix, isColZero) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = rows - 1; 0 <= row; row--) {\n        /* Time (ROWS) */\n        for (let col = cols - 1; 1 <= col; col--) {\n            /* Time (COLS) */\n            if (!isZero(matrix, row, col)) continue;\n\n            matrix[row][col] = 0;\n        }\n\n        if (isColZero) matrix[row][0] = 0;\n    }\n};\n\nvar isZero = (matrix, row, col) => {\n    const [rowLeftEdge, colTopEdge] = [matrix[row][0], matrix[0][col]];\n\n    return rowLeftEdge === 0 || colTopEdge === 0;\n};\n\n/**\n * Constant Space\n * Time O(ROWS * COLS) | Space (1)\n * https://leetcode.com/problems/set-matrix-zeroes/\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar setZeroes = (matrix) => {\n    const isColZero = setEdgesToZero(matrix); /* Time O(ROWS * COLS) */\n\n    setCellsToZero(matrix); /* Time O(ROWS * COLS) */\n\n    const isZero = matrix[0][0] === 0;\n    if (isZero) setFirstRowZero(matrix); /* Time O(COLS) */\n\n    if (isColZero) setFirstColZero(matrix); /* Time O(ROWS) */\n};\n\nvar setCellsToZero = (matrix) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 1; row < rows; row++) {\n        /* Time O(ROWS) */\n        for (let col = 1; col < cols; col++) {\n            /* Time O(COLS) */\n            const isZero = matrix[row][0] === 0 || matrix[0][col] == 0;\n            if (!isZero) continue;\n\n            matrix[row][col] = 0;\n        }\n    }\n};\n\nvar setEdgesToZero = (matrix, isColZero = false) => {\n    const [rows, cols] = [matrix.length, matrix[0].length];\n\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        if (matrix[row][0] === 0) isColZero = true;\n\n        for (let col = 1; col < cols; col++) {\n            /* Time O(COLS) */\n            const canSet = matrix[row][col] === 0;\n            if (!canSet) continue;\n\n            matrix[0][col] = 0;\n            matrix[row][0] = 0;\n        }\n    }\n\n    return isColZero;\n};\n\nvar setFirstRowZero = (matrix, cols = matrix[0].length) => {\n    for (let col = 0; col < cols; col++) {\n        /* Time O(COLS) */\n        matrix[0][col] = 0;\n    }\n};\n\nvar setFirstColZero = (matrix, rows = matrix.length) => {\n    for (let row = 0; row < rows; row++) {\n        /* Time O(ROWS) */\n        matrix[row][0] = 0;\n    }\n};\n",
        "python": "class Solution:\n    def setZeroes(self, matrix: List[List[int]]) -> None:\n        # O(1)\n        ROWS, COLS = len(matrix), len(matrix[0])\n        rowZero = False\n\n        # determine which rows/cols need to be zero\n        for r in range(ROWS):\n            for c in range(COLS):\n                if matrix[r][c] == 0:\n                    matrix[0][c] = 0\n                    if r > 0:\n                        matrix[r][0] = 0\n                    else:\n                        rowZero = True\n\n        for r in range(1, ROWS):\n            for c in range(1, COLS):\n                if matrix[0][c] == 0 or matrix[r][0] == 0:\n                    matrix[r][c] = 0\n\n        if matrix[0][0] == 0:\n            for r in range(ROWS):\n                matrix[r][0] = 0\n\n        if rowZero:\n            for c in range(COLS):\n                matrix[0][c] = 0\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Set Matrix Zeroes",
          "explanation": "Set Matrix Zeroes is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(ROWS * COLS)",
      "spaceComplexity": "O(ROWS)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": [
        "If any cell of the matrix has a zero we can record its row and column number using additional memory.\r\nBut if you don't want to use extra memory then you can manipulate the array instead. i.e. simulating exactly what the question says.",
        "Setting cell values to zero on the fly while iterating might lead to discrepancies. What if you use some other integer value as your marker?\r\nThere is still a better approach for this problem with O(1) space.",
        "We could have used 2 sets to keep a record of rows/columns which need to be set to zero. But for an O(1) space solution, you can use one of the rows and and one of the columns to keep track of this information.",
        "We can use the first cell of every row and column as a flag. This flag would determine whether a row or column has been set to zero."
      ]
    },
    {
      "id": "happy-number",
      "title": "Happy Number",
      "difficulty": "Easy",
      "description": "Write an algorithm to determine if a number n is happy.\n\nA happy number is a number defined by the following process:\n\n\n\tStarting with any positive integer, replace the number by the sum of the squares of its digits.\n\tRepeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n\tThose numbers for which this process ends in 1 are happy.\n\n\nReturn true if n is a happy number, and false if not.\n\n \nExample 1:\n\n\n<strong>Input:</strong> n = 19\n<strong>Output:</strong> true\n<strong>Explanation:</strong>\n1<sup>2</sup> + 9<sup>2</sup> = 82\n8<sup>2</sup> + 2<sup>2</sup> = 68\n6<sup>2</sup> + 8<sup>2</sup> = 100\n1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1\n\n\nExample 2:\n\n\n<strong>Input:</strong> n = 2\n<strong>Output:</strong> false\n\n\n \nConstraints:\n\n\n\t1 <= n <= 231 - 1",
      "examples": [
        {
          "input": "19",
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
        "js": "function happyNumber(input) {\n  // Your code here\n}",
        "python": "def happy_number(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Hash Set - seen dynamic\n * Time O(log(N)) | Space O(log(N))\n * https://leetcode.com/problems/happy-number/\n * @param {number} n\n * @return {boolean}\n */\nvar isHappy = (n, seen = new Set()) => {\n    const hasCycle = () => n === 1 || seen.has(n);\n    while (!hasCycle()) {\n        /* Time O(log(N)) */\n        seen.add(n); /* Space O(log(N)) */\n        n = getNext(n); /* Time O(log(N)) */\n    }\n\n    return n === 1;\n};\n\nvar getNext = (n, sum = 0) => {\n    while (0 < n) {\n        /* Time O(log(N)) */\n        const remainder = n % 10;\n\n        n = Math.floor(n / 10);\n        sum += remainder * remainder;\n    }\n\n    return sum;\n};\n\n/**\n * Hash Set - seen static\n * Time O(log(N)) | Space O(1)\n * https://leetcode.com/problems/happy-number/\n * @param {number} n\n * @return {boolean}\n */\nvar isHappy = (n) => {\n    const cycles = [4, 16, 37, 58, 89, 145, 42, 20];\n    const seen = new Set(cycles); /* Time O(1)      | Space O(1) */\n\n    const hasCycle = () => n === 1 || seen.has(n);\n    while (!hasCycle()) {\n        /* Time O(log(N)) | Space O(1) */\n        n = getNext(n);\n    }\n\n    return n === 1;\n};\n\nvar getNext = (n, sum = 0) => {\n    while (0 < n) {\n        /* Time O(log(N)) */\n        const remainder = n % 10;\n\n        n = Math.floor(n / 10);\n        sum += remainder * remainder;\n    }\n\n    return sum;\n};\n\n/**\n * Pointer - n === 1 || n === 4\n * Time O(log(N)) | Space O(1)\n * https://leetcode.com/problems/happy-number/\n * @param {number} n\n * @return {boolean}\n */\nvar isHappy = (n) => {\n    const hasCycle = () => n === 1 || n === 4;\n    while (!hasCycle()) {\n        /* Time O(log(N)) */\n        n = getNext(n); /* Time O(log(N)) */\n    }\n\n    return n === 1;\n};\n\nvar getNext = (n, sum = 0) => {\n    while (0 < n) {\n        /* Time O(log(N)) */\n        const remainder = n % 10;\n\n        n = Math.floor(n / 10);\n        sum += remainder * remainder;\n    }\n\n    return sum;\n};\n\n/**\n * Slow Fast\n * Time O(log(N)) | Space O(1)\n * https://leetcode.com/problems/happy-number/\n * @param {number} n\n * @return {boolean}\n */\nvar isHappy = (n) => {\n    let [slow, fast] = [n, getNext(n)];\n\n    const hasCyle = () => fast === 1 || slow === fast;\n    while (!hasCyle()) {\n        /* Time O(log(N)) */\n        slow = getNext(slow); /* Time O(log(N)) */\n        fast = getNext(getNext(fast)); /* Time O(log(N)) */\n    }\n\n    return fast === 1;\n};\n\nvar getNext = (n, sum = 0) => {\n    while (0 < n) {\n        /* Time O(log(N)) */\n        const remainder = n % 10;\n\n        n = Math.floor(n / 10);\n        sum += remainder * remainder;\n    }\n\n    return sum;\n};\n",
        "python": "class Solution:\n    def isHappy(self, n: int) -> bool:\n        slow, fast = n, self.sumSquareDigits(n)\n\n        while slow != fast:\n            fast = self.sumSquareDigits(fast)\n            fast = self.sumSquareDigits(fast)\n            slow = self.sumSquareDigits(slow)\n\n        return True if fast == 1 else False\n\n    def sumSquareDigits(self, n):\n        output = 0\n        while n:\n            output += (n % 10) ** 2\n            n = n // 10\n        return output\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Happy Number",
          "explanation": "Happy Number is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(N)",
      "spaceComplexity": "O(log(N)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": []
    },
    {
      "id": "plus-one",
      "title": "Plus One",
      "difficulty": "Easy",
      "description": "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.\n\nIncrement the large integer by one and return the resulting array of digits.\n\n \nExample 1:\n\n\n<strong>Input:</strong> digits = [1,2,3]\n<strong>Output:</strong> [1,2,4]\n<strong>Explanation:</strong> The array represents the integer 123.\nIncrementing by one gives 123 + 1 = 124.\nThus, the result should be [1,2,4].\n\n\nExample 2:\n\n\n<strong>Input:</strong> digits = [4,3,2,1]\n<strong>Output:</strong> [4,3,2,2]\n<strong>Explanation:</strong> The array represents the integer 4321.\nIncrementing by one gives 4321 + 1 = 4322.\nThus, the result should be [4,3,2,2].\n\n\nExample 3:\n\n\n<strong>Input:</strong> digits = [9]\n<strong>Output:</strong> [1,0]\n<strong>Explanation:</strong> The array represents the integer 9.\nIncrementing by one gives 9 + 1 = 10.\nThus, the result should be [1,0].\n\n\n \nConstraints:\n\n\n\t1 <= digits.length <= 100\n\t0 <= digits[i] <= 9\n\tdigits does not contain any leading 0's.",
      "examples": [
        {
          "input": "[1,2,3]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[4,3,2,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[9]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function plusOne(input) {\n  // Your code here\n}",
        "python": "def plus_one(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/plus-one/\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = (digits) => {\n    add(digits);\n    carry(digits); /* Time O(N) */\n    addLeading(digits); /*           | Space O(N) */\n\n    return digits;\n};\n\nvar add = (digits) => (digits[digits.length - 1] += 1);\n\nvar carry = (digits) => {\n    for (let digit = digits.length - 1; 0 < digit; digit--) {\n        /* Time O(N) */\n        const canCarry = digits[digit] === 10;\n        if (!canCarry) break;\n\n        digits[digit] = 0;\n        digits[digit - 1] += 1;\n    }\n};\n\nconst addLeading = (digits) => {\n    const canCarry = digits[0] === 10;\n    if (!canCarry) return;\n\n    digits[0] = 1;\n    digits.push(0); /* Space O(N) */\n};\n\n/**\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/plus-one/\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = (digits) => {\n    for (let digit = digits.length - 1; 0 <= digit; digit--) {\n        /* Time O(N) */\n        const canCarry = digits[digit] === 9;\n        if (canCarry) {\n            digits[digit] = 0;\n            continue;\n        }\n\n        digits[digit]++;\n\n        return digits;\n    }\n\n    digits.unshift(1); /* Time O(N) | Space O(N) */\n\n    return digits;\n};\n\n/**\n * Time O(N) | Space O(N)\n * https://leetcode.com/problems/plus-one/\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = function (digits) {\n    var i = digits.length - 1;\n\n    while (digits[i] + 1 === 10) {\n        digits[i] = 0;\n        i -= 1;\n    }\n\n    if (i < 0) {\n        digits.unshift(1);\n    } else {\n        digits[i] += 1;\n    }\n\n    return digits;\n};\n",
        "python": "class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        one = 1\n        i = 0\n        digits = digits[::-1]\n\n        while one:\n            if i < len(digits):\n                if digits[i] == 9:\n                    digits[i] = 0\n                else:\n                    digits[i] += 1\n                    one = 0\n            else:\n                digits.append(one)\n                one = 0\n            i += 1\n        return digits[::-1]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Plus One",
          "explanation": "Plus One is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": []
    },
    {
      "id": "multiply-strings",
      "title": "Multiply Strings",
      "difficulty": "Medium",
      "description": "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.\n\nNote: You must not use any built-in BigInteger library or convert the inputs to integer directly.\n\n \nExample 1:\n<strong>Input:</strong> num1 = \"2\", num2 = \"3\"\n<strong>Output:</strong> \"6\"\nExample 2:\n<strong>Input:</strong> num1 = \"123\", num2 = \"456\"\n<strong>Output:</strong> \"56088\"\n\n \nConstraints:\n\n\n\t1 <= num1.length, num2.length <= 200\n\tnum1 and num2 consist of digits only.\n\tBoth num1 and num2 do not contain any leading zero, except the number 0 itself.",
      "examples": [
        {
          "input": "\"2\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"3\"",
          "output": "See problem description for expected output."
        },
        {
          "input": "\"123\"",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function multiplyStrings(input) {\n  // Your code here\n}",
        "python": "def multiply_strings(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * Matrix\n * Time O(N * M) | Space O(N + M)\n * https://leetcode.com/problems/multiply-strings/\n * @param {string} num1\n * @param {string} num2\n * @return {string}\n */\nvar multiply = (num1, num2) => {\n    const isZero = num1 === '0' || num2 === '0';\n    if (isZero) return '0';\n\n    const buffer = initBuffer(num1, num2); /*               | Space (N + M) */\n\n    multiplication(num1, num2, buffer); /* Time O(N * M) */\n    removeLeadingZero(buffer); /* Time O(N + M) | Time O(N + M)*/\n\n    return buffer.join(''); /* Time O(N + M) | Space O(N + M) */\n};\n\nvar initBuffer = (num1, num2) => {\n    const size = num1.length + num2.length;\n\n    return new Array(size).fill(0); /* Space (N + M) */\n};\n\nvar multiplication = (num1, num2, buffer) => {\n    for (let i = num1.length - 1; 0 <= i; i--) {\n        /* Time O(N) */\n        for (let j = num2.length - 1; 0 <= j; j--) {\n            /* Time O(M) */\n            update(num1, i, num2, j, buffer); /* Space O(N + M) */\n        }\n    }\n};\n\nvar removeLeadingZero = (buffer) => {\n    const isLeadZero = buffer[0] === 0;\n    if (!isLeadZero) return;\n\n    buffer.shift(); /* Time O(N + M) | Time O(N + M) */\n};\n\nvar update = (num1, i, num2, j, buffer) => {\n    const curPos = i + j;\n    const prevPos = curPos + 1;\n\n    const carry = buffer[prevPos];\n    const product = getProduct(num1, i, num2, j);\n    const sum = carry + product;\n\n    const remainder = sum % 10;\n    const value = (sum - remainder) / 10;\n\n    buffer[prevPos] = remainder; /* Space O(N + M) */\n    buffer[curPos] += value; /* Space O(N + M) */\n};\n\nvar getProduct = (num1, i, num2, j) => {\n    const [iNum, jNum] = [Number(num1[i]), Number(num2[j])];\n\n    return iNum * jNum;\n};\n\n/**\n * Matrix\n * Time O(N * M) | Space O(N + M)\n * https://leetcode.com/problems/multiply-strings/\n * @param {string} num1\n * @param {string} num2\n * @return {string}\n */\nvar multiply = (num1, num2) => {\n    const isZero = num1 === '0' || num2 === '0';\n    if (isZero) return '0';\n\n    const buffer = initBuffer(num1, num2); /*               | Space O(N + M) */\n\n    multiplication(num1, num2, buffer); /* Time O(N * M) | Space O(N + M) */\n    removeLeadingZero(buffer); /* Time O(N + M) | Space O(N + M) */\n\n    return buffer.join(''); /* Time O(N + M) | Space O(N + M) */\n};\n\nvar initBuffer = (num1, num2) =>\n    new Array(num1.length + num2.length).fill(0); /* Space O(N + M) */\n\nvar multiplication = (num1, num2, buffer) => {\n    [num1, num2] = /* Time O(N + M) */ [reverse(num1), reverse(num2)];\n\n    for (var i1 in num1) {\n        /* Time O(N) */\n        for (var i2 in num2) {\n            /* Time O(M) */\n            update(num1, i1, num2, i2, buffer); /* Space O(N + M) */\n        }\n    }\n\n    buffer.reverse(); /* Time O(N + M) */\n};\n\nconst reverse = (s) =>\n    s\n        .split('') /* Time O(K) | Space O (K) */\n        .reverse(); /* Time O(K) */\n\nvar update = (num1, i1, num2, i2, buffer) => {\n    const product = num1[i1] * num2[i2];\n    const index = Number(i1) + Number(i2);\n\n    buffer[index] += product; /* Space O(N + M) */\n    buffer[index + 1] += Math.floor(buffer[index] / 10); /* Space O(N + M) */\n    buffer[index] = buffer[index] % 10; /* Space O(N + M) */\n};\n\nvar removeLeadingZero = (buffer) => {\n    const isZero = buffer[0] === 0;\n    if (!isZero) return;\n\n    buffer.shift(); /* Time O(N + M) | Space O(N + M) */\n};\n",
        "python": "class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        if \"0\" in [num1, num2]:\n            return \"0\"\n\n        res = [0] * (len(num1) + len(num2))\n        num1, num2 = num1[::-1], num2[::-1]\n        for i1 in range(len(num1)):\n            for i2 in range(len(num2)):\n                digit = int(num1[i1]) * int(num2[i2])\n                res[i1 + i2] += digit\n                res[i1 + i2 + 1] += res[i1 + i2] // 10\n                res[i1 + i2] = res[i1 + i2] % 10\n\n        res, beg = res[::-1], 0\n        while beg < len(res) and res[beg] == 0:\n            beg += 1\n        res = map(str, res[beg:])\n        return \"\".join(res)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Multiply Strings",
          "explanation": "Multiply Strings is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * M)",
      "spaceComplexity": "O(N + M)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": []
    },
    {
      "id": "detect-squares",
      "title": "Detect Squares",
      "difficulty": "Medium",
      "description": "You are given a stream of points on the X-Y plane. Design an algorithm that:\n\n\n\tAdds new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.\n\tGiven a query point, counts the number of ways to choose three points from the data structure such that the three points and the query point form an axis-aligned square with positive area.\n\n\nAn axis-aligned square is a square whose edges are all the same length and are either parallel or perpendicular to the x-axis and y-axis.\n\nImplement the DetectSquares class:\n\n\n\tDetectSquares() Initializes the object with an empty data structure.\n\tvoid add(int[] point) Adds a new point point = [x, y] to the data structure.\n\tint count(int[] point) Counts the number of ways to form axis-aligned squares with point point = [x, y] as described above.\n\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"DetectSquares\", \"add\", \"add\", \"add\", \"count\", \"count\", \"add\", \"count\"]\n[[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]]\n<strong>Output</strong>\n[null, null, null, null, 1, 0, null, 2]\n\n<strong>Explanation</strong>\nDetectSquares detectSquares = new DetectSquares();\ndetectSquares.add([3, 10]);\ndetectSquares.add([11, 2]);\ndetectSquares.add([3, 2]);\ndetectSquares.count([11, 10]); // return 1. You can choose:\n                               //   - The first, second, and third points\ndetectSquares.count([14, 8]);  // return 0. The query point cannot form a square with any poin...",
      "examples": [
        {
          "input": "[\"DetectSquares\",\"add\",\"add\",\"add\",\"count\",\"count\",\"add\",\"count\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function detectSquares(input) {\n  // Your code here\n}",
        "python": "def detect_squares(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Detect Squares",
          "explanation": "Detect Squares is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Math & Geometry"
      ],
      "hints": [
        "Maintain the frequency of all the points in a hash map.",
        "Traverse the hash map and if any point has the same y-coordinate as the query point, consider this point and the query point to form one of the horizontal lines of the square."
      ]
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Which sort is stable AND O(n log n) guaranteed?",
      "options": [
        "QuickSort",
        "HeapSort",
        "MergeSort",
        "CountingSort"
      ],
      "correct": 2,
      "explanation": "MergeSort is stable and guaranteed O(n log n) in all cases."
    }
  ],
  "cheatSheet": "# Sort Complexity\n| Algorithm | Avg | Worst | Stable |\n|-----------|-----|-------|--------|\n| QuickSort | n log n | n² | No |\n| MergeSort | n log n | n log n | Yes |\n| HeapSort | n log n | n log n | No |",
  "proTips": [
    "Know the sort in your language (JS .sort is Timsort)",
    "Counting sort for bounded integers"
  ],
  "faangQuotes": [
    "\"Custom sort comparators show mastery.\" — Apple"
  ],
  "visualizationType": "sorting",
  "usage": "Used to order elements for faster searching or grouping, using custom comparators or specific algorithms.",
  "dsInvolved": "Array",
  "sampleProblems": [
    "Sort Colors",
    "Merge Intervals",
    "Largest Number"
  ]
};
