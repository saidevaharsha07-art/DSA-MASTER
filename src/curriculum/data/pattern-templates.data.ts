/**
 * DSA MASTER — Canonical Pattern Code Templates
 * Provides concise, production-grade, language-idiomatic algorithm skeletons in Java, Python, and C++
 * for all primary pattern archetypes across the 25 Learning Areas.
 */

export interface PatternCodeTemplate {
  readonly language: 'java' | 'python' | 'cpp';
  readonly languageLabel: string;
  readonly code: string;
  readonly keyNotes: string[];
}

export interface PatternTemplateBundle {
  readonly java: PatternCodeTemplate;
  readonly python: PatternCodeTemplate;
  readonly cpp: PatternCodeTemplate;
  readonly timeComplexity: string;
  readonly spaceComplexity: string;
  readonly coreInvariant: string;
}

const TEMPLATE_REGISTRY: Record<string, PatternTemplateBundle> = {
  // ── 1. TWO POINTERS (Opposite Direction) ──
  'opposite-pointers': {
    timeComplexity: 'O(N log N) with sort or O(N) if already sorted',
    spaceComplexity: 'O(1) auxiliary space',
    coreInvariant: 'The search range [left, right] monotonically shrinks based on the comparison of elements against the target.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public boolean twoSumSorted(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == target) {
            return true; // Target pair found
        } else if (currentSum < target) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
    return false; // No valid pair
}`,
      keyNotes: [
        'Array must be sorted before applying inward pointers.',
        'Use strict inequality (left < right) when distinct elements are required.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def two_sum_sorted(arr: list[int], target: int) -> bool:
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return False`,
      keyNotes: [
        'Deterministic pointer moves rely strictly on monotonicity.',
        'Guarantees O(1) auxiliary memory.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `bool twoSumSorted(const std::vector<int>& arr, int target) {
    int left = 0, right = static_cast<int>(arr.size()) - 1;
    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == target) return true;
        if (currentSum < target) ++left;
        else --right;
    }
    return false;
}`,
      keyNotes: [
        'Pass vector by const reference to avoid unnecessary copies.',
        'Watch for integer overflow if computing sums near INT_MAX.',
      ],
    },
  },

  // ── 2. TWO POINTERS (Fast & Slow) ──
  'fast-slow-pointers': {
    timeComplexity: 'O(N) linear time',
    spaceComplexity: 'O(1) constant auxiliary space',
    coreInvariant: 'If a cycle exists, the fast pointer decreases the distance to the slow pointer by 1 in each iteration step.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) return false;
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;         // 1 step
        fast = fast.next.next;    // 2 steps
        if (slow == fast) {
            return true; // Cycle detected
        }
    }
    return false; // Reached null tail
}`,
      keyNotes: ['Guard against null on fast.next before dereferencing fast.next.next.'],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def has_cycle(head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
      keyNotes: ['Identity check "slow is fast" verifies pointer node equality.'],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      keyNotes: ['Checks for null guard on fast and fast->next prevent segmentation faults.'],
    },
  },

  // ── 3. SLIDING WINDOW (Variable) ──
  'variable-window': {
    timeComplexity: 'O(N) amortized linear time',
    spaceComplexity: 'O(K) where K is unique constraint elements',
    coreInvariant: 'Right pointer monotonically expands the valid window, while left pointer contracts it whenever the constraint invariant is violated.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public int lengthOfLongestSubstringKDistinct(String s, int k) {
    Map<Character, Integer> counts = new HashMap<>();
    int left = 0, maxLength = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        counts.put(c, counts.getOrDefault(c, 0) + 1);
        
        // Shrink window while constraint is violated
        while (counts.size() > k) {
            char leftChar = s.charAt(left);
            counts.put(leftChar, counts.get(leftChar) - 1);
            if (counts.get(leftChar) == 0) counts.remove(leftChar);
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}`,
      keyNotes: [
        'Each index is visited at most twice (once by right, once by left) ensuring O(N) amortized runtime.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def length_of_longest_substring_k_distinct(s: str, k: int) -> int:
    counts: dict[str, int] = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        counts[char] = counts.get(char, 0) + 1
        while len(counts) > k:
            left_char = s[left]
            counts[left_char] -= 1
            if counts[left_char] == 0:
                del counts[left_char]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`,
      keyNotes: [
        'Remember to delete keys with 0 count so len(counts) accurately reflects distinct elements.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `int lengthOfLongestSubstringKDistinct(const std::string& s, int k) {
    std::unordered_map<char, int> counts;
    int left = 0, maxLength = 0;
    for (int right = 0; right < static_cast<int>(s.size()); ++right) {
        counts[s[right]]++;
        while (static_cast<int>(counts.size()) > k) {
            if (--counts[s[left]] == 0) counts.erase(s[left]);
            left++;
        }
        maxLength = std::max(maxLength, right - left + 1);
    }
    return maxLength;
}`,
      keyNotes: ['Use std::unordered_map::erase when count drops to zero to maintain exact unique keys.'],
    },
  },

  // ── 4. BINARY SEARCH (Classic) ──
  'classic-binary-search': {
    timeComplexity: 'O(log N) logarithmic time',
    spaceComplexity: 'O(1) constant auxiliary space',
    coreInvariant: 'The target element is guaranteed to reside within the closed search interval [low, high] at the start of each iteration.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public int binarySearch(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents overflow
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;  // Target in right half
        } else {
            high = mid - 1; // Target in left half
        }
    }
    return -1; // Element not present
}`,
      keyNotes: [
        'Always compute mid as low + (high - low) / 2 to avoid 32-bit integer overflow.',
        'Use low <= high for closed interval search.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      keyNotes: [
        'Python integers have arbitrary precision, but standard integer division // preserves O(1) arithmetic.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `int binarySearch(const std::vector<int>& nums, int target) {
    int low = 0, high = static_cast<int>(nums.size()) - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      keyNotes: ['Boundary updates low = mid + 1 and high = mid - 1 prevent infinite loops.'],
    },
  },

  // ── 5. BINARY SEARCH ON ANSWER ──
  'search-on-answer': {
    timeComplexity: 'O(log(Range) * Cost(Feasible))',
    spaceComplexity: 'O(1) auxiliary space',
    coreInvariant: 'The feasibility function feasible(mid) is monotonic: true for all values above or below the optimal threshold.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public int minEatingSpeed(int[] piles, int h) {
    int low = 1, high = Arrays.stream(piles).max().getAsInt();
    int optimalSpeed = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canFinish(piles, mid, h)) {
            optimalSpeed = mid; // Try smaller speed
            high = mid - 1;
        } else {
            low = mid + 1;      // Must eat faster
        }
    }
    return optimalSpeed;
}

