import { Topic } from "./types";

export const topic07: Topic = {
  "id": "topic07",
  "slug": "heaps",
  "title": "Heaps / Priority Queues",
  "emoji": "🏔️",
  "color": "#fb923c",
  "gradient": "from-orange-500 to-amber-400",
  "layman": "A heap is like a tournament bracket kept live: the winner always bubbles to the top. Want the top 3 scores from a million players? A heap gives the answer without sorting everyone.",
  "technical": "Binary heap: complete binary tree satisfying heap property. Insert O(log n) via sift-up, extract O(log n) via sift-down, build-heap O(n).",
  "keyInsights": [
    "Two heaps (max+min) for dynamic median",
    "K-th largest: min-heap of size k, pop when size>k",
    "Merge K sorted: heap of (val, listIdx)"
  ],
  "timeComplexities": [
    {
      "operation": "Insert",
      "best": "O(1)",
      "avg": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1)"
    },
    {
      "operation": "Extract Min/Max",
      "best": "O(log n)",
      "avg": "O(log n)",
      "worst": "O(log n)",
      "space": "O(1)"
    },
    {
      "operation": "Build Heap",
      "best": "O(n)",
      "avg": "O(n)",
      "worst": "O(n)",
      "space": "O(1)"
    }
  ],
  "questions": [
    {
      "id": "kth-largest",
      "title": "Kth Largest Element in an Array",
      "difficulty": "Medium",
      "description": "Return the kth largest element in the array (kth in sorted order, not kth distinct).",
      "examples": [
        {
          "input": "nums=[3,2,1,5,6,4], k=2",
          "output": "5"
        }
      ],
      "constraints": [
        "1 ≤ k ≤ nums.length ≤ 10⁵"
      ],
      "starterCode": {
        "js": "function findKthLargest(nums, k) {\n  // Min-heap of size k\n}",
        "python": "import heapq\ndef find_kth_largest(nums, k):\n    pass"
      },
      "solution": {
        "js": "function findKthLargest(nums,k){\n  // QuickSelect O(n) avg\n  function qs(l,r){\n    const pivot=nums[r];let p=l;\n    for(let i=l;i<r;i++)if(nums[i]<=pivot){[nums[p],nums[i]]=[nums[i],nums[p]];p++;}\n    [nums[p],nums[r]]=[nums[r],nums[p]];\n    if(p===nums.length-k)return nums[p];\n    if(p<nums.length-k)return qs(p+1,r);\n    return qs(l,p-1);\n  }\n  return qs(0,nums.length-1);\n}",
        "python": "import heapq\ndef find_kth_largest(nums,k):\n    return heapq.nlargest(k,nums)[-1]"
      },
      "testCases": [
        {
          "input": "[3,2,1,5,6,4]\n2",
          "expected": "5"
        },
        {
          "input": "[3,2,3,1,2,4,5,5,6]\n4",
          "expected": "4",
          "hidden": true
        }
      ],
      "timeComplexity": "O(n) avg QuickSelect / O(n log k) heap",
      "spaceComplexity": "O(1) / O(k)",
      "hints": [
        "Min-heap of size k: pop when size>k. Top = answer.",
        "QuickSelect partitions like QuickSort but only recurses into one side."
      ],
      "tags": [
        "heap",
        "quickselect"
      ],
      "walkthrough": [
        {
          "title": "Min-heap approach: maintain k largest",
          "explanation": "Keep a min-heap of size k. For each element: if heap.size<k, push. Else if element>heap.top, pop and push. The heap top is the kth largest.",
          "phase": "init",
          "visual": {
            "type": "array",
            "array": [
              3,
              2,
              1,
              5,
              6,
              4
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
          },
          "insight": "Min-heap of size k: the smallest of the k largest elements is always at the top. After processing all elements, the top IS the kth largest.",
          "variables": {
            "k": 2,
            "heap": "[]"
          }
        },
        {
          "title": "Process elements, maintain heap size k=2",
          "explanation": "Push 3,2 (size<k=2). For 1: 1<min(3,2)=2, skip. For 5: 5>2, pop 2, push 5. Heap=[3,5]. For 6: 6>3, pop 3, push 6. Heap=[5,6]. For 4: 4<5, skip.",
          "phase": "scan",
          "visual": {
            "type": "array",
            "array": [
              3,
              2,
              1,
              5,
              6,
              4
            ],
            "states": [
              "found",
              "found",
              "eliminated",
              "found",
              "found",
              "eliminated"
            ],
            "pointers": {
              "0": "keep",
              "1": "keep",
              "3": "keep",
              "4": "keep"
            }
          },
          "variables": {
            "heap": "[5,6]",
            "heapTop": 5
          }
        },
        {
          "title": "Answer = heap top = 5",
          "explanation": "Heap contains the 2 largest elements: [5,6]. The smallest of them (heap top) = 5 = the 2nd largest overall.",
          "phase": "done",
          "visual": {
            "type": "array",
            "array": [
              6,
              5
            ],
            "labels": [
              "largest",
              "2nd largest"
            ],
            "states": [
              "comparing",
              "result"
            ]
          },
          "variables": {
            "answer": 5
          },
          "complexity": "O(n log k) — push/pop on heap of size k for each of n elements."
        }
      ]
    },
    {
      "id": "kth-largest-element-in-a-stream",
      "title": "Kth Largest Element in a Stream",
      "difficulty": "Easy",
      "description": "You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.\n\nYou are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.\n\nImplement the KthLargest class:\n\n\n\tKthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.\n\tint add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.\n\n\n \nExample 1:\n\n\nInput:\n\n[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"]\n\n[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]\n\nOutput: [null, 4, 5, 5, 8, 8]\n\nExplanation:\n\nKthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);\n\nkthLargest.add(3); // return 4\n\nkthLargest.add(5); // return 5\n\nkthLargest.add(10); // return 5\n\nkthLargest.add(9); // return 8\n\nkthLargest.add(4); // return 8\n\n\nExample 2:\n\n\nInput:\n\n[\"KthLargest\", \"add\", \"add\", \"add\", \"add\"]\n\n[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]\n\nOutput: [null, 7, 7, 7, 8]\n\nExplanation:\nKthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);\n\nkthLargest.add(2); // return 7\n\nkthLargest.add(10); // return ...",
      "examples": [
        {
          "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\",\"add\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"KthLargest\",\"add\",\"add\",\"add\",\"add\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function kthLargestElementInAStream(input) {\n  // Your code here\n}",
        "python": "def kth_largest_element_in_a_stream(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Kth Largest Element in a Stream",
          "explanation": "Kth Largest Element in a Stream is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": []
    },
    {
      "id": "last-stone-weight",
      "title": "Last Stone Weight",
      "difficulty": "Easy",
      "description": "You are given an array of integers stones where stones[i] is the weight of the ith stone.\n\nWe are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:\n\n\n\tIf x == y, both stones are destroyed, and\n\tIf x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.\n\n\nAt the end of the game, there is at most one stone left.\n\nReturn the weight of the last remaining stone. If there are no stones left, return 0.\n\n \nExample 1:\n\n\n<strong>Input:</strong> stones = [2,7,4,1,8,1]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> \nWe combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,\nwe combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,\nwe combine 2 and 1 to get 1 so the array converts to [1,1,1] then,\nwe combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.\n\n\nExample 2:\n\n\n<strong>Input:</strong> stones = [1]\n<strong>Output:</strong> 1\n\n\n \nConstraints:\n\n\n\t1 <= stones.length <= 30\n\t1 <= stones[i] <= 1000",
      "examples": [
        {
          "input": "[2,7,4,1,8,1]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[1]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function lastStoneWeight(input) {\n  // Your code here\n}",
        "python": "def last_stone_weight(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Last Stone Weight",
          "explanation": "Last Stone Weight is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": [
        "Simulate the process.  We can do it with a heap, or by sorting some list of stones every time we take a turn."
      ]
    },
    {
      "id": "k-closest-points-to-origin",
      "title": "K Closest Points to Origin",
      "difficulty": "Medium",
      "description": "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).\n\nThe distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).\n\nYou may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).\n\n \nExample 1:\n\n\n<strong>Input:</strong> points = [[1,3],[-2,2]], k = 1\n<strong>Output:</strong> [[-2,2]]\n<strong>Explanation:</strong>\nThe distance between (1, 3) and the origin is sqrt(10).\nThe distance between (-2, 2) and the origin is sqrt(8).\nSince sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.\nWe only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].\n\n\nExample 2:\n\n\n<strong>Input:</strong> points = [[3,3],[5,-1],[-2,4]], k = 2\n<strong>Output:</strong> [[3,3],[-2,4]]\n<strong>Explanation:</strong> The answer [[-2,4],[3,3]] would also be accepted.\n\n\n \nConstraints:\n\n\n\t1 <= k <= points.length <= 104\n\t-104 <= xi, yi <= 104",
      "examples": [
        {
          "input": "[[1,3],[-2,2]]",
          "output": "See problem description for expected output."
        },
        {
          "input": "1",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[3,3],[5,-1],[-2,4]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function kClosestPointsToOrigin(input) {\n  // Your code here\n}",
        "python": "def k_closest_points_to_origin(input):\n    pass"
      },
      "solution": {
        "js": "// Solution not found locally",
        "python": "# Solution not found locally"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding K Closest Points to Origin",
          "explanation": "K Closest Points to Origin is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": []
    },
    {
      "id": "kth-largest-element-in-an-array",
      "title": "Kth Largest Element in an Array",
      "difficulty": "Medium",
      "description": "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nCan you solve it without sorting?\n\n \nExample 1:\n<strong>Input:</strong> nums = [3,2,1,5,6,4], k = 2\n<strong>Output:</strong> 5\nExample 2:\n<strong>Input:</strong> nums = [3,2,3,1,2,4,5,5,6], k = 4\n<strong>Output:</strong> 4\n\n \nConstraints:\n\n\n\t1 <= k <= nums.length <= 105\n\t-104 <= nums[i] <= 104",
      "examples": [
        {
          "input": "[3,2,1,5,6,4]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "[3,2,3,1,2,4,5,5,6]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function kthLargestElementInAnArray(input) {\n  // Your code here\n}",
        "python": "def kth_largest_element_in_an_array(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/kth-largest-element-in-an-array/\n * Time O(N * log(N)) | Space O(K)\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar findKthLargest = function (nums, k) {\n    return nums\n        .sort((a, b) => a - b)\n        .reverse()\n        .slice(k - 1)\n        .shift();\n};\n\n/**\n * https://leetcode.com/problems/kth-largest-element-in-an-array/\n * Time O(N * log(K)) | Space O(K)\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar findKthLargest = function (nums, k) {\n    const minHeap = new MinPriorityQueue();\n\n    for (const num of nums) {\n        minHeap.enqueue(num);\n\n        const isAtCapacity = k < minHeap.size();\n        if (isAtCapacity) minHeap.dequeue();\n    }\n\n    return minHeap.front().element;\n};\n",
        "python": "# Solution: Sorting\n# Time Complexity:\n#   - Best Case: O(n*log(k))\n#   - Average Case: O(n*log(k))\n#   - Worst Case:O(n*log(k))\n# Extra Space Complexity: O(k)\nclass Solution:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        heapify(nums)\n        while len(nums) > k:\n            heappop(nums)\n        return nums[0]\n\n# Solution: Sorting\n# Time Complexity:\n#   - Best Case: O(n)\n#   - Average Case: O(n*log(n))\n#   - Worst Case:O(n*log(n))\n# Extra Space Complexity: O(n)\nclass Solution1:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        nums.sort()\n        return nums[len(nums) - k]\n\n\n# Solution: QuickSelect\n# Time Complexity: O(n)\n# Extra Space Complexity: O(n)\nclass Solution2:\n    def findKthLargest(self, nums: List[int], k: int) -> int:\n        pivot = random.choice(nums)\n        left = [num for num in nums if num > pivot]\n        mid = [num for num in nums if num == pivot]\n        right = [num for num in nums if num < pivot]\n\n        length_left = len(left)\n        length_right = len(right)\n        length_mid = len(mid)\n        if k <= length_left:\n            return self.findKthLargest(left, k)\n        elif k > length_left + length_mid:\n            return self.findKthLargest(right, k - length_mid - length_left)\n        else:\n            return mid[0]\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Kth Largest Element in an Array",
          "explanation": "Kth Largest Element in an Array is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * log(N)",
      "spaceComplexity": "O(K)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": []
    },
    {
      "id": "task-scheduler",
      "title": "Task Scheduler",
      "difficulty": "Medium",
      "description": "You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.\n\nReturn the minimum number of CPU intervals required to complete all tasks.\n\n \nExample 1:\n\n\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\n\nOutput: 8\n\nExplanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.\n\nAfter completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.\n\n\nExample 2:\n\n\nInput: tasks = [\"A\",\"C\",\"A\",\"B\",\"D\",\"B\"], n = 1\n\nOutput: 6\n\nExplanation: A possible sequence is: A -> B -> C -> D -> A -> B.\n\nWith a cooling interval of 1, you can repeat a task after just one other task.\n\n\nExample 3:\n\n\nInput: tasks = [\"A\",\"A\",\"A\", \"B\",\"B\",\"B\"], n = 3\n\nOutput: 10\n\nExplanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.\n\nThere are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.\n\n\n \nConstraints:\n\n\n\t1 <= tasks.length <= 104\n\ttasks[i] is an uppercase English letter.\n\t0 <= n <= 100",
      "examples": [
        {
          "input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "2",
          "output": "See problem description for expected output."
        },
        {
          "input": "[\"A\",\"C\",\"A\",\"B\",\"D\",\"B\"]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function taskScheduler(input) {\n  // Your code here\n}",
        "python": "def task_scheduler(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/task-scheduler/\n * Time O(N * log(N)) | Space O(N)\n * @param {character[]} tasks\n * @param {number} n\n * @return {number}\n */\nvar leastInterval = function (tasks, n) {\n    const frequencyMap = getFrequencyMap(tasks);\n    const maxHeap = getMaxHeap(frequencyMap);\n\n    return getMinimumCpuIntervals(maxHeap, n);\n};\n\nvar getFrequencyMap = (tasks, frequencyMap = new Array(26).fill(0)) => {\n    for (const task of tasks) {\n        const index = task.charCodeAt(0) - 'A'.charCodeAt(0);\n\n        frequencyMap[index]++;\n    }\n\n    return frequencyMap;\n};\n\nconst getMaxHeap = (frequencyMap, maxHeap = new MaxPriorityQueue()) => {\n    for (const frequency of frequencyMap) {\n        const hasFrequency = 0 < frequency;\n        if (hasFrequency) maxHeap.enqueue(frequency);\n    }\n\n    return maxHeap;\n};\n\nconst getMinimumCpuIntervals = (maxHeap, n, cpuIntervals = [0]) => {\n    while (!maxHeap.isEmpty()) {\n        const { iterations, coolingPeriodQueue } = execute(\n            n,\n            maxHeap,\n            cpuIntervals,\n        );\n\n        reQueueCoolingPeriod(coolingPeriodQueue, maxHeap);\n\n        if (!maxHeap.isEmpty()) cpuIntervals[0] += iterations;\n    }\n\n    return cpuIntervals[0];\n};\n\nconst execute = (\n    n,\n    maxHeap,\n    cpuIntervals,\n    iterations = n + 1,\n    coolingPeriodQueue = new Queue(),\n) => {\n    while (0 < iterations && !maxHeap.isEmpty()) {\n        const frequency = maxHeap.dequeue().element;\n\n        const hasFrequency = 0 < frequency - 1;\n        if (hasFrequency) coolingPeriodQueue.enqueue(frequency - 1);\n\n        cpuIntervals[0]++;\n        iterations--;\n    }\n\n    return { iterations, coolingPeriodQueue };\n};\n\nconst reQueueCoolingPeriod = (coolingPeriodQueue, maxHeap) => {\n    while (!coolingPeriodQueue.isEmpty()) {\n        maxHeap.enqueue(coolingPeriodQueue.dequeue());\n    }\n};\n\n/**\n * https://leetcode.com/problems/task-scheduler/\n * Time O(N) | Space O(1)\n * @param {character[]} tasks\n * @param {number} n\n * @return {number}\n */\nvar leastInterval = function (tasks, n) {\n    const frequencyMap = getFrequencyMap(tasks);\n    const maxFrequency = getMaxFrequency(frequencyMap);\n    const mostFrequentTask = getMostFrequentTask(frequencyMap, maxFrequency);\n    const interval = (maxFrequency - 1) * (n + 1) + mostFrequentTask;\n\n    return Math.max(tasks.length, interval);\n};\n\nvar getFrequencyMap = (tasks, frequencyMap = new Array(26).fill(0)) => {\n    for (const task of tasks) {\n        const index = task.charCodeAt(0) - 'A'.charCodeAt(0);\n\n        frequencyMap[index]++;\n    }\n\n    return frequencyMap;\n};\n\nconst getMaxFrequency = (frequencyMap, maxFrequency = 0) => {\n    for (const frequency of frequencyMap) {\n        maxFrequency = Math.max(maxFrequency, frequency);\n    }\n\n    return maxFrequency;\n};\n\nconst getMostFrequentTask = (\n    frequencyMap,\n    maxFrequency,\n    mostFrequentTask = 0,\n) => {\n    for (const frequency of frequencyMap) {\n        const isSame = frequency === maxFrequency;\n        if (isSame) mostFrequentTask++;\n    }\n\n    return mostFrequentTask;\n};\n",
        "python": "class Solution:\n    def leastInterval(self, tasks: List[str], n: int) -> int:\n        count = Counter(tasks)\n        maxHeap = [-cnt for cnt in count.values()]\n        heapq.heapify(maxHeap)\n\n        time = 0\n        q = deque()  # pairs of [-cnt, idleTime]\n        while maxHeap or q:\n            time += 1\n\n            if not maxHeap:\n                time = q[0][1]\n            else:\n                cnt = 1 + heapq.heappop(maxHeap)\n                if cnt:\n                    q.append([cnt, time + n])\n            if q and q[0][1] == time:\n                heapq.heappush(maxHeap, q.popleft()[0])\n        return time\n\n\n# Greedy algorithm\nclass Solution(object):\n    def leastInterval(self, tasks: List[str], n: int) -> int:\n        counter = collections.Counter(tasks)\n        max_count = max(counter.values())\n        min_time = (max_count - 1) * (n + 1) + \\\n                    sum(map(lambda count: count == max_count, counter.values()))\n    \n        return max(min_time, len(tasks))"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Task Scheduler",
          "explanation": "Task Scheduler is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(N * log(N)",
      "spaceComplexity": "O(N)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": [
        "There are many different solutions for this problem, including a greedy algorithm.",
        "For every cycle, find the most frequent letter that can be placed in this cycle. After placing, decrease the frequency of that letter by one.",
        "Use Priority Queue."
      ]
    },
    {
      "id": "design-twitter",
      "title": "Design Twitter",
      "difficulty": "Medium",
      "description": "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.\n\nImplement the Twitter class:\n\n\n\tTwitter() Initializes your twitter object.\n\tvoid postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.\n\tList<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.\n\tvoid follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.\n\tvoid unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.\n\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"Twitter\", \"postTweet\", \"getNewsFeed\", \"follow\", \"postTweet\", \"getNewsFeed\", \"unfollow\", \"getNewsFeed\"]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]\n<strong>Output</strong>\n[null, null, [5], null, null, [6, 5], null, [5]]\n\n<strong>Explanation</strong>\nTwitter twitter = new Twitter();\ntwitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).\ntwitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]\ntwitter.follow(1, 2);    // User 1 follows user 2.\ntwitter.postTweet(2, 6); // User 2 posts a ...",
      "examples": [
        {
          "input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"postTweet\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function designTwitter(input) {\n  // Your code here\n}",
        "python": "def design_twitter(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/design-twitter/\n * Your Twitter object will be instantiated and called as such:\n * var obj = new Twitter()\n * obj.postTweet(userId,tweetId)\n * var param_2 = obj.getNewsFeed(userId)\n * obj.follow(followerId,followeeId)\n * obj.unfollow(followerId,followeeId)\n */\nclass Twitter {\n    constructor() {\n        this.tweets = [];\n        this.following = new Map();\n    }\n\n    postTweet(userId, tweetId, { tweets } = this) {\n        tweets.push({ authorId: userId, id: tweetId });\n    }\n\n    getNewsFeed(userId, newsIDs = [], { tweets, following } = this) {\n        for (let i = tweets.length - 1; 0 <= i && newsIDs.length < 10; i--) {\n            const tweet = tweets[i];\n\n            const isAuthor = tweet.authorId === userId;\n            const isFollowing = following?.get(userId)?.has(tweet.authorId);\n            const canAddTweet = isAuthor || isFollowing;\n            if (canAddTweet) newsIDs.push(tweet.id);\n        }\n\n        return newsIDs;\n    }\n\n    follow(followerId, followeeId, { following } = this) {\n        if (!following.has(followerId)) following.set(followerId, new Set());\n\n        following.get(followerId).add(followeeId);\n    }\n\n    unfollow(followerId, followeeId, { following } = this) {\n        if (following.has(followerId))\n            following.get(followerId).delete(followeeId);\n    }\n}\n",
        "python": "class Twitter:\n    def __init__(self):\n        self.count = 0\n        self.tweetMap = defaultdict(list)  # userId -> list of [count, tweetIds]\n        self.followMap = defaultdict(set)  # userId -> set of followeeId\n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        self.tweetMap[userId].append([self.count, tweetId])\n        self.count -= 1\n\n    def getNewsFeed(self, userId: int) -> List[int]:\n        res = []\n        minHeap = []\n\n        self.followMap[userId].add(userId)\n        for followeeId in self.followMap[userId]:\n            if followeeId in self.tweetMap:\n                index = len(self.tweetMap[followeeId]) - 1\n                count, tweetId = self.tweetMap[followeeId][index]\n                heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])\n\n        while minHeap and len(res) < 10:\n            count, tweetId, followeeId, index = heapq.heappop(minHeap)\n            res.append(tweetId)\n            if index >= 0:\n                count, tweetId = self.tweetMap[followeeId][index]\n                heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])\n        return res\n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        self.followMap[followerId].add(followeeId)\n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        if followeeId in self.followMap[followerId]:\n            self.followMap[followerId].remove(followeeId)\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Design Twitter",
          "explanation": "Design Twitter is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(n)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": []
    },
    {
      "id": "find-median-from-data-stream",
      "title": "Find Median from Data Stream",
      "difficulty": "Hard",
      "description": "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\n\n\tFor example, for arr = [2,3,4], the median is 3.\n\tFor example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.\n\n\nImplement the MedianFinder class:\n\n\n\tMedianFinder() initializes the MedianFinder object.\n\tvoid addNum(int num) adds the integer num from the data stream to the data structure.\n\tdouble findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.\n\n\n \nExample 1:\n\n\n<strong>Input</strong>\n[\"MedianFinder\", \"addNum\", \"addNum\", \"findMedian\", \"addNum\", \"findMedian\"]\n[[], [1], [2], [], [3], []]\n<strong>Output</strong>\n[null, null, null, 1.5, null, 2.0]\n\n<strong>Explanation</strong>\nMedianFinder medianFinder = new MedianFinder();\nmedianFinder.addNum(1);    // arr = [1]\nmedianFinder.addNum(2);    // arr = [1, 2]\nmedianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)\nmedianFinder.addNum(3);    // arr[1, 2, 3]\nmedianFinder.findMedian(); // return 2.0\n\n\n \nConstraints:\n\n\n\t-105 <= num <= 105\n\tThere will be at least one element in the data structure before calling findMedian.\n\tAt most 5 * 104 calls will be made to addNum and findMedian.\n\n\n \nFollow up:\n\n\n\tIf all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?\n\tIf 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize...",
      "examples": [
        {
          "input": "[\"MedianFinder\",\"addNum\",\"addNum\",\"findMedian\",\"addNum\",\"findMedian\"]",
          "output": "See problem description for expected output."
        },
        {
          "input": "[[],[1],[2],[],[3],[]]",
          "output": "See problem description for expected output."
        }
      ],
      "constraints": [
        "Refer to LeetCode for exact constraints."
      ],
      "starterCode": {
        "js": "function findMedianFromDataStream(input) {\n  // Your code here\n}",
        "python": "def find_median_from_data_stream(input):\n    pass"
      },
      "solution": {
        "js": "/**\n * https://leetcode.com/problems/find-median-from-data-stream/\n * Your MedianFinder object will be instantiated and called as such:\n * var obj = new MedianFinder()\n * obj.addNum(num)\n * var param_2 = obj.findMedian()\n */\nclass MedianFinder {\n    constructor() {\n        this.maxHeap = new MaxPriorityQueue();\n        this.minHeap = new MinPriorityQueue();\n    }\n\n    /* Time O(log(N)) | Space (N) */\n    insertNum(num) {\n        this.addNum(num);\n    }\n\n    addNum(num, heap = this.getHeap(num)) {\n        heap.enqueue(num);\n        this.rebalance();\n    }\n\n    getHeap(num, { maxHeap, minHeap } = this) {\n        const isFirst = maxHeap.isEmpty();\n        const isGreater = num <= this.top(maxHeap);\n        const isMaxHeap = isFirst || isGreater;\n        return isMaxHeap ? maxHeap : minHeap;\n    }\n\n    rebalance({ maxHeap, minHeap } = this) {\n        const canShiftMax = minHeap.size() + 1 < maxHeap.size();\n        if (canShiftMax) return minHeap.enqueue(maxHeap.dequeue().element);\n\n        const canShiftMin = maxHeap.size() < minHeap.size();\n        if (canShiftMin) return maxHeap.enqueue(minHeap.dequeue().element);\n    }\n\n    /* Time O(1) | Space (1) */\n    findMedian({ maxHeap, minHeap } = this) {\n        const isEven = maxHeap.size() === minHeap.size();\n        return isEven ? this.average(maxHeap, minHeap) : this.top(maxHeap);\n    }\n\n    average(maxHeap, minHeap) {\n        return (this.top(maxHeap) + this.top(minHeap)) / 2;\n    }\n\n    top(heap) {\n        return heap.front()?.element || 0;\n    }\n}\n",
        "python": "class MedianFinder:\n    def __init__(self):\n        \"\"\"\n        initialize your data structure here.\n        \"\"\"\n        # two heaps, large, small, minheap, maxheap\n        # heaps should be equal size\n        self.small, self.large = [], []  # maxHeap, minHeap (python default)\n\n    def addNum(self, num: int) -> None:\n        if self.large and num > self.large[0]:\n            heapq.heappush(self.large, num)\n        else:\n            heapq.heappush(self.small, -1 * num)\n\n        if len(self.small) > len(self.large) + 1:\n            val = -1 * heapq.heappop(self.small)\n            heapq.heappush(self.large, val)\n        if len(self.large) > len(self.small) + 1:\n            val = heapq.heappop(self.large)\n            heapq.heappush(self.small, -1 * val)\n\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large):\n            return -1 * self.small[0]\n        elif len(self.large) > len(self.small):\n            return self.large[0]\n        return (-1 * self.small[0] + self.large[0]) / 2.0\n"
      },
      "testCases": [
        {
          "input": "default_input",
          "expected": "default_expected",
          "title": "Understanding Find Median from Data Stream",
          "explanation": "Find Median from Data Stream is a great problem to practice the core concepts.",
          "phase": "init",
          "insight": "Time and Space optimal patterns are required."
        }
      ],
      "timeComplexity": "O(log(N)",
      "spaceComplexity": "O(1)",
      "tags": [
        "Heap / Priority Queue"
      ],
      "hints": []
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Build-heap time complexity is:",
      "options": [
        "O(n log n)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ],
      "correct": 1,
      "explanation": "Build-heap is O(n) — sum of sift-down costs is a geometric series converging to O(n)."
    }
  ],
  "cheatSheet": "# Heaps\n```python\nimport heapq\nheapq.heapify(lst)    # O(n)\nheapq.heappush(lst,v) # O(log n)\nheapq.heappop(lst)    # O(log n)\n```",
  "proTips": [
    "Two heaps for median maintenance",
    "K-largest: min-heap of size k"
  ],
  "faangQuotes": [
    "\"Merge K Sorted Lists shows if you understand priority queues deeply.\" — Google"
  ],
  "visualizationType": "heap",
  "usage": "Used to repeatedly find the minimum or maximum element efficiently, or to keep track of the top K elements.",
  "dsInvolved": "Min-Heap, Max-Heap, Priority Queue",
  "sampleProblems": [
    "Kth Largest Element in an Array",
    "Merge K Sorted Lists",
    "Find Median from Data Stream"
  ]
};