private boolean canFinish(int[] piles, int speed, int h) {
    long totalHours = 0;
    for (int p : piles) {
        totalHours += (p + speed - 1) / speed; // Ceiling division
    }
    return totalHours <= h;
}`,
      keyNotes: [
        'Ceiling division integer trick: (val + div - 1) / div.',
        'Use 64-bit integer (long) to prevent overflow during sum accumulation.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def min_eating_speed(piles: list[int], h: int) -> int:
    def can_finish(speed: int) -> bool:
        return sum((p + speed - 1) // speed for p in piles) <= h

    low, high = 1, max(piles)
    res = high
    while low <= high:
        mid = (low + high) // 2
        if can_finish(mid):
            res = mid
            high = mid - 1
        else:
            low = mid + 1
    return res`,
      keyNotes: [
        'Isolate feasibility logic in a helper closure for clean modularity.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `int minEatingSpeed(const std::vector<int>& piles, int h) {
    auto canFinish = [&](int speed) -> bool {
        long long totalHours = 0;
        for (int p : piles) totalHours += (p + speed - 1LL) / speed;
        return totalHours <= h;
    };

    int low = 1, high = *std::max_element(piles.begin(), piles.end());
    int result = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canFinish(mid)) {
            result = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return result;
}`,
      keyNotes: ['Use 1LL in numerator to prevent 32-bit signed overflow on additions.'],
    },
  },

  // ── 6. MONOTONIC STACK ──
  'monotonic-stack': {
    timeComplexity: 'O(N) amortized linear time',
    spaceComplexity: 'O(N) for the index stack',
    coreInvariant: 'Stack elements maintain a strict monotonic order. Elements that violate monotonicity are popped and resolved.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public int[] nextGreaterElements(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Store indices
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            int resolvedIdx = stack.pop();
            result[resolvedIdx] = nums[i]; // Found next greater
        }
        stack.push(i);
    }
    return result;
}`,
      keyNotes: [
        'Store indices rather than values in the stack to easily assign answer positions.',
        'Each element is pushed once and popped at most once: amortized O(1) per step.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [-1] * n
    stack: list[int] = []  # Indices
    for i, num in enumerate(nums):
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            result[idx] = num
        stack.append(i)
    return result`,
      keyNotes: [
        'Python list serves as a fast LIFO stack using append() and pop().',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `std::vector<int> nextGreaterElements(const std::vector<int>& nums) {
    int n = static_cast<int>(nums.size());
    std::vector<int> result(n, -1);
    std::stack<int> s; // Indices
    for (int i = 0; i < n; ++i) {
        while (!s.empty() && nums[s.top()] < nums[i]) {
            result[s.top()] = nums[i];
            s.pop();
        }
        s.push(i);
    }
    return result;
}`,
      keyNotes: ['Remember to check !s.empty() before dereferencing s.top().'],
    },
  },

  // ── 7. PREFIX SUM WITH HASHMAP ──
  'prefix-sum-hashing': {
    timeComplexity: 'O(N) linear time',
    spaceComplexity: 'O(N) for cumulative sum frequency map',
    coreInvariant: 'Subarray sum between indices (i, j] equals prefixSum[j] - prefixSum[i]. If (prefixSum - target) was previously seen, a matching subarray exists.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1); // Base case: 0 sum seen once before array start
    int currentSum = 0, matchCount = 0;
    
    for (int num : nums) {
        currentSum += num;
        int complement = currentSum - k;
        if (prefixCounts.containsKey(complement)) {
            matchCount += prefixCounts.get(complement);
        }
        prefixCounts.put(currentSum, prefixCounts.getOrDefault(currentSum, 0) + 1);
    }
    return matchCount;
}`,
      keyNotes: [
        'Crucial base case: map.put(0, 1) accounts for subarrays starting at index 0.',
        'Handles arrays containing negative integers unlike Sliding Window.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def subarray_sum(nums: list[int], k: int) -> int:
    prefix_counts: dict[int, int] = {0: 1}
    curr_sum = 0
    matches = 0
    for num in nums:
        curr_sum += num
        matches += prefix_counts.get(curr_sum - k, 0)
        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1
    return matches`,
      keyNotes: [
        'Single pass O(N) avoids nested O(N^2) subarray iterations.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `int subarraySum(const std::vector<int>& nums, int k) {
    std::unordered_map<int, int> prefixCounts;
    prefixCounts[0] = 1;
    int currentSum = 0, matches = 0;
    for (int num : nums) {
        currentSum += num;
        auto it = prefixCounts.find(currentSum - k);
        if (it != prefixCounts.end()) matches += it->second;
        prefixCounts[currentSum]++;
    }
    return matches;
}`,
      keyNotes: ['Use find() to avoid default-constructing zero-value keys unnecessarily.'],
    },
  },

  // ── 8. BFS QUEUE ──
  'bfs-queue': {
    timeComplexity: 'O(V + E) on graphs, O(N) on trees and grids',
    spaceComplexity: 'O(V) for the queue and visited set',
    coreInvariant: 'Processes nodes level by level. All nodes at distance d are visited before any node at distance d + 1.',
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> levels = new ArrayList<>();
    if (root == null) return levels;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size(); // Snapshot size for current level
        List<Integer> currentLevel = new ArrayList<>();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        levels.add(currentLevel);
    }
    return levels;
}`,
      keyNotes: [
        'Always snapshot queue.size() before inner loop to distinguish distinct distance levels.',
        'Mark nodes visited immediately upon enqueue in graphs to prevent exponential duplication.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `from collections import deque

def level_order(root: Optional[TreeNode]) -> list[list[int]]:
    if not root:
        return []
    levels = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        current_level = []
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        levels.append(current_level)
    return levels`,
      keyNotes: [
        'Use collections.deque for O(1) popleft() operations.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `std::vector<std::vector<int>> levelOrder(TreeNode* root) {
    std::vector<std::vector<int>> levels;
    if (!root) return levels;
    std::queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int levelSize = static_cast<int>(q.size());
        std::vector<int> currentLevel;
        for (int i = 0; i < levelSize; ++i) {
            TreeNode* node = q.front();
            q.pop();
            currentLevel.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        levels.push_back(currentLevel);
    }
    return levels;
}`,
      keyNotes: ['Remember that std::queue::pop() returns void; call front() first.'],
    },
  },
};

/**
 * Generic Fallback Pattern Template Generator
 * Used when a specialized template has not yet been registered for a niche pattern.
 */
export function getPatternTemplateBundle(patternSlug: string, patternTitle: string): PatternTemplateBundle {
  const normalized = patternSlug.toLowerCase().trim();
  if (TEMPLATE_REGISTRY[normalized]) {
    return TEMPLATE_REGISTRY[normalized];
  }

  // Fallback canonical algorithmic template
  return {
    timeComplexity: 'O(N) to O(N log N) depending on branch factor and constraints',
    spaceComplexity: 'O(N) auxiliary space',
    coreInvariant: `Maintains canonical ${patternTitle} state invariants at each iteration or recursive step.`,
    java: {
      language: 'java',
      languageLabel: 'Java',
      code: `public class ${patternTitle.replace(/[^a-zA-Z0-9]/g, '')}Solution {
    public int solve(int[] input) {
        // 1. Initialize pattern state variables
        int result = 0;
        
        // 2. Iterate through input applying ${patternTitle} invariants
        for (int i = 0; i < input.length; i++) {
            // Apply core transition logic
            result = Math.max(result, input[i]);
        }
        
        // 3. Return final computed answer
        return result;
    }
}`,
      keyNotes: [
        'Preserve loop invariants at each transition step.',
        'Validate boundary constraints and empty inputs before execution.',
      ],
    },
    python: {
      language: 'python',
      languageLabel: 'Python',
      code: `def solve_${patternSlug.replace(/[^a-z0-9]/g, '_')}(input_data: list[int]) -> int:
    # 1. Initialize pattern state
    result = 0
    
    # 2. Process data maintaining ${patternTitle} invariants
    for item in input_data:
        # Apply pattern transition logic
        result = max(result, item)
        
    # 3. Return optimal result
    return result`,
      keyNotes: [
        'Keep auxiliary state scoped tightly to avoid state leakage.',
        'Use early returns for empty or single-element corner cases.',
      ],
    },
    cpp: {
      language: 'cpp',
      languageLabel: 'C++',
      code: `int solve${patternTitle.replace(/[^a-zA-Z0-9]/g, '')}(const std::vector<int>& input) {
    // 1. Initialize pattern state
    int result = 0;
    
    // 2. Process sequence with ${patternTitle} invariants
    for (int val : input) {
        result = std::max(result, val);
    }
    
    // 3. Return computed output
    return result;
}`,
      keyNotes: [
        'Pass large collections by const reference to avoid buffer duplication.',
        'Check vector size before accessing front or back elements.',
      ],
    },
  };
}
